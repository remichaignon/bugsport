import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["spot"],
  classNameBindings: ["model.isBlack:black:white"],

  onClick: function () {
    this.sendAction("move", this.get("model"));
  }.on("click"),

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
