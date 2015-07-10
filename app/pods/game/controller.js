import Ember from "ember";

export default Ember.Controller.extend({
  pieceToMove: null,

  actions: {
    selectPiece: function (piece) {
      if (this.get("pieceToMove")) { return; }

      this.set("pieceToMove", piece);
    },
    selectSpot: function (spot) {
      if (!this.get("pieceToMove")) { return; }

      if (this.get("pieceToMove.spot.id") === spot.get("id")) { return; }

      var pieceToMove = this.get("pieceToMove");

      spot.get("piece")
        .then(function (pieceToTake) {
          if (pieceToTake) {
            return Ember.RSVP.hashSettled({
              isTaking: true,
              pieceToMove: pieceToMove,
              pieceToTake: pieceToTake,
              opponent: pieceToMove.get("player.opponent"),
              partner: pieceToMove.get("player.partner"),
              spot: spot
            });
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
          debugger;
          this.set("pieceToMove", null);
        }.bind(this))
        .catch(function (err) {
          debugger;
        });
    }
  }
});
