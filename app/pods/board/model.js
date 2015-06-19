import Ember from "ember";
import DS from 'ember-data';

export default DS.Model.extend({
  playerWhite: DS.belongsTo("player"),
  playerBlack: DS.belongsTo("player"),

  spots: DS.hasMany("spot"),

  availablePieces: function () {
    return [].concat(this.get("playerWhite.pieces"), this.get("playerBlack.pieces"));
  }.property("playerWhite.pieces.@each", "playerBlack.pieces.@each"),
  piecesOnBoard: Ember.computed.filterBy("availablePieces", "spot"),

  reset: function () {
    if (!this.get("spots")) this.buildBoard();

    // this.store.unloadAll("pieces");
    // this.get("playerWhite").resetPieces();
    // this.get("playerBlack").resetPieces();
  },
  buildBoard: function () {
    var rows = ["1", "2", "3", "4", "5", "6", "7", "8"],
        columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < columns.length; j++) {
        var spot = this.store.createRecord("spot", { id: columns[j] + rows[i] });
        this.get("spots").pushObject(spot);
      }
    }
  }
});
