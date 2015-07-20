import { moduleForModel, test } from "ember-qunit";

moduleForModel("game", "Unit | Model | game", {
  needs: ["model:board", "model:player", "model:spot"]
});

test("it exists", function (assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test("board relationships", function (assert) {
  assert.expect(0);

  // TODO
});

test("players aliases", function (assert) {
  assert.expect(0);

  // TODO
});
