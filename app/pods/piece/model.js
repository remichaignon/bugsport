import Ember from "ember";
import DS from 'ember-data';

export default DS.Model.extend({
  player: DS.belongsTo("player"),
  spot: DS.belongsTo("spot"),

  type: DS.attr("string"),
  color: DS.attr("string"),

  board: Ember.computed.alias("spot.board")
});
