import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  tagName: "span",

  onClick: function () {
    if (this.get("model.spot")) {
      return;
    }

    this.sendAction("move", this.get("model"));
  }.on("click")
});
