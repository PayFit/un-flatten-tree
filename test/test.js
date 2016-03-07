'use strict';

var expect = require('chai').expect;
var map = require('lodash.map');
var uft = require('../un-flatten-tree');

function Node(name, children) {
    this.name = name;
    this.children = children || [];
}

Node.prototype.addChild = function (child) {
    this.children.push(child);
};

Node.prototype.getChildren = function () {
    return this.children;
};

Node.prototype.getName = function () {
    return this.name;
};

describe('#flatten', function () {
    it('should convert null to an empty array', function () {
        expect(uft.flatten(null)).to.eql([]);
    });

    it('should convert an empty array to an empty array', function () {
        expect(uft.flatten([])).to.eql([]);
    });

    it('should convert tree to list', function () {
        var tree = [
            {l: 1, i: [
                {l: 5}
            ]},
            {l: 2, i: [
                {l: 6, i: []}
            ]},
            {l: 3, i: [
                {l: 7, i: [
                    {l: 8, i: null},
                    {l: 9, i: [
                        {l: 11, i: []}
                    ]},
                    {l: 10, i: []}
                ]}
            ]},
            {l: 4, i: undefined}
        ];

        var list = [
            {l: 1, i: [
                {l: 5}
            ]},
            {l: 5},
            {l: 2, i: [
                {l: 6, i: []}
            ]},
            {l: 6, i: []},
            {l: 3, i: [
                {l: 7, i: [
                    {l: 8, i: null},
                    {l: 9, i: [
                        {l: 11, i: []}
                    ]},
                    {l: 10, i: []}
                ]}
            ]},
            {l: 7, i: [
                {l: 8, i: null},
                {l: 9, i: [
                    {l: 11, i: []}
                ]},
                {l: 10, i: []}
            ]},
            {l: 8, i: null},
            {l: 9, i: [
                {l: 11, i: []}
            ]},
            {l: 11, i: []},
            {l: 10, i: []},
            {l: 4, i: undefined}
        ];

        expect(
            uft.flatten(
                tree,
                function (node) { return node.i; }
            )
        ).to.eql(list);
    });

    it('should convert tree to list of nodes with parent ids', function () {
        var tree = [
            {id: 1, items: []},
            {id: 2, items: [
                {id: 4, items: [
                    {id: 5, items: [
                        {id: 7, items: []}
                    ]},
                    {id: 6, items: []}
                ]}
            ]},
            {id: 3, items: [
                {id: 8, items: []}
            ]}
        ];

        var list = [
            {id: 1, pid: null},
            {id: 2, pid: null},
            {id: 4, pid: 2},
            {id: 5, pid: 4},
            {id: 7, pid: 5},
            {id: 6, pid: 4},
            {id: 3, pid: null},
            {id: 8, pid: 3}
        ];

        expect(
            uft.flatten(
                tree,
                function (node) { return node.items; },
                function (node, parentNode) {
                    return {
                        id: node.id,
                        pid: parentNode !== undefined ? parentNode.id : null
                    };
                }
            )
        ).to.eql(list);
    });

    it('should convert tree of node objects to list of node names', function () {
        var tree = [new Node('A',[
            new Node('B'),
            new Node('C', [
                new Node('D')
            ]),
            new Node('E', [
                new Node('F', [
                    new Node('G'),
                    new Node('H')
                ])
            ])
        ])];

        var list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        expect(
            uft.flatten(
                tree,
                function (node) { return node.getChildren(); },
                function (node) { return node.getName(); }
            )
        ).to.eql(list);
    });

    it('should convert tree to list with generated parent ids', function () {
        var tree = [
            {name: 'A', items: [
                {name: 'A'},
                {name: 'B'},
                {name: 'C'}
            ]},
            {name: 'B', items: [
                {name: 'A', items: []}
            ]}
        ];

        var list = [
            {name: 'A', id: 1, pid: undefined},
            {name: 'A', id: 2, pid: 1},
            {name: 'B', id: 3, pid: 1},
            {name: 'C', id: 4, pid: 1},
            {name: 'B', id: 5, pid: undefined},
            {name: 'A', id: 6, pid: 5}
        ];

        var cnt = 1;

        expect(
            uft.flatten(
                tree,
                function (node) { return node.items; },
                function (node, parentNode, nodeId, parentId) {
                    return {
                        name: node.name,
                        id: nodeId,
                        pid: parentId
                    };
                },
                function () { return cnt++; }
            )
        ).to.eql(list);
    });
    
    it('should convert array-like object tree to list', function () {
        var tree = {
            0: {name: 'A', items: {
                0: {name: 'B'},
                1: {name: 'C'},
                2: {name: 'D'},
                length: 3
            }},
            1: {name: 'E', items: {
                0: {name: 'F', items: { length: 0 }},
                length: 1
            }},
            length: 2
        };
        
        var list = [
            {name: 'A'},
            {name: 'B'},
            {name: 'C'},
            {name: 'D'},
            {name: 'E'},
            {name: 'F'}
        ];

        expect(
            uft.flatten(
                tree,
                function (node) { return node.items; },
                function (node) { return {name: node.name}; }
            )
        ).to.eql(list);
    });

    //test case taken from here - http://stackoverflow.com/q/23919887/4134913
    it('should convert tree to list of "routes"', function () {
        var tree = {
            "f": {
                "t": "100",
                "f": {
                    "i": ['150'],
                    "b": ['300'],
                    "f": {
                        "k": 100
                    }
                },
                "l": ['255']
            },
            "c": {
                "s": {
                    "t": ["100"]
                },
                "t": "100"
            }
        };

        var list = ["ft", "ffi", "ffb", "fffk", "fl", "cst", "ct"];

        function walk(tree) {
            return map(tree, function (v, k) {
                return {
                    name: k,
                    items: (typeof v !== 'object' || v instanceof Array) ? [] : walk(v)
                };
            });
        }

        function getChildNodes(node) {
            return (node.items || []).map(function (item) {
                return {
                    name: node.name + item.name,
                    items: item.items
                };
            });
        }

        expect(
            uft.flatten(walk(tree), getChildNodes)
                .filter(function (node) { return node.items.length === 0; })
                .map(function (node) { return node.name; })
        ).to.eql(list);
    });
});

describe('#unflatten', function () {
    it('should convert null to an empty array', function () {
        expect(uft.unflatten(null)).to.eql([]);
    });

    it('should convert an empty array to an empty array', function () {
        expect(uft.unflatten([])).to.eql([]);
    });

    it('should convert list with parent ids to tree', function () {
        var tree = [
            {id: 3, items: [
                {id: 8, items: []}
            ]},
            {id: 2, items: [
                {id: 4, items: [
                    {id: 6, items: []},
                    {id: 5, items: [
                        {id: 7, items: []}
                    ]}
                ]}
            ]},
            {id: 1, items: []}
        ];

        var list = [
            {id: 8, pid: 3},
            {id: 3, pid: null},
            {id: 6, pid: 4},
            {id: 7, pid: 5},
            {id: 5, pid: 4},
            {id: 4, pid: 2},
            {id: 2, pid: null},
            {id: 1, pid: null}
        ];

        expect(
            uft.unflatten(
                list,
                function (node, parentNode) { return node.pid === parentNode.id; },
                function (node, parentNode) { parentNode.items.push(node); },
                function (node) { return {id: node.id, items: []}; }
            )
        ).to.eql(tree);
    });

    it('should convert list with parent ids to node tree', function () {
        var tree = [
            new Node('A'),
            new Node('B'),
            new Node('C', [
                new Node('D', [
                    new Node('E')
                ]),
                new Node('F')
            ])
        ];

        var list = [
            {id: 1, pid: null, name: 'A'},
            {id: 2, pid: null, name: 'B'},
            {id: 3, pid: null, name: 'C'},
            {id: 4, pid: 3, name: 'D'},
            {id: 5, pid: 4, name: 'E'},
            {id: 6, pid: 3, name: 'F'}
        ];

        expect(
            uft.unflatten(
                list,
                function (node, parentNode) { return node.pid === parentNode.id; },
                function (node, parentNode) { parentNode.addChild(node); },
                function (node) { return new Node(node.name); }
            )
        ).to.eql(tree);
    });
    
    it('should convert array-like object to tree', function () {
        var tree = [
            {id: 2, items: [
                {id: 4, items: [
                    {id: 6, items: []},
                    {id: 5, items: [
                        {id: 7, items: []}
                    ]}
                ]}
            ]},
            {id: 3, items: [
                {id: 8, items: []}
            ]},
            {id: 1, items: []}
        ];

        var list = {
            0: {id: 8, pid: 3},
            4: {id: 3, pid: null},
            1: {id: 6, pid: 4},
            5: {id: 7, pid: 5},
            2: {id: 5, pid: 4},
            6: {id: 4, pid: 2},
            3: {id: 2, pid: null},
            7: {id: 1, pid: null},
            length: 8
       };
       
        expect(
            uft.unflatten(
                list,
                function (node, parentNode) { return node.pid === parentNode.id; },
                function (node, parentNode) { parentNode.items.push(node); },
                function (node) { return {id: node.id, items: []}; }
            )
        ).to.eql(tree);
    });

    it('should convert list to tree without converting nodes', function () {
        var tree = [
            {id: 3, pid: null, items: [
                {id: 8, pid: 3, items: [
                    {id: 2, pid: 8, items: [
                        {id: 1, pid: 2, items: []}
                    ]}
                ]}
            ]}
        ];

        var list = [
            {id: 8, pid: 3, items: []},
            {id: 3, pid: null, items: []},
            {id: 2, pid: 8, items: []},
            {id: 1, pid: 2, items: []}
        ];

        expect(
            uft.unflatten(
                list,
                function (node, parentNode) { return node.pid === parentNode.id; },
                function (node, parentNode) { parentNode.items.push(node); }
            )
        ).to.eql(tree);
    });
});
