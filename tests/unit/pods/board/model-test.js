import { moduleForModel, test } from "ember-qunit";

moduleForModel("board", "Unit | Model | board", {
  needs: ["model:game", "model:piece", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test("game relationship", function (assert) {
  assert.expect(0);

  // TODO
});

test("players relationship", function (assert) {
  assert.expect(0);

  // TODO
});

test("spots relationship", function (assert) {
  assert.expect(0);

  // TODO
});

test("other board", function (assert) {
  assert.expect(0);

  // TODO
});

test("available pieces", function (assert) {
  assert.expect(0);

  // TODO
});

test("pieces on board", function (assert) {
  assert.expect(0);

  // TODO
});
