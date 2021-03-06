"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = Array.prototype.map;
var reduce = Array.prototype.reduce;
var find = function (list, predicate) {
    var len = list.length;
    for (var i = 0; i < len; i++) {
        if (predicate(list[i])) {
            return list[i];
        }
    }
    return undefined;
};
/**
 * Converts tree to list.
 *
 * @param tree Array-like object representing tree.
 * @param getChildNodes Function to return child nodes.
 * @param convertNode Function to modify each item of result list.
 * @param generateId Function to generate unique ids for each item of result list.
 * @return Returns list of out nodes.
 */
function flatten(tree, getChildNodes, convertNode, generateId) {
    if (convertNode === void 0) { convertNode = function (node) { return node; }; }
    if (generateId === void 0) { generateId = function () { return undefined; }; }
    var stack = tree && tree.length ? [{ pointer: tree, offset: 0 }] : [];
    var flat = [];
    var current;
    while (stack.length) {
        current = stack.pop();
        while (current.offset < current.pointer.length) {
            var node = current.pointer[current.offset];
            var nodeId = generateId(node);
            var children = getChildNodes(node);
            flat.push(convertNode(node, current.node, nodeId, current.nodeId));
            current.offset += 1;
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
    return flat;
}
exports.flatten = flatten;
function unflatten(list, isChildNode, addChildNode, convertNode) {
    if (convertNode === undefined) {
        return reduce.call(list, function (tree, node) {
            var parentNode = find(list, function (parent) { return isChildNode(node, parent); });
            if (parentNode === undefined) {
                tree.push(node);
            }
            else {
                addChildNode(node, parentNode);
            }
            return tree;
        }, []);
    }
    else {
        var mappedList_1 = map.call(list, function (node) { return ({
            in: node,
            out: convertNode(node)
        }); });
        return reduce.call(mappedList_1, function (tree, node) {
            var parentNode = find(mappedList_1, function (parent) { return isChildNode(node.in, parent.in); });
            if (parentNode === undefined) {
                tree.push(node.out);
            }
            else {
                addChildNode(node.out, find(mappedList_1, function (treeNode) { return treeNode.in === parentNode.in; }).out);
            }
            return tree;
        }, []);
    }
}
exports.unflatten = unflatten;
