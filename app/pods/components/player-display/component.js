import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  spotlessPieces: function () {
    return (this.get("pieces") || []).filter(function (piece) {
      return !piece.get("spot");
    });
  }.property("model.pieces.@each.spot"),

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
