'use strict';

const assert = require('assert');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  //this will store the disc when it is remove from the stack array
  let lastItem = stacks[startStack].pop();
  //this tells it to be put back into the new stack array it was moved too
  stacks[endStack].push(lastItem);
  //after every move it will check for a win
  checkForWin()

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // console.log(stacks[endStack].length)
  // console.log(stacks[startStack][stacks[startStack].length -1])

  ////needs to convert the input to lower case and fail if its not
  startStack = startStack.toLowerCase().trim(); 
  endStack = endStack.toLowerCase().trim(); 
  if((startStack !== 'a' && startStack !== 'b' && startStack !== 'c') || (endStack !== 'a' && endStack !== 'b' && endStack !== 'c')){
    return false
  }

  //// lots of math but should know if the disc being moved it greater then the below it
  if(stacks[endStack].length === 0 || stacks[startStack][stacks[startStack].length -1] < stacks[endStack][stacks[endStack].length -1]){
      return true;
    } else {
      return false
    }
  }
  
 

  // Your code here
  // if (endStack[0] > endStack[1]) {
  //   return true
  // } else {
  //   return false
  // }

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // should know when stack B or C has all 4 disc
  if (stacks.a.length === 0 && stacks.b.length === 4 || stacks.c.length === 4) {
      return true
  } else {
    return false
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
//if the move is legal it will continue
  if (isLegal(startStack, endStack)) {
  //if it islegal is true then it call movepiece 
    movePiece(startStack,endStack);
  }else{
    return false
  }
}


const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    //it should only take 1 letter from the user
    it('should only take 1 letter entry', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a','b', 'c'), true);
    });
    // it should only take entry in lower case 
    it('should only take in lowercase entry',function(){
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      let actual = isLegal('A   ', '  B');
      let expected = true;
      assert.equal(actual, expected); 
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
    //kinda an easy one but it should let stack C win also
    it('should detect a win on stack C', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [], c: [4, 3, 2] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
