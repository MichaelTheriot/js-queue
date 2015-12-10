var stores = new WeakMap();

function Node(item, next) {
  this.item = item;
  this.nextNode = next;
}

function Queue() {
  if(!(this instanceof Queue)) {
    throw TypeError('Constructor Queue requires \'new\'');
  }
  stores.set(this, {
    length: 0,
    startNode: undefined,
    endNode: undefined
  });
  if(arguments.length > 0) {
    for(var i = 0; i < arguments.length; i++) {
      this.enqueue(arguments[i]);
    }
  }
}

(function (arrFrom) {
  Queue.from = function from(item) {
    var arr = arrFrom(item);
    var queue = new Queue();
    for(var i = 0; i < arr.length; i++) {
      queue.enqueue(arr[i]);
    }
    return queue;
  };
})(Array.from);

Queue.prototype.enqueue = function (item) {
  var store = stores.get(this);
  for(var i = 0; i < arguments.length; item = arguments[++i]) {
    var node = new Node(item);
    if(store.endNode) {
      store.endNode = store.endNode.nextNode = node;
    } else {
      store.startNode = store.endNode = node;
    }
    store.length++;
  }
  return store.length;
};

Queue.prototype.dequeue = function () {
  var store = stores.get(this);
  var node = store.startNode;
  if(node) {
    store.startNode = store.startNode.nextNode;
    if(!--store.length) {
      store.endNode = store.startNode;
    }
    return node.item;
  }
};

Queue.prototype.unshift = function (item) {
  var store = stores.get(this);
  for(var i = 0; i < arguments.length; item = arguments[++i]) {
    var node = new Node(item, store.startNode);
    store.startNode = node;
    if(!store.endNode) {
      store.endNode = store.startNode;
    }
    store.length++;
  }
  return store.length;
};

Queue.prototype.pop = function () { // O(n)
  var store = stores.get(this);
  var node, endNode = store.endNode;
  for(node = store.startNode; node !== store.endNode && node.nextNode !== store.endNode; node = node.nextNode);
  if(node) {
    (store.endNode = node).nextNode = undefined;
    if(!--store.length) {
      store.startNode = store.endNode = undefined;
    }
    return endNode.item;
  }
};

Queue.prototype.first = function () {
  return stores.get(this).startNode;
};

Queue.prototype.last = function () {
  return stores.get(this).endNode;
};

Queue.prototype.push = Queue.prototype.enqueue;
Queue.prototype.shift = Queue.prototype.dequeue;

Object.defineProperty(Queue.prototype, 'length', {
  get: function () {
    return stores.get(this).length;
  }
});

Queue.prototype[Symbol.iterator] = function () {
  var store = stores.get(this);
  var node;
  var finished = this.length === 0;
  return {
    next: function () {
      node = node ? node.nextNode : store.startNode;
      if(finished = finished || node === undefined) {
        return {value: undefined, done: finished};
      } else {
        return {value: node.item, done: finished};
      }
    }
  };
};

module.exports = Queue;
