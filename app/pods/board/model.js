import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  game: DS.belongsTo("game", { async: true }),
  players: DS.hasMany("player", { async: true }),
  playerWhite: Ember.computed.alias("players.firstObject"),
  playerBlack: Ember.computed.alias("players.lastObject"),

  spots: DS.hasMany("spot", { async: true }),
  spotsOnRow1: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "1";
    });
  }.property("spots.@each.name"),
  spotsOnRow2: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "2";
    });
  }.property("spots.@each.name"),
  spotsOnRow3: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "3";
    });
  }.property("spots.@each.name"),
  spotsOnRow4: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "4";
    });
  }.property("spots.@each.name"),
  spotsOnRow5: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "5";
    });
  }.property("spots.@each.name"),
  spotsOnRow6: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "6";
    });
  }.property("spots.@each.name"),
  spotsOnRow7: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "7";
    });
  }.property("spots.@each.name"),
  spotsOnRow8: function () {
    return this.get("spots").filter(function (spot) {
      return (spot.get("name") || [])[1] === "8";
    });
  }.property("spots.@each.name"),

  name: DS.attr("string"),

  availablePieces: function () {
    return [].concat(this.get("playerWhite.pieces"), this.get("playerBlack.pieces"));
  }.property("playerWhite.pieces.@each", "playerBlack.pieces.@each"),
  piecesOnBoard: Ember.computed.filterBy("availablePieces", "spot")
});
