import DS from 'ember-data';

export default DS.Model.extend({
  player: DS.belongsTo("player"),
  piece: DS.belongsTo("piece"),
  previousSpot: DS.belongsTo("spot"),
  newSpot: DS.belongsTo("spot"),

  madeAt: DS.attr("date")
});
