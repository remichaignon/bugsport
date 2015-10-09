import DS from "ember-data";

export default DS.Model.extend({
  boards: DS.hasMany("board", { async: true }),

  boardA: function () {
    return this.get("boards").findBy("name", "A");
  }.property("boards.@each.name"),
  boardB: function () {
    return this.get("boards").findBy("name", "B");
  }.property("boards.@each.name"),

  createdAt: DS.attr("date"),
  isOver: DS.attr("boolean", { defaultValue: false }),
  name: DS.attr("string"),

  allPieces: function () {
    return [].concat(
      (this.get("boardA.playerBlack.pieces") || []).toArray(),
      (this.get("boardA.playerWhite.pieces") || []).toArray(),
      (this.get("boardB.playerBlack.pieces") || []).toArray(),
      (this.get("boardB.playerWhite.pieces") || []).toArray()
    );
  }.property("boardA.playerBlack.pieces.@each.type", "boardA.playerWhite.pieces.@each.type", "boardB.playerBlack.pieces.@each.type", "boardB.playerWhite.pieces.@each.type")
});
