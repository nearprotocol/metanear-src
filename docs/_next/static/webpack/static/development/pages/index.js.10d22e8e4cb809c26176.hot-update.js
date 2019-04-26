webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/values */ "./node_modules/@babel/runtime-corejs2/core-js/object/values.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next-server/head */ "./node_modules/next-server/head.js");
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_server_head__WEBPACK_IMPORTED_MODULE_16__);

















 // import { Near } from 'nearlib'

var USE_WALLET = false;
var localStorageVersionKey = "version";
var localStorageVersion = "0.0.5";
var contractId = "metanear-dev-005";
var localStorageKeyCellInfoPrefix = "cellInfo:";
var localStorageKeyRenderInfoPrefix = "renderInfo:";
var localStorageKeyImageUrlPrefix = "images:";
var appTitle = "Meta NEAR";
var playerImgUrl = '/static/imgs/player.png';
var cantDeployImgUrl = '/static/imgs/cant_deploy.png';
var viewDistance = 7;
var maxFetchDepth = 3;
var localNearlibUrl = 'https://cdn.jsdelivr.net/gh/nearprotocol/nearcore@master/nearlib/dist/nearlib.js';
var devnetNearlibUrl = 'https://cdn.jsdelivr.net/npm/nearlib@0.5.2/dist/nearlib.js';
var DX = [1, 0, -1, 0];
var DY = [0, 1, 0, -1];

var locationKey = function locationKey(location) {
  return _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13___default()(location);
};

var cellKey = function cellKey(cell) {
  return locationKey(cell.location);
};

var _offsetCache = [];

var isClose = function isClose(dx, dy, maxDistance) {
  return Math.abs(dx) <= maxDistance && Math.abs(dy) <= maxDistance;
};

var cellOffsets = function cellOffsets(i) {
  if (_offsetCache.length == 0) {
    for (var dy = -viewDistance; dy <= viewDistance; ++dy) {
      for (var dx = -viewDistance; dx <= viewDistance; ++dx) {
        _offsetCache.push({
          dx: dx,
          dy: dy
        });
      }
    }
  }

  return _offsetCache[i];
};

var Grid =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__["default"])(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__["default"])(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this), "onMouseMove", function (e) {
      var centerX = _this.props.width / 2 - _this.props.cellWidth / 2;
      var centerY = _this.props.height / 2 - _this.props.cellHeight / 2;

      _this.props.onHighlight(Math.floor((e.offsetX - centerX) / _this.props.cellWidth) + (_this.props.player && _this.props.player.location.x), Math.floor((e.offsetY - centerY) / _this.props.cellHeight) + (_this.props.player && _this.props.player.location.y));
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(Grid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this2 = this;

      var canvas = this.refs.canvas;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.props.width, this.props.height);
      var centerX = this.props.width / 2 - this.props.cellWidth / 2;
      var centerY = this.props.height / 2 - this.props.cellHeight / 2;
      var cellNumberX = this.props.width / this.props.cellWidth;
      var cellNumberY = this.props.height / this.props.cellHeight;

      var dxDy = function dxDy(location) {
        return {
          dx: location.x - (_this2.props.player && _this2.props.player.location.x),
          dy: location.y - (_this2.props.player && _this2.props.player.location.y)
        };
      };

      var dxDyRect = function dxDyRect(d) {
        return {
          x: centerX + d.dx * _this2.props.cellWidth,
          y: centerY + d.dy * _this2.props.cellHeight,
          width: _this2.props.cellWidth,
          height: _this2.props.cellHeight
        };
      };

      var renderImg = function renderImg(rect, imageUrl) {
        if (!imageUrl) {
          return;
        }

        var image = _this2.props.images[imageUrl];

        if (image) {
          ctx.drawImage(image, 0, 0, image.width, image.height, rect.x, rect.y, rect.width, rect.height);
          return true;
        }

        return false;
      };

      _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_5___default()(this.props.allCells).forEach(function (cell) {
        var cellInfo = _this2.props.cellInfos[cell.cellId];
        var d = dxDy(cell.location);
        var rect = dxDyRect(d);
        var renderInfo = cellInfo && _this2.props.renderInfos[cellInfo.renderId];
        var rendered = renderInfo && renderImg(rect, renderInfo.imageUrl);

        if (!rendered) {
          ctx.fillStyle = 'rgba(64, 0, 0, 1.0)';
          ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        if (_this2.props.actionType == 'deploy') {
          if (!cell.canDeploy) {
            renderImg(rect, cantDeployImgUrl);
          }
        }
      });

      renderImg(dxDyRect({
        dx: 0,
        dy: 0
      }), playerImgUrl);

      if (this.props.actionType == 'move') {
        var path = this.props.movePath;

        if (path) {
          var pos = {
            dx: 0,
            dy: 0
          };

          for (var i = 0; i < path.length; ++i) {
            pos = {
              dx: pos.dx + DX[path[i]],
              dy: pos.dy + DY[path[i]]
            };
            renderImg(dxDyRect(pos), playerImgUrl);
          }
        }
      }

      canvas.addEventListener('mousemove', this.onMouseMove, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      canvas.removeEventListener('mousemove', this.onMouseMove, false);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("canvas", {
        ref: "canvas",
        width: this.props.width,
        height: this.props.height,
        onClick: this.props.onClick
      }));
    }
  }]);

  return Grid;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

var WalletLogin =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__["default"])(WalletLogin, _React$Component2);

  function WalletLogin() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, WalletLogin);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__["default"])(WalletLogin).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(WalletLogin, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        id: "sign-in-container"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("h2", null, " Hello stranger! Who are you?"), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        id: "login-form"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "col-md-4"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("button", {
        onClick: this.props.onClick,
        id: "login-button",
        className: "btn btn-lg btn-block btn-primary"
      }, "Login with NEAR Wallet"))));
    }
  }]);

  return WalletLogin;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

var WalletLogout =
/*#__PURE__*/
function (_React$Component3) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__["default"])(WalletLogout, _React$Component3);

  function WalletLogout() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, WalletLogout);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__["default"])(WalletLogout).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(WalletLogout, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        id: "hello"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("h2", {
        id: "hello"
      }, "Hi, ", this.props.accountId, "!"));
    }
  }]);

  return WalletLogout;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

var MiniGameView =
/*#__PURE__*/
function (_React$Component4) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__["default"])(MiniGameView, _React$Component4);

  function MiniGameView() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, MiniGameView);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__["default"])(MiniGameView).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(MiniGameView, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("iframe", {
        src: this.props.url,
        frameBorder: "0",
        width: "100%",
        height: "100%",
        style: {
          minHeight: 600
        }
      });
    }
  }]);

  return MiniGameView;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

var Game =
/*#__PURE__*/
function (_React$Component5) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_11__["default"])(Game, _React$Component5);

  function Game(props) {
    var _this3;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Game);

    _this3 = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__["default"])(Game).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "maybeFetchImage", function (imageUrl) {
      if (!imageUrl || imageUrl in _this3.fetchingImages) {
        return;
      }

      _this3.fetchingImages[imageUrl] = true;
      var image = new Image();

      image.onload = function () {
        var images = {};
        images[imageUrl] = image;

        _this3.setState({
          images: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default()(_this3.state.images, images)
        });
      };

      image.src = imageUrl;
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "maybeFetchImageId", function (imageId) {
      if (imageId in _this3.fetchingImageIds) {
        return;
      }

      _this3.fetchingImageIds[imageId] = true;

      _this3.contract.getImageUrl({
        imageId: imageId
      }).then(function (imageUrl) {
        var imageIds = {};
        imageIds[imageId] = imageUrl;
        localStorage.setItem(localStorageKeyImageUrlPrefix + imageId, imageUrl);

        _this3.maybeFetchImage(imageUrl);

        _this3.setState({
          imageIds: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default()(_this3.state.imageIds, imageIds)
        });
      }).catch(function (e) {
        console.log(e);
        _this3.fetchingImageIds[imageId] = null;
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "maybeFetchRenderInfo", function (renderId, depth) {
      if (renderId in _this3.fetchingRenderInfos || depth > maxFetchDepth) {
        return;
      }

      _this3.fetchingRenderInfos[renderId] = true;

      _this3.contract.getRenderInfo({
        renderId: renderId
      }).then(function (renderInfo) {
        renderInfo.renderId = renderId;
        var renderInfos = {};
        renderInfos[renderId] = renderInfo;
        localStorage.setItem(localStorageKeyRenderInfoPrefix + renderId, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13___default()(renderInfo));

        _this3.maybeFetchImageId(renderInfo.imageId);

        _this3.maybeFetchRenderInfo(renderInfo.renderId, depth + 1);

        _this3.setState({
          renderInfos: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default()(_this3.state.renderInfos, renderInfos)
        });
      }).catch(function (e) {
        console.log(e);
        _this3.fetchingRenderInfos[cellId] = null;
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "maybeFetchCellInfo", function (cellId) {
      if (cellId in _this3.fetchingCellInfos) {
        return;
      }

      _this3.fetchingCellInfos[cellId] = true;

      _this3.contract.getCellInfo({
        cellId: cellId
      }).then(function (cellInfo) {
        cellInfo.cellId = cellId;
        var cellInfos = {};
        cellInfos[cellId] = cellInfo;
        localStorage.setItem(localStorageKeyCellInfoPrefix + cellId, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_13___default()(cellInfo));

        _this3.maybeFetchRenderInfo(cellInfo.renderId);

        _this3.setState({
          cellInfos: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default()(_this3.state.cellInfos, cellInfos)
        });
      }).catch(function (e) {
        console.log(e);
        _this3.fetchingCellInfos[cellId] = null;
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "updateView", function (view) {
      var cells = {};

      var player = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, _this3.state.player, {
        location: view.location
      });

      if (view.cellIds) {
        view.cellIds.forEach(function (cellId, i) {
          var location = {
            x: view.location.x + cellOffsets(i).dx,
            y: view.location.y + cellOffsets(i).dy
          };
          var cell = {
            location: location,
            cellId: cellId,
            canDeploy: view.freeCells && view.freeCells[i]
          };

          _this3.maybeFetchCellInfo(cellId);

          cells[cellKey(cell)] = cell;
        });
      }

      _this3.setState({
        player: player,
        allCells: cells,
        movePath: null,
        highlightCell: null
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "fetchCells",
    /*#__PURE__*/
    function () {
      var _ref = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(withOwned) {
        var accountId, view;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountId = _this3.state.player ? _this3.state.player.accountId : 'metanear';
                _context.next = 3;
                return _this3.contract.lookAround({
                  accountId: accountId,
                  withOwned: withOwned
                });

              case 3:
                view = _context.sent;

                _this3.updateView(view);

              case 5:
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

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "nearConnect",
    /*#__PURE__*/
    Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(
    /*#__PURE__*/
    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2() {
      var near, accountId, settings, player;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!USE_WALLET) {
                _context2.next = 6;
                break;
              }

              _this3.walletAccount = new nearlib.WalletAccount(contractId, "https://wallet.nearprotocol.com/");
              accountId = _this3.walletAccount.getAccountId();
              near = new nearlib.Near(new nearlib.NearClient(_this3.walletAccount, new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet")));
              _context2.next = 12;
              break;

            case 6:
              settings = {
                deps: {
                  createAccount: nearlib.dev.createAccountWithLocalNodeConnection
                },
                nodeUrl: 'http://localhost:3030'
              };
              _context2.next = 9;
              return nearlib.dev.connect(settings);

            case 9:
              near = _context2.sent;
              accountId = nearlib.dev.myAccountId;
              _this3.walletAccount = {
                isSignedIn: function isSignedIn() {
                  return true;
                },
                getAccountId: function getAccountId() {
                  return accountId;
                }
              };

            case 12:
              console.log(accountId);
              _context2.next = 15;
              return near.loadContract(contractId, {
                viewMethods: ["lookAround", "getPlayer", "getCellInfo", "getRenderInfo", "getImageUrl"],
                changeMethods: ["move", "deploy", "init", "createNewCell", "createNewRender"],
                sender: accountId
              });

            case 15:
              _this3.contract = _context2.sent;
              window.contract = _this3.contract;

              if (!accountId) {
                _context2.next = 23;
                break;
              }

              _context2.next = 20;
              return _this3.contract.getPlayer({
                accountId: accountId
              });

            case 20:
              player = _context2.sent;
              console.log(player);

              _this3.setState({
                player: player,
                tabKey: "map"
              });

            case 23:
              _context2.next = 25;
              return _this3.fetchCells(false);

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "onHighlight", function (x, y) {
      var highlightCell = _this3.state.allCells[locationKey({
        x: x,
        y: y
      })];

      if (highlightCell != _this3.state.highlightCell) {
        var movePath = _this3.state.actionType == 'move' ? _this3.calculatePath(highlightCell) : null;

        _this3.setState({
          highlightCell: highlightCell,
          movePath: movePath
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "login", function () {
      _this3.walletAccount.requestSignIn(contractId, appTitle);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "logout", function () {});

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "calculatePath", function (targetCell) {
      if (!_this3.state.player || !targetCell) {
        return null;
      }

      var px = _this3.state.player.location.x;
      var py = _this3.state.player.location.y;
      var tx = targetCell.location.x;
      var ty = targetCell.location.y;
      var visited = {};
      var q = [];

      var add = function add(st, forced) {
        var key = locationKey({
          x: st.x,
          y: st.y
        });

        if (!forced) {
          if (key in visited || !(key in _this3.state.allCells)) {
            return;
          }

          var cellInfo = _this3.state.cellInfos[_this3.state.allCells[key].cellId];

          if (!cellInfo || cellInfo.blocking) {
            return;
          }
        }

        visited[key] = st;
        q.push(st);
      };

      add({
        x: px,
        y: py,
        dir: -1,
        last: null
      }, true);

      for (var i = 0; i < q.length; ++i) {
        var cur = q[i];

        if (cur.x == tx && cur.y == ty) {
          // found
          var path = [];

          while (cur.last != null) {
            path.push(cur.dir);
            cur = cur.last;
          }

          return path.reverse();
        }

        for (var j = 0; j < 4; ++j) {
          add({
            x: cur.x + DX[j],
            y: cur.y + DY[j],
            dir: j,
            last: cur
          }, false);
        }
      }

      return null;
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "movePlayer", function () {
      if (!_this3.state.movePath) {
        return;
      }

      _this3.contract.move({
        path: _this3.state.movePath
      }).then(function (res) {
        return _this3.updateView(res.lastResult);
      }).catch(function (e) {
        return console.log(e);
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "takeAction", function () {
      if (_this3.state.actionType == 'move') {
        return _this3.movePlayer();
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__["default"])(_this3), "handleActionChange", function (actionType) {
      if (_this3.state.actionType != actionType) {
        _this3.setState({
          actionType: actionType
        });

        if (actionType == 'deploy') {
          _this3.fetchCells(true).catch(console.log);
        }
      }
    });

    _this3.state = {
      allCells: {},
      highlightCell: {},
      images: {},
      imageIds: {},
      renderInfos: {},
      movePath: null,
      player: null,
      cellInfos: {},
      tabKey: "info",
      actionType: "move"
    };
    _this3.fetchingImages = {};
    _this3.fetchingImageIds = {};
    _this3.fetchingCellInfos = {};
    _this3.fetchingRenderInfos = {};
    _this3.walletAccount = null;
    return _this3;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      if (localStorage.getItem(localStorageVersionKey) != localStorageVersion) {
        localStorage.clear();
        localStorage.setItem(localStorageVersionKey, localStorageVersion);
      }

      var imageIds = {};

      _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(localStorage).forEach(function (key) {
        if (key.startsWith(localStorageKeyImageUrlPrefix)) {
          try {
            var imageUrl = localStorage.getItem(key);

            var imageId = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(key.substr(localStorageKeyImageUrlPrefix.length));

            _this4.maybeFetchImage(imageUrl);

            imageIds[imageId] = imageUrl;
            _this4.fetchingImageIds[imageId] = true;
          } catch (err) {// whatever
          }
        }
      });

      var renderInfos = {};
      var chainRenderIds = {};

      _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(localStorage).forEach(function (key) {
        if (key.startsWith(localStorageKeyRenderInfoPrefix)) {
          try {
            var renderInfo = JSON.parse(localStorage.getItem(key));

            if (localStorageKeyRenderInfoPrefix + renderInfo.renderId == key) {
              _this4.maybeFetchImageId(renderInfo.imageId);

              chainRenderIds[renderInfo.bgRenderId] = true;
              renderInfos[renderInfo.renderId] = renderInfo;
              _this4.fetchingRenderInfos[renderInfo.renderId] = true;
            }
          } catch (err) {// whatever
          }
        }
      });

      _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(localStorage).forEach(function (renderId) {
        _this4.maybeFetchRenderInfo(renderId, 1);
      });

      var cellInfos = {};

      _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(localStorage).forEach(function (key) {
        if (key.startsWith(localStorageKeyCellInfoPrefix)) {
          try {
            var cellInfo = JSON.parse(localStorage.getItem(key));

            if (localStorageKeyCellInfoPrefix + cellInfo.cellId == key) {
              _this4.maybeFetchRenderInfo(cellInfo.renderId, 0);

              cellInfos[cellInfo.cellId] = cellInfo;
              _this4.fetchingCellInfos[cellInfo.cellId] = true;
            }
          } catch (err) {// whatever
          }
        }
      });

      this.setState({
        imageIds: imageIds,
        cellInfos: cellInfos,
        renderInfos: renderInfos
      });
      this.maybeFetchImage(playerImgUrl);
      this.maybeFetchImage(cantDeployImgUrl);
      this.nearConnect();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var control;

      if (this.walletAccount && this.walletAccount.isSignedIn()) {
        control = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(WalletLogout, {
          accountId: this.walletAccount.getAccountId(),
          onClick: this.logout
        });
      } else {
        control = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(WalletLogin, {
          onClick: this.login
        });
      }

      var cellInfo = null;

      if (this.state.player) {
        var cell = this.state.allCells[locationKey(this.state.player.location)];

        if (cell) {
          var _cellId = cell.cellId;
          cellInfo = this.state.cellInfos[_cellId];
        }
      }

      var isWebPage = cellInfo && !!cellInfo.webUrl;
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["Tabs"], {
        id: "controlled-tab-example",
        activeKey: this.state.tabKey,
        onSelect: function onSelect(tabKey) {
          return _this5.setState({
            tabKey: tabKey
          });
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["Tab"], {
        eventKey: "info",
        title: "\uD83D\uDCDCInfo"
      }, control), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["Tab"], {
        eventKey: "map",
        title: "\uD83C\uDF0EWorld"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(Grid, {
        width: 32 * 15,
        height: 32 * 15,
        cellWidth: 32,
        cellHeight: 32,
        allCells: this.state.allCells,
        onHighlight: this.onHighlight,
        images: this.state.images,
        cellInfos: this.state.cellInfos,
        renderInfos: this.state.renderInfos,
        player: this.state.player,
        movePath: this.state.movePath,
        actionType: this.state.actionType,
        onClick: this.takeAction
      }), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["ToggleButtonGroup"], {
        "aria-label": "Action",
        name: "action-types",
        value: this.state.actionType,
        onChange: function onChange(v) {
          return _this5.handleActionChange(v);
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["ToggleButton"], {
        variant: "outline-secondary",
        value: "inspect"
      }, "\uD83D\uDC40Inspect"), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["ToggleButton"], {
        variant: "outline-secondary",
        value: "move"
      }, "\uD83D\uDC63Move"), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["ToggleButton"], {
        variant: "outline-secondary",
        value: "deploy"
      }, "\uD83C\uDFD7Build"))), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["Tab"], {
        eventKey: "cell-view",
        title: "\uD83C\uDFE2Cell View",
        disabled: !isWebPage
      }, isWebPage && react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(MiniGameView, {
        url: cellInfo.webUrl,
        contractId: cellInfo.contractId
      })), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_15__["Tab"], {
        eventKey: "chat",
        title: "\uD83D\uDCACChat",
        disabled: true
      }, "Bla"));
    }
  }]);

  return Game;
}(react__WEBPACK_IMPORTED_MODULE_14___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(next_server_head__WEBPACK_IMPORTED_MODULE_16___default.a, null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("script", {
    src: USE_WALLET ? devnetNearlibUrl : localNearlibUrl
  })), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(Game, null)));
});

/***/ })

})
//# sourceMappingURL=index.js.10d22e8e4cb809c26176.hot-update.js.map