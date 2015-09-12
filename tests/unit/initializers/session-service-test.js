import Ember from "ember";
import { initialize } from "bugsport/initializers/session-service";
import { expect, module, test } from "qunit";

var container, application;

module("Unit | Initializer | session service", {
  beforeEach: function () {
    Ember.run(function () {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test("inject", function (assert) {
  assert.expect(3);

  application.register("service:session", Ember.Object);
  application.register("component:test", Ember.Object);
  application.register("controller:test", Ember.Object);
  application.register("route:test", Ember.Object);

  initialize(container, application);

  assert.ok(container.lookup("component:test").session, "Session service is injected onto components.");
  assert.ok(container.lookup("controller:test").session, "Session service is injected onto controller.");
  assert.ok(container.lookup("route:test").session, "Session service is injected onto routes.");
});
