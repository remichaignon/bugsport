import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("piece", "Unit | Model | piece", {
  needs: ["model:board", "model:game", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var model = this.subject();
  assert.ok(!!model);
});

test("player relationship", function (assert) {
  assert.expect(2);

  var Piece = this.store().modelFor("piece");
  var relationship = Ember.get(Piece, "relationshipsByName").get("player");

  assert.equal(relationship.key, "player", "Piece's model has a player key.");
  assert.equal(relationship.kind, "belongsTo", "Piece's model's player key is of `belongsTo` kind.");
});

test("spot relationship", function (assert) {
  assert.expect(2);

  var Piece = this.store().modelFor("piece");
  var relationship = Ember.get(Piece, "relationshipsByName").get("spot");

  assert.equal(relationship.key, "spot", "Piece's model has a spot key.");
  assert.equal(relationship.kind, "belongsTo", "Piece's model's spot key is of `belongsTo` kind.");
});

test("type", function (assert) {
  assert.expect(48);

  var model = this.subject();
  assert.ok(!model.get("isPawn"), "Piece is not a pawn by default.");
  assert.ok(!model.get("isKnight"), "Piece is not a knight by default.");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop by default.");
  assert.ok(!model.get("isRook"), "Piece is not a rook by default.");
  assert.ok(!model.get("isQueen"), "Piece is not a queen by default.");
  assert.ok(!model.get("isKing"), "Piece is not a king by default.");

  Ember.run(function () { model.set("type", "pawn"); });
  assert.ok(model.get("isPawn"), "Piece is a pawn.");
  assert.ok(!model.get("isKnight"), "Piece is not a knight (pawn).");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop (pawn).");
  assert.ok(!model.get("isRook"), "Piece is not a rook (pawn).");
  assert.ok(!model.get("isQueen"), "Piece is not a queen (pawn).");
  assert.ok(!model.get("isKing"), "Piece is not a king (pawn).");

  Ember.run(function () { model.set("type", "knight"); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn (knight).");
  assert.ok(model.get("isKnight"), "Piece is a knight.");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop (knight).");
  assert.ok(!model.get("isRook"), "Piece is not a rook (knight).");
  assert.ok(!model.get("isQueen"), "Piece is not a queen (knight).");
  assert.ok(!model.get("isKing"), "Piece is not a king (knight).");

  Ember.run(function () { model.set("type", "bishop"); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn (bishop).");
  assert.ok(!model.get("isKnight"), "Piece is not a knight (bishop).");
  assert.ok(model.get("isBishop"), "Piece is a bishop.");
  assert.ok(!model.get("isRook"), "Piece is not a rook (bishop).");
  assert.ok(!model.get("isQueen"), "Piece is not a queen (bishop).");
  assert.ok(!model.get("isKing"), "Piece is not a king (bishop).");

  Ember.run(function () { model.set("type", "rook"); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn (rook).");
  assert.ok(!model.get("isKnight"), "Piece is not a knight (rook).");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop (rook).");
  assert.ok(model.get("isRook"), "Piece is a rook.");
  assert.ok(!model.get("isQueen"), "Piece is not a queen (rook).");
  assert.ok(!model.get("isKing"), "Piece is not a king (rook).");

  Ember.run(function () { model.set("type", "queen"); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn (queen).");
  assert.ok(!model.get("isKnight"), "Piece is not a knight (queen).");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop (queen).");
  assert.ok(!model.get("isRook"), "Piece is not a rook (queen).");
  assert.ok(model.get("isQueen"), "Piece is a queen.");
  assert.ok(!model.get("isKing"), "Piece is not a king (queen).");

  Ember.run(function () { model.set("type", "king"); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn (king).");
  assert.ok(!model.get("isKnight"), "Piece is not a knight (king).");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop (king).");
  assert.ok(!model.get("isRook"), "Piece is not a rook (king).");
  assert.ok(!model.get("isQueen"), "Piece is not a queen (king).");
  assert.ok(model.get("isKing"), "Piece is a king.");

  Ember.run(function () { model.set("type", ""); });
  assert.ok(!model.get("isPawn"), "Piece is not a pawn.");
  assert.ok(!model.get("isKnight"), "Piece is not a knight.");
  assert.ok(!model.get("isBishop"), "Piece is not a bishop.");
  assert.ok(!model.get("isRook"), "Piece is not a rook.");
  assert.ok(!model.get("isQueen"), "Piece is not a queen.");
  assert.ok(!model.get("isKing"), "Piece is not a king.");
});

test("board", function (assert) {
  assert.expect(3);

  var model = this.subject(),
      store = this.store(),
      board = null;

  assert.ok(!model.get("board"), "No board by default.");

  Ember.run(function () {
    board = store.createRecord("board", { value: "37" });

    var spot = store.createRecord("spot", { board: board });
    model.set("spot", spot);
  });
  assert.equal(model.get("board.value"), board.get("value"), "Same board.");

  Ember.run(function () {
    model.set("spot", null);
  });
  assert.ok(!model.get("board"), "No more board.");
});

test("color", function (assert) {
  assert.expect(0);

  // TODO
});
