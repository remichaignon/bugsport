import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["spot"],
  classNameBindings: ["model.isBlack:black:white"],

  onClick: function () {
    this.sendAction("selectSpot", this.get("model"));
  }.on("click"),

  actions: {
    selectPiece: function (piece) { this.sendAction("selectPiece", piece); }
  }
});
