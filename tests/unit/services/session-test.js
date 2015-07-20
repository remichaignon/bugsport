import { moduleFor, test } from "ember-qunit";

moduleFor("service:session", "Unit | Service | session");

test("it exists", function (assert) {
  assert.expect(1);

  var service = this.subject();
  assert.ok(!!service, "Session service exists.");
});
