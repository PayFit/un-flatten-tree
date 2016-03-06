declare module uft {

    /**
     * Converts tree to list.
     *
     * @param tree Array-like object representing tree.
     * @param getChildNodes Function to return child nodes.
     * @param convertNode Function to modify each item of result list.
     * @param generateId Function to generate unique ids for each item of result list.
     * @return Returns list of out nodes.
     */
    export function flatten<Node, OutNode, Id>(
        tree: { [index: number]: Node; length: number; },
        getChildNodes: (node: Node) => { [index: number]: Node; length: number; },
        convertNode?: (node: Node, parentNode?: Node, nodeId?: Id, parentNodeId?: Id) => OutNode,
        generateId?: (node: Node) => Id
    ): OutNode[];

    /**
     * Converts list to tree.
     *
     * @param list Array-like object representing list.
     * @param isChildNode Function to check for child-parent relation.
     * @param addChildNode Function to add out node to its parent node.
     * @param convertNode Function to modify each node of resulting tree.
     * @return Returns tree of out nodes.
     */
    export function unflatten<Node, OutNode>(
        list: { [index: number]: Node; length: number; },
        isChildNode: (node: Node, parentNode: Node) => boolean,
        addChildNode: (node: OutNode, parentNode: OutNode) => void,
        convertNode?: (node: Node) => OutNode
    ): OutNode[];
}