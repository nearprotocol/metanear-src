webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/@protobufjs/aspromise/index.js":
false,

/***/ "./node_modules/@protobufjs/base64/index.js":
false,

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
false,

/***/ "./node_modules/@protobufjs/float/index.js":
false,

/***/ "./node_modules/@protobufjs/inquire/index.js":
false,

/***/ "./node_modules/@protobufjs/pool/index.js":
false,

/***/ "./node_modules/@protobufjs/utf8/index.js":
false,

/***/ "./node_modules/base-x/index.js":
false,

/***/ "./node_modules/base64-js/index.js":
false,

/***/ "./node_modules/bs58/index.js":
false,

/***/ "./node_modules/buffer/index.js":
false,

/***/ "./node_modules/depd/lib/browser/index.js":
false,

/***/ "./node_modules/ieee754/index.js":
false,

/***/ "./node_modules/inherits/inherits_browser.js":
false,

/***/ "./node_modules/isarray/index.js":
false,

/***/ "./node_modules/js-sha256/src/sha256.js":
false,

/***/ "./node_modules/nearlib/account.js":
false,

/***/ "./node_modules/nearlib/index.js":
false,

/***/ "./node_modules/nearlib/internal/send-json.js":
false,

/***/ "./node_modules/nearlib/local_node_connection.js":
false,

/***/ "./node_modules/nearlib/near.js":
false,

/***/ "./node_modules/nearlib/nearclient.js":
false,

/***/ "./node_modules/nearlib/node_modules/http-errors/index.js":
false,

/***/ "./node_modules/nearlib/node_modules/setprototypeof/index.js":
false,

/***/ "./node_modules/nearlib/node_modules/statuses/codes.json":
false,

/***/ "./node_modules/nearlib/node_modules/statuses/index.js":
false,

/***/ "./node_modules/nearlib/protos.js":
false,

/***/ "./node_modules/nearlib/signing/browser_local_storage_key_store.js":
false,

/***/ "./node_modules/nearlib/signing/in_memory_key_store.js":
false,

/***/ "./node_modules/nearlib/signing/key_pair.js":
false,

/***/ "./node_modules/nearlib/signing/simple_key_store_signer.js":
false,

/***/ "./node_modules/nearlib/wallet-account.js":
false,

/***/ "./node_modules/node-fetch/browser.js":
false,

/***/ "./node_modules/process/browser.js":
false,

/***/ "./node_modules/protobufjs/minimal.js":
false,

/***/ "./node_modules/protobufjs/src/index-minimal.js":
false,

/***/ "./node_modules/protobufjs/src/reader.js":
false,

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
false,

/***/ "./node_modules/protobufjs/src/roots.js":
false,

/***/ "./node_modules/protobufjs/src/rpc.js":
false,

/***/ "./node_modules/protobufjs/src/rpc/service.js":
false,

/***/ "./node_modules/protobufjs/src/util/longbits.js":
false,

/***/ "./node_modules/protobufjs/src/util/minimal.js":
false,

/***/ "./node_modules/protobufjs/src/writer.js":
false,

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
false,

/***/ "./node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/toidentifier/index.js":
false,

/***/ "./node_modules/tweetnacl/nacl-fast.js":
false,

/***/ "./node_modules/webpack/buildin/amd-options.js":
false,

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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);










 // import { Near } from 'nearlib'

var accountId = "alice.near";
var contractName = "metanear";

var Grid =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "onMouseMove", function (e) {
      _this.props.onHighlight(Math.floor(e.offsetX / _this.props.cellWidth), Math.floor(e.offsetY / _this.props.cellHeight));
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Grid, [{
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
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("canvas", {
        ref: "canvas",
        width: this.props.width,
        height: this.props.height
      });
    }
  }]);

  return Grid;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

var Game =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Game, _React$Component2);

  function Game(props) {
    var _this2;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Game);

    _this2 = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Game).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this2), "onHighlight", function (x, y) {
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
      highlighCell: {}
    };
    return _this2;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // let near = new nearlib.dev.;
      console.log(Near); // near.loadContract(contractName, {
      //     viewMethods: ["getCellView"],
      //     changeMethods: [],
      //     sender: accountId
      // }).then((contract) => {
      //     this.contract = contract;
      //     this.contract.getCellView()
      //         .then((cells) => {
      //             this.setState({ cells })
      //         });
      // })
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Grid, {
        width: 640,
        height: 425,
        cellWidth: 20,
        cellHeight: 20,
        cells: this.state.cells,
        onHighlight: this.onHighlight
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.state.highlighCell)));
    }
  }]);

  return Game;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

function Index() {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Game, null));
}

/***/ }),

/***/ 2:
false

})
//# sourceMappingURL=index.js.c731ac48421bde1b3eb5.hot-update.js.map