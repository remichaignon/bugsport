import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("user", "Unit | Model | user", {
  needs: ["model:board", "model:piece", "model:player"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var model = this.subject();
  assert.ok(!!model, "User model exists.");
});

test("player relationship", function (assert) {
  assert.expect(2);

  var User = this.store().modelFor("user");
  var relationship = Ember.get(User, "relationshipsByName").get("player");

  assert.equal(relationship.key, "player", "User's model has a player key.");
  assert.equal(relationship.kind, "belongsTo", "User's model's player key is of `belongsTo` kind.");
});
