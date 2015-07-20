import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  board: DS.belongsTo("board", { async: true }),
  pieces: DS.hasMany("piece", { async: true }),

  user: DS.belongsTo("user", { async: true }),

  isBlack: false,
  isWhite: Ember.computed.not("isBlack"),

  partner: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.otherBoard.player" + color);
  }.property("board.players.@each", "isWhite"),
  opponent: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.player" + color);
  }.property("board.players.@each", "isWhite")
});
