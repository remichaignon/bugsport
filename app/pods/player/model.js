import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  board: DS.belongsTo("board", { async: true }),
  pieces: DS.hasMany("piece", { async: true }),

  user: DS.belongsTo("user", { async: true }),

  isBlack: DS.attr("boolean", { defaultValue: false }),
  isWhite: Ember.computed.not("isBlack"),

  opponent: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.player" + color);
  }.property("board.playerBlack", "board.playerWhite", "isWhite"),
  partner: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.otherBoard.player" + color);
  }.property("board.otherBoard.playerBlack", "board.otherBoard.playerWhite", "isWhite")
});
