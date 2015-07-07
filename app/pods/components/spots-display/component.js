import Ember from "ember";

export default Ember.Component.extend({
  spots: [],

  classNames: ["spots"],

  actions: {
    selectPiece: function (piece) { this.sendAction("selectPiece", piece); },
    selectSpot: function (spot) { this.sendAction("selectSpot", spot); }
  }
});
