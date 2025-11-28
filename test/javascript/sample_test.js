// Sample QUnit test to verify testing framework setup
// QUnit provides global functions: test, module, etc.

QUnit.test('QUnit is working', function(assert) {
  assert.ok(true, 'QUnit test framework is properly configured');
});

QUnit.test('Basic arithmetic', function(assert) {
  assert.equal(1 + 1, 2, 'Addition works correctly');
  assert.equal(5 - 3, 2, 'Subtraction works correctly');
});
