import { moduleForComponent, test } from "ember-qunit";

moduleForComponent("player-display", "Unit | Component | player display", {
  needs: ["component:piece-display"],
  unit: true
});

test("it renders", function (assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, "preRender");

  // Renders the component to the page
  this.render();
  assert.equal(component._state, "inDOM");
});
