import Ember from "ember";

export default Ember.Controller.extend({
  pieceToMove: null,

  actions: {
    selectPiece: function (piece) {
      if (this.get("model.isOver")) { return; }
      if (this.get("pieceToMove")) { return; }
      if (piece.get("player.user.id") !== this.session.get("user.id")) { return; }

      this.set("pieceToMove", piece);
    },
    selectSpot: function (spot) {
      if (this.get("model.isOver")) { return; }
      if (!this.get("pieceToMove")) { return; }

      if (this.get("pieceToMove.spot.id") === spot.get("id")) { return; }

      var pieceToMove = this.get("pieceToMove");

      spot.get("piece")
        .then(function (pieceToTake) {
          if (pieceToTake) {
            var hash = {};

            if (pieceToTake.get("type") === "king") {
              this.set("model.isOver", true);

              hash.gameOver = true;
              hash.game = this.get("model").save();
            }

            hash.isTaking = true;
            hash.pieceToMove = pieceToMove;
            hash.pieceToTake = pieceToTake;
            hash.opponent = pieceToMove.get("player.opponent");
            hash.partner = pieceToMove.get("player.partner");
            hash.spot = spot;

            return Ember.RSVP.hashSettled(hash);
          }

          return Ember.RSVP.hashSettled({
            isTaking: false,
            pieceToMove: pieceToMove,
            spot: spot
          });
        }.bind(this))
        .then(function (hash) {
          var promises = [];

          if (hash.isTaking.value) {
            hash.pieceToTake.value.setProperties({
              player: hash.partner.value,
              spot: undefined
            });
            promises.push(
              hash.pieceToTake.value.save(),
              hash.partner.value.save(),
              hash.opponent.value.save()
            );
          }

          hash.pieceToMove.value.set("spot", hash.spot.value);
          promises.push(
            hash.pieceToMove.value.save(),
            hash.spot.value.save()
          );

          return Ember.RSVP.allSettled(promises);
        })
        .then(function () {
          this.set("pieceToMove", null);
        }.bind(this))
        .catch(function (/*err*/) {
          // debugger;
        });
    }
  }
});
