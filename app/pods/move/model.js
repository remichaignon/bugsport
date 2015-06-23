import DS from 'ember-data';

export default DS.Model.extend({
  player: DS.belongsTo("player", { async: true }),
  piece: DS.belongsTo("piece", { async: true }),
  previousSpot: DS.belongsTo("spot", { async: true }),
  newSpot: DS.belongsTo("spot", { async: true }),

  madeAt: DS.attr("date")
});
