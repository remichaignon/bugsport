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

  var you = this.subject(),
      store = this.store(),
      board,
      opponent;

  assert.ok(!you.get("opponent"), "No opponent by default.");

  Ember.run(function () {
    board = store.createRecord("board", { name: "A" });
    you.setProperties({ board: board, isBlack: false });
  });
  assert.ok(!you.get("opponent"), "No opponent when you're alone at the table.");

  Ember.run(function () {
    opponent = store.createRecord("player", { board: board, isBlack: true });
  });
  assert.equal(you.get("opponent"), opponent, "Your opponent is the player we expect.");
  assert.equal(opponent.get("opponent"), you, "You are your opponent's opponent.");

  Ember.run(function () {
    opponent.set("isBlack", false);
    you.set("isBlack", true);
  });
  assert.equal(you.get("opponent"), opponent, "Your opponent is the player we expect (switch sides).");
  assert.equal(opponent.get("opponent"), you, "You are your opponent's opponent (switch sides).");

  Ember.run(function () {
    board.set("name", "B");
  });
  assert.equal(you.get("opponent"), opponent, "Your opponent is the player we expect (switch board).");
  assert.equal(opponent.get("opponent"), you, "You are your opponent's opponent (switch board).");
});

test("partner", function (assert) {
  assert.expect(6);

  var you = this.subject(),
      store = this.store(),
      game,
      yourBoard,
      otherBoard,
      opponent,
      partner,
      partnersOpponent;

  assert.ok(!you.get("partner"), "No partner by default.");

  Ember.run(function () {
    game = store.createRecord("game");
    yourBoard = store.createRecord("board", { name: "A", game: game });
    otherBoard = store.createRecord("board", { name: "B", game: game });
    you.setProperties({ board: yourBoard, isBlack: false });
    opponent = store.createRecord("player", { board: yourBoard, isBlack: true });
    partnersOpponent = store.createRecord("player", { board: otherBoard, isBlack: false });
  });
  assert.ok(!you.get("partner"), "No partner when everybody but your partner is at the table.");

  Ember.run(function () {
    partner = store.createRecord("player", { board: otherBoard, isBlack: true });
  });
  assert.equal(you.get("partner"), partner, "Your partner is the player we expect.");
  assert.equal(partner.get("partner"), you, "You are your partner's partner.");
  assert.equal(opponent.get("partner"), partnersOpponent, "Your opponent's partner is your partner's opponent.");
  assert.equal(partnersOpponent.get("partner"), opponent, "Your partner's opponent's partner is your opponent.");
});
