import Ember from "ember";

export default Ember.Component.extend({
  model: null,

  classNames: ["spot"],
  classNameBindings: ["model.isBlack:black:white"]
});
