import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.find("game", params.game_id);
  // },
  // setupController: function (controller, model) {
  //   debugger;
  //   controller.set("model", model);
  }
});
