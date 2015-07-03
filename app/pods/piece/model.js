import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  player: DS.belongsTo("player", { async: true }),
  spot: DS.belongsTo("spot", { async: true }),

  type: DS.attr("string"),

  board: Ember.computed.alias("spot.board"),

  isPawn: Ember.computed.equal("type", "pawn"),
  isRook: Ember.computed.equal("type", "rook"),
  isKnight: Ember.computed.equal("type", "knight"),
  isBishop: Ember.computed.equal("type", "bishop"),
  isQueen: Ember.computed.equal("type", "queen"),
  isKing: Ember.computed.equal("type", "king"),

  isWhite: Ember.computed.alias("player.isWhite"),
  isBlack: Ember.computed.not("isWhite")
});
