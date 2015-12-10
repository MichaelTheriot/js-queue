# Queue

This is a linked-list implementation of a queue.

Multiple arguments can be taken in the constructor to add to the queue.

```javascript
var q = new Queue();

q.enqueue(5); // 1 (length)
q.enqueue(6); // 2
q.enqueue(7); // 3

q.dequeue(); // 5
q.dequeue(); // 6
q.dequeue(); // 7
```

## .enqueue(...item), .push(...item)

Add elements to the queue using `enqueue` or its alias `push`. These can take multiple arguments and will queue the items in FIFO order.

```javascript
var q = new Queue();

q.enqueue(5, 6, 7); // 3

q.dequeue(); // 5
q.dequeue(); // 6
q.dequeue(); // 7
```

## .dequeue(), .shift()

`dequeue` and its alias `shift` removes and returns the first element in the queue.

## .unshift(...item)

Adds an item to the front of the queue.

```javascript
var q = new Queue(5, 6, 7);

q.unshift(1); // 4

q.dequeue(); // 1
q.dequeue(); // 5
q.dequeue(); // 6
q.dequeue(); // 7
```

## .pop()

Removes an item from the end of the queue.

This method is in **O(n) time**.

```javascript
var q = new Queue(5, 6, 7);

q.pop(); // 7
```

## .first()

Returns the first item in the queue without removing it.

## .last()

Returns the last item in the queue without removing it.

## .length

Returns the number of items in the queue.

## Iteratable

Queues are an iterable and iterating them does not affect their contents.

```javascript
var q = new Queue(1, 2, 3);

for(var item of q) {
  console.log(item); // 1, 2, 3
}
```

# Queue.from([[iterable]])

Queues can be created from an iterable using `Queue.from`.

```javascript
var set = new Set([1, 2, 3]);
var q = Queue.from(set);

while(q.length) {
  q.dequeue(); // 1, 2, 3
}
```