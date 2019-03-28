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
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next-server/head */ "./node_modules/next-server/head.js");
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_server_head__WEBPACK_IMPORTED_MODULE_12__);













 // import { Near } from 'nearlib'

var contractId = "metanear";
var appTitle = "Meta NEAR";
var baseUrl = "localhost:3000";

var Grid =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "onMouseMove", function (e) {
      _this.props.onHighlight(Math.floor(e.offsetX / _this.props.cellWidth), Math.floor(e.offsetY / _this.props.cellHeight));
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Grid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this.refs.canvas;
      var ctx = canvas.getContext("2d");

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

      for (var _i2 = 0; _i2 < this.props.cells.length; ++_i2) {
        ctx.fillRect(this.props.cells[_i2].location.x * this.props.cellWidth, this.props.cells[_i2].location.y * this.props.cellHeight, this.props.cellWidth, this.props.cellHeight);
      }

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
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("canvas", {
        ref: "canvas",
        width: this.props.width,
        height: this.props.height
      });
    }
  }]);

  return Grid;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

var WalletLogin =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(WalletLogin, _React$Component2);

  function WalletLogin() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WalletLogin);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WalletLogin).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WalletLogin, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        id: "sign-in-container"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h2", null, " Hello stranger! Who are you?"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        id: "login-form"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        class: "col-md-4"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        onClick: this.props.onClick,
        id: "login-button",
        class: "btn btn-lg btn-block btn-primary"
      }, "Login with NEAR Wallet"))));
    }
  }]);

  return WalletLogin;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

var WalletLogout =
/*#__PURE__*/
function (_React$Component3) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(WalletLogout, _React$Component3);

  function WalletLogout() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WalletLogout);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WalletLogout).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WalletLogout, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        id: "hello"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h2", {
        id: "hello"
      }, "Hi, ", react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        class: "account-id"
      }), "!"));
    }
  }]);

  return WalletLogout;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

var Game =
/*#__PURE__*/
function (_React$Component4) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(Game, _React$Component4);

  function Game(props) {
    var _this2;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Game);

    _this2 = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Game).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this2), "nearConnect",
    /*#__PURE__*/
    Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
    /*#__PURE__*/
    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var accountId, near, view;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this2.walletAccount = new nearlib.WalletAccount(contractId, "https://wallet.nearprotocol.com/");
              accountId = _this2.walletAccount.getAccountId();
              console.log(accountId);
              near = new nearlib.Near(new nearlib.NearClient(_this2.walletAccount, new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet")));
              _context.next = 6;
              return near.loadContract(contractId, {
                viewMethods: ["lookAround", "getPlayer"],
                changeMethods: [],
                sender: accountId
              });

            case 6:
              _this2.contract = _context.sent;
              _context.next = 9;
              return _this2.contract.lookAround();

            case 9:
              view = _context.sent;
              console.log(view); // let player = await this.contract.getPlayer({accountId: this.state.accountId})
              // console.log(player)

              _this2.setState({
                cells: view.cells || []
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this2), "onHighlight", function (x, y) {
      var highlighCell = {};

      for (var i = 0; i < _this2.state.cells.length; ++i) {
        if (_this2.state.cells[i].location.x == x && _this2.state.cells[i].location.y == y) {
          highlighCell = _this2.state.cells[i];
          break;
        }
      }

      _this2.setState({
        highlighCell: highlighCell
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this2), "login", function () {
      _this2.walletAccount.requestSignIn(contractId, appTitle, baseUrl + '/', baseUrl + '/');
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this2), "logout", function () {});

    _this2.state = {
      cells: [{
        location: {
          x: 1,
          y: 1
        },
        viewIndex: 1,
        contractId: "ads",
        webUrl: "123",
        owner: "xyz"
      }],
      highlighCell: {},
      player: {
        location: {
          x: 0,
          y: 0
        }
      }
    };
    _this2.walletAccount = null;
    return _this2;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.nearConnect();
    }
  }, {
    key: "render",
    value: function render() {
      var control;

      if (this.walletAccount && this.walletAccount.isSignedIn()) {
        contorl = react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(WalletLogout, {
          onClick: this.logout
        });
      } else {
        control = react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(WalletLogin, {
          onClick: this.login
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, control, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Grid, {
        width: 640,
        height: 425,
        cellWidth: 20,
        cellHeight: 20,
        cells: this.state.cells,
        onHighlight: this.onHighlight,
        playerX: this.state.player.location.x,
        playerY: this.state.player.location.y
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, "Highlighted cell: ", _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.state.highlighCell)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, "Player: ", _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.state.player)));
    }
  }]);

  return Game;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

function Index() {
  return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(next_server_head__WEBPACK_IMPORTED_MODULE_12___default.a, null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("script", {
    src: "https://cdn.jsdelivr.net/npm/nearlib@0.4.2/dist/nearlib.js"
  })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Game, {
    accountId: "illia.near"
  })));
}

/***/ })

})
//# sourceMappingURL=index.js.bd936aaba2f92b17485f.hot-update.js.map