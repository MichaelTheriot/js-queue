# Queue

This is a linked-list implementation of a queue.

```javascript
var q = new Queue();

q.enqueue(5); // 1 (length)
q.enqueue(6); // 2
q.enqueue(7); // 3

q.dequeue(); // 5
q.dequeue(); // 6
q.dequeue(); // 7
```

Queues also have a length property and can be created from an iterable.

```javascript
var set = new Set([1,2,3]);
var q = Queue.from(set);

while(q.length) {
  q.dequeue(); // 1, 2, 3
}
```

Queues can also be enqueued from the constructor, and `enqueue` can take multiple arguments.

```javascript
var q = new Queue(1, 2, 3);

q.enqueue(4, 5, 6);

while(q.length) {
  q.dequeue(); // 1, 2, 3, 4, 5, 6
}
```