import Ember from "ember";
import DS from 'ember-data';

export default DS.Model.extend({
  boardA: DS.belongsTo("board"),
  boardB: DS.belongsTo("board"),

  playerAWhite: Ember.computed.alias("boardA.playerWhite"),
  playerABlack: Ember.computed.alias("boardA.playerBlack"),
  playerBWhite: Ember.computed.alias("boardB.playerWhite"),
  playerBBlack: Ember.computed.alias("boardB.playerBlack"),

  resetBoards: function () {
    if (!this.get("boardA")) this.set("boardA", this.store.createRecord("board"));
    if (!this.get("boardB")) this.set("boardB", this.store.createRecord("board"));

    this.get("boardA").reset();
    this.get("boardB").reset();
  }
});
