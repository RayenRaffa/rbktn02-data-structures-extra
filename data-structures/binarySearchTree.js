/* 
BINARY SEARCH TREES

Abstract data type
A binary search tree is a tree with the additional constraints:
- each node has only two child nodes (node.left and node.right)
- all the values in the left subtree of a node are less than or equal to the value of the node
- all the values in the right subtree of a node are greater than the value of the node

*** Operations:

bsTree.insert(value)
=> bsTree (return for chaining purposes)
Insert value into correct position within tree

bsTree.contains(value)
=> true/false
Return true if value is in tree, false if not

bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

10
|_right : 15
|_right : 20
|_left : 12
|_left : 5
|_right : 7
|_left : 3
  valid  12
     
      10                                         
      /\
     /  \
    5   15
   /\    /\
  /  \  /  \
 3   7  12  20

 L N R inOrder
 3 5 7 10 12 15 20
 
 N L R preOrder
 10 5 3 7 15 12 20
 
 L R N postOrder
 3 7 5 12 20 15 10

L < N
N < R
L < N < R
 

bst.traverseDepthFirst(function(value){
  value = value * 2 
})



bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.isValid()
=> returns true if Binary Search Tree is a valid BST otherwise returns false. This method is useful for checking your other methods.

bsTree.removeNode(value)
=> node
Remove node from tree.

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. 
The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/

function BinarySearchTree (value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
// var bst = new BST(10);
// bst.insert(15)
BinarySearchTree.prototype.insert = function(value) {
  // implement me...
  //   if value < node.value  the value will Automatically go down in the left side
  if(this.value > value ) {
    //     check if there is a left child
    if(this.left) {
      this.left.insert(value);
    } else {
      this.left = new BinarySearchTree(value);
    }     
  }
  // if value > node
  //     check if there is a right child
  //       yes : insert(value) in right child
  //       no : right child = value       
  if(this.value < value ) {       
    if(this.right) {
      this.right.insert(value);
    } else {
      this.right = new BinarySearchTree(value);
    }     
  }
};    
// Time complexity:

BinarySearchTree.prototype.contains = function(value) {
  if(this.value === value) {
    return true;
    
  } else if(this.value > value) {
    if(this.left) {
      
      return this.left.contains(value);
      
    } else {
      return false;
    } 
    
  } else if(this.value < value) {
    if(this.right) {
      this.right.contains(value);
    } else {
      return false
    }
  }
};
// Time complexity:

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) {
  // implement me...
  //inOrder   = L N R
  
  // process left side of the tree // 
  if (this.left) {
    this.left.traverseDepthFirst_inOrder(fn);
  }
  
  
  // fn(node.value)
  fn(this.value); 
  

  // process right side of the tree
  if (this.right) {
    this.right.traverseDepthFirst_inOrder(fn);
  }
  
};
// Time complexity:
/*
var sum = function(a,b) {
  return a+b;
}
sum(1,3) => 4

traverseDepthFirst_inOrder(fn) {}

var bst = new BST(10)
bst.traverseDepthFirst_inOrder( function(e){console.log(e)}  )

      10                                         
      /\
     /  \
    5   15                                            
   /\    /\
  /  \  /  \
 3   7  12  20

 L N R inOrder
 3 5 7 10 12 15 20
 
 N L R preOrder
 10 5 3 7 15 12 20
 
 L R N postOrder
 3 7 5 12 20 15 10

*/

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  // implement me...
  // preOrdre  = N L R
 
  // fn(node.value)
  fn(this.value);

  // process left side of the tree
  if (this.left) {
    this.left.traverseDepthFirst_preOrder(fn);
  }

  // process right side of the tree
  if (this.right) {
    this.right.traverseDepthFirst_postOrder(fn);
  }
  
};                                     

// Time complexity:

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function(fn) {
  // implement me...
  // postOrder = L R N

  //process left side of the tree
  if (this.left) {
    this.left.traverseDepthFirst_postOrder(fn);
  }

  //process right side of the tree
  if (this.right) {
    this.right.traverseDepthFirst_postOrder(fn);
  }

  //fn(node.value)
  fn(this.value);
};
// Time complexity:


BinarySearchTree.prototype.checkIfFull = function() {
  // implement me...
/*   
        10                                         
        /\
       /  \
      5   15                                            
     /\    /\
    /  \  /  \
   3   7 12  20

*/
  // 1 :  left  exists and right !exists
  //      return false
  // 2 :  left !exists and right  exists
  //      return false
  // 3 :  left  exists and right  exists
  //      check left
  //      check right
  // 4 :  left  !exists and right !exists
  //      return true

  // 1 - 2
  if ((this.left && !this.right) || (!this.left && this.right)) {
    return false;
  }
  // 3
  if (this.left && this.right) {
      return this.left.checkIfFull() && this.right.checkIfFull();
  }
  // 4
  if (!this.left && !this.right) {
      return true;
  }

};
// Time complexity:

BinarySearchTree.prototype.checkIfBalanced = function() {
 
};
// Time complexity:
