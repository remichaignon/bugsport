import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  tagName: "span",

  onClick: function () {
    this.get("model").then(function (piece) { this.sendAction("selectPiece", piece); }.bind(this));
  }.on("click")
});
