import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["game"],

  actions: {
    selectPiece: function (piece) { this.sendAction("selectPiece", piece); },
    selectSpot: function (spot) { this.sendAction("selectSpot", spot); }
  }
});
