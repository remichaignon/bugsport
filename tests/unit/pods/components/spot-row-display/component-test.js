import { moduleForComponent, test } from "ember-qunit";

moduleForComponent("spot-row-display", "Unit | Component | spot row display", {
  needs: ["component:spot-display"],
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
