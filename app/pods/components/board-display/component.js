import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["board"],

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
