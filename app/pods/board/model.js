import DS from "ember-data";

export default DS.Model.extend({
  game: DS.belongsTo("game", { async: true }),
  players: DS.hasMany("player", { async: true }),
  spots: DS.hasMany("spot", { async: true }),

  name: DS.attr("string"),

  otherBoard: function () {
    var name = (this.get("name") === "A") ? "B" : "A";

    return this.get("game.board" + name);
  }.property("game.boardA", "game.boardB"),

  playerBlack: function () {
    return this.get("players").findBy("isBlack", true);
  }.property("players.@each.isBlack"),
  playerWhite: function () {
    return this.get("players").findBy("isWhite", true);
  }.property("players.@each.isWhite")
});
