(function(root) {
    'use strict';

    var transform = (root._ && root._.transform) || require('lodash.transform');
    var map = (root._ && root._.map) || require('lodash.map');
    var find = (root._ && root._.find) || require('lodash.find');
    
    function identity(x) {
        return x;
    }

    function flattenTree(tree, getChildNodes, convertNode, generateId) {
        convertNode = convertNode === undefined ? identity : convertNode;
        var stack = (tree && tree.length) ? [{ pointer: tree, offset: 0 }] : [];
        var flatten = [];
        var current;

        while (stack.length) {
            current = stack.pop();

            while (current.offset < current.pointer.length) {
                var node = current.pointer[current.offset];
                var nodeId = generateId === undefined ? undefined : generateId(node);
                var children = getChildNodes(node);

                flatten.push(convertNode(node, current.node, nodeId, current.nodeId));

                current.offset++;

                if (children) {
                    stack.push(current);

                    current = {
                        pointer: children,
                        offset: 0,
                        node: node,
                        nodeId: nodeId
                    };
                }
            }
        }

        return flatten;
    }

    function unflattenTree(list, isChildNode, addChildNode, convertNode) {
        if (convertNode === undefined) {
            return transform(list, function (tree, node) {

                var parentNode = find(list, function (parentNode) {
                    return isChildNode(node, parentNode);
                });

                if (parentNode === undefined) {
                    tree.push(node);

                } else {
                    addChildNode(node, parentNode);
                }
            }, []);

        } else {
            list = map(list, function (node) {
                return {
                    in: node,
                    out: convertNode(node)
                };
            });

            return transform(list, function (tree, node) {

                var parentNode = find(list, function (parentNode) {
                    return isChildNode(node.in, parentNode.in);
                });

                if (parentNode === undefined) {
                    tree.push(node.out);

                } else {
                    addChildNode(
                        node.out,
                        find(list, function (treeNode) {
                            return treeNode.in === parentNode.in;
                        }).out
                    );
                }
            }, []);
        }
    }

    var uft = {
        flatten: flattenTree,
        unflatten: unflattenTree
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = uft;

    } else {
        root.uft = uft;
    }

})(this);
