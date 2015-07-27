import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("player", "Unit | Model | player", {
  needs: ["model:board", "model:game", "model:piece", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var model = this.subject();
  assert.ok(!!model);
});

test("board relationship", function (assert) {
  assert.expect(2);

  var Player = this.store().modelFor("player"),
      relationship = Ember.get(Player, "relationshipsByName").get("board");

  assert.equal(relationship.key, "board", "Player's model has a board key.");
  assert.equal(relationship.kind, "belongsTo", "Player's model's board key is of `belongsTo` kind.");
});

test("piece relationship", function (assert) {
  assert.expect(2);

  var Player = this.store().modelFor("player"),
      relationship = Ember.get(Player, "relationshipsByName").get("pieces");

  assert.equal(relationship.key, "pieces", "Player's model has a pieces key.");
  assert.equal(relationship.kind, "hasMany", "Player's model's pieces key is of `hasMany` kind.");
});

test("user relationship", function (assert) {
  assert.expect(2);

  var Player = this.store().modelFor("player"),
      relationship = Ember.get(Player, "relationshipsByName").get("user");

  assert.equal(relationship.key, "user", "Player's model has a user key.");
  assert.equal(relationship.kind, "belongsTo", "Player's model's user key is of `belongsTo` kind.");
});

test("color", function (assert) {
  assert.expect(6);

  var model = this.subject();
  assert.ok(!model.get("isBlack"), "Not black by default.");
  assert.ok(model.get("isWhite"), "White by default.");

  Ember.run(function () { model.set("isBlack", true); });
  assert.ok(model.get("isBlack"), "Player is now black.");
  assert.ok(!model.get("isWhite"), "Player is now not white.");

  Ember.run(function () { model.set("isBlack", false); });
  assert.ok(!model.get("isBlack"), "Player is back to not black.");
  assert.ok(model.get("isWhite"), "Player is back to white.");
});

test("opponent", function (assert) {
  assert.expect(8);

  var model = this.subject(),
      store = this.store(),
      board,
      opponent;

  assert.ok(!model.get("opponent"), "No opponent by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "A" });
    model.setProperties({ board: board, isBlack: false });
  });
  assert.ok(!model.get("opponent"), "No opponent when you're alone at the table.");

  Ember.run(function () {
    opponent = store.createRecord("player", { board: board, isBlack: true });
  });
  assert.equal(model.get("opponent"), opponent, "Opponent is the player we expect.");
  assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent.");

  Ember.run(function () {
    opponent.set("isBlack", false);
    model.set("isBlack", true);
  });
  assert.equal(model.get("opponent"), opponent, "Opponent is the player we expect (switch sides).");
  assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent (switch sides).");

  Ember.run(function () {
    board.set("name", "B");
  });
  assert.equal(model.get("opponent"), opponent, "Opponent exists (switch board).");
  assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent (switch board).");
});

test("partner", function (assert) {
  assert.expect(0);
  // assert.expect(8);
  //
  // var model = this.subject(),
  //     store = this.store(),
  //     board,
  //     partner;
  //
  // assert.ok(!model.get("partner"), "No partner by default.");
  //
  // Ember.run(function () {
  //   board = store.createRecord("board", { name: "A" });
  //   model.setProperties({ board: board, isBlack: false });
  // });
  // assert.ok(!model.get("opponent"), "No opponent when you're alone at the table.");
  //
  // Ember.run(function () {
  //   opponent = store.createRecord("player", { board: board, isBlack: true });
  // });
  // assert.equal(model.get("opponent"), opponent, "Opponent exists.");
  // assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent.");
  //
  // Ember.run(function () {
  //   opponent.set("isBlack", false);
  //   model.set("isBlack", true);
  // });
  // assert.equal(model.get("opponent"), opponent, "Opponent exists (switch sides).");
  // assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent (switch sides).");
  //
  // Ember.run(function () {
  //   board.set("name", "B");
  // });
  // assert.equal(model.get("opponent"), opponent, "Opponent exists (switch board).");
  // assert.equal(opponent.get("opponent"), model, "You are your opponent's opponent (switch board).");
});
