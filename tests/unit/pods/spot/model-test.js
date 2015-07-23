import Ember from "ember";
import { moduleForModel, test } from "ember-qunit";

moduleForModel("spot", "Unit | Model | spot", {
  needs: ["model:board", "model:game", "model:piece", "model:player"]
});

test("it exists", function(assert) {
  assert.expect(1);

  var model = this.subject();
  assert.ok(!!model);
});

test("board relationship", function (assert) {
  assert.expect(2);

  var Spot = this.store().modelFor("spot"),
      relationship = Ember.get(Spot, "relationshipsByName").get("board");

  assert.equal(relationship.key, "board", "Spot's model has a board key.");
  assert.equal(relationship.kind, "belongsTo", "Spot's model's board key is of `belongsTo` kind.");
});

test("piece relationship", function (assert) {
  assert.expect(2);

  var Spot = this.store().modelFor("spot"),
      relationship = Ember.get(Spot, "relationshipsByName").get("piece");

  assert.equal(relationship.key, "piece", "Spot's model has a piece key.");
  assert.equal(relationship.kind, "belongsTo", "Spot's model's piece key is of `belongsTo` kind.");
});

test("color", function (assert) {
  assert.expect(130);

  var model = this.subject();
  assert.ok(model.get("isBlack"), "Black by default");
  assert.ok(!model.get("isWhite"), "Not white by default");

  Ember.run(function () { model.set("name", "A1"); });
  assert.ok(model.get("isBlack"), "A1 is black.");
  assert.ok(!model.get("isWhite"), "A1 is not white.");

  Ember.run(function () { model.set("name", "A2"); });
  assert.ok(!model.get("isBlack"), "A2 is not black.");
  assert.ok(model.get("isWhite"), "A2 is white.");

  Ember.run(function () { model.set("name", "A3"); });
  assert.ok(model.get("isBlack"), "A3 is black.");
  assert.ok(!model.get("isWhite"), "A3 is not white.");

  Ember.run(function () { model.set("name", "A4"); });
  assert.ok(!model.get("isBlack"), "A4 is not black.");
  assert.ok(model.get("isWhite"), "A4 is white.");

  Ember.run(function () { model.set("name", "A5"); });
  assert.ok(model.get("isBlack"), "A5 is black.");
  assert.ok(!model.get("isWhite"), "A5 is not white.");

  Ember.run(function () { model.set("name", "A6"); });
  assert.ok(!model.get("isBlack"), "A6 is not black.");
  assert.ok(model.get("isWhite"), "A6 is white.");

  Ember.run(function () { model.set("name", "A7"); });
  assert.ok(model.get("isBlack"), "A7 is black.");
  assert.ok(!model.get("isWhite"), "A7 is not white.");

  Ember.run(function () { model.set("name", "A8"); });
  assert.ok(!model.get("isBlack"), "A8 is not black.");
  assert.ok(model.get("isWhite"), "A8 is white.");

  Ember.run(function () { model.set("name", "B1"); });
  assert.ok(!model.get("isBlack"), "B1 is not black.");
  assert.ok(model.get("isWhite"), "B1 is white.");

  Ember.run(function () { model.set("name", "B2"); });
  assert.ok(model.get("isBlack"), "B2 is black.");
  assert.ok(!model.get("isWhite"), "B2 is not white.");

  Ember.run(function () { model.set("name", "B3"); });
  assert.ok(!model.get("isBlack"), "B3 is not black.");
  assert.ok(model.get("isWhite"), "B3 is white.");

  Ember.run(function () { model.set("name", "B4"); });
  assert.ok(model.get("isBlack"), "B4 is black.");
  assert.ok(!model.get("isWhite"), "B4 is not white.");

  Ember.run(function () { model.set("name", "B5"); });
  assert.ok(!model.get("isBlack"), "B5 is not black.");
  assert.ok(model.get("isWhite"), "B5 is white.");

  Ember.run(function () { model.set("name", "B6"); });
  assert.ok(model.get("isBlack"), "B6 is black.");
  assert.ok(!model.get("isWhite"), "B6 is not white.");

  Ember.run(function () { model.set("name", "B7"); });
  assert.ok(!model.get("isBlack"), "B7 is not black.");
  assert.ok(model.get("isWhite"), "B7 is white.");

  Ember.run(function () { model.set("name", "B8"); });
  assert.ok(model.get("isBlack"), "B8 is black.");
  assert.ok(!model.get("isWhite"), "B8 is not white.");

  Ember.run(function () { model.set("name", "C1"); });
  assert.ok(model.get("isBlack"), "C1 is black.");
  assert.ok(!model.get("isWhite"), "C1 is not white.");

  Ember.run(function () { model.set("name", "C2"); });
  assert.ok(!model.get("isBlack"), "C2 is not black.");
  assert.ok(model.get("isWhite"), "C2 is white.");

  Ember.run(function () { model.set("name", "C3"); });
  assert.ok(model.get("isBlack"), "C3 is black.");
  assert.ok(!model.get("isWhite"), "C3 is not white.");

  Ember.run(function () { model.set("name", "C4"); });
  assert.ok(!model.get("isBlack"), "C4 is not black.");
  assert.ok(model.get("isWhite"), "C4 is white.");

  Ember.run(function () { model.set("name", "C5"); });
  assert.ok(model.get("isBlack"), "C5 is black.");
  assert.ok(!model.get("isWhite"), "C5 is not white.");

  Ember.run(function () { model.set("name", "C6"); });
  assert.ok(!model.get("isBlack"), "C6 is not black.");
  assert.ok(model.get("isWhite"), "C6 is white.");

  Ember.run(function () { model.set("name", "C7"); });
  assert.ok(model.get("isBlack"), "C7 is black.");
  assert.ok(!model.get("isWhite"), "C7 is not white.");

  Ember.run(function () { model.set("name", "C8"); });
  assert.ok(!model.get("isBlack"), "C8 is not black.");
  assert.ok(model.get("isWhite"), "C8 is white.");

  Ember.run(function () { model.set("name", "D1"); });
  assert.ok(!model.get("isBlack"), "D1 is not black.");
  assert.ok(model.get("isWhite"), "D1 is white.");

  Ember.run(function () { model.set("name", "D2"); });
  assert.ok(model.get("isBlack"), "D2 is black.");
  assert.ok(!model.get("isWhite"), "D2 is not white.");

  Ember.run(function () { model.set("name", "D3"); });
  assert.ok(!model.get("isBlack"), "D3 is not black.");
  assert.ok(model.get("isWhite"), "D3 is white.");

  Ember.run(function () { model.set("name", "D4"); });
  assert.ok(model.get("isBlack"), "D4 is black.");
  assert.ok(!model.get("isWhite"), "D4 is not white.");

  Ember.run(function () { model.set("name", "D5"); });
  assert.ok(!model.get("isBlack"), "D5 is not black.");
  assert.ok(model.get("isWhite"), "D5 is white.");

  Ember.run(function () { model.set("name", "D6"); });
  assert.ok(model.get("isBlack"), "D6 is black.");
  assert.ok(!model.get("isWhite"), "D6 is not white.");

  Ember.run(function () { model.set("name", "D7"); });
  assert.ok(!model.get("isBlack"), "D7 is not black.");
  assert.ok(model.get("isWhite"), "D7 is white.");

  Ember.run(function () { model.set("name", "D8"); });
  assert.ok(model.get("isBlack"), "D8 is black.");
  assert.ok(!model.get("isWhite"), "D8 is not white.");

  Ember.run(function () { model.set("name", "E1"); });
  assert.ok(model.get("isBlack"), "E1 is black.");
  assert.ok(!model.get("isWhite"), "E1 is not white.");

  Ember.run(function () { model.set("name", "E2"); });
  assert.ok(!model.get("isBlack"), "E2 is not black.");
  assert.ok(model.get("isWhite"), "E2 is white.");

  Ember.run(function () { model.set("name", "E3"); });
  assert.ok(model.get("isBlack"), "E3 is black.");
  assert.ok(!model.get("isWhite"), "E3 is not white.");

  Ember.run(function () { model.set("name", "E4"); });
  assert.ok(!model.get("isBlack"), "E4 is not black.");
  assert.ok(model.get("isWhite"), "E4 is white.");

  Ember.run(function () { model.set("name", "E5"); });
  assert.ok(model.get("isBlack"), "E5 is black.");
  assert.ok(!model.get("isWhite"), "E5 is not white.");

  Ember.run(function () { model.set("name", "E6"); });
  assert.ok(!model.get("isBlack"), "E6 is not black.");
  assert.ok(model.get("isWhite"), "E6 is white.");

  Ember.run(function () { model.set("name", "E7"); });
  assert.ok(model.get("isBlack"), "E7 is black.");
  assert.ok(!model.get("isWhite"), "E7 is not white.");

  Ember.run(function () { model.set("name", "E8"); });
  assert.ok(!model.get("isBlack"), "E8 is not black.");
  assert.ok(model.get("isWhite"), "E8 is white.");

  Ember.run(function () { model.set("name", "F1"); });
  assert.ok(!model.get("isBlack"), "F1 is not black.");
  assert.ok(model.get("isWhite"), "F1 is white.");

  Ember.run(function () { model.set("name", "F2"); });
  assert.ok(model.get("isBlack"), "F2 is black.");
  assert.ok(!model.get("isWhite"), "F2 is not white.");

  Ember.run(function () { model.set("name", "F3"); });
  assert.ok(!model.get("isBlack"), "F3 is not black.");
  assert.ok(model.get("isWhite"), "F3 is white.");

  Ember.run(function () { model.set("name", "F4"); });
  assert.ok(model.get("isBlack"), "F4 is black.");
  assert.ok(!model.get("isWhite"), "F4 is not white.");

  Ember.run(function () { model.set("name", "F5"); });
  assert.ok(!model.get("isBlack"), "F5 is not black.");
  assert.ok(model.get("isWhite"), "F5 is white.");

  Ember.run(function () { model.set("name", "F6"); });
  assert.ok(model.get("isBlack"), "F6 is black.");
  assert.ok(!model.get("isWhite"), "F6 is not white.");

  Ember.run(function () { model.set("name", "F7"); });
  assert.ok(!model.get("isBlack"), "F7 is not black.");
  assert.ok(model.get("isWhite"), "F7 is white.");

  Ember.run(function () { model.set("name", "F8"); });
  assert.ok(model.get("isBlack"), "F8 is black.");
  assert.ok(!model.get("isWhite"), "F8 is not white.");

  Ember.run(function () { model.set("name", "G1"); });
  assert.ok(model.get("isBlack"), "G1 is black.");
  assert.ok(!model.get("isWhite"), "G1 is not white.");

  Ember.run(function () { model.set("name", "G2"); });
  assert.ok(!model.get("isBlack"), "G2 is not black.");
  assert.ok(model.get("isWhite"), "G2 is white.");

  Ember.run(function () { model.set("name", "G3"); });
  assert.ok(model.get("isBlack"), "G3 is black.");
  assert.ok(!model.get("isWhite"), "G3 is not white.");

  Ember.run(function () { model.set("name", "G4"); });
  assert.ok(!model.get("isBlack"), "G4 is not black.");
  assert.ok(model.get("isWhite"), "G4 is white.");

  Ember.run(function () { model.set("name", "G5"); });
  assert.ok(model.get("isBlack"), "G5 is black.");
  assert.ok(!model.get("isWhite"), "G5 is not white.");

  Ember.run(function () { model.set("name", "G6"); });
  assert.ok(!model.get("isBlack"), "G6 is not black.");
  assert.ok(model.get("isWhite"), "G6 is white.");

  Ember.run(function () { model.set("name", "G7"); });
  assert.ok(model.get("isBlack"), "G7 is black.");
  assert.ok(!model.get("isWhite"), "G7 is not white.");

  Ember.run(function () { model.set("name", "G8"); });
  assert.ok(!model.get("isBlack"), "G8 is not black.");
  assert.ok(model.get("isWhite"), "G8 is white.");

  Ember.run(function () { model.set("name", "H1"); });
  assert.ok(!model.get("isBlack"), "H1 is not black.");
  assert.ok(model.get("isWhite"), "H1 is white.");

  Ember.run(function () { model.set("name", "H2"); });
  assert.ok(model.get("isBlack"), "H2 is black.");
  assert.ok(!model.get("isWhite"), "H2 is not white.");

  Ember.run(function () { model.set("name", "H3"); });
  assert.ok(!model.get("isBlack"), "H3 is not black.");
  assert.ok(model.get("isWhite"), "H3 is white.");

  Ember.run(function () { model.set("name", "H4"); });
  assert.ok(model.get("isBlack"), "H4 is black.");
  assert.ok(!model.get("isWhite"), "H4 is not white.");

  Ember.run(function () { model.set("name", "H5"); });
  assert.ok(!model.get("isBlack"), "H5 is not black.");
  assert.ok(model.get("isWhite"), "H5 is white.");

  Ember.run(function () { model.set("name", "H6"); });
  assert.ok(model.get("isBlack"), "H6 is black.");
  assert.ok(!model.get("isWhite"), "H6 is not white.");

  Ember.run(function () { model.set("name", "H7"); });
  assert.ok(!model.get("isBlack"), "H7 is not black.");
  assert.ok(model.get("isWhite"), "H7 is white.");

  Ember.run(function () { model.set("name", "H8"); });
  assert.ok(model.get("isBlack"), "H8 is black.");
  assert.ok(!model.get("isWhite"), "H8 is not white.");
});
