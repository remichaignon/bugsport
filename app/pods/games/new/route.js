import Ember from "ember";

export default Ember.Route.extend({
  model: function () {
    var game = this.store.createRecord("game", { createdAt: new Date() }),
        boardA = this.store.createRecord("board", { name: "A", game: game }),
        boardB = this.store.createRecord("board", { name: "B", game: game }),
        boardAPlayerWhite = this.store.createRecord("player", { board: boardA, isBlack: false }),
        boardAPlayerBlack = this.store.createRecord("player", { board: boardA, isBlack: true }),
        boardBPlayerWhite = this.store.createRecord("player", { board: boardB, isBlack: false }),
        boardBPlayerBlack = this.store.createRecord("player", { board: boardB, isBlack: true });

    var spots = [
      "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1",
      "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2",
      "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
      "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
      "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
      "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6",
      "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7",
      "A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"
    ];

    var boardASpots = spots.map(function (spot) {
          return this.store.createRecord("spot", { name: spot, board: boardA });
        }.bind(this)),
        boardBSpots = spots.map(function (spot) {
          return this.store.createRecord("spot", { name: spot, board: boardB });
        }.bind(this));

    var pieces = [
      "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
      "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"
    ];

    var boardAPlayerWhitePieces = pieces.map(function (piece) {
          return this.store.createRecord("piece", { type: piece, player: boardAPlayerWhite });
        }.bind(this)),
        boardAPlayerBlackPieces = pieces.map(function (piece) {
          return this.store.createRecord("piece", { type: piece, player: boardAPlayerBlack });
        }.bind(this)),
        boardBPlayerWhitePieces = pieces.map(function (piece) {
          return this.store.createRecord("piece", { type: piece, player: boardBPlayerWhite });
        }.bind(this)),
        boardBPlayerBlackPieces = pieces.map(function (piece) {
          return this.store.createRecord("piece", { type: piece, player: boardBPlayerBlack });
        }.bind(this));

    var setPieceOnBoard = function (board) {
      var spots = board.get("spots"),
          playerWhitePieces = board.get("playerWhite.pieces"),
          playerBlackPieces = board.get("playerBlack.pieces"),
          whitePawns = playerWhitePieces.filterBy("type", "pawn"),
          whiteKnights = playerWhitePieces.filterBy("type", "knight"),
          whiteBishops = playerWhitePieces.filterBy("type", "bishop"),
          whiteRooks = playerWhitePieces.filterBy("type", "rook"),
          whiteQueen = playerWhitePieces.findBy("type", "queen"),
          whiteKing = playerWhitePieces.findBy("type", "king"),
          blackPawns = playerBlackPieces.filterBy("type", "pawn"),
          blackKnights = playerBlackPieces.filterBy("type", "knight"),
          blackBishops = playerBlackPieces.filterBy("type", "bishop"),
          blackRooks = playerBlackPieces.filterBy("type", "rook"),
          blackQueen = playerBlackPieces.findBy("type", "queen"),
          blackKing = playerBlackPieces.findBy("type", "king");

      spots.findBy("name", "A1").set("piece", whiteRooks.get("firstObject"));
      spots.findBy("name", "B1").set("piece", whiteKnights.get("firstObject"));
      spots.findBy("name", "C1").set("piece", whiteBishops.get("firstObject"));
      spots.findBy("name", "D1").set("piece", whiteQueen);
      spots.findBy("name", "E1").set("piece", whiteKing);
      spots.findBy("name", "F1").set("piece", whiteBishops.get("lastObject"));
      spots.findBy("name", "G1").set("piece", whiteKnights.get("lastObject"));
      spots.findBy("name", "H1").set("piece", whiteRooks.get("lastObject"));

      spots
        .filter(function (spot) {
          return spot.get("name")[1] === "2";
        })
        .map(function (spot, index) {
          spot.set("piece", whitePawns[index]);
        });

      spots
        .filter(function (spot) {
          return spot.get("name")[1] === "7";
        })
        .map(function (spot, index) {
          spot.set("piece", blackPawns[index]);
        });

      spots.findBy("name", "A8").set("piece", blackRooks.get("firstObject"));
      spots.findBy("name", "B8").set("piece", blackKnights.get("firstObject"));
      spots.findBy("name", "C8").set("piece", blackBishops.get("firstObject"));
      spots.findBy("name", "D8").set("piece", blackQueen);
      spots.findBy("name", "E8").set("piece", blackKing);
      spots.findBy("name", "F8").set("piece", blackBishops.get("lastObject"));
      spots.findBy("name", "G8").set("piece", blackKnights.get("lastObject"));
      spots.findBy("name", "H8").set("piece", blackRooks.get("lastObject"));
    };

    setPieceOnBoard(boardA);
    setPieceOnBoard(boardB);

    var promises = [].concat(
      game.save(),
      boardA.save(),
      boardB.save(),
      boardAPlayerWhite.save(),
      boardAPlayerBlack.save(),
      boardBPlayerWhite.save(),
      boardBPlayerBlack.save(),
      boardASpots.map(function (spot) { return spot.save(); }),
      boardBSpots.map(function (spot) { return spot.save(); }),
      boardAPlayerWhitePieces.map(function (piece) { return piece.save(); }),
      boardAPlayerBlackPieces.map(function (piece) { return piece.save(); }),
      boardBPlayerWhitePieces.map(function (piece) { return piece.save(); }),
      boardBPlayerBlackPieces.map(function (piece) { return piece.save(); })
    );

    return Ember.RSVP.reject(promises)
      .then(function (all) { return all[0].value; });
  },
  afterModel: function (game) {
    this.transitionTo("game", game);
  },

  actions: {
    error: function () {
      this.transitionTo("game-creation-error");
    }
  }
});
