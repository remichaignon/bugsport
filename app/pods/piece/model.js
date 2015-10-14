import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  player: DS.belongsTo("player", { async: true }),
  spot: DS.belongsTo("spot", { async: true }),

  type: DS.attr("string"),
  isPawn: Ember.computed.equal("type", "pawn"),
  isRook: Ember.computed.equal("type", "rook"),
  isKnight: Ember.computed.equal("type", "knight"),
  isBishop: Ember.computed.equal("type", "bishop"),
  isQueen: Ember.computed.equal("type", "queen"),
  isKing: Ember.computed.equal("type", "king"),

  board: Ember.computed.alias("spot.board"),

  isBlack: Ember.computed.alias("player.isBlack"),
  isWhite: Ember.computed.alias("player.isWhite"),

  selected: false,

  canGoTo: function (spot) {
    if (this.get("spot.id")) {
      return this.canMoveTo(spot);
    }

    return this.canDropTo(spot);
  },
  canMoveTo: function (spot) {
    if (!this.get("type")) { return false; }

    var method = "_canMove" + this.get("type").capitalize() + "To";
    return this[method](spot);
  },
  canDropTo: function (spot) {
    if (!this.get("type")) { return false; }

    var method = "_canDrop" + this.get("type").capitalize() + "To";
    return this[method](spot);
  },

  _canMovePawnTo: function (spot) { return !!spot; },
  _canMoveRookTo: function (spot) { return !!spot; },
  _canMoveKnightTo: function (spot) { return !!spot; },
  _canMoveBishopTo: function (spot) { return !!spot; },
  _canMoveQueenTo: function (spot) { return !!spot; },
  _canMoveKingTo: function (spot) { return !!spot; },

  _canDropPawnTo: function (spot) { return !!spot; },
  _canDropRookTo: function (spot) { return !!spot; },
  _canDropKnightTo: function (spot) { return !!spot; },
  _canDropBishopTo: function (spot) { return !!spot; },
  _canDropQueenTo: function (spot) { return !!spot; },
  _canDropKingTo: function (spot) { return !!spot; }
});
