import Ember from "ember";

export default Ember.Component.extend({
  spots: [],

  classNames: ["spots"],

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
