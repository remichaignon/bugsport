import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  game: DS.belongsTo("game", { async: true }),
  players: DS.hasMany("player", { async: true }),
  spots: DS.hasMany("spot", { async: true }),

  name: DS.attr("string"),

  playerWhite: Ember.computed.alias("players.firstObject"),
  playerBlack: Ember.computed.alias("players.lastObject"),

  availablePieces: function () {
    return [].concat(this.get("playerWhite.pieces"), this.get("playerBlack.pieces"));
  }.property("playerWhite.pieces.@each", "playerBlack.pieces.@each"),
  piecesOnBoard: Ember.computed.filterBy("availablePieces", "spot")
});
