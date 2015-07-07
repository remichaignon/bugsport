import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  tagName: "span",

  onClick: function () {
    this.sendAction("selectPiece", this.get("model"));
  }.on("click")
});
