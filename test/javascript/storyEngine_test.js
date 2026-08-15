// Tests for StoryEngine - pure story traversal and text rendering
// Zero DOM, zero jQuery — only pure functions are tested here.

import { loadSourceFile } from './helpers/load_source.js';
loadSourceFile('aux');
loadSourceFile('storyModel');
loadSourceFile('storyEngine');

// Minimal StoryModel.Stitch factory for tests
function makeStitch(text, opts) {
  opts = opts || {};
  var stitch = new StoryModel.Stitch(text);
  stitch._ifConditions    = opts.ifConditions    || [];
  stitch._notIfConditions = opts.notIfConditions || [];
  stitch._flags           = opts.flags           || [];
  stitch.divertStitch     = opts.divert          || null;
  stitch.options          = opts.options         || [];
  stitch._pageNumberHeader = opts.pageNumber     || 0;
  stitch._runOn           = opts.runOn           || false;
  stitch._image           = opts.image           || false;
  return stitch;
}

QUnit.module('StoryEngine', function(hooks) {
  var engine;

  hooks.beforeEach(function() {
    global.$ = { trim: function(s) { return s.trim(); } };
    global.hasStorage = false;
    StoryModel.clear();
    StoryModel.initialStitch = null;
    engine = new StoryEngine();
  });

  QUnit.module('buildChunk()', function() {

    QUnit.test('returns isEnd:true and empty state when fromStitch is null', function(assert) {
      var result = engine.buildChunk(null, []);
      assert.equal(result.isEnd, true, 'isEnd should be true');
      assert.equal(result.stitches.length, 0, 'stitches should be empty');
      assert.equal(result.wordCount, 0, 'wordCount should be 0');
    });

    QUnit.test('collects a single stitch with no divert', function(assert) {
      var s = makeStitch('Hello world.');
      var result = engine.buildChunk(s, []);
      assert.equal(result.stitches.length, 1, 'should have one stitch');
      assert.equal(result.stitches[0], s, 'should be the stitch passed in');
      assert.equal(result.isEnd, true, 'no options means isEnd');
      assert.ok(result.html.indexOf('Hello world') > -1, 'html should contain stitch text');
    });

    QUnit.test('follows divert chain and collects all stitches', function(assert) {
      var s2 = makeStitch('Second.');
      var s1 = makeStitch('First.', { divert: s2 });
      s1.divertStitch = s2;
      var result = engine.buildChunk(s1, []);
      assert.equal(result.stitches.length, 2, 'should follow divert and collect both stitches');
      assert.equal(result.stitches[0], s1);
      assert.equal(result.stitches[1], s2);
    });

    QUnit.test('skips stitch text when ifCondition is not met', function(assert) {
      var s = makeStitch('Conditional text.', { ifConditions: ['secret_flag'] });
      var result = engine.buildChunk(s, []);  // no flags collected
      assert.ok(result.html.indexOf('Conditional text') === -1, 'text should be absent when condition not met');
    });

    QUnit.test('includes stitch text when ifCondition is met', function(assert) {
      var s = makeStitch('Conditional text.', { ifConditions: ['secret_flag'] });
      var flags = [{ flagName: 'secret_flag', value: true }];
      var result = engine.buildChunk(s, flags);
      assert.ok(result.html.indexOf('Conditional text') > -1, 'text should appear when condition is met');
    });

    QUnit.test('collects flags from stitches and mutates flagsCollected', function(assert) {
      var s = makeStitch('You found it.', { flags: ['found_key'] });
      var result = engine.buildChunk(s, []);
      var keyFlag = result.flags.filter(function(f) { return f.flagName === 'found_key'; });
      assert.equal(keyFlag.length, 1, 'found_key should be in collected flags');
      assert.equal(keyFlag[0].value, true);
    });

    QUnit.test('flags set in chunk affect condition evaluation for later stitches in same chunk', function(assert) {
      var s2 = makeStitch('Unlocked.', { ifConditions: ['door_open'] });
      var s1 = makeStitch('You opened the door.', { flags: ['door_open'], divert: s2 });
      s1.divertStitch = s2;
      var result = engine.buildChunk(s1, []);
      assert.ok(result.html.indexOf('Unlocked') > -1, 'second stitch should be visible after flag set by first');
    });

    QUnit.test('inherits flags from prevFlags', function(assert) {
      var s = makeStitch('Welcome back.', { ifConditions: ['returning'] });
      var prevFlags = [{ flagName: 'returning', value: true }];
      var result = engine.buildChunk(s, prevFlags);
      assert.ok(result.html.indexOf('Welcome back') > -1, 'inherited flag should satisfy condition');
    });

    QUnit.test('does not mutate the prevFlags array passed in', function(assert) {
      var s = makeStitch('Set something.', { flags: ['new_flag'] });
      var prevFlags = [{ flagName: 'old_flag', value: true }];
      engine.buildChunk(s, prevFlags);
      assert.equal(prevFlags.length, 1, 'prevFlags should not be mutated');
    });

    QUnit.test('marks hadSectionHeading when stitch has a page number label', function(assert) {
      var s = makeStitch('Chapter start.', { pageNumber: 1 });
      var result = engine.buildChunk(s, []);
      assert.equal(result.hadSectionHeading, true);
    });

    QUnit.test('wordCount is greater than zero for non-empty text', function(assert) {
      var s = makeStitch('The quick brown fox.');
      var result = engine.buildChunk(s, []);
      assert.ok(result.wordCount > 0, 'wordCount should be positive');
    });

  });

  QUnit.module('buildOptions()', function() {

    QUnit.test('returns empty array when last stitch has no options', function(assert) {
      var s = makeStitch('Dead end.');
      var result = engine.buildOptions([s], []);
      assert.equal(result.length, 0);
    });

    QUnit.test('returns one descriptor per option', function(assert) {
      var s = makeStitch('Choose.');
      var opt1 = new StoryModel.Option(s);
      opt1._text = 'Go left';
      var opt2 = new StoryModel.Option(s);
      opt2._text = 'Go right';
      s.options = [opt1, opt2];
      var result = engine.buildOptions([s], []);
      assert.equal(result.length, 2);
    });

    QUnit.test('marks option valid:false when ifCondition not met', function(assert) {
      var s = makeStitch('Choose.');
      var opt = new StoryModel.Option(s);
      opt._text = 'Secret path';
      opt._ifConditions = ['has_key'];
      s.options = [opt];
      var result = engine.buildOptions([s], []);
      assert.equal(result[0].valid, false);
    });

    QUnit.test('marks option valid:true when ifCondition is met', function(assert) {
      var s = makeStitch('Choose.');
      var opt = new StoryModel.Option(s);
      opt._text = 'Secret path';
      opt._ifConditions = ['has_key'];
      s.options = [opt];
      var flags = [{ flagName: 'has_key', value: true }];
      var result = engine.buildOptions([s], flags);
      assert.equal(result[0].valid, true);
    });

  });

  QUnit.module('renderText()', function() {

    QUnit.test('returns plain text unchanged when no markup', function(assert) {
      var result = engine.renderText('Hello world.', []);
      assert.ok(result.indexOf('Hello world') > -1);
    });

    QUnit.test('{flag: yes|no} outputs yes-branch when flag is set', function(assert) {
      var flags = [{ flagName: 'brave', value: true }];
      var result = engine.renderText('You are {brave: courageous|cowardly}.', flags);
      assert.ok(result.indexOf('courageous') > -1, 'yes branch should appear');
      assert.ok(result.indexOf('cowardly') === -1, 'no branch should not appear');
    });

    QUnit.test('{flag: yes|no} outputs no-branch when flag is not set', function(assert) {
      var result = engine.renderText('You are {brave: courageous|cowardly}.', []);
      assert.ok(result.indexOf('cowardly') > -1, 'no branch should appear');
      assert.ok(result.indexOf('courageous') === -1, 'yes branch should not appear');
    });

    QUnit.test('*-bold-* renders as <b>', function(assert) {
      var result = engine.renderText('This is *-important-* news.', []);
      assert.ok(result.indexOf('<b>important</b>') > -1);
    });

    QUnit.test('/=italic=/ renders as <i>', function(assert) {
      var result = engine.renderText('A /=gentle=/ breeze.', []);
      assert.ok(result.indexOf('<i>gentle</i>') > -1);
    });

    QUnit.test('[...] ellipsis conjunctive is stripped', function(assert) {
      var result = engine.renderText('She waited[...] and then spoke.', []);
      assert.ok(result.indexOf('[...]') === -1);
    });

  });

  QUnit.module('renderChunk()', function() {

    QUnit.test('wraps output in a stitch div', function(assert) {
      var result = engine.renderChunk('Some text.');
      assert.ok(result.indexOf("<div class='stitch'>") > -1);
    });

    QUnit.test('[url|label] syntax becomes an anchor tag', function(assert) {
      var result = engine.renderChunk('[http://example.com|click here]');
      assert.ok(result.indexOf('<a href="http://example.com">click here</a>') > -1);
    });

    QUnit.test('double-quoted text gets curly quotes', function(assert) {
      var result = engine.renderChunk('"Hello"');
      assert.ok(result.indexOf('“') > -1, 'should have left double quote');
      assert.ok(result.indexOf('”') > -1, 'should have right double quote');
    });

  });

  QUnit.module('getSavedGame()', function() {

    QUnit.test('returns [initialStitch] when localStorage is unavailable', function(assert) {
      global.hasStorage = false;
      var s = makeStitch('Start.');
      StoryModel.initialStitch = s;
      StoryModel.stitches = [s];
      var result = engine.getSavedGame();
      assert.equal(result.length, 1);
      assert.equal(result[0], s);
    });

  });

});
