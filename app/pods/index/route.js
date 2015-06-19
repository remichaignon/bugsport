import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find("game")
      .then(function (games) {
        debugger;
        if (!Ember.isEmpty(games)) return games.get("firstObject");

        return this.store.createRecord("game").save();
      }.bind(this))
      .then(function (game) {
        game.resetBoards();
        return game;
      });
  }
});
