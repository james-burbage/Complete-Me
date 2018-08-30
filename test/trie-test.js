import { expect } from 'chai';
import fs from 'fs';
import Trie from '../lib/Trie';
import Node from '../lib/Node';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('Should exist', () => {
    expect(trie).to.exist;
  })

  it('Should start with no words', () => {
    expect(trie.wordCount).to.equal(0);
  });

  it('Should set the rootNodes children to an empty object', () => {
    expect(trie.rootNode.children).to.deep.eq({});
  });

  it('Should update the word count when you add a new word', () => {
    expect(trie.wordCount).to.eq(0);
    trie.insert('james');
    expect(trie.wordCount).to.eq(1);
  });

  it ('Should be able to insert multiple words', () => {
    trie.insert ('james');
    trie.insert ('jared');
    trie.insert ('jason');
    console.log(JSON.stringify(trie, null, 4));
    expect(Object.keys(trie.rootNode.children)).to.deep.eq([ 'j' ]);
  });

  it ('Should return an array of all possible suggestions', () => {
    trie.insert ('james');
    trie.insert ('jared');
    trie.insert ('jason');
    expect (trie.suggest('ja')).to.deep.equal(['james', 'jared', 'jason']);
  });

  it ('Should populate when passing in the dictionary', () => {
    expect (trie.count()).to.eq(0);
    trie.populate(dictionary);
    expect (trie.count()).to.eq(235886);
    // console.log(JSON.stringify(trie, null, 4));
  });
});