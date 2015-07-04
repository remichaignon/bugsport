import Ember from "ember";

export default Ember.Controller.extend({
  pieceToMove: null,

  actions: {
    move: function (pieceOrSpot) {
      debugger;
      if (!this.get("pieceToMove")) {
        var piece = pieceOrSpot;

        if (pieceOrSpot.constructor.modelName === "spot") {
          piece = pieceOrSpot.get("piece");
        }

        this.set("pieceToMove", piece);
        return;
      }

      var spotToGetTo = pieceOrSpot;

      if (pieceOrSpot.constructor.modelName === "piece") {
        spotToGetTo = pieceOrSpot.get("spot");
      }

      if (this.get("pieceToMove.spot.id") === spotToGetTo.get("id")) {
        return;
      }

      this.get("pieceToMove").set("spot", spotToGetTo);
      // this.get("pieceToMove").save();
      this.set("pieceToMove", null);
    }
  }
});
