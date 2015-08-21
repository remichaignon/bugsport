import Ember from "ember";
import { moduleFor, test } from "ember-qunit";

moduleFor("route:games/new", "Unit | Route | games/new", {
  needs: ["model:board", "model:game", "model:piece", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var route = this.subject();
  assert.ok(route);
});

test("model", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("after model", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("create boards for game", function (assert) {
  assert.expect(5);

  var route = this.subject(),
      store = route.store,
      game,
      boards;

  Ember.run(function () {
    game = store.createRecord("game");
    boards = route._createBoardsForGame(store, game);
  });
  assert.equal(boards.length, 2, "2 records were created.");
  assert.equal(boards.filterBy("constructor.typeKey", "board").length, 2, "Both are of `board` type.");
  assert.equal(boards.filterBy("name", "A").length, 1, "1 board with name `A`.");
  assert.equal(boards.filterBy("name", "B").length, 1, "1 board with name `B`.");
  assert.equal(boards.filterBy("game.content", game).length, 2, "All boards have the correct game.");
});

test("create spots for board", function (assert) {
  assert.expect(67);

  var route = this.subject(),
      store = route.store,
      board,
      spots;

  Ember.run(function () {
    board = store.createRecord("board");
    spots = route._createSpotsForBoard(store, board);
  });
  assert.equal(spots.length, 64, "64 records were created.");
  assert.equal(spots.filterBy("constructor.typeKey", "spot").length, 64, "All are of `spot` type.");
  assert.equal(spots.filterBy("name", "A1").length, 1, "1 spot with name `A1`.");
  assert.equal(spots.filterBy("name", "A2").length, 1, "1 spot with name `A2`.");
  assert.equal(spots.filterBy("name", "A3").length, 1, "1 spot with name `A3`.");
  assert.equal(spots.filterBy("name", "A4").length, 1, "1 spot with name `A4`.");
  assert.equal(spots.filterBy("name", "A5").length, 1, "1 spot with name `A5`.");
  assert.equal(spots.filterBy("name", "A6").length, 1, "1 spot with name `A6`.");
  assert.equal(spots.filterBy("name", "A7").length, 1, "1 spot with name `A7`.");
  assert.equal(spots.filterBy("name", "A8").length, 1, "1 spot with name `A8`.");
  assert.equal(spots.filterBy("name", "B1").length, 1, "1 spot with name `B1`.");
  assert.equal(spots.filterBy("name", "B2").length, 1, "1 spot with name `B2`.");
  assert.equal(spots.filterBy("name", "B3").length, 1, "1 spot with name `B3`.");
  assert.equal(spots.filterBy("name", "B4").length, 1, "1 spot with name `B4`.");
  assert.equal(spots.filterBy("name", "B5").length, 1, "1 spot with name `B5`.");
  assert.equal(spots.filterBy("name", "B6").length, 1, "1 spot with name `B6`.");
  assert.equal(spots.filterBy("name", "B7").length, 1, "1 spot with name `B7`.");
  assert.equal(spots.filterBy("name", "B8").length, 1, "1 spot with name `B8`.");
  assert.equal(spots.filterBy("name", "C1").length, 1, "1 spot with name `C1`.");
  assert.equal(spots.filterBy("name", "C2").length, 1, "1 spot with name `C2`.");
  assert.equal(spots.filterBy("name", "C3").length, 1, "1 spot with name `C3`.");
  assert.equal(spots.filterBy("name", "C4").length, 1, "1 spot with name `C4`.");
  assert.equal(spots.filterBy("name", "C5").length, 1, "1 spot with name `C5`.");
  assert.equal(spots.filterBy("name", "C6").length, 1, "1 spot with name `C6`.");
  assert.equal(spots.filterBy("name", "C7").length, 1, "1 spot with name `C7`.");
  assert.equal(spots.filterBy("name", "C8").length, 1, "1 spot with name `C8`.");
  assert.equal(spots.filterBy("name", "D1").length, 1, "1 spot with name `D1`.");
  assert.equal(spots.filterBy("name", "D2").length, 1, "1 spot with name `D2`.");
  assert.equal(spots.filterBy("name", "D3").length, 1, "1 spot with name `D3`.");
  assert.equal(spots.filterBy("name", "D4").length, 1, "1 spot with name `D4`.");
  assert.equal(spots.filterBy("name", "D5").length, 1, "1 spot with name `D5`.");
  assert.equal(spots.filterBy("name", "D6").length, 1, "1 spot with name `D6`.");
  assert.equal(spots.filterBy("name", "D7").length, 1, "1 spot with name `D7`.");
  assert.equal(spots.filterBy("name", "D8").length, 1, "1 spot with name `D8`.");
  assert.equal(spots.filterBy("name", "E1").length, 1, "1 spot with name `E1`.");
  assert.equal(spots.filterBy("name", "E2").length, 1, "1 spot with name `E2`.");
  assert.equal(spots.filterBy("name", "E3").length, 1, "1 spot with name `E3`.");
  assert.equal(spots.filterBy("name", "E4").length, 1, "1 spot with name `E4`.");
  assert.equal(spots.filterBy("name", "E5").length, 1, "1 spot with name `E5`.");
  assert.equal(spots.filterBy("name", "E6").length, 1, "1 spot with name `E6`.");
  assert.equal(spots.filterBy("name", "E7").length, 1, "1 spot with name `E7`.");
  assert.equal(spots.filterBy("name", "E8").length, 1, "1 spot with name `E8`.");
  assert.equal(spots.filterBy("name", "F1").length, 1, "1 spot with name `F1`.");
  assert.equal(spots.filterBy("name", "F2").length, 1, "1 spot with name `F2`.");
  assert.equal(spots.filterBy("name", "F3").length, 1, "1 spot with name `F3`.");
  assert.equal(spots.filterBy("name", "F4").length, 1, "1 spot with name `F4`.");
  assert.equal(spots.filterBy("name", "F5").length, 1, "1 spot with name `F5`.");
  assert.equal(spots.filterBy("name", "F6").length, 1, "1 spot with name `F6`.");
  assert.equal(spots.filterBy("name", "F7").length, 1, "1 spot with name `F7`.");
  assert.equal(spots.filterBy("name", "F8").length, 1, "1 spot with name `F8`.");
  assert.equal(spots.filterBy("name", "G1").length, 1, "1 spot with name `G1`.");
  assert.equal(spots.filterBy("name", "G2").length, 1, "1 spot with name `G2`.");
  assert.equal(spots.filterBy("name", "G3").length, 1, "1 spot with name `G3`.");
  assert.equal(spots.filterBy("name", "G4").length, 1, "1 spot with name `G4`.");
  assert.equal(spots.filterBy("name", "G5").length, 1, "1 spot with name `G5`.");
  assert.equal(spots.filterBy("name", "G6").length, 1, "1 spot with name `G6`.");
  assert.equal(spots.filterBy("name", "G7").length, 1, "1 spot with name `G7`.");
  assert.equal(spots.filterBy("name", "G8").length, 1, "1 spot with name `G8`.");
  assert.equal(spots.filterBy("name", "H1").length, 1, "1 spot with name `H1`.");
  assert.equal(spots.filterBy("name", "H2").length, 1, "1 spot with name `H2`.");
  assert.equal(spots.filterBy("name", "H3").length, 1, "1 spot with name `H3`.");
  assert.equal(spots.filterBy("name", "H4").length, 1, "1 spot with name `H4`.");
  assert.equal(spots.filterBy("name", "H5").length, 1, "1 spot with name `H5`.");
  assert.equal(spots.filterBy("name", "H6").length, 1, "1 spot with name `H6`.");
  assert.equal(spots.filterBy("name", "H7").length, 1, "1 spot with name `H7`.");
  assert.equal(spots.filterBy("name", "H8").length, 1, "1 spot with name `H8`.");
  assert.equal(spots.filterBy("board.content", board).length, 64, "All spots have the correct board.");
});

test("create players for board", function (assert) {
  assert.expect(5);

  var route = this.subject(),
      store = route.store,
      board,
      players;

  Ember.run(function () {
    board = store.createRecord("board");
    players = route._createPlayersForBoard(store, board);
  });
  assert.equal(players.length, 2, "2 records were created.");
  assert.equal(players.filterBy("constructor.typeKey", "player").length, 2, "Both are of `player` type.");
  assert.equal(players.filterBy("isBlack", true).filterBy("isWhite", false).length, 1, "1 player is black and not white.");
  assert.equal(players.filterBy("isBlack", false).filterBy("isWhite", true).length, 1, "1 player is white and not black.");
  assert.equal(players.filterBy("board.content", board).length, 2, "All players have the correct board.");
});

test("create pieces for player", function (assert) {
  assert.expect(9);

  var route = this.subject(),
      store = route.store,
      player,
      pieces;

  Ember.run(function () {
    player = store.createRecord("player");
    pieces = route._createPiecesForPlayer(store, player);
  });
  assert.equal(pieces.length, 16, "16 records were created.");
  assert.equal(pieces.filterBy("constructor.typeKey", "piece").length, 16, "All are of `piece` type.");
  assert.equal(pieces.filterBy("type", "pawn").length, 8, "8 pieces with type `pawn`.");
  assert.equal(pieces.filterBy("type", "rook").length, 2, "2 pieces with type `rook`.");
  assert.equal(pieces.filterBy("type", "knight").length, 2, "2 pieces with type `knight`.");
  assert.equal(pieces.filterBy("type", "bishop").length, 2, "2 pieces with type `bishop`.");
  assert.equal(pieces.filterBy("type", "queen").length, 1, "1 piece with type `queen`.");
  assert.equal(pieces.filterBy("type", "king").length, 1, "1 piece with type `king`.");
  assert.equal(pieces.filterBy("player.content", player).length, 16, "All pieces have the correct player.");
});

test("set pieces on their spot", function (assert) {
  // assert.expect(0);

  var route = this.subject(),
      store = route.store,
      players,
      spots,
      blackPieces,
      whitePieces;

  Ember.run(function () {
    players = route._createPlayersForBoard(store);
    spots = route._createSpotsForBoard(store);
    blackPieces = route._createPiecesForPlayer(store, players.findBy("isBlack", true));
    whitePieces = route._createPiecesForPlayer(store, players.findBy("isBlack", false));
    route._setPiecesOnTheirSpot(blackPieces, whitePieces, spots);
  });

  var A1 = spots.findBy("name", "A1");
  assert.equal(A1.get("piece.type"), "rook", "Piece on `A1` is of correct type.");
  assert.ok(!A1.get("piece.isBlack"), "Piece on `A1` is of correct color.");
  assert.ok(A1.get("piece.isWhite"), "Piece on `A1` is of correct color (bis).");
  assert.equal(spots.filterBy("piece", A1.get("piece")).length, 1, "Piece on `A1` is not set anywhere else.");

  // var emptySpotNames = [
  //   "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
  //   "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
  //   "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
  //   "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"
  // ];
  // emptySpotNames.map(function (emptySpotName) {
  //   assert.ok(Ember.isEmpty(spots.findBy("name", emptySpotName).get("piece")), "`" + emptySpotName + "` is empty.");
  // });
});
