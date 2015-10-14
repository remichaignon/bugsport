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

  var Piece = this.store().modelFor("piece"),
      relationship = Ember.get(Piece, "relationshipsByName").get("player");

  assert.equal(relationship.key, "player", "Piece's model has a player key.");
  assert.equal(relationship.kind, "belongsTo", "Piece's model's player key is of `belongsTo` kind.");
});

test("spot relationship", function (assert) {
  assert.expect(2);

  var Piece = this.store().modelFor("piece"),
      relationship = Ember.get(Piece, "relationshipsByName").get("spot");

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
  assert.expect(8);

  var model = this.subject(),
      store = this.store(),
      player;

  assert.ok(!model.get("isBlack"), "Neither black by default.");
  assert.ok(!model.get("isWhite"), "Nor white by default.");

  Ember.run(function () {
    player = store.createRecord("player");
    model.set("player", player);
  });
  assert.ok(!model.get("isBlack"), "Not black when empty player is set.");
  assert.ok(model.get("isWhite"), "White when empty player is set.");

  Ember.run(function () { player.set("isBlack", true); });
  assert.ok(model.get("isBlack"), "Black when player is set to black.");
  assert.ok(!model.get("isWhite"), "Not white when player is set to black.");

  Ember.run(function () { player.set("isBlack", false); });
  assert.ok(!model.get("isBlack"), "Not black when player is set to not black.");
  assert.ok(model.get("isWhite"), "White when player is set to not black.");
});

test("can go to", function (assert) {
  assert.expect(2);

  var model = this.subject(),
      store = this.store(),
      spotFrom,
      spotTo;

  Ember.run(function () {
    spotTo = store.createRecord("spot");

    model.setProperties({
      canMoveTo: function () { assert.ok(false, "`canMoveTo` should not be called."); },
      canDropTo: function () { assert.ok(true, "`canDropTo` called when the piece is not on a spot."); },
    });
  });
  model.canGoTo(spotTo);

  Ember.run(function () {
    spotFrom = store.createRecord("spot");

    model.setProperties({
      spot: spotFrom,
      canMoveTo: function () { assert.ok(true, "`canMoveTo` called when the piece is on a spot."); },
      canDropTo: function () { assert.ok(false, "`canDropTo` should not be called."); },
    });
  });
  model.canGoTo(spotTo);
});

test("can move to", function (assert) {
  assert.expect(6);

  var model = this.subject(),
      store = this.store(),
      spotFrom,
      spotTo;

  Ember.run(function () {
    spotTo = store.createRecord("spot");
    spotFrom = store.createRecord("spot");

    model.setProperties({
      spot: spotTo,
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "pawn",
      _canMovePawnTo: function () { assert.ok(true, "`_canMovePawnTo` called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "rook",
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(true, "`_canMoveRookTo` called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "knight",
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(true, "`_canMoveKnightTo` called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "bishop",
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(true, "`_canMoveBishopTo` called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "queen",
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(true, "`_canMoveQueenTo` called."); },
      _canMoveKingTo: function () { assert.ok(false, "`_canMoveKingTo` should not be called."); },
    });
  });
  model.canMoveTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "king",
      _canMovePawnTo: function () { assert.ok(false, "`_canMovePawnTo` should not be called."); },
      _canMoveRookTo: function () { assert.ok(false, "`_canMoveRookTo` should not be called."); },
      _canMoveKnightTo: function () { assert.ok(false, "`_canMoveKnightTo` should not be called."); },
      _canMoveBishopTo: function () { assert.ok(false, "`_canMoveBishopTo` should not be called."); },
      _canMoveQueenTo: function () { assert.ok(false, "`_canMoveQueenTo` should not be called."); },
      _canMoveKingTo: function () { assert.ok(true, "`_canMoveKingTo` called."); },
    });
  });
  model.canMoveTo(spotTo);
});

test("can drop to", function (assert) {
  assert.expect(6);

  var model = this.subject(),
      store = this.store(),
      spotFrom,
      spotTo;

  Ember.run(function () {
    spotTo = store.createRecord("spot");
    spotFrom = store.createRecord("spot");

    model.setProperties({
      spot: spotTo,
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "pawn",
      _canDropPawnTo: function () { assert.ok(true, "`_canDropPawnTo` called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "rook",
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(true, "`_canDropRookTo` called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "knight",
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(true, "`_canDropKnightTo` called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "bishop",
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(true, "`_canDropBishopTo` called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "queen",
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(true, "`_canDropQueenTo` called."); },
      _canDropKingTo: function () { assert.ok(false, "`_canDropKingTo` should not be called."); },
    });
  });
  model.canDropTo(spotTo);

  Ember.run(function () {
    model.setProperties({
      type: "king",
      _canDropPawnTo: function () { assert.ok(false, "`_canDropPawnTo` should not be called."); },
      _canDropRookTo: function () { assert.ok(false, "`_canDropRookTo` should not be called."); },
      _canDropKnightTo: function () { assert.ok(false, "`_canDropKnightTo` should not be called."); },
      _canDropBishopTo: function () { assert.ok(false, "`_canDropBishopTo` should not be called."); },
      _canDropQueenTo: function () { assert.ok(false, "`_canDropQueenTo` should not be called."); },
      _canDropKingTo: function () { assert.ok(true, "`_canDropKingTo` called."); },
    });
  });
  model.canDropTo(spotTo);
});

test("can move pawn to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can move rook to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can move knight to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can move bishop to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can move queen to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can move king to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop pawn to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop rook to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop knight to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop bishop to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop queen to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});

test("can drop king to", function (assert) {
  assert.expect(0);

  // TODO
  var model = this.subject();
});
