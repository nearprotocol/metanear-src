import Component from 'react'
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import Head from 'next/head'
// import { Near } from 'nearlib'

const USE_WALLET = false;
const contractId = "metanear-dev-003";
const localStorageKeyCellPrefix = "cell:";
const localStorageKeyCellInfoPrefix = "cellInfo:"
const appTitle = "Meta NEAR"
const baseUrl = "http://localhost:3000"
const playerImgUrl = '/static/imgs/player.png';
const cantDeployImgUrl = '/static/imgs/cant_deploy.png';
const viewDistance = 7;
const localNearlibUrl = 'https://cdn.jsdelivr.net/gh/nearprotocol/nearcore@master/nearlib/dist/nearlib.js';
const devnetNearlibUrl = 'https://cdn.jsdelivr.net/npm/nearlib@0.4.7/dist/nearlib.js';
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];


const locationKey = (location) => JSON.stringify(location);
const cellKey = (cell) => locationKey(cell.location);
const grassColor = (a) => `rgb(${Math.round(86*a)}, ${Math.round(125*a)}, ${Math.round(70*a)})`;
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
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        const centerX = this.props.width / 2 - this.props.cellWidth / 2
        const centerY = this.props.height / 2 - this.props.cellHeight / 2
        const cellNumberX = this.props.width / this.props.cellWidth
        const cellNumberY = this.props.height / this.props.cellHeight
        /*
        ctx.fillStyle = "#FF0000";
        for (let i =  - cellNumberX / 2; i < cellNumberX / 2; ++i) {
            ctx.beginPath()
            ctx.moveTo(centerX + i * this.props.cellWidth, 0)
            ctx.lineTo(centerX + i * this.props.cellWidth, this.props.height)
            ctx.stroke()
        }
        for (let i = - cellNumberY; i < cellNumberY; ++i) {
            ctx.beginPath()
            ctx.moveTo(0, centerY + (i - 0.7) * this.props.cellHeight)
            ctx.lineTo(this.props.width, centerY + (i - 0.7) * this.props.cellHeight)
            ctx.stroke()
        }
        */
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
        Object.values(this.props.allCells).forEach((cell) => {
            let cellInfo = this.props.cellInfos[cell.cellId];
            const d = dxDy(cell.location);
            const rect = dxDyRect(d);
            let rendered = cellInfo && renderImg(rect, cellInfo.imageUrl);
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
        document.addEventListener('mousemove', this.onMouseMove, false)
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove, false)
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
                <canvas ref="canvas" width={this.props.width} height={this.props.height} onClick={this.props.onClick} />
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
            <iframe src={this.props.url} frameBorder="0" width="100%" height="100%"/>
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
            movePath: null,
            player: null,
            cellInfos: {},
            tabKey: "info",
            actionType: "move",
        };
        this.fetchingImages = {};
        this.fetchingCellInfos = {};
        this.walletAccount = null;
    }
    fetchImage = (imageUrl) => {
        if (imageUrl in this.fetchingImages) {
            return;
        }
        this.fetchingImages[imageUrl] = true;
        const image = new Image(32, 32);
        image.onload = () => {
            const images = {};
            images[imageUrl] = image;
            this.setState({
                images: Object.assign(this.state.images, images),
            });
        };
        image.src = imageUrl;
    }
    addCellInfo = (cellId, cellInfo) => {
        cellInfo.cellId = cellId;
        const cellInfos = {};
        cellInfos[cellId] = cellInfo;
        localStorage.setItem(localStorageKeyCellInfoPrefix + cellId, JSON.stringify(cellInfo))
        if (cellInfo.imageUrl) {
            this.fetchImage(cellInfo.imageUrl);
        }
        this.setState({
            cellInfos: Object.assign(this.state.cellInfos, cellInfos),
        });
    }
    checkCellInfo = (cellId) => {
        if (cellId in this.fetchingCellInfos) {
            return;
        }
        this.fetchingCellInfos[cellId] = true;
        this.contract.getCellInfo({cellId})
            .then((cellInfo) => this.addCellInfo(cellId, cellInfo))
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
                this.checkCellInfo(cellId);
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
            viewMethods: ["lookAround", "getPlayer", "getCellInfo"],
            changeMethods: ["move", "deploy", "init", "createNewCell"],
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
        let cellInfos = {};
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(localStorageKeyCellInfoPrefix)) {
                try {
                    let cellInfo = JSON.parse(localStorage.getItem(key));
                    if (localStorageKeyCellInfoPrefix + cellInfo.cellId == key) {
                        if (cellInfo.imageUrl) {
                            this.fetchImage(cellInfo.imageUrl);
                        }
                        cellInfos[cellInfo.cellId] = cellInfo;
                        this.fetchingCellInfos[cellInfo.cellId] = true;
                    }
                } catch (err) {
                    // whatever
                }
            }
        })
        this.setState({ cellInfos })
        this.fetchImage(playerImgUrl);
        this.fetchImage(cantDeployImgUrl);
        this.nearConnect();
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
        const add = (st) => {
            const key = locationKey({
                x: st.x,
                y: st.y,
            });
            if (key in visited || !(key in this.state.allCells)) {
                return;
            }
            let cellInfo = this.state.cellInfos[this.state.allCells[key].cellId];
            if (!cellInfo || cellInfo.blocking) {
                return;
            }
            visited[key] = st;
            q.push(st);
        }
        add({
            x: px,
            y: py,
            dir: -1,
            last: null,
        });
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
                });
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
                    <Grid width={32 * 15} height={32 * 15} cellWidth={32} cellHeight={32}
                          allCells={this.state.allCells} onHighlight={this.onHighlight}
                          images={this.state.images} cellInfos={this.state.cellInfos}
                          player={this.state.player} movePath={this.state.movePath}
                          actionType={this.state.actionType}
                          onClick={this.takeAction} />
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
