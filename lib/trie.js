import Node from './Node';

export default class Trie {
  constructor () {
    this.wordCount = 0;
    this.rootNode = new Node ();
  }

  count () {
    return this.wordCount;
  }

  insert(word) {
    let currentNode = this.rootNode;
    let lettersArray = [...word];

    this.insertRecursive(lettersArray, currentNode, word);
    this.wordCount++;
  }

  insertRecursive(lettersArray, currentNode, word) {
    if (!lettersArray.length) {
      currentNode.end = true;
      currentNode.word = word;
      return;
    }
    
    if (currentNode.children[lettersArray[0]]) {
      currentNode = currentNode.children[lettersArray.shift()];
    } else {
      currentNode.children[lettersArray[0]] = new Node ();
      currentNode = currentNode.children[lettersArray.shift()];
    }

    return this.insertRecursive(lettersArray, currentNode, word);
  }

  suggest(input) {
    let completeMe = [...input];
    let currentNode = this.rootNode;
    let finalArray = [];

    while (completeMe.length) {
      if (currentNode.children[completeMe[0]]) {
        currentNode = currentNode.children[completeMe.shift()];
      } else {
        return 'No suggestions.';
      }
    }
    this.suggestRecursive(currentNode, finalArray);

    return finalArray;
  }

  suggestRecursive(currentNode, finalArray) {
    if (currentNode.word) {
      finalArray.push(currentNode.word);
    } else {
      let keysArray = Object.keys(currentNode.children);

      keysArray.forEach (key => {
        const nextNode = currentNode.children[key];

        this.suggestRecursive(nextNode, finalArray);
      });
    }
  }

  populate(dictionary) {
    dictionary.forEach (word => {
      this.insert(word);
    });
  }
}

