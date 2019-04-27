import Component from 'react'
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import Head from 'next/head'
// import { Near } from 'nearlib'

const USE_WALLET = true;
const localStorageVersionKey = "version";
const localStorageVersion = "0.0.5";
const contractId = "metanear-dev-005";
const localStorageKeyCellInfoPrefix = "cellInfo:";
const localStorageKeyRenderInfoPrefix = "renderInfo:";
const localStorageKeyImageUrlPrefix = "images:";
const appTitle = "Meta NEAR";
const playerImgUrl = '/static/imgs/player.png';
const cantDeployImgUrl = '/static/imgs/cant_deploy.png';
const viewDistance = 7;
const maxFetchDepth = 2;
const localNearlibUrl = 'https://cdn.jsdelivr.net/gh/nearprotocol/nearcore@master/nearlib/dist/nearlib.js';
const devnetNearlibUrl = 'https://cdn.jsdelivr.net/npm/nearlib@0.5.2/dist/nearlib.js';
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];


const locationKey = (location) => JSON.stringify(location);
const cellKey = (cell) => locationKey(cell.location);
const _offsetCache = [];
const isClose = (dx, dy, maxDistance) => (Math.abs(dx) <= maxDistance && Math.abs(dy) <= maxDistance);
const cellOffsets = (i) => {
  if (_offsetCache.length == 0) {
    for (let dy = -viewDistance; dy <= viewDistance; ++dy) {
      for (let dx = -viewDistance; dx <= viewDistance; ++dx) {
        _offsetCache.push({dx, dy});
      }
    }
  }
  return _offsetCache[i];
};

class Grid extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    const centerX = this.props.width / 2 - this.props.cellWidth / 2
    const centerY = this.props.height / 2 - this.props.cellHeight / 2
    const cellNumberX = this.props.width / this.props.cellWidth
    const cellNumberY = this.props.height / this.props.cellHeight
    const dxDy = (location) => {
      return {
        dx: location.x - (this.props.player && this.props.player.location.x),
        dy: location.y - (this.props.player && this.props.player.location.y),
      };
    }
    const dxDyRect = (d) => {
      return {
        x: centerX + d.dx * this.props.cellWidth,
        y: centerY + d.dy * this.props.cellHeight,
        width: this.props.cellWidth,
        height: this.props.cellHeight,
      }
    };
    const renderImg = (rect, imageUrl) => {
      if (!imageUrl) {
        return;
      }
      let image = this.props.images[imageUrl];
      if (image) {
        ctx.drawImage(image, 0, 0, image.width, image.height, rect.x, rect.y, rect.width, rect.height);
        return true;
      }
      return false;
    }
    const render = (rect, renderInfo, depth) => {
      if (!renderInfo || depth > maxFetchDepth) {
        return false;
      }
      const backgroundRenderInfo = renderInfo.backgroundRenderId && this.props.renderInfos[renderInfo.backgroundRenderId];
      render(rect, backgroundRenderInfo, depth + 1);
      const imageUrl = this.props.imageUrls[renderInfo.imageId];
      return renderImg(rect, imageUrl);
    }
    Object.values(this.props.allCells).forEach((cell) => {
      let cellInfo = this.props.cellInfos[cell.cellId];
      const d = dxDy(cell.location);
      const rect = dxDyRect(d);
      const renderInfo = cellInfo && this.props.renderInfos[cellInfo.renderId];
      let rendered = render(rect, renderInfo, 0);
      if (!rendered) {
        ctx.fillStyle = 'rgba(64, 0, 0, 1.0)';
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      }
      if (this.props.actionType == 'deploy') {
        if (!cell.canDeploy) {
          renderImg(rect, cantDeployImgUrl);
        }
      }
    })
    renderImg(dxDyRect({dx: 0, dy: 0}), playerImgUrl);
    if (this.props.actionType == 'move') {
      const path = this.props.movePath;
      if (path) {
        let pos = {
          dx: 0,
          dy: 0,
        };
        for (let i = 0; i < path.length; ++i) {
          pos = {
            dx: pos.dx + DX[path[i]],
            dy: pos.dy + DY[path[i]],
          }
          renderImg(dxDyRect(pos), playerImgUrl);
        }
      }
    }
    canvas.addEventListener('mousemove', this.onMouseMove, false)
  }

  componentWillUnmount() {
    canvas.removeEventListener('mousemove', this.onMouseMove, false)
  }
  onMouseMove = (e) => {
    const centerX = this.props.width / 2 - this.props.cellWidth / 2
    const centerY = this.props.height / 2 - this.props.cellHeight / 2
    this.props.onHighlight(
      Math.floor((e.offsetX - centerX) / this.props.cellWidth) + (this.props.player && this.props.player.location.x),
      Math.floor((e.offsetY - centerY) / this.props.cellHeight) + (this.props.player && this.props.player.location.y))
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" onClick={this.props.onClick} width={this.props.width} height={this.props.height}
                style={{width: this.props.width, height: this.props.height}} />
      </div>
    )
  }
}

class WalletLogin extends React.Component {
  render() {
    return (
      <div id="sign-in-container">
        <h2> Hello stranger! Who are you?</h2>
        <div id="login-form">
          <div className="col-md-4"><button onClick={this.props.onClick} id="login-button" className="btn btn-lg btn-block btn-primary">Login with NEAR Wallet</button></div>
        </div>
      </div>
    )
  }
}

class WalletLogout extends React.Component {
  render() {
    return (
      <div id="hello">
        <h2 id="hello">Hi, {this.props.accountId}!</h2>
      </div>
    )
  }
}

class MiniGameView extends React.Component {
  render() {
    return (
      <iframe src={this.props.url} frameBorder="0" width="100%" height="100%" style={{ minHeight: 600 }}/>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCells: {},
      highlightCell: {},
      images: {},
      imageUrls: {},
      renderInfos: {},
      movePath: null,
      player: null,
      cellInfos: {},
      tabKey: "info",
      actionType: "move",
    };
    this.fetchingImages = {};
    this.fetchingImageUrls = {};
    this.fetchingCellInfos = {};
    this.fetchingRenderInfos = {};
    this.walletAccount = null;
  }
  maybeFetchImage = (imageUrl) => {
    if (!imageUrl || imageUrl in this.fetchingImages) {
      return;
    }
    this.fetchingImages[imageUrl] = true;
    const image = new Image();
    image.onload = () => {
      const images = {};
      images[imageUrl] = image;
      this.setState({
        images: Object.assign(this.state.images, images),
      });
    };
    image.src = imageUrl;
  }
  maybeFetchImageUrl = (imageId) => {
    if (imageId in this.fetchingImageUrls) {
      return;
    }
    this.fetchingImageUrls[imageId] = true;
    this.contract.getImageUrl({imageId})
      .then((imageUrl) => {
        let imageUrls = {};
        imageUrls[imageId] = imageUrl;
        localStorage.setItem(localStorageKeyImageUrlPrefix + imageId, imageUrl);
        this.maybeFetchImage(imageUrl);
        this.setState({
          imageUrls: Object.assign(this.state.imageUrls, imageUrls),
        });
      })
      .catch((e) => {
        console.log(e);
        this.fetchingImageUrls[imageId] = null;
      });
  }
  maybeFetchRenderInfo = (renderId, depth) => {
    if (renderId in this.fetchingRenderInfos || depth > maxFetchDepth) {
      return;
    }
    this.fetchingRenderInfos[renderId] = true;
    this.contract.getRenderInfo({renderId})
      .then((renderInfo) => {
        renderInfo.renderId = renderId;
        renderInfo.backgroundRenderId = renderInfo.backgroundRenderId || 0;
        const renderInfos = {};
        renderInfos[renderId] = renderInfo;
        localStorage.setItem(localStorageKeyRenderInfoPrefix + renderId, JSON.stringify(renderInfo))
        this.maybeFetchImageUrl(renderInfo.imageId);
        this.maybeFetchRenderInfo(renderInfo.backgroundRenderId, depth + 1);
        this.setState({
          renderInfos: Object.assign(this.state.renderInfos, renderInfos),
        });
      })
      .catch((e) => {
        console.log(e);
        this.fetchingRenderInfos[renderId] = null;
      });
  }
  maybeFetchCellInfo = (cellId) => {
    if (cellId in this.fetchingCellInfos) {
      return;
    }
    this.fetchingCellInfos[cellId] = true;
    this.contract.getCellInfo({cellId})
      .then((cellInfo) => {
        cellInfo.cellId = cellId;
        const cellInfos = {};
        cellInfos[cellId] = cellInfo;
        localStorage.setItem(localStorageKeyCellInfoPrefix + cellId, JSON.stringify(cellInfo))
        this.maybeFetchRenderInfo(cellInfo.renderId);
        this.setState({
          cellInfos: Object.assign(this.state.cellInfos, cellInfos),
        });
      })
      .catch((e) => {
        console.log(e);
        this.fetchingCellInfos[cellId] = null;
      });
  }
  updateView = (view) => {
    let cells = {};
    let player = Object.assign({}, this.state.player, {location: view.location});
    if (view.cellIds) {
      view.cellIds.forEach((cellId, i) => {
        let location = {
          x: view.location.x + cellOffsets(i).dx,
          y: view.location.y + cellOffsets(i).dy,
        }
        let cell = {
          location,
          cellId,
          canDeploy: view.freeCells && view.freeCells[i],
        };
        this.maybeFetchCellInfo(cellId);
        cells[cellKey(cell)] = cell
      })
    }
    this.setState({
      player,
      allCells: cells,
      movePath: null,
      highlightCell: null,
    })
  }
  fetchCells = async(withOwned) => {
    let accountId = this.state.player ? this.state.player.accountId : 'metanear';
    let view = await this.contract.lookAround({ accountId, withOwned })
    this.updateView(view);
  }
  nearConnect = async () => {
    let near, accountId;
    if (USE_WALLET) {
      this.walletAccount = new nearlib.WalletAccount(contractId, "https://wallet.nearprotocol.com/");
      accountId = this.walletAccount.getAccountId();
      near = new nearlib.Near(new nearlib.NearClient(
        this.walletAccount,
        new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet"),
      ));
    } else {
      const settings = {
        deps: {
          createAccount: nearlib.dev.createAccountWithLocalNodeConnection
        },
        nodeUrl: 'http://localhost:3030',
        baseUrl: 'http://localhost:3030',
        // helperUrl: 'http://localhost:4000',
      };
      near = await nearlib.dev.connect(settings);
      accountId = nearlib.dev.myAccountId;
      this.walletAccount = {
        isSignedIn: () => true,
        getAccountId: () => accountId,
      };
    }
    console.log(accountId);
    this.contract = await near.loadContract(contractId, {
      viewMethods: ["lookAround", "getPlayer", "getCellInfo", "getRenderInfo", "getImageUrl"],
      changeMethods: ["move", "deploy", "init", "addCellInfo", "addRenderInfo", "addImageUrl"],
      sender: accountId,
    });
    window.contract = this.contract
    if (accountId) {
      let player = await this.contract.getPlayer({accountId})
      console.log(player)
      this.setState({player, tabKey: "map"})
    }
    await this.fetchCells(false);
  }
  componentDidMount() {
    if (localStorage.getItem(localStorageVersionKey) != localStorageVersion) {
      localStorage.clear();
      localStorage.setItem(localStorageVersionKey, localStorageVersion);
    }
    let imageUrls = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(localStorageKeyImageUrlPrefix)) {
        try {
          let imageUrl = localStorage.getItem(key);
          let imageId = parseInt(key.substr(localStorageKeyImageUrlPrefix.length));
          this.maybeFetchImage(imageUrl);
          imageUrls[imageId] = imageUrl;
          this.fetchingImageUrls[imageId] = true;
        } catch (err) {
          // whatever
        }
      }
    });
    let renderInfos = {};
    let chainRenderIds = {};
    let chainImageIds = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(localStorageKeyRenderInfoPrefix)) {
        try {
          let renderInfo = JSON.parse(localStorage.getItem(key));
          if (localStorageKeyRenderInfoPrefix + renderInfo.renderId == key) {
            chainImageIds[renderInfo.imageId] = true;
            chainRenderIds[renderInfo.backgroundRenderId || 0] = 1;
            renderInfos[renderInfo.renderId] = renderInfo;
            this.fetchingRenderInfos[renderInfo.renderId] = true;
          }
        } catch (err) {
          // whatever
        }
      }
    });
    let cellInfos = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(localStorageKeyCellInfoPrefix)) {
        try {
          let cellInfo = JSON.parse(localStorage.getItem(key));
          if (localStorageKeyCellInfoPrefix + cellInfo.cellId == key) {
            chainRenderIds[cellInfo.renderId] = 0;
            cellInfos[cellInfo.cellId] = cellInfo;
            this.fetchingCellInfos[cellInfo.cellId] = true;
          }
        } catch (err) {
          // whatever
        }
      }
    });
    this.setState({ imageUrls, cellInfos, renderInfos });
    this.maybeFetchImage(playerImgUrl);
    this.maybeFetchImage(cantDeployImgUrl);
    this.nearConnect().then(() => {
      Object.keys(chainImageIds).forEach((imageId) => {
        this.maybeFetchImageUrl(imageId);
      });
      Object.entries(chainRenderIds).forEach((entry) => {
        this.maybeFetchRenderInfo(entry[0], entry[1]);
      });
    })
  }
  onHighlight = (x, y) => {
    let highlightCell = this.state.allCells[locationKey({x, y})]
    if (highlightCell != this.state.highlightCell) {
      const movePath = (this.state.actionType == 'move') ? this.calculatePath(highlightCell) : null;
      this.setState({
        highlightCell,
        movePath,
      })
    }
  }
  login = () => {
    this.walletAccount.requestSignIn(
      contractId,
      appTitle,
    );
  }
  logout = () => {

  }
  calculatePath = (targetCell) => {
    if (!this.state.player || !targetCell) {
      return null;
    }
    const px = this.state.player.location.x;
    const py = this.state.player.location.y;
    const tx = targetCell.location.x;
    const ty = targetCell.location.y;
    const visited = {};
    const q = [];
    const add = (st, forced) => {
      const key = locationKey({
        x: st.x,
        y: st.y,
      });
      if (!forced) {
        if (key in visited || !(key in this.state.allCells)) {
          return;
        }
        let cellInfo = this.state.cellInfos[this.state.allCells[key].cellId];
        if (!cellInfo || cellInfo.blocking) {
          return;
        }
      }
      visited[key] = st;
      q.push(st);
    }
    add({
      x: px,
      y: py,
      dir: -1,
      last: null,
    }, true);
    for (let i = 0; i < q.length; ++i) {
      let cur = q[i];
      if (cur.x == tx && cur.y == ty) {
        // found
        let path = [];
        while (cur.last != null) {
          path.push(cur.dir);
          cur = cur.last;
        }
        return path.reverse();
      }
      for (let j = 0; j < 4; ++j) {
        add({
          x: cur.x + DX[j],
          y: cur.y + DY[j],
          dir: j,
          last: cur,
        }, false);
      }
    }
    return null;
  }
  movePlayer = () => {
    if (!this.state.movePath) {
      return
    }
    this.contract.move({path: this.state.movePath})
      .then((res) => this.updateView(res.lastResult))
      .catch((e) => console.log(e));
  }
  takeAction = () => {
    if (this.state.actionType == 'move') {
      return this.movePlayer();
    }
  }
  handleActionChange = (actionType) => {
    if (this.state.actionType != actionType) {
      this.setState({actionType});
      if (actionType == 'deploy') {
        this.fetchCells(true).catch(console.log);
      }
    }
  }
  render() {
    let control;
    if (this.walletAccount && this.walletAccount.isSignedIn()) {
      control = <WalletLogout accountId={this.walletAccount.getAccountId()} onClick={this.logout} />
    } else {
      control = <WalletLogin onClick={this.login} />
    }
    let cellInfo = null;
    if (this.state.player) {
      let cell = this.state.allCells[locationKey(this.state.player.location)];
      if (cell) {
        let cellId = cell.cellId;
        cellInfo = this.state.cellInfos[cellId];
      }
    }
    const cellSize = 32;
    const isWebPage = cellInfo && !!cellInfo.webUrl;
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.tabKey}
        onSelect={tabKey => this.setState({ tabKey })}
      >
        <Tab eventKey="info" title= "📜Info">
          {control}
        </Tab>
        <Tab eventKey="map" title="🌎World">
          <Grid width={cellSize * 15} height={cellSize * 15} cellWidth={cellSize} cellHeight={cellSize}
                allCells={this.state.allCells}
                onHighlight={this.onHighlight}
                images={this.state.images}
                imageUrls={this.state.imageUrls}
                cellInfos={this.state.cellInfos}
                renderInfos={this.state.renderInfos}
                player={this.state.player}
                movePath={this.state.movePath}
                actionType={this.state.actionType}
                onClick={this.takeAction}/>
          <ToggleButtonGroup
            aria-label="Action"
            name="action-types"
            value={this.state.actionType}
            onChange={(v) => this.handleActionChange(v)}
          >
            <ToggleButton variant="outline-secondary" value={"inspect"}>👀Inspect</ToggleButton>
            <ToggleButton variant="outline-secondary" value={"move"}>👣Move</ToggleButton>
            <ToggleButton variant="outline-secondary" value={"deploy"}>🏗Build</ToggleButton>
          </ToggleButtonGroup>
        </Tab>
        <Tab eventKey="cell-view" title="🏢Cell View" disabled={!isWebPage}>
          {isWebPage && <MiniGameView url={cellInfo.webUrl} contractId={cellInfo.contractId} />}
        </Tab>
        <Tab eventKey="chat" title="💬Chat" disabled>
          Bla
        </Tab>
      </Tabs>
    )
  }
}

export default () => {
  return (
    <div>
      <Head>
        <script src={USE_WALLET ? devnetNearlibUrl : localNearlibUrl}></script>
      </Head>
      <div>
        <Game />
      </div>
    </div>
  )
}
