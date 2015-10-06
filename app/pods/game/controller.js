import Ember from "ember";

export default Ember.Controller.extend({
  selectedPiece: function () {
    return (this.get("model.allPieces") || []).findBy("selected", true);
  }.property("model.allPieces.@each.selected"),

  actions: {
    selectPiece: function (piece) {
      if (this.get("model.isOver")) { return; } // Game is over
      if (this.get("selectedPiece")) { return; } // A piece has already been selected
      if (piece.get("player.user.id") !== this.session.get("user.id")) { return; } // Piece does not belong to logged in user

      piece.set("selected", true);
    },
    selectSpot: function (spot) {
      var pieceToMove = this.get("selectedPiece");

      if (this.get("model.isOver")) { return; } // Game is over
      if (!pieceToMove) { return; } // No piece has been selected

       // The selected piece is on the selected spot (cancel move)
      if (pieceToMove.get("spot.id") === spot.get("id")) {
        this._unselectAllPieces();
        return;
      }

      if (!pieceToMove.canGoTo(spot.get("id"))) {
        // TODO: Show message
        return;
      }

      spot.get("piece")
        .then(function (pieceToTake) {
          if (!pieceToTake) { return Ember.RSVP.resolve(); }

          return this._capturePieceAndPassItToPartner(pieceToMove.get("player"), pieceToTake);
        }.bind(this))
        .then(function (pieceToTake) {
          if (pieceToTake && (pieceToTake.get("type") !== "king")) { return Ember.RSVP.resolve(); }

          return this._endGame(this.get("model"));
        }.bind(this))
        .then(function () {
          return this._movePieceTo(pieceToMove, spot);
        })
        .then(function () {
          this._unselectAllPieces();
        });
    }
  },

  _unselectAllPieces: function () {
    this.get("model.allPieces").map(function (item) { item.set("selected", false); });
  },
  _capturePieceAndPassItToPartner: function (player, pieceToTake) {
    return Ember.RSVP.allSettled([player.get("opponent"), player.get("partner")])
      .then(function (players) {
        var opponent = players[0].value,
            partner = players[1].value;

        pieceToTake.setProperties({
          player: partner,
          spot: undefined
        });

        return Ember.RSVP.allSettled([opponent.save(), partner.save(), pieceToTake.save()]);
      })
      .then(function (all) {
        return all[2].value;
      });
  },
  _endGame: function (game) {
    game.set("isOver", true);
    return game.save();
  },
  _movePieceTo: function (piece, spot) {
    piece.set("spot", spot);
    return Ember.RSVP.allSettled([piece.save(), spot.save()]);
  }
});
