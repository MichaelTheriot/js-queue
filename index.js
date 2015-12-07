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
    var queue = this;
    for(var i = 0; i < arguments.length; i++) {
      queue.enqueue(arguments[i]);
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
  for(var i, item = arguments[i = 0]; i < arguments.length; item = arguments[++i]) {
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

Object.defineProperty(Queue.prototype, 'length', {
  get: function () {
    return stores.get(this).length;
  }
});

module.exports = Queue;
