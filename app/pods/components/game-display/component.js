import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["game"],

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
