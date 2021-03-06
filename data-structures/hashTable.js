/*

HASH TABLE



Collection of key-value pairs.
Map keys to values for efficient lookup.
Use an array as the underlying data structure.
Hash table should have a size - this will be used by the hashing function to determine what index to map the key to.
A hashing function is used to map the key to an integer, which is the index that the value is to be stored at.
Since our hashing function might map multiple keys to the same integer, we have to deal with collisions by creating buckets at each index of the storage array. These buckets can be arrays or linked lists.


*** Note:

ES6 includes a Map data structure. It differs from the JavaScript object because the keys can be any value (not just strings like for objects), 
there is a size property, and there is a guaranteed order (the insertion order).

Hash tables are also referred to as hash mapse or dictionaries.


*** Operations:

myMap.set(key, value)
=> myMap object
Store the key-value pair in the storage array.
If the key already exists, replace stored value with new value.
Use the hashing function to map the key to an integer and store the value at the corresponding index.
Account for the possibility of collisions.

myMap.get(key)
=> value associated with key, or undefined if none

myMap.has(key)
=> true/false depending on if a value has been associated with the key

myMap.delete(key)
=> true if a value was associated with the key
=> false if a value was never associated with the key
Remove any value associated to the key

myMap.count()
=> integer number of key/value pairs in hash table

myMap.forEach(callbackFn)
=> no returned value
Invokes callback function once for each key-value pair in the hash table


*** Additional Exercises:

Resize the hash table:
- if the count becomes greater than 75% of the table size, double the table size and redistribute the key/value pairs
- if the count becomes less than 25% of the table size, cut the table size in half and redistribute the key/value pairs





*/

// Simple hashing function to use in your implementation
function simpleHash(str, tableSize) {
  var hash = 0;
  for (var i=0; i<str.length; i++) {
    hash += str.charCodeAt(i) * (i+1);
  }
  return hash % tableSize;
}
// source: http://pmav.eu/stuff/javascript-hashing-functions/source.html

function HashTable(tableSize) {
  // implement me...
  this._storage = [];
  this._size = tableSize || 10;
  this._count = 0;
}

// This is a helper method that you may want to implement to help keep your code DRY
// You can implement the hash table methods without it.
// I recommend skipping it and coming back if you find that it will be useful
HashTable.prototype.find = function(key) {
  // implement me...
  return {
    match: match,
    bucket: bucket,
    matchIndex: matchIndex
  };
};

HashTable.prototype.set = function(key, value) {
  // implement me...
  //   ht.set(key, value)
  // Store the key-value pair in the storage array.
  // If the key already exists, replace stored value with new value.
  // Use the hashing function to map the key to an integer and store the value at the corresponding index.
  // Account for the possibility of collisions.
  var index = simpleHash(key, this._size);
  var bucket = this._storage[index] || [];
  for (var i=0; i<bucket.length; i++ ) {
    var tuple = bucket[i]; 
    if (tuple[0] === key) {
      tuple[1] = value;
      var keyFound = true;
      break;
    }
  }
  if (!keyFound) {
    bucket.push([key, value]);
    this._count++;
  }
  this._storage[index] = bucket;
  
  if (this._count/this._size > 0.75) {
    this.resize(this._size * 2);
  }
  
  
};
// Time complexity:

HashTable.prototype.get = function(key) {
  // implement me...
  //   myMap.get(key)
  // => value associated with key, or undefined if none
  var index = simpleHash(key, this._size);
  var bucket = this._storage[index] || [];
  for (var i=0; i<bucket.length; i++ ) {
    var tuple = bucket[i]; 
    if (tuple[0] === key) {
      return tuple[1];
    }
  }
  return undefined;
};


// Time complexity:

HashTable.prototype.has = function(key) {
  // implement me...
  //   myMap.has(key)
  // => true/false depending on if a value has been associated with the key
  
};
// Time complexity:

HashTable.prototype.delete = function(key) {
  // implement me...
  //   myMap.delete(key)
  // => true if a value was associated with the key
  // => false if a value was never associated with the key
  // Remove any value associated to the key
  var index = simpleHash(key, this._size);
  var bucket = this._storage[index];
  for (var i=0; i<bucket.length; i++ ) {
    var tuple = bucket[i]; 
    if (tuple[0] === key) {
      bucket.splice(i,1);
      this._storage[index] = bucket;
      this._count--;
      if (this._count/this._size < 0.25) {
        this.resize(this._size / 2);
      }
      return true;
    }
  }
  
  return false;
};
// Time complexity:

HashTable.prototype.count = function() {
  // implement me...
  //   myMap.count()
  // => integer number of key/value pairs in hash table
  var totalNumber = 0;
  for(var i=0; i<this._size; i++) {
    if(this._storage[i]) {
      bucket = this._storage[i] || [];
      totalNumber += bucket.length;
    }
  }
  return totalNumber;
  
};
// Time complexity:

HashTable.prototype.forEach = function(callback) {
  // implement me...
  //   myMap.forEach(callbackFn)
  // => no returned value
  // Invokes callback function once for each key-value pair in the hash table
  for (var i=0; i<this._size; i++) {
    var bucket = this._storage[i] || [];
    for (var j=0; j<bucket.length; j++) {
      var tuple = bucket[j];
      callback(tuple[0], tuple[1]);
    }
    
  }
};
// Time complexity:


HashTable.prototype.resize = function(newSize){
  var newHashTable = new HashTable(newSize);
  for (var i=0; i<this._size ; i++) {
    var bucket = this._storage[i] || [];
    for (var j=0; j<bucket.length; j++) {
      var tuple = bucket[j];
      newHashTable.set(tuple[0], tuple[1]);
    }
  }
  this._storage = newHashTable._storage;
  this._size = newHashTable._size;
  this._count = newHashTable._count;
};

/*
*** Exercises:

1. Implement a hash table with a binary search tree.

2. Given two arrays with values, return the values that are present in both. Do this in linear time.

3. Implement a hash table using linked lists for collision-handling. Why might this be preferable to using arrays.

*/
