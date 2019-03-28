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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var nearlib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nearlib */ "./node_modules/nearlib/index.js");
/* harmony import */ var nearlib__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nearlib__WEBPACK_IMPORTED_MODULE_7__);









var accountId = "alice.near";
var contractName = "metanear";

var Cells =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Cells, _React$Component);

  function Cells() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Cells);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Cells).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Cells, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this.refs.canvas;
      var ctx = canvas.getContext("2d");
      var centerX = this.props.width / 2;
      var centerY = this.props.height / 2;

      for (var i = 0; i < this.props.cells.length(); ++i) {
        ctx.fillRect(centerX + this.props.cells[i].location.x * this.props.cellWidth, centerY + this.props.cells[i].location.y * this.props.cellHeight, centerX + (this.props.cells[i].location.x + 1) * this.props.cellWidth, centerY + (this.props.cells[i].location.y + 1) * this.props.cellHeight);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("canvas", {
        ref: "canvas",
        width: 640,
        height: 425
      });
    }
  }]);

  return Cells;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

var Game =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Game, _React$Component2);

  function Game(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Game);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Game).call(this, props));
    _this.state = {
      cells: []
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {// console.log(near)
      // nearlib.Near.loadContract(contractName, {
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
      // <div>
      //     {this.state.cells}
      // </div>
      var cells = [{
        location: {
          x: 1,
          y: 1
        },
        viewIndex: 1,
        contractId: "ads",
        webUrl: "123",
        owner: "xyz"
      }];
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Cells, {
        cells: cells
      });
    }
  }]);

  return Game;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

function Index() {
  return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Game, null));
}

/***/ })

})
//# sourceMappingURL=index.js.0f8ecf6b8c3ffd14e952.hot-update.js.map