webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/values */ "./node_modules/@babel/runtime-corejs2/core-js/object/values.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next-server/head */ "./node_modules/next-server/head.js");
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_server_head__WEBPACK_IMPORTED_MODULE_14__);















 // import { Near } from 'nearlib'

var contractId = "metanear";
var appTitle = "Meta NEAR";
var baseUrl = "http://localhost:3000";

var locationKey = function locationKey(location) {
  return _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11___default()(location);
};

var cellKey = function cellKey(cell) {
  return locationKey(cell.location);
};

var Grid =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this), "onMouseMove", function (e) {
      _this.props.onHighlight(Math.floor(e.offsetX / _this.props.cellWidth), Math.floor(e.offsetY / _this.props.cellHeight));
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(Grid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this2 = this;

      var canvas = this.refs.canvas;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.props.width, this.props.height);
      ctx.fillStyle = "#FF0000";

      for (var i = 0; i < this.props.width / this.props.cellWidth; ++i) {
        ctx.beginPath();
        ctx.moveTo(i * this.props.cellWidth, 0);
        ctx.lineTo(i * this.props.cellWidth, this.props.height);
        ctx.stroke();
      }

      for (var _i = 0; _i < this.props.height / this.props.cellHeight; ++_i) {
        ctx.beginPath();
        ctx.moveTo(0, _i * this.props.cellHeight);
        ctx.lineTo(this.props.width, _i * this.props.cellHeight);
        ctx.stroke();
      }

      _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_3___default()(this.props.allCells).forEach(function (cell) {
        if (cellKey(cell) in _this2.props.cells) {
          return;
        }

        ctx.fillStyle = ["rgba(124, 252, 0, 0.4)", "rgba(124, 252, 0, 0.3)", "rgba(124, 252, 0, 0.2)", "rgba(124, 252, 0, 0.1)", "#FF6666"][cell.viewIndex];
        ctx.fillRect(cell.location.x * _this2.props.cellWidth, cell.location.y * _this2.props.cellHeight, _this2.props.cellWidth, _this2.props.cellHeight);
      });

      _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_3___default()(this.props.cells).forEach(function (cell) {
        ctx.fillStyle = ["rgba(124, 252, 0, 1)", "rgba(124, 252, 0, 0.9)", "rgba(124, 252, 0, 0.8)", "rgba(124, 252, 0, 0.7)", "#FF6666"][cell.viewIndex];
        ctx.fillRect(cell.location.x * _this2.props.cellWidth, cell.location.y * _this2.props.cellHeight, _this2.props.cellWidth, _this2.props.cellHeight);
      });

      ctx.beginPath();
      ctx.arc((this.props.playerX + 0.5) * this.props.cellWidth, (this.props.playerY + 0.5) * this.props.cellHeight, this.props.cellWidth / 2 - 3, 0, 2 * Math.PI);
      ctx.stroke();
      document.addEventListener('mousemove', this.onMouseMove, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.onMouseMove, false);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("canvas", {
        ref: "canvas",
        width: this.props.width,
        height: this.props.height,
        onClick: this.props.onClick
      });
    }
  }]);

  return Grid;
}(react__WEBPACK_IMPORTED_MODULE_12___default.a.Component);

var WalletLogin =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(WalletLogin, _React$Component2);

  function WalletLogin() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, WalletLogin);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(WalletLogin).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(WalletLogin, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        id: "sign-in-container"
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("h2", null, " Hello stranger! Who are you?"), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        id: "login-form"
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "col-md-4"
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("button", {
        onClick: this.props.onClick,
        id: "login-button",
        className: "btn btn-lg btn-block btn-primary"
      }, "Login with NEAR Wallet"))));
    }
  }]);

  return WalletLogin;
}(react__WEBPACK_IMPORTED_MODULE_12___default.a.Component);

var WalletLogout =
/*#__PURE__*/
function (_React$Component3) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(WalletLogout, _React$Component3);

  function WalletLogout() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, WalletLogout);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(WalletLogout).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(WalletLogout, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        id: "hello"
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("h2", {
        id: "hello"
      }, "Hi, ", this.props.accountId, "!"));
    }
  }]);

  return WalletLogout;
}(react__WEBPACK_IMPORTED_MODULE_12___default.a.Component);

var MiniGameView =
/*#__PURE__*/
function (_React$Component4) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(MiniGameView, _React$Component4);

  function MiniGameView() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, MiniGameView);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(MiniGameView).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(MiniGameView, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("iframe", {
        src: this.props.url,
        width: 640,
        height: 480
      });
    }
  }]);

  return MiniGameView;
}(react__WEBPACK_IMPORTED_MODULE_12___default.a.Component);

var Game =
/*#__PURE__*/
function (_React$Component5) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(Game, _React$Component5);

  function Game(props) {
    var _this3;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Game);

    _this3 = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Game).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "fetchCells",
    /*#__PURE__*/
    function () {
      var _ref = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(accountId) {
        var view, cells;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this3.contract.lookAround({
                  accountId: accountId
                });

              case 2:
                view = _context.sent;
                console.log(view);
                cells = {};

                if (view.cells) {
                  view.cells.forEach(function (cell) {
                    cells[cellKey(cell)] = cell;
                  });
                }

                _this3.setState({
                  cells: cells,
                  allCells: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_this3.state.allCells, cells)
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "nearConnect",
    /*#__PURE__*/
    Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
    /*#__PURE__*/
    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var accountId, near, player;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this3.walletAccount = new nearlib.WalletAccount(contractId, "https://wallet.nearprotocol.com/");
              accountId = _this3.walletAccount.getAccountId();
              console.log(accountId);
              near = new nearlib.Near(new nearlib.NearClient(_this3.walletAccount, new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet")));
              _context2.next = 6;
              return near.loadContract(contractId, {
                viewMethods: ["lookAround", "getPlayer"],
                changeMethods: ["move", "deploy"],
                sender: accountId
              });

            case 6:
              _this3.contract = _context2.sent;
              window.contract = _this3.contract;
              _context2.next = 10;
              return _this3.fetchCells(accountId);

            case 10:
              if (!accountId) {
                _context2.next = 16;
                break;
              }

              _context2.next = 13;
              return _this3.contract.getPlayer({
                accountId: accountId
              });

            case 13:
              player = _context2.sent;
              console.log(player);

              _this3.setState({
                player: player
              });

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "onHighlight", function (x, y) {
      var highlighCell = _this3.state.allCells[locationKey({
        x: x,
        y: y
      })] || {};

      _this3.setState({
        highlighCell: highlighCell
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "login", function () {
      _this3.walletAccount.requestSignIn(contractId, appTitle);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "logout", function () {});

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this3), "movePlayer", function () {
      var dx = 0;
      var dy = 0;

      if (Math.abs(_this3.state.player.location.x - _this3.state.highlighCell.location.x) == 1) {
        dx = _this3.state.player.location.x > _this3.state.highlighCell.location.x ? -1 : 1;
      } else if (Math.abs(_this3.state.player.location.y - _this3.state.highlighCell.location.y) == 1) {
        dy = _this3.state.player.location.y > _this3.state.highlighCell.location.y ? -1 : 1;
      }

      _this3.contract.move({
        dx: dx,
        dy: dy
      }).then(function () {
        var accountId = _this3.walletAccount.getAccountId();

        _this3.contract.getPlayer({
          accountId: accountId
        }).then(
        /*#__PURE__*/
        function () {
          var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
          /*#__PURE__*/
          _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(player) {
            return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log(player);

                    _this3.setState({
                      player: player
                    });

                    _context3.next = 4;
                    return _this3.fetchCells(accountId);

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x2) {
            return _ref3.apply(this, arguments);
          };
        }());
      });
    });

    _this3.state = {
      cells: {},
      allCells: {},
      highlighCell: {},
      player: null
    };
    _this3.walletAccount = null;
    return _this3;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.nearConnect();
    }
  }, {
    key: "render",
    value: function render() {
      var control;

      if (this.walletAccount && this.walletAccount.isSignedIn()) {
        control = react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(WalletLogout, {
          accountId: this.walletAccount.getAccountId(),
          onClick: this.logout
        });
      } else {
        control = react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(WalletLogin, {
          onClick: this.login
        });
      }

      var cell = null;

      if (this.state.player) {
        cell = this.state.cells[locationKey(this.state.player.location)];
      }

      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", null, control, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(Grid, {
        width: 640,
        height: 425,
        cellWidth: 20,
        cellHeight: 20,
        cells: this.state.cells,
        allCells: this.state.allCells,
        onHighlight: this.onHighlight,
        playerX: this.state.player && this.state.player.location.x,
        playerY: this.state.player && this.state.player.location.y,
        onClick: this.movePlayer
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", null, "Highlighted cell: ", _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11___default()(this.state.highlighCell)), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", null, "Player: ", _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_11___default()(this.state.player)), cell && react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(MiniGameView, {
        url: cell.webUrl,
        contractId: cell.contractId
      }));
    }
  }]);

  return Game;
}(react__WEBPACK_IMPORTED_MODULE_12___default.a.Component);

function Index() {
  return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(next_server_head__WEBPACK_IMPORTED_MODULE_14___default.a, null, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("script", {
    src: "https://cdn.jsdelivr.net/npm/nearlib@0.4.2/dist/nearlib.js"
  })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(Game, null)));
}

/***/ })

})
//# sourceMappingURL=index.js.a8aeedb70e4af6ad0e12.hot-update.js.map