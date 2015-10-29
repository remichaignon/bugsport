import Ember from "ember";

export default Ember.Controller.extend({
  selectedPiece: function () {
    return (this.get("model.allPieces") || []).findBy("selected", true);
  }.property("model.allPieces.@each.selected"),

  actions: {
    selectPiece: function (piece) {
      if (this.get("model.isOver")) { return; } // Game is over
      if (piece.get("player.user.id") !== this.session.get("user.id")) { return; } // Piece does not belong to logged in user
      if (this.get("selectedPiece.id") === piece.get("id")) { return this._unselectAllPieces(); } // This piece is already selected (cancel move)
      if (this.get("selectedPiece")) { return; } // A piece has already been selected

      piece.set("selected", true);
    },
    selectSpot: function (spot) {
      if (this.get("model.isOver")) { return; } // Game is over

      var pieceToMove = this.get("selectedPiece");

      if (!pieceToMove) { return; } // No piece has been selected
      if (pieceToMove.get("spot.id") === spot.get("id")) { return; } // The selected piece is already on the selected spot

      if (!pieceToMove.canGoTo(spot.get("id"))) {
        // TODO: Show message
        return;
      }

      spot.get("piece")
        .then(function (pieceToTake) {
          if (pieceToTake) { return this._capturePieceAndPassItToPartner(pieceToTake, pieceToMove.get("player")); }
        }.bind(this))
        .then(function (pieceToTake) {
          if (pieceToTake && (pieceToTake.get("type") === "king")) { return this.get("model").end(); }
        }.bind(this))
        .then(function () {
          return this._movePieceTo(pieceToMove, spot);
        }.bind(this))
        .then(function () {
          this._unselectAllPieces();
          return this.get("model").switchTurn();
        }.bind(this));
    }
  },

  _unselectAllPieces: function () {
    (this.get("model.allPieces") || []).invoke("set", "selected", false);
  },
  _capturePieceAndPassItToPartner: function (pieceToTake, player) {
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
  _movePieceTo: function (piece, spot) {
    piece.set("spot", spot);
    return Ember.RSVP.allSettled([piece.save(), spot.save()]);
  }
});
