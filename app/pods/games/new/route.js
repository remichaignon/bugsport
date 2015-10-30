import Ember from "ember";

export default Ember.Route.extend({
  model: function () {
    var game = this.store.createRecord("game", { createdAt: new Date() }),
        boards = this._createBoardsForGame(this.store, game),

        boardA = boards.findBy("name", "A"),
        boardASpots = this._createSpotsForBoard(this.store, boardA),
        boardAPlayers = this._createPlayersForBoard(this.store, boardA),
        boardAPlayerBlack = boardAPlayers.findBy("isBlack", true),
        boardAPlayerWhite = boardAPlayers.findBy("isBlack", false),
        boardAPlayerBlackPieces = this._createPiecesForPlayer(this.store, boardAPlayerBlack),
        boardAPlayerWhitePieces = this._createPiecesForPlayer(this.store, boardAPlayerWhite),

        boardB = boards.findBy("name", "B"),
        boardBSpots = this._createSpotsForBoard(this.store, boardB),
        boardBPlayers = this._createPlayersForBoard(this.store, boardB),
        boardBPlayerBlack = boardBPlayers.findBy("isBlack", true),
        boardBPlayerWhite = boardBPlayers.findBy("isBlack", false),
        boardBPlayerBlackPieces = this._createPiecesForPlayer(this.store, boardBPlayerBlack),
        boardBPlayerWhitePieces = this._createPiecesForPlayer(this.store, boardBPlayerWhite);

    this._setPiecesOnTheirSpot(boardAPlayerBlackPieces, boardAPlayerWhitePieces, boardASpots);
    this._setPiecesOnTheirSpot(boardBPlayerBlackPieces, boardBPlayerWhitePieces, boardBSpots);

    return Ember.RSVP.allSettled(
      [].concat(
        game.save(),
        boards.invoke("save"),

        boardAPlayers.invoke("save"),
        boardAPlayerBlackPieces.invoke("save"),
        boardAPlayerWhitePieces.invoke("save"),
        boardASpots.invoke("save"),

        boardBPlayers.invoke("save"),
        boardBPlayerBlackPieces.invoke("save"),
        boardBPlayerWhitePieces.invoke("save"),
        boardBSpots.invoke("save")
      ))
      .then(function (all) { return all[0].value; });
  },
  afterModel: function (game) {
    this.transitionTo("game", game);
  },

  actions: {
    error: function () {
      this.transitionTo("game-creation-error");
    }
  },

  _createBoardsForGame: function (store, game) {
    return [
      store.createRecord("board", { name: "A", game: game }),
      store.createRecord("board", { name: "B", game: game })
    ];
  },
  _createSpotsForBoard: function (store, board) {
    return [
      "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1",
      "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2",
      "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
      "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
      "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
      "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6",
      "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7",
      "A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"
    ].map(function (spot) {
      return store.createRecord("spot", { name: spot, board: board });
    });
  },
  _createPlayersForBoard: function (store, board) {
    return [
      store.createRecord("player", { board: board, isBlack: true }),
      store.createRecord("player", { board: board, isBlack: false }),
    ];
  },
  _createPiecesForPlayer: function (store, player) {
    return [
      "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
      "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"
    ].map(function (piece) {
      return store.createRecord("piece", { type: piece, player: player });
    });
  },
  _setPiecesOnTheirSpot: function (blackPieces, whitePieces, spots) {
    blackPieces = blackPieces || [];
    whitePieces = whitePieces || [];
    spots = spots || [];

    // TODO: Study performance - It's probably faster to find the piece and set
    //  it on its spot, instead of finding the spot and set its piece.
    var blackPawns = blackPieces.filterBy("type", "pawn"),
        blackKnights = blackPieces.filterBy("type", "knight"),
        blackBishops = blackPieces.filterBy("type", "bishop"),
        blackRooks = blackPieces.filterBy("type", "rook"),
        blackQueen = blackPieces.findBy("type", "queen"),
        blackKing = blackPieces.findBy("type", "king"),
        whitePawns = whitePieces.filterBy("type", "pawn"),
        whiteKnights = whitePieces.filterBy("type", "knight"),
        whiteBishops = whitePieces.filterBy("type", "bishop"),
        whiteRooks = whitePieces.filterBy("type", "rook"),
        whiteQueen = whitePieces.findBy("type", "queen"),
        whiteKing = whitePieces.findBy("type", "king");

    (spots.findBy("name", "A1") || Ember.Object.create()).set("piece", whiteRooks.get("firstObject"));
    (spots.findBy("name", "B1") || Ember.Object.create()).set("piece", whiteKnights.get("firstObject"));
    (spots.findBy("name", "C1") || Ember.Object.create()).set("piece", whiteBishops.get("firstObject"));
    (spots.findBy("name", "D1") || Ember.Object.create()).set("piece", whiteQueen);
    (spots.findBy("name", "E1") || Ember.Object.create()).set("piece", whiteKing);
    (spots.findBy("name", "F1") || Ember.Object.create()).set("piece", whiteBishops.get("lastObject"));
    (spots.findBy("name", "G1") || Ember.Object.create()).set("piece", whiteKnights.get("lastObject"));
    (spots.findBy("name", "H1") || Ember.Object.create()).set("piece", whiteRooks.get("lastObject"));

    spots
      .filter(function (spot) {
        if (!spot || !spot.get("name")) { return; }

        return spot.get("name")[1] === "2";
      })
      .map(function (spot, index) {
        if (!spot) { return; }

        spot.set("piece", whitePawns[index]);
      });

    spots
      .filter(function (spot) {
        if (!spot || !spot.get("name")) { return; }

        return spot.get("name")[1] === "7";
      })
      .map(function (spot, index) {
        if (!spot) { return; }

        spot.set("piece", blackPawns[index]);
      });

    (spots.findBy("name", "A8") || Ember.Object.create()).set("piece", blackRooks.get("firstObject"));
    (spots.findBy("name", "B8") || Ember.Object.create()).set("piece", blackKnights.get("firstObject"));
    (spots.findBy("name", "C8") || Ember.Object.create()).set("piece", blackBishops.get("firstObject"));
    (spots.findBy("name", "D8") || Ember.Object.create()).set("piece", blackQueen);
    (spots.findBy("name", "E8") || Ember.Object.create()).set("piece", blackKing);
    (spots.findBy("name", "F8") || Ember.Object.create()).set("piece", blackBishops.get("lastObject"));
    (spots.findBy("name", "G8") || Ember.Object.create()).set("piece", blackKnights.get("lastObject"));
    (spots.findBy("name", "H8") || Ember.Object.create()).set("piece", blackRooks.get("lastObject"));
  }
});
