import DS from "ember-data";

export default DS.Model.extend({
  board: DS.belongsTo("board", { async: true }),
  pieces: DS.hasMany("piece", { async: true }),

  isWhite: function () {
    return this === this.get("board.playerWhite");
  }.property("board.playerWhite"),
  isBlack: function () {
    return this === this.get("board.playerBlack");
  }.property("board.playerBlack"),

  partner: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.otherBoard.player" + color);
  }.property("board.players.@each", "isWhite"),
  opponent: function () {
    var color = this.get("isWhite") ? "Black" : "White";

    return this.get("board.player" + color);
  }.property("board.players.@each", "isWhite")
});
