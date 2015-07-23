import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("game", "Unit | Model | game", {
  needs: ["model:board", "model:player", "model:spot"]
});

test("it exists", function (assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test("board relationship", function (assert) {
  assert.expect(2);

  var Game = this.store().modelFor("game"),
      relationship = Ember.get(Game, "relationshipsByName").get("boards");

  assert.equal(relationship.key, "boards", "Game's model has a boards key.");
  assert.equal(relationship.kind, "hasMany", "Game's model's boards key is of `hasMany` kind.");
});

test("board A", function (assert) {
  assert.expect(3);

  var model = this.subject(),
      store = this.store(),
      board = null;

  assert.ok(!model.get("boardA"), "No board A by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "A" });

    model.get("boards").addObject(board);
  });
  assert.equal(model.get("boardA"), board, "Same board.");

  Ember.run(function () { board.set("name", "B"); });
  assert.notEqual(model.get("boardA"), board, "Not the same board.");
});

test("board B", function (assert) {
  assert.expect(3);

  var model = this.subject(),
      store = this.store(),
      board = null;

  assert.ok(!model.get("boardB"), "No board B by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "B" });

    model.get("boards").addObject(board);
  });
  assert.equal(model.get("boardB"), board, "Same board.");

  Ember.run(function () { board.set("name", "A"); });
  assert.notEqual(model.get("boardB"), board, "Not the same board.");
});
