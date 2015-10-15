import Ember from "ember";
import { moduleFor, test } from "ember-qunit";

moduleFor("controller:game", {
  needs: ["model:board", "model:game"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var controller = this.subject();
  assert.ok(controller);
});

test("selected piece", function (assert) {
  assert.expect(1);

  // TODO
  var controller = this.subject();
  assert.ok(!controller.get("selectedPiece"), "No selected piece by default.");

  // ...
});

test("select piece", function (assert) {
  assert.expect(0);

  // TODO
  var controller = this.subject();
});

test("select move", function (assert) {
  assert.expect(0);

  // TODO
  var controller = this.subject();
});


test("unselect all pieces", function (assert) {
  assert.expect(0);

  // TODO
  var controller = this.subject();
});

test("capture piece and pass it to partner", function (assert) {
  assert.expect(0);

  // TODO
  var controller = this.subject();
});

test("end game", function (assert) {
  assert.expect(2);

  var controller = this.subject(),
      store = controller.store,
      game;

  Ember.run(function () {
    game = store.createRecord("game", { save: function () { return; } });
  });
  assert.ok(!game.get("isOver"), "Game is still on.");

  Ember.run(function () { controller._endGame(game); });
  assert.ok(game.get("isOver"), "Game is over.");
});

test("move piece to", function (assert) {
  assert.expect(0);

  // TODO
  var controller = this.subject();
});
