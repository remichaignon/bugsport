import Ember from "ember";
import { moduleFor, test } from "ember-qunit";

moduleFor("route:games/new", "Unit | Route | games/new", {
  needs: ["model:board", "model:game", "model:piece", "model:player", "model:spot", "model:user"]
});

test("it exists", function (assert) {
  assert.expect(1);

  var route = this.subject();
  assert.ok(route);
});

test("model", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("after model", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("create boards for game", function (assert) {
  // assert.expect(6);

  var route = this.subject(),
      store = route.store,
      game,
      boards;

  Ember.run(function () {
    game = store.createRecord("game");
    boards = route._createBoardsForGame(store, game);
  });
  assert.equal(boards.length, 2, "2 records were created.");
  // assert.equal(boards.filterBy("modelName", "board").length, 2, "Both are of `board` type.");
  assert.equal(boards.filterBy("name", "A").length, 1, "1 board with name `A`.");
  assert.equal(boards.filterBy("name", "B").length, 1, "1 board with name `B`.");
  // assert.deepEqual(boards.get("firstObject.game.content"), game, "First board has correct game.");
  // assert.deepEqual(boards.get("lastObject.game.content"), game, "Last board has correct game.");
});

test("create spots for board", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("create players for board", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("create pieces for player", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});

test("set pieces on their spot", function (assert) {
  assert.expect(0);

  // TODO
  var route = this.subject();
});
