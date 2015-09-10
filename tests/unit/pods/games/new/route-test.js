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
  assert.expect(3);

  var game = Ember.Object.create({ id: 5 }),
      route = this.subject({
        transitionTo: function (route, model) {
          assert.ok(true, "`transitionTo` called on route.");
          assert.equal(route, "game", "`game` passed as route.");
          assert.deepEqual(model, game, "Game passed as model.");
        }
      });
  route.afterModel(game);
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
  assert.expect(96);

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
  assert.ok(A1.get("piece.isWhite"), "Piece on `A1` is of correct color.");

  var B1 = spots.findBy("name", "B1");
  assert.equal(B1.get("piece.type"), "knight", "Piece on `B1` is of correct type.");
  assert.ok(B1.get("piece.isWhite"), "Piece on `B1` is of correct color.");

  var C1 = spots.findBy("name", "C1");
  assert.equal(C1.get("piece.type"), "bishop", "Piece on `C1` is of correct type.");
  assert.ok(C1.get("piece.isWhite"), "Piece on `C1` is of correct color.");

  var D1 = spots.findBy("name", "D1");
  assert.equal(D1.get("piece.type"), "queen", "Piece on `D1` is of correct type.");
  assert.ok(D1.get("piece.isWhite"), "Piece on `D1` is of correct color.");

  var E1 = spots.findBy("name", "E1");
  assert.equal(E1.get("piece.type"), "king", "Piece on `E1` is of correct type.");
  assert.ok(E1.get("piece.isWhite"), "Piece on `E1` is of correct color.");

  var F1 = spots.findBy("name", "F1");
  assert.equal(F1.get("piece.type"), "bishop", "Piece on `F1` is of correct type.");
  assert.ok(F1.get("piece.isWhite"), "Piece on `F1` is of correct color.");

  var G1 = spots.findBy("name", "G1");
  assert.equal(G1.get("piece.type"), "knight", "Piece on `G1` is of correct type.");
  assert.ok(G1.get("piece.isWhite"), "Piece on `G1` is of correct color.");

  var H1 = spots.findBy("name", "H1");
  assert.equal(H1.get("piece.type"), "rook", "Piece on `H1` is of correct type.");
  assert.ok(H1.get("piece.isWhite"), "Piece on `H1` is of correct color.");

  var A2 = spots.findBy("name", "A2");
  assert.equal(A2.get("piece.type"), "pawn", "Piece on `A2` is of correct type.");
  assert.ok(A2.get("piece.isWhite"), "Piece on `A2` is of correct color.");

  var B2 = spots.findBy("name", "B2");
  assert.equal(B2.get("piece.type"), "pawn", "Piece on `B2` is of correct type.");
  assert.ok(B2.get("piece.isWhite"), "Piece on `B2` is of correct color.");

  var C2 = spots.findBy("name", "C2");
  assert.equal(C2.get("piece.type"), "pawn", "Piece on `C2` is of correct type.");
  assert.ok(C2.get("piece.isWhite"), "Piece on `C2` is of correct color.");

  var D2 = spots.findBy("name", "D2");
  assert.equal(D2.get("piece.type"), "pawn", "Piece on `D2` is of correct type.");
  assert.ok(D2.get("piece.isWhite"), "Piece on `D2` is of correct color.");

  var E2 = spots.findBy("name", "E2");
  assert.equal(E2.get("piece.type"), "pawn", "Piece on `E2` is of correct type.");
  assert.ok(E2.get("piece.isWhite"), "Piece on `E2` is of correct color.");

  var F2 = spots.findBy("name", "F2");
  assert.equal(F2.get("piece.type"), "pawn", "Piece on `F2` is of correct type.");
  assert.ok(F2.get("piece.isWhite"), "Piece on `F2` is of correct color.");

  var G2 = spots.findBy("name", "G2");
  assert.equal(G2.get("piece.type"), "pawn", "Piece on `G2` is of correct type.");
  assert.ok(G2.get("piece.isWhite"), "Piece on `G2` is of correct color.");

  var H2 = spots.findBy("name", "H2");
  assert.equal(H2.get("piece.type"), "pawn", "Piece on `H2` is of correct type.");
  assert.ok(H2.get("piece.isWhite"), "Piece on `H2` is of correct color.");

  var emptySpotNames = [
    "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
    "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
    "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
    "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"
  ];
  emptySpotNames.map(function (emptySpotName) {
    spots
      .findBy("name", emptySpotName)
      .get("piece")
      .then(function (piece) {
        assert.ok(!piece, "`" + emptySpotName + "` has no piece. ");
      });
  });

  var A7 = spots.findBy("name", "A7");
  assert.equal(A7.get("piece.type"), "pawn", "Piece on `A7` is of correct type.");
  assert.ok(A7.get("piece.isBlack"), "Piece on `A7` is of correct color.");

  var B7 = spots.findBy("name", "B7");
  assert.equal(B7.get("piece.type"), "pawn", "Piece on `B7` is of correct type.");
  assert.ok(B7.get("piece.isBlack"), "Piece on `B7` is of correct color.");

  var C7 = spots.findBy("name", "C7");
  assert.equal(C7.get("piece.type"), "pawn", "Piece on `C7` is of correct type.");
  assert.ok(C7.get("piece.isBlack"), "Piece on `C7` is of correct color.");

  var D7 = spots.findBy("name", "D7");
  assert.equal(D7.get("piece.type"), "pawn", "Piece on `D7` is of correct type.");
  assert.ok(D7.get("piece.isBlack"), "Piece on `D7` is of correct color.");

  var E7 = spots.findBy("name", "E7");
  assert.equal(E7.get("piece.type"), "pawn", "Piece on `E7` is of correct type.");
  assert.ok(E7.get("piece.isBlack"), "Piece on `E7` is of correct color.");

  var F7 = spots.findBy("name", "F7");
  assert.equal(F7.get("piece.type"), "pawn", "Piece on `F7` is of correct type.");
  assert.ok(F7.get("piece.isBlack"), "Piece on `F7` is of correct color.");

  var G7 = spots.findBy("name", "G7");
  assert.equal(G7.get("piece.type"), "pawn", "Piece on `G7` is of correct type.");
  assert.ok(G7.get("piece.isBlack"), "Piece on `G7` is of correct color.");

  var H7 = spots.findBy("name", "H7");
  assert.equal(H7.get("piece.type"), "pawn", "Piece on `H7` is of correct type.");
  assert.ok(H7.get("piece.isBlack"), "Piece on `H7` is of correct color.");

  var A8 = spots.findBy("name", "A8");
  assert.equal(A8.get("piece.type"), "rook", "Piece on `A8` is of correct type.");
  assert.ok(A8.get("piece.isBlack"), "Piece on `A8` is of correct color.");

  var B8 = spots.findBy("name", "B8");
  assert.equal(B8.get("piece.type"), "knight", "Piece on `B8` is of correct type.");
  assert.ok(B8.get("piece.isBlack"), "Piece on `B8` is of correct color.");

  var C8 = spots.findBy("name", "C8");
  assert.equal(C8.get("piece.type"), "bishop", "Piece on `C8` is of correct type.");
  assert.ok(C8.get("piece.isBlack"), "Piece on `C8` is of correct color.");

  var D8 = spots.findBy("name", "D8");
  assert.equal(D8.get("piece.type"), "queen", "Piece on `D8` is of correct type.");
  assert.ok(D8.get("piece.isBlack"), "Piece on `D8` is of correct color.");

  var E8 = spots.findBy("name", "E8");
  assert.equal(E8.get("piece.type"), "king", "Piece on `E8` is of correct type.");
  assert.ok(E8.get("piece.isBlack"), "Piece on `E8` is of correct color.");

  var F8 = spots.findBy("name", "F8");
  assert.equal(F8.get("piece.type"), "bishop", "Piece on `F8` is of correct type.");
  assert.ok(F8.get("piece.isBlack"), "Piece on `F8` is of correct color.");

  var G8 = spots.findBy("name", "G8");
  assert.equal(G8.get("piece.type"), "knight", "Piece on `G8` is of correct type.");
  assert.ok(G8.get("piece.isBlack"), "Piece on `G8` is of correct color.");

  var H8 = spots.findBy("name", "H8");
  assert.equal(H8.get("piece.type"), "rook", "Piece on `H8` is of correct type.");
  assert.ok(H8.get("piece.isBlack"), "Piece on `H8` is of correct color.");
});
