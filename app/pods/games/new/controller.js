import Ember from 'ember';

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
          debugger;
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
          debugger;
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
        .then(function (done) {
          debugger;
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
    for (var i = 0; i < 8; i++) {
      pieces.push(store.createRecord("piece", { type: "pawn", player: player, isWhite: player.get("isWhite") }).save());
    }

    return pieces;
  }
});
