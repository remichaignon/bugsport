import Ember from "ember";

export default Ember.Component.extend({
  spots: [],
  row: null,

  classNames: ["clearfix"],

  spotsOnRow: function () {
    var row = this.get("row");

    if (!row) { return []; }

    return (this.get("spots") || [])
      .filter(function (spot) {
        return (spot.get("name") || [])[1] === row;
      })
      .sortBy("name");
  }.property("spots.@each.name", "row"),

  actions: {
    selectPiece: function (piece) { this.sendAction("selectPiece", piece); },
    selectSpot: function (spot) { this.sendAction("selectSpot", spot); }
  }
});
