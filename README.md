un-flatten-tree
=========
[![Build Status](https://travis-ci.org/iyegoroff/un-flatten-tree.svg?branch=master)](https://travis-ci.org/iyegoroff/un-flatten-tree)
[![Coverage Status](https://coveralls.io/repos/github/iyegoroff/un-flatten-tree/badge.svg?branch=master)](https://coveralls.io/github/iyegoroff/un-flatten-tree?branch=master)

A small module for converting trees to lists and vice versa. Can be used in browser and Node.

## Installation

  `npm install un-flatten-tree`

## Usage

#### flatten
Converts tree to list.

    var uft = require('un-flatten-tree');
    
    var tree = [
        {name: 'A', items: [
            {name: 'B'},
            {name: 'C'}
        ]},
        {name: 'D', items: [
            {name: 'E', items: []}
        ]}
    ];
    
    var list = uft.flatten(
        tree,
        node => node.items, // obtain child nodes
        node => node.name   // create output node
    );
  
`list` should be `['A', 'B', 'C', 'D', 'E']`

#### unflatten
Converts list to tree.

    var uft = require('un-flatten-tree');
    
    var list = [
        {id: 1, pid: null},
        {id: 2, pid: null},
        {id: 3, pid: 2},
        {id: 4, pid: 3},
        {id: 5, pid: 4}
    ];
    
    var tree = uft.unflatten(
        list,
        (node, parentNode) => node.pid === parentNode.id,  // check if node is a child of parentNode
        (node, parentNode) => parentNode.items.push(node), // add node to parentNode
        node => ({id: node.id, items: []})                 // create output node
    );
    
`tree` should be
  
    [
        {id: 1, items: []}, 
        {id: 2, items: [
            {id: 3, items: [
                {id: 4, items: [
                    {id: 5, items: []}
                ]}
            ]}
        ]}
    ]
    
More complex examples of usage can be found in `test/test.js`.     

## Tests

  `npm test`

## Contributing

Add unit tests for any new or changed functionality.