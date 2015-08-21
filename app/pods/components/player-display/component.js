import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  spotlessPieces: function () {
    // TODO: Use rejectBy ?
    return (this.get("model.pieces") || []).filter(function (piece) {
      return !piece.get("spot.id");
    });
  }.property("model.pieces.@each.spot"),

  actions: {
    sit: function () {
      // debugger;
      var player = this.get("model"),
          user = this.session.get("user");

      player.set("user", user);

      return Ember.RSVP.allSettled([player.save(), user.save()]);
    },
    selectPiece: function (piece) { this.sendAction("selectPiece", piece); }
  }
});
