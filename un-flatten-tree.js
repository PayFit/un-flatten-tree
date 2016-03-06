(function(root) {
    'use strict';

    var forEach = (root._ && root._.forEach) || require('lodash.foreach');
    var transform = (root._ && root._.transform) || require('lodash.transform');
    var map = (root._ && root._.map) || require('lodash.map');
    var find = (root._ && root._.find) || require('lodash.find');
    
    function identity(x) {
        return x;
    }

    function flattenTree(tree, getChildNodes, convertNode, generateId) {
        convertNode = convertNode === undefined ? identity : convertNode;

        var iterate = generateId === undefined
            ? function (flatten, nodes, parentNode) {
                forEach(nodes, function (node) {
                    flatten.push(convertNode(node, parentNode));

                    iterate(flatten, getChildNodes(node), node);
                });

                return flatten;
            }
            : function (flatten, nodes, parentNode, parentNodeId) {
                forEach(nodes, function (node) {
                    var nodeId = generateId(node);

                    flatten.push(convertNode(node, parentNode, nodeId, parentNodeId));

                    iterate(flatten, getChildNodes(node), node, nodeId);
                });

                return flatten;
            };

        return iterate([], tree);
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
