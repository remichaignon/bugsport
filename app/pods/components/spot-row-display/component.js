import Ember from "ember";

export default Ember.Component.extend({
  spots: [],
  row: null,

  classNames: ["clearfix"],

  spotsOnRow: function () {
    return (this.get("spots") || []).filter(function (spot) {
      return (spot.get("name") || [])[1] === this.get("row");
    }.bind(this)).sortBy("name");
  }.property("spots.@each.name", "row"),

  actions: {
    move: function (model) { this.sendAction("move", model); }
  }
});
