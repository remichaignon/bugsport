import Ember from "ember";
import DS from 'ember-data';

export default DS.Model.extend({
  board: DS.belongsTo("board"),
  moveHistory: DS.hasMany("move"),

  name: DS.attr("string"),

  isWhite: Ember.computed.equal("name", "board.playerWhite.name"),
  isBlack: Ember.computed.equal("name", "board.playerBlack.name")
});
