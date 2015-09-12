import Ember from "ember";
import { moduleFor, test } from "ember-qunit";

moduleFor("route:application", "Unit | Route | application");

test("it exists", function (assert) {
  var route = this.subject();
  assert.ok(route);
});

test("create user session", function (assert) {
  assert.expect(3);

  /* jshint ignore:start */
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  //  Phantomjs does not have Function.prototype.bind implemented.
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      if (this.prototype) {
        // native functions don't have a prototype
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  /* jshint ignore:end */

  var User = Ember.Object.extend({ save: function () { return Ember.RSVP.resolve(this); } }),
      route = this.subject({
        store: { createRecord: function (type) { return User.create({ type: type, id: 5 }); } },
        session: Ember.Object.create()
      });

  route.model()
    .then(function () {
      var user = route.session.get("user");
      assert.ok(user, "Session has a user.");
      assert.equal(user.get("type"), "user", "The user is of correct type.");
      assert.equal(user.get("id"), 5, "The user has the correct id.");
    });
});
