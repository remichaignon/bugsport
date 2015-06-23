import DS from 'ember-data';

export default DS.Model.extend({
  board: DS.belongsTo("board", { async: true }),
  piece: DS.belongsTo("piece", { async: true }),

  name: DS.attr("string")
});
