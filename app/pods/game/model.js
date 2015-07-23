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
  name: DS.attr("string")
});
