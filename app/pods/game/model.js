import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  boards: DS.hasMany("board", { async: true }),
  boardA: Ember.computed.alias("boards.firstObject"),
  boardB: Ember.computed.alias("boards.lastObject"),

  name: DS.attr("string"),
  createdAt: DS.attr("date"),

  playerAWhite: Ember.computed.alias("boardA.playerWhite"),
  playerABlack: Ember.computed.alias("boardA.playerBlack"),
  playerBWhite: Ember.computed.alias("boardB.playerWhite"),
  playerBBlack: Ember.computed.alias("boardB.playerBlack")
});
