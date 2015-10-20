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
  assert.expect(4);

  var controller = this.subject(),
      store = controller.store,
      rook,
      knight,
      bishop,
      queen;
  assert.ok(!controller.get("selectedPiece"), "No selected piece by default.");

  Ember.run(function () {
    var game = store.createRecord("game");
    controller.set("model", game);

    var boardA = store.createRecord("board", { name: "A", game: game });
    var boardB = store.createRecord("board", { name: "B", game: game });

    var playerBlackBoardA = store.createRecord("player", { isBlack: true, board: boardA });
    var playerWhiteBoardA = store.createRecord("player", { isBlack: false, board: boardA });

    var playerBlackBoardB = store.createRecord("player", { isBlack: true, board: boardB });
    var playerWhiteBoardB = store.createRecord("player", { isBlack: false, board: boardB });

    rook = store.createRecord("piece", { type: "rook", player: playerBlackBoardA });
    bishop = store.createRecord("piece", { type: "bishop", player: playerBlackBoardB });
    knight = store.createRecord("piece", { type: "knight", player: playerWhiteBoardA });
    queen = store.createRecord("piece", { type: "queen", player: playerWhiteBoardB });
  });
  assert.ok(!controller.get("selectedPiece"), "No selected piece still.");

  Ember.run(function () { queen.set("selected", true); });
  assert.ok(controller.get("selectedPiece"), "A piece has been selected.");
  assert.equal(controller.get("selectedPiece.type"), "queen", "The selected piece is the queen.");
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
  assert.expect(5);

  var controller = this.subject(),
      store = controller.store,
      rook,
      knight,
      bishop,
      queen;
  assert.ok(!controller.get("selectedPiece"), "No selected piece by default.");

  Ember.run(function () {
    var game = store.createRecord("game");
    controller.set("model", game);

    var boardA = store.createRecord("board", { name: "A", game: game });
    var boardB = store.createRecord("board", { name: "B", game: game });

    var playerBlackBoardA = store.createRecord("player", { isBlack: true, board: boardA });
    var playerWhiteBoardA = store.createRecord("player", { isBlack: false, board: boardA });

    var playerBlackBoardB = store.createRecord("player", { isBlack: true, board: boardB });
    var playerWhiteBoardB = store.createRecord("player", { isBlack: false, board: boardB });

    rook = store.createRecord("piece", { type: "rook", player: playerBlackBoardA });
    bishop = store.createRecord("piece", { type: "bishop", player: playerBlackBoardB });
    knight = store.createRecord("piece", { type: "knight", player: playerWhiteBoardA });
    queen = store.createRecord("piece", { type: "queen", player: playerWhiteBoardB });
  });
  assert.ok(!controller.get("selectedPiece"), "No selected piece still.");

  Ember.run(function () { queen.set("selected", true); });
  assert.ok(controller.get("selectedPiece"), "A piece has been selected.");
  assert.equal(controller.get("selectedPiece.type"), "queen", "The selected piece is the queen.");

  Ember.run(function () { controller._unselectAllPieces(); });
  assert.ok(!controller.get("selectedPiece"), "No selected piece anymore.");
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
