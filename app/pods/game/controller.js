import Ember from "ember";

export default Ember.Controller.extend({
  pieceToMove: null,

  actions: {
    selectPiece: function (piece) {
      this.set("pieceToMove", piece);
    },
    selectSpot: function (spot) {
      if (!this.get("pieceToMove")) return;
      if (this.get("pieceToMove.spot.id") === spot.get("id")) return;

      var piece = this.get("pieceToMove");
      piece.set("spot", spot);
      piece.save()
        .then(function () { this.set("pieceToMove", null); }.bind(this));
    }
  }
});
