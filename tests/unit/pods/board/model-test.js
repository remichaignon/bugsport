import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("board", "Unit | Model | board", {
  needs: ["model:game", "model:piece", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test("game relationship", function (assert) {
  assert.expect(2);

  var Board = this.store().modelFor("board"),
      relationship = Ember.get(Board, "relationshipsByName").get("game");

  assert.equal(relationship.key, "game", "Board's model has a game key.");
  assert.equal(relationship.kind, "belongsTo", "Board's model's game key is of `belongsTo` kind.");
});

test("players relationship", function (assert) {
  assert.expect(2);

  var Board = this.store().modelFor("board"),
      relationship = Ember.get(Board, "relationshipsByName").get("players");

  assert.equal(relationship.key, "players", "Board's model has a players key.");
  assert.equal(relationship.kind, "hasMany", "Board's model's players key is of `hasMany` kind.");
});

test("spots relationship", function (assert) {
  assert.expect(2);

  var Board = this.store().modelFor("board"),
      relationship = Ember.get(Board, "relationshipsByName").get("spots");

  assert.equal(relationship.key, "spots", "Board's model has a spots key.");
  assert.equal(relationship.kind, "hasMany", "Board's model's spots key is of `hasMany` kind.");
});

test("other board", function (assert) {
  assert.expect(5);

  var model = this.subject(),
      store = this.store(),
      otherBoard;

  assert.ok(!model.get("otherBoard"), "No other board by default.");

  Ember.run(function () {
    var game = store.createRecord("game");
    otherBoard = store.createRecord("board", { name: "B", game: game });

    model.setProperties({ name: "A", game: game });
  });
  assert.equal(model.get("otherBoard"), otherBoard, "Model's other board is other board.");
  assert.equal(otherBoard.get("otherBoard"), model, "Other board's other board is model.");

  Ember.run(function () {
    otherBoard.set("name", "A");
    model.set("name", "B");
  });
  assert.equal(model.get("otherBoard"), otherBoard, "Model's other board is still other board.");
  assert.equal(otherBoard.get("otherBoard"), model, "Other board's other board is still model.");
});

test("player black", function (assert) {
  assert.expect(0);

  // TODO
});

test("player white", function (assert) {
  assert.expect(0);

  // TODO
});
