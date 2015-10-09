import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  tagName: "span",
  classNameBindings: ["model.selected:selected"],

  onClick: function () {
    this.sendAction("selectPiece", this.get("model.content") || this.get("model"));
  }.on("click")
});
