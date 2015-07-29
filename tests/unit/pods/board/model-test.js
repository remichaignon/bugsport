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
  assert.expect(7);

  var myBoard = this.subject(),
      store = this.store(),
      otherBoard;

  assert.ok(!myBoard.get("otherBoard"), "My board has no other board by default.");

  Ember.run(function () {
    var game = store.createRecord("game");
    otherBoard = store.createRecord("board", { name: "B", game: game });

    myBoard.setProperties({ name: "A", game: game });
  });
  assert.notEqual(myBoard, myBoard.get("otherBoard"), "My board is not the other board.");
  assert.equal(myBoard.get("otherBoard"), otherBoard, "My board's other board is the one we expect.");
  assert.equal(otherBoard.get("otherBoard"), myBoard, "Other board's other board is my board.");

  Ember.run(function () {
    otherBoard.set("name", "A");
    myBoard.set("name", "B");
  });
  assert.notEqual(myBoard, myBoard.get("otherBoard"), "My board is not other board (switch boards).");
  assert.equal(myBoard.get("otherBoard"), otherBoard, "My board's other board is the one we expect (swtich boards).");
  assert.equal(otherBoard.get("otherBoard"), myBoard, "Other board's other board is my board (swtich boards).");
});

test("player black", function (assert) {
  assert.expect(0);

  // TODO
});

test("player white", function (assert) {
  assert.expect(0);

  // TODO
});
