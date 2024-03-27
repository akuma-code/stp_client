

export class DataNode<T> {
    public next: DataNode<T> | null = null;
    public prev: DataNode<T> | null = null;
    constructor(public data: T) { }
}

interface ILinkedList<T> {
    insertInBegin(data: T): DataNode<T>;
    insertAtEnd(data: T): DataNode<T>;
    deleteNode(node: DataNode<T>): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): DataNode<T> | null;
}
export class LinkedList<T> implements ILinkedList<T> {
    public head: DataNode<T> | null = null;

    public insertAtEnd(data: T): DataNode<T> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            const getLast = (node: DataNode<T>): DataNode<T> => {
                return node.next ? getLast(node.next) : node;
            };

            const lastNode = getLast(this.head);
            node.prev = lastNode;
            lastNode.next = node;
            this.head = node
        }
        return node;
    }

    public insertInBegin(data: T): DataNode<T> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }

    public deleteNode(node: DataNode<T>): void {
        if (!node.prev) {
            this.head = node.next;
        } else {
            const prevNode = node.prev;
            prevNode.next = node.next;
        }
    }

    public search(comparator: (data: T) => boolean): DataNode<T> | null {
        const checkNext = (node: DataNode<T>): DataNode<T> | null => {
            if (comparator(node.data)) {
                return node;
            }
            return node.next ? checkNext(node.next) : null;
        };

        return this.head ? checkNext(this.head) : null;
    }

    public traverse(): T[] {
        const array: T[] = [];
        if (!this.head) {
            return array;
        }

        const addToArray = (node: DataNode<T>): T[] => {
            array.push(node.data);
            return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    }

    public size(): number {
        return this.traverse().length;
    }
}

