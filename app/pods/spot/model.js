import DS from 'ember-data';

export default DS.Model.extend({
  board: DS.belongsTo("board", { async: true }),
  piece: DS.belongsTo("piece", { async: true }),

  name: DS.attr("string"),

  isWhite: function () {
    if (!this.get("name")) return true;

    var charToInt = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };

    var index = charToInt[this.get("name")[0]] + parseInt(this.get("name")[1], 10);
    return !(index % 2);
  }.property("name"),
  isBlack: Ember.computed.not("isWhite")
});
