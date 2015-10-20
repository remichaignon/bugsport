import Ember from "ember";
import { moduleFor, test } from "ember-qunit";

moduleFor("controller:game", {
  needs: ["model:board", "model:game", "model:piece", "model:player", "model:spot", "model:user"]
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

test("move piece to", function (assert) {
  assert.expect(13);

  var controller = this.subject(),
      store = controller.store,
      piece,
      spotA,
      spotB;

  Ember.run(function () {
    piece = store.createRecord("piece", {
      id: "piece",
      save: function () { assert.ok(true, "Piece has been saved."); }
    });
    spotA = store.createRecord("spot", {
      id: "spotA",
      save: function () { assert.ok(true, "Spot A has been saved."); }
    });
    spotB = store.createRecord("spot", {
      id: "spotB",
      save: function () { assert.ok(true, "Spot B has been saved."); }
    });
  });
  assert.ok(!piece.get("spot.id"), "Piece has no spot.");
  assert.ok(!spotA.get("piece.id"), "Spot A has no piece.");
  assert.ok(!spotB.get("piece.id"), "Spot B has no piece.");

  Ember.run(function () { controller._movePieceTo(piece, spotA); });
  assert.equal(piece.get("spot.id"), spotA.get("id"), "Piece is on spot A.");
  assert.equal(spotA.get("piece.id"), piece.get("id"), "Spot A has piece.");
  assert.ok(!spotB.get("piece.id"), "Spot B still has no piece.");

  Ember.run(function () { controller._movePieceTo(piece, spotB); });
  assert.equal(piece.get("spot.id"), spotB.get("id"), "Piece is on spot B.");
  assert.ok(!spotA.get("piece.id"), "Spot A no longer has piece.");
  assert.equal(spotB.get("piece.id"), piece.get("id"), "Spot B has piece.");
});
