import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("game", "Unit | Model | game", {
  needs: ["model:board", "model:piece", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var model = this.subject();
  assert.ok(!!model);
});

test("board relationship", function (assert) {
  assert.expect(2);

  var Game = this.store().modelFor("game"),
      relationship = Ember.get(Game, "relationshipsByName").get("boards");

  assert.equal(relationship.key, "boards", "Game's model has a boards key.");
  assert.equal(relationship.kind, "hasMany", "Game's model's boards key is of `hasMany` kind.");
});

test("board A", function (assert) {
  assert.expect(3);

  var model = this.subject(),
      store = this.store(),
      board = null;

  assert.ok(!model.get("boardA"), "No board A by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "A" });

    model.get("boards").addObject(board);
  });
  assert.equal(model.get("boardA"), board, "Same board.");

  Ember.run(function () { board.set("name", "B"); });
  assert.notEqual(model.get("boardA"), board, "Not the same board.");
});

test("board B", function (assert) {
  assert.expect(3);

  var model = this.subject(),
      store = this.store(),
      board = null;

  assert.ok(!model.get("boardB"), "No board B by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "B" });

    model.get("boards").addObject(board);
  });
  assert.equal(model.get("boardB"), board, "Same board.");

  Ember.run(function () { board.set("name", "A"); });
  assert.notEqual(model.get("boardB"), board, "Not the same board.");
});

test("all pieces", function (assert) {
  assert.expect(1);

  // TODO
  var model = this.subject(),
      store = this.store();

  //assert.equal(model.get("allPieces.length"), 0, "No pieces.");

  Ember.run(function () {
    var boardA = store.createRecord("board", { name: "A", game: model });
    var boardB = store.createRecord("board", { name: "B", game: model });
    model.get("boards").pushObjects([boardA, boardB]);

    var playerBlackBoardA = store.createRecord("player", { isBlack: true, board: boardA });
    var playerWhiteBoardA = store.createRecord("player", { isBlack: false, board: boardA });
    boardA.get("players").pushObjects([playerBlackBoardA, playerWhiteBoardA]);
    var playerBlackBoardB = store.createRecord("player", { isBlack: true, board: boardB });
    var playerWhiteBoardB = store.createRecord("player", { isBlack: false, board: boardB });
    boardB.get("players").pushObjects([playerBlackBoardB, playerWhiteBoardB]);

    var rook = store.createRecord("piece", { type: "rook", player: playerBlackBoardA });
    playerBlackBoardA.get("pieces").pushObject(rook);
    var knight = store.createRecord("piece", { type: "knight", player: playerWhiteBoardA });
    playerWhiteBoardA.get("pieces").pushObject(knight);
    var bishop = store.createRecord("piece", { type: "bishop", player: playerBlackBoardB });
    playerBlackBoardB.get("pieces").pushObject(bishop);
    var queen = store.createRecord("piece", { type: "queen", player: playerWhiteBoardB });
    playerWhiteBoardB.get("pieces").pushObject(queen);
  });
  assert.equal(model.get("allPieces").mapBy("type").join(","), "rook,knight,bishop,queen", "All pieces present and in correct order.");
});
