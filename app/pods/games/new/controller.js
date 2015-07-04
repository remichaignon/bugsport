import Ember from "ember";

// functions
// createBoardsForGame
// createSpotsForBoard
// createPlayersForBoard
// createPiecesForPlayer
//
// saveGame
// saveBoards
// savePlayers
// setPiecesOnBoard
// setPieceOnSpot
//
// getPiecesForPlayer
// getBoardForPlayer

export default Ember.Controller.extend({
  actions: {
    save: function () {
      this.get("model").save()
        .then(function (game) {
          var boards = this._createBoardsForGame(this.store, game);

          return Ember.RSVP.hashSettled({
            game: game,
            boardA: boards[0],
            boardB: boards[1]
          });
        }.bind(this))
        .then(function (hash) {
          return Ember.RSVP.hashSettled({
            game: hash.game.value.save(),
            boardA: hash.boardA.value,
            boardB: hash.boardB.value,
            boardASpots: this._createSpotsForBoard(this.store, hash.boardA.value),
            boardBSpots: this._createSpotsForBoard(this.store, hash.boardB.value),
            boardAPlayers: this._createPlayersForBoard(this.store, hash.boardA.value),
            boardBPlayers: this._createPlayersForBoard(this.store, hash.boardB.value)
          });
        }.bind(this))
        .then(function (hash) {
          var boardAPlayerWhite = hash.boardAPlayers.value[0],
              boardAPlayerBlack = hash.boardAPlayers.value[1],
              boardBPlayerWhite = hash.boardBPlayers.value[0],
              boardBPlayerBlack = hash.boardBPlayers.value[1];

          return Ember.RSVP.allSettled(
            [].concat(
              hash.boardA.value.save(),
              hash.boardB.value.save(),
              boardAPlayerWhite,
              boardAPlayerBlack,
              boardBPlayerWhite,
              boardBPlayerBlack,
              this._createPiecesForPlayer(this.store, boardAPlayerWhite),
              this._createPiecesForPlayer(this.store, boardAPlayerBlack),
              this._createPiecesForPlayer(this.store, boardBPlayerWhite),
              this._createPiecesForPlayer(this.store, boardBPlayerBlack)
            )
          );
        }.bind(this))
        .then(function (all) {
          return Ember.RSVP.allSettled([
            all[2].value.save(),
            all[3].value.save(),
            all[4].value.save(),
            all[5].value.save()
          ]);
        }.bind(this))
        .then(function (playerArray) {
          return Ember.RSVP.allSettled([
            playerArray[0].value,
            playerArray[1].value,
            playerArray[2].value,
            playerArray[3].value,
            playerArray[0].value.get("pieces"),
            playerArray[1].value.get("pieces"),
            playerArray[2].value.get("pieces"),
            playerArray[3].value.get("pieces")
          ]);
        }.bind(this))
        .then(function (playerArray) {
          var boards = [
            playerArray[0].value.get("board"),
            playerArray[1].value.get("board"),
            playerArray[2].value.get("board"),
            playerArray[3].value.get("board")
          ].uniq();

          return Ember.RSVP.allSettled([].concat(
            this._setPiecesOnBoard(boards.get("firstObject")),
            this._setPiecesOnBoard(boards.get("lastObject"))
          ));
        }.bind(this))
        .then(function (done) {
          this.transitionToRoute("game", this.get("model"));
        }.bind(this))
        .catch(function (err) {
          debugger;
        }.bind(this));
    }
  },

  _createBoardsForGame: function (store, game) {
    return [
      store.createRecord("board", { game: game, name: "A" }).save(),
      store.createRecord("board", { game: game, name: "B" }).save()
    ];
  },
  _createSpotsForBoard: function (store, board) {
    var spots = [],
        rows = ["1", "2", "3", "4", "5", "6", "7", "8"],
        columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < columns.length; j++) {
        spots.push(this.store.createRecord("spot", { name: columns[j] + rows[i], board: board }).save());
      }
    }

    return spots;
  },
  _createPlayersForBoard: function (store, board) {
    return [
      store.createRecord("player", { board: board }).save(),
      store.createRecord("player", { board: board }).save()
    ];
  },
  _createPiecesForPlayer: function (store, player) {
    var pieces = [
      store.createRecord("piece", { type: "king", player: player, isWhite: player.get("isWhite") }).save(),
      store.createRecord("piece", { type: "queen", player: player, isWhite: player.get("isWhite") }).save()
    ];
    for (var i = 0; i < 2; i++) {
      pieces.push(store.createRecord("piece", { type: "bishop", player: player, isWhite: player.get("isWhite") }).save());
      pieces.push(store.createRecord("piece", { type: "knight", player: player, isWhite: player.get("isWhite") }).save());
      pieces.push(store.createRecord("piece", { type: "rook", player: player, isWhite: player.get("isWhite") }).save());
    }
    for (var j = 0; j < 8; j++) {
      pieces.push(store.createRecord("piece", { type: "pawn", player: player, isWhite: player.get("isWhite") }).save());
    }

    return pieces;
  },
  _setPiecesOnBoard: function (board) {
    var playerWhite = board.get("playerWhite"),
        playerBlack = board.get("playerBlack"),
        blackPawns = playerBlack.get("pieces").filterBy("type", "pawn"),
        blackKnights = playerBlack.get("pieces").filterBy("type", "knight"),
        blackBishops = playerBlack.get("pieces").filterBy("type", "bishop"),
        blackRooks = playerBlack.get("pieces").filterBy("type", "rook"),
        blackQueen = playerBlack.get("pieces").findBy("type", "queen"),
        blackKing = playerBlack.get("pieces").findBy("type", "king"),
        whitePawns = playerWhite.get("pieces").filterBy("type", "pawn"),
        whiteKnights = playerWhite.get("pieces").filterBy("type", "knight"),
        whiteBishops = playerWhite.get("pieces").filterBy("type", "bishop"),
        whiteRooks = playerWhite.get("pieces").filterBy("type", "rook"),
        whiteQueen = playerWhite.get("pieces").findBy("type", "queen"),
        whiteKing = playerWhite.get("pieces").findBy("type", "king");

    board.get("spots").findBy("name", "A1").set("piece", whiteRooks.get("firstObject"));
    board.get("spots").findBy("name", "B1").set("piece", whiteKnights.get("firstObject"));
    board.get("spots").findBy("name", "C1").set("piece", whiteBishops.get("firstObject"));
    board.get("spots").findBy("name", "D1").set("piece", whiteQueen);
    board.get("spots").findBy("name", "E1").set("piece", whiteKing);
    board.get("spots").findBy("name", "F1").set("piece", whiteBishops.get("lastObject"));
    board.get("spots").findBy("name", "G1").set("piece", whiteKnights.get("lastObject"));
    board.get("spots").findBy("name", "H1").set("piece", whiteRooks.get("lastObject"));

    var whitePawnRow = board.get("spots").filter(function (spot) {
      return spot.get("name")[1] === "2";
    });

    for (var i = 0; i < 8; i++) {
      whitePawnRow[i].set("piece", whitePawns[i]);
    }

    var blackPawnRow = board.get("spots").filter(function (spot) {
      return spot.get("name")[1] === "7";
    });

    for (var i = 0; i < 8; i++) {
      blackPawnRow[i].set("piece", blackPawns[i]);
    }

    board.get("spots").findBy("name", "A8").set("piece", blackRooks.get("firstObject"));
    board.get("spots").findBy("name", "B8").set("piece", blackKnights.get("firstObject"));
    board.get("spots").findBy("name", "C8").set("piece", blackBishops.get("firstObject"));
    board.get("spots").findBy("name", "D8").set("piece", blackQueen);
    board.get("spots").findBy("name", "E8").set("piece", blackKing);
    board.get("spots").findBy("name", "F8").set("piece", blackBishops.get("lastObject"));
    board.get("spots").findBy("name", "G8").set("piece", blackKnights.get("lastObject"));
    board.get("spots").findBy("name", "H8").set("piece", blackRooks.get("lastObject"));

    var promises = [];

    board.get("spots").forEach(function (spot) {
      promises.push(spot.save());
    });

    return promises;
  }
});
