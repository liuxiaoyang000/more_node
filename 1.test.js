'use strict';

var gen = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var a, _b, c;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return move($('.box1'), 300);

          case 3:
            a = _context.sent;
            _context.next = 6;
            return 1;

          case 6:
            _b = _context.sent;
            throw 199;

          case 10:
            c = _context.sent;
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);

            console.log('catch e');

          case 16:
            return _context.abrupt('return', b);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function gen() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        // key => next
        try {
          var info = gen[key](arg); // it.next()
          var value = info.value;
        } catch (error) {
          reject(error); return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      } 
      return step("next");
    });
  };
}