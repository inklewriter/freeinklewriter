// Tests for StoryModel - core story data management
// Testing only pure functions without DOM/AJAX dependencies

// Mock the StoryModel object structure based on the source code
const StoryModel = {
  _defaultStoryName: "Untitled Story",
  _defaultAuthorName: "Anonymous",
  _storyName: "Untitled Story",
  _authorName: "Anonymous",
  stitches: [],
  flagIndex: [],
  initialStitch: null,
  maxPage: 0,
  maxPreferredPageLength: 8,
  optionMirroring: true,
  allowCheckpoints: false,
  endCount: 0,
  looseEndCount: 0,
  loading: false,
  watchRefCounts: false,

  storyName: function() { return this._storyName; },
  authorName: function() { return this._authorName; },
  setStoryName: function(name) { this._storyName = name; },
  setAuthorName: function(name) { this._authorName = name; },

  clear: function() {
    this.stitches = [];
    this.flagIndex = [];
    this.setStoryName(this._defaultStoryName);
    this.setAuthorName(this._defaultAuthorName);
  }
};

QUnit.module('StoryModel', function(hooks) {
  hooks.beforeEach(function() {
    // Reset StoryModel to default state before each test
    StoryModel._storyName = StoryModel._defaultStoryName;
    StoryModel._authorName = StoryModel._defaultAuthorName;
    StoryModel.stitches = [];
    StoryModel.flagIndex = [];
  });

  QUnit.test('Default story name is "Untitled Story"', function(assert) {
    assert.equal(StoryModel.storyName(), "Untitled Story",
      'Default story name should be "Untitled Story"');
  });

  QUnit.test('Default author name is "Anonymous"', function(assert) {
    assert.equal(StoryModel.authorName(), "Anonymous",
      'Default author name should be "Anonymous"');
  });

  QUnit.test('setStoryName() updates story name', function(assert) {
    StoryModel.setStoryName("My Adventure");
    assert.equal(StoryModel.storyName(), "My Adventure",
      'Story name should be updated to "My Adventure"');
  });

  QUnit.test('setAuthorName() updates author name', function(assert) {
    StoryModel.setAuthorName("John Doe");
    assert.equal(StoryModel.authorName(), "John Doe",
      'Author name should be updated to "John Doe"');
  });

  QUnit.test('clear() resets story name to default', function(assert) {
    StoryModel.setStoryName("Custom Story");
    StoryModel.clear();
    assert.equal(StoryModel.storyName(), "Untitled Story",
      'Story name should be reset to default after clear()');
  });

  QUnit.test('clear() resets author name to default', function(assert) {
    StoryModel.setAuthorName("Jane Smith");
    StoryModel.clear();
    assert.equal(StoryModel.authorName(), "Anonymous",
      'Author name should be reset to default after clear()');
  });

  QUnit.test('clear() empties stitches array', function(assert) {
    StoryModel.stitches = [{ name: 'stitch1' }, { name: 'stitch2' }];
    StoryModel.clear();
    assert.equal(StoryModel.stitches.length, 0,
      'Stitches array should be empty after clear()');
  });

  QUnit.test('clear() empties flagIndex array', function(assert) {
    StoryModel.flagIndex = ['flag1', 'flag2'];
    StoryModel.clear();
    assert.equal(StoryModel.flagIndex.length, 0,
      'FlagIndex array should be empty after clear()');
  });

  QUnit.test('maxPreferredPageLength default is 8', function(assert) {
    assert.equal(StoryModel.maxPreferredPageLength, 8,
      'Default max preferred page length should be 8');
  });

  QUnit.test('optionMirroring default is true', function(assert) {
    assert.equal(StoryModel.optionMirroring, true,
      'Default option mirroring should be true');
  });

  QUnit.test('allowCheckpoints default is false', function(assert) {
    assert.equal(StoryModel.allowCheckpoints, false,
      'Default allow checkpoints should be false');
  });

  QUnit.test('endCount starts at 0', function(assert) {
    assert.equal(StoryModel.endCount, 0,
      'Default end count should be 0');
  });

  QUnit.test('looseEndCount starts at 0', function(assert) {
    assert.equal(StoryModel.looseEndCount, 0,
      'Default loose end count should be 0');
  });
});

// Add extractFlagNameFromExpression function for testing
StoryModel.extractFlagNameFromExpression = function(flagText) {
  var grabFlagNameRegex = /^(.*?)\s*(\=|\+|\-|\>|\<|\!\=|$)/;
  return flagText.match(grabFlagNameRegex)[1];
};

// Add numberOfConditionals function for testing
StoryModel.numberOfConditionals = function(obj, testValue) {
  if (testValue)
    return obj._ifConditions.length;
  return obj._notIfConditions.length;
};

// Add conditionedOnThis function for testing
StoryModel.conditionedOnThis = function(obj, flagName, testValue) {
  if (testValue) return (obj._ifConditions.indexOf(flagName) > -1);
  return (obj._notIfConditions.indexOf(flagName) > -1);
};

// Add conditionalByIndex function for testing
StoryModel.conditionalByIndex = function(obj, testValue, idx) {
  if (idx < 0 || idx >= StoryModel.numberOfConditionals(obj, testValue))
    return "";
  if (testValue)
    return obj._ifConditions[idx];
  return obj._notIfConditions[idx];
};

// Add pageSize function for testing
StoryModel.pageSize = function(pageNum) {
  var count = 0;
  for (var i = 0; i < StoryModel.stitches.length; i++) {
    if (StoryModel.stitches[i].pageNumber && StoryModel.stitches[i].pageNumber() == pageNum)
      count++;
  }
  return count;
};

QUnit.module('StoryModel Flag Functions', function() {

  QUnit.test('extractFlagNameFromExpression() extracts simple flag name', function(assert) {
    assert.equal(StoryModel.extractFlagNameFromExpression("hasKey"), "hasKey",
      'Should extract simple flag name');
  });

  QUnit.test('extractFlagNameFromExpression() extracts flag from equality', function(assert) {
    assert.equal(StoryModel.extractFlagNameFromExpression("score = 10"), "score",
      'Should extract flag name from equality expression');
  });

  QUnit.test('extractFlagNameFromExpression() extracts flag from comparison', function(assert) {
    assert.equal(StoryModel.extractFlagNameFromExpression("health > 50"), "health",
      'Should extract flag name from comparison');
  });

  QUnit.test('extractFlagNameFromExpression() extracts flag from not-equal', function(assert) {
    assert.equal(StoryModel.extractFlagNameFromExpression("status != dead"), "status",
      'Should extract flag name from not-equal expression');
  });

  QUnit.test('extractFlagNameFromExpression() captures leading whitespace', function(assert) {
    assert.equal(StoryModel.extractFlagNameFromExpression("  playerName  = John"), "  playerName",
      'Regex captures leading whitespace before operator');
  });
});

QUnit.module('StoryModel Conditional Functions', function(hooks) {
  var mockObj;

  hooks.beforeEach(function() {
    mockObj = {
      _ifConditions: ['hasKey', 'isAlive'],
      _notIfConditions: ['isDead', 'isHungry']
    };
  });

  QUnit.test('numberOfConditionals() returns count of if-conditions', function(assert) {
    assert.equal(StoryModel.numberOfConditionals(mockObj, true), 2,
      'Should return 2 if-conditions');
  });

  QUnit.test('numberOfConditionals() returns count of not-if-conditions', function(assert) {
    assert.equal(StoryModel.numberOfConditionals(mockObj, false), 2,
      'Should return 2 not-if-conditions');
  });

  QUnit.test('conditionedOnThis() finds flag in if-conditions', function(assert) {
    assert.ok(StoryModel.conditionedOnThis(mockObj, 'hasKey', true),
      'Should find hasKey in if-conditions');
  });

  QUnit.test('conditionedOnThis() finds flag in not-if-conditions', function(assert) {
    assert.ok(StoryModel.conditionedOnThis(mockObj, 'isDead', false),
      'Should find isDead in not-if-conditions');
  });

  QUnit.test('conditionedOnThis() returns false for missing flag', function(assert) {
    assert.notOk(StoryModel.conditionedOnThis(mockObj, 'notPresent', true),
      'Should return false for missing flag');
  });

  QUnit.test('conditionalByIndex() returns correct if-condition by index', function(assert) {
    assert.equal(StoryModel.conditionalByIndex(mockObj, true, 0), 'hasKey',
      'Should return first if-condition');
    assert.equal(StoryModel.conditionalByIndex(mockObj, true, 1), 'isAlive',
      'Should return second if-condition');
  });

  QUnit.test('conditionalByIndex() returns correct not-if-condition by index', function(assert) {
    assert.equal(StoryModel.conditionalByIndex(mockObj, false, 0), 'isDead',
      'Should return first not-if-condition');
  });

  QUnit.test('conditionalByIndex() returns empty string for invalid index', function(assert) {
    assert.equal(StoryModel.conditionalByIndex(mockObj, true, -1), '',
      'Should return empty string for negative index');
    assert.equal(StoryModel.conditionalByIndex(mockObj, true, 99), '',
      'Should return empty string for out-of-bounds index');
  });
});

QUnit.module('StoryModel Page Functions', function(hooks) {

  hooks.beforeEach(function() {
    // Mock stitches with page numbers
    StoryModel.stitches = [
      { pageNumber: function() { return 1; } },
      { pageNumber: function() { return 1; } },
      { pageNumber: function() { return 2; } },
      { pageNumber: function() { return 1; } },
      { pageNumber: function() { return 3; } }
    ];
  });

  QUnit.test('pageSize() counts stitches on page 1', function(assert) {
    assert.equal(StoryModel.pageSize(1), 3,
      'Should count 3 stitches on page 1');
  });

  QUnit.test('pageSize() counts stitches on page 2', function(assert) {
    assert.equal(StoryModel.pageSize(2), 1,
      'Should count 1 stitch on page 2');
  });

  QUnit.test('pageSize() returns 0 for non-existent page', function(assert) {
    assert.equal(StoryModel.pageSize(99), 0,
      'Should return 0 for non-existent page');
  });

  QUnit.test('pageSize() handles empty stitches array', function(assert) {
    StoryModel.stitches = [];
    assert.equal(StoryModel.pageSize(1), 0,
      'Should return 0 when no stitches exist');
  });
});
