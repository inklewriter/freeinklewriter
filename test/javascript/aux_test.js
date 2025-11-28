// Tests for aux.js utility functions
// Testing only pure functions without DOM/AJAX dependencies

// Mock utility functions from aux.js
function wordCountOf(x) {
  if (x) {
    var words = x.match(/\S+/g);
    if (words) return words.length;
  }
  return 0;
}

function commadString(x) {
  // convert to a string, with commas on every thousand words
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertStringToBooleanIfAppropriate(pass) {
  if (pass === "true") return true;
  if (pass === "false") return false;
  return pass;
}

// Array prototype extensions
Array.prototype.contains = function(element) {
  var elementIdx = this.indexOf(element);
  if( elementIdx >= 0 )
    return true;
  else
    return false;
}

Array.prototype.first = function() {
  if( this.length > 0 )
    return this[0];
  else
    return null;
}

Array.prototype.last = function() {
  if( this.length > 0 )
    return this[this.length-1];
  else
    return null;
}

Array.prototype.add = function(element) {
  if (!this.contains(element))
    this.push(element);
}

Array.prototype.remove = function(element) {
  var elementIdx = this.indexOf(element);
  if( elementIdx >= 0 ) {
    this.splice(elementIdx, 1);
  }
}

String.prototype.camelCase = function() {
  return this.replace(/[^A-Za-z\s]/g, '').replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

QUnit.module('aux.js Utility Functions', function() {

  QUnit.test('wordCountOf() counts words in a sentence', function(assert) {
    assert.equal(wordCountOf("Hello world"), 2,
      'Should count 2 words in "Hello world"');
  });

  QUnit.test('wordCountOf() counts words with punctuation', function(assert) {
    assert.equal(wordCountOf("Hello, world! How are you?"), 5,
      'Should count 5 words including punctuation');
  });

  QUnit.test('wordCountOf() returns 0 for empty string', function(assert) {
    assert.equal(wordCountOf(""), 0,
      'Should return 0 for empty string');
  });

  QUnit.test('wordCountOf() returns 0 for null', function(assert) {
    assert.equal(wordCountOf(null), 0,
      'Should return 0 for null');
  });

  QUnit.test('wordCountOf() returns 0 for whitespace only', function(assert) {
    assert.equal(wordCountOf("   "), 0,
      'Should return 0 for whitespace only');
  });

  QUnit.test('commadString() formats thousands with commas', function(assert) {
    assert.equal(commadString(1000), "1,000",
      'Should format 1000 as "1,000"');
  });

  QUnit.test('commadString() formats millions with commas', function(assert) {
    assert.equal(commadString(1234567), "1,234,567",
      'Should format 1234567 as "1,234,567"');
  });

  QUnit.test('commadString() does not add commas to small numbers', function(assert) {
    assert.equal(commadString(999), "999",
      'Should not add commas to 999');
  });

  QUnit.test('convertStringToBooleanIfAppropriate() converts "true" to boolean', function(assert) {
    assert.strictEqual(convertStringToBooleanIfAppropriate("true"), true,
      'Should convert "true" to boolean true');
  });

  QUnit.test('convertStringToBooleanIfAppropriate() converts "false" to boolean', function(assert) {
    assert.strictEqual(convertStringToBooleanIfAppropriate("false"), false,
      'Should convert "false" to boolean false');
  });

  QUnit.test('convertStringToBooleanIfAppropriate() preserves other strings', function(assert) {
    assert.equal(convertStringToBooleanIfAppropriate("hello"), "hello",
      'Should preserve non-boolean strings');
  });
});

QUnit.module('Array Extensions', function() {

  QUnit.test('Array.contains() returns true for present element', function(assert) {
    var arr = [1, 2, 3, 4, 5];
    assert.ok(arr.contains(3), 'Should return true when element is present');
  });

  QUnit.test('Array.contains() returns false for absent element', function(assert) {
    var arr = [1, 2, 3, 4, 5];
    assert.notOk(arr.contains(10), 'Should return false when element is absent');
  });

  QUnit.test('Array.first() returns first element', function(assert) {
    var arr = ['a', 'b', 'c'];
    assert.equal(arr.first(), 'a', 'Should return first element');
  });

  QUnit.test('Array.first() returns null for empty array', function(assert) {
    var arr = [];
    assert.equal(arr.first(), null, 'Should return null for empty array');
  });

  QUnit.test('Array.last() returns last element', function(assert) {
    var arr = ['a', 'b', 'c'];
    assert.equal(arr.last(), 'c', 'Should return last element');
  });

  QUnit.test('Array.last() returns null for empty array', function(assert) {
    var arr = [];
    assert.equal(arr.last(), null, 'Should return null for empty array');
  });

  QUnit.test('Array.add() adds new element', function(assert) {
    var arr = [1, 2, 3];
    arr.add(4);
    assert.equal(arr.length, 4, 'Should increase length by 1');
    assert.ok(arr.contains(4), 'Should contain the new element');
  });

  QUnit.test('Array.add() does not add duplicate element', function(assert) {
    var arr = [1, 2, 3];
    arr.add(2);
    assert.equal(arr.length, 3, 'Should not increase length for duplicate');
  });

  QUnit.test('Array.remove() removes existing element', function(assert) {
    var arr = [1, 2, 3, 4, 5];
    arr.remove(3);
    assert.equal(arr.length, 4, 'Should decrease length by 1');
    assert.notOk(arr.contains(3), 'Should not contain removed element');
  });

  QUnit.test('Array.remove() does nothing for non-existent element', function(assert) {
    var arr = [1, 2, 3];
    arr.remove(10);
    assert.equal(arr.length, 3, 'Should not change length for non-existent element');
  });

  QUnit.test('String.camelCase() converts to camelCase', function(assert) {
    assert.equal("hello world".camelCase(), "helloWorld",
      'Should convert "hello world" to "helloWorld"');
  });

  QUnit.test('String.camelCase() removes non-alphabetic characters', function(assert) {
    assert.equal("hello-world_123".camelCase(), "helloworld",
      'Should remove non-alphabetic characters and spaces');
  });

  QUnit.test('String.camelCase() handles multiple words', function(assert) {
    assert.equal("the quick brown fox".camelCase(), "theQuickBrownFox",
      'Should convert multiple words to camelCase');
  });
});
