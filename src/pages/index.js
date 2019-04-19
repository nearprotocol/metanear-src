import Component from 'react'
import Head from 'next/head'
// import { Near } from 'nearlib'

const USE_WALLET = true;
const contractId = "metanear-dev-001";
const localStorageKeyCellPrefix = "cell:";
const localStorageKeyCellInfoPrefix = "cellInfo:"
const appTitle = "Meta NEAR"
const baseUrl = "http://localhost:3000"
const playerImgUrl = '/static/imgs/player.png';
const viewDistance = 7;
const localNearlibUrl = 'https://cdn.jsdelivr.net/gh/nearprotocol/nearcore@master/nearlib/dist/nearlib.js';
const devnetNearlibUrl = 'https://cdn.jsdelivr.net/npm/nearlib@0.4.7/dist/nearlib.js';


const locationKey = (location) => JSON.stringify(location);
const cellKey = (cell) => locationKey(cell.location);
const grassColor = (a) => `rgb(${Math.round(86*a)}, ${Math.round(125*a)}, ${Math.round(70*a)})`;
const _offsetCache = [];
const isClose = (dx, dy, maxDistance) => (dx * dx + dy * dy <= maxDistance * maxDistance);
const cellOffsets = (i) => {
    if (_offsetCache.length == 0) {
        for (let dy = -viewDistance; dy <= viewDistance; ++dy) {
            for (let dx = -viewDistance; dx <= viewDistance; ++dx) {
                if (isClose(dx, dy, viewDistance)) {
                    _offsetCache.push({dx, dy});
                }
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
        ctx.fillStyle = "#FF0000";
        const centerX = this.props.width / 2 - this.props.cellWidth / 2
        const centerY = this.props.height / 2 - this.props.cellHeight / 2
        const cellNumberX = this.props.width / this.props.cellWidth
        const cellNumberY = this.props.height / this.props.cellHeight
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
        const dxDy = (location) => {
            return {
                dx: location.x - this.props.playerX,
                dy: location.y - this.props.playerY,
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
            if (!isClose(d.dx, d.dy, viewDistance)) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            }
        })
        renderImg(dxDyRect({dx: 0, dy: 0}), playerImgUrl);
        document.addEventListener('mousemove', this.onMouseMove, false)
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove, false)
    }
    onMouseMove = (e) => {
        const centerX = this.props.width / 2 - this.props.cellWidth / 2
        const centerY = this.props.height / 2 - this.props.cellHeight / 2
        this.props.onHighlight(Math.floor((e.offsetX - centerX) / this.props.cellWidth) + this.props.playerX, Math.floor((e.offsetY - centerY) / this.props.cellHeight) + this.props.playerY)
    }
    render() {
        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height} onClick={this.props.onClick} />
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
            <iframe src={this.props.url} width={640} height={480}/>
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
            canMoveThere: false,
            player: null,
            cellInfos: {},
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
                };
                this.checkCellInfo(cellId);
                cells[cellKey(cell)] = cell
                localStorage.setItem(localStorageKeyCellPrefix + cellKey(cell), JSON.stringify(cell))
            })
        }
        this.setState({
            player,
            allCells: Object.assign(this.state.allCells, cells)
        })
    }

    fetchCells = async() => {
        let accountId = this.state.player ? this.state.player.accountId : 'metanear';
        let view = await this.contract.lookAround({ accountId })
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
            changeMethods: ["move", "deploy", "init"],
            sender: accountId,
        });
        window.contract = this.contract
        if (accountId) {
            let player = await this.contract.getPlayer({accountId})
            console.log(player)
            this.setState({player})
        }
        await this.fetchCells();
    }
    componentDidMount() {
        let allCells = {};
        let cellInfos = {};
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(localStorageKeyCellPrefix)) {
                try {
                    let cell = JSON.parse(localStorage.getItem(key))
                    if (localStorageKeyCellPrefix + cellKey(cell) == key) {
                        allCells[cellKey(cell)] = cell
                    }
                } catch (err) {
                    // whatever
                }
            } else if (key.startsWith(localStorageKeyCellInfoPrefix)) {
                try {
                    let cellInfo = JSON.parse(localStorage.getItem(key))
                    if (localStorageKeyCellInfoPrefix + cellInfo.cellId == key) {
                        if (cellInfo.imageUrl) {
                            this.fetchImage(cellInfo.imageUrl);
                        }
                        cellInfos[cellInfo.cellId] = cellInfo;
                    }
                } catch (err) {
                    // whatever
                }
            }
        })
        this.setState({ allCells, cellInfos })
        this.fetchImage(playerImgUrl);
        this.nearConnect();
    }
    onHighlight = (x, y) => {
        let highlightCell = this.state.allCells[locationKey({x, y})] || {}
        this.setState({highlightCell, canMoveThere: this.canMove(x, y)})
    }
    login = () => {
        this.walletAccount.requestSignIn(
            contractId,
            appTitle,
        );
    }
    logout = () => {

    }
    canMove = (x, y) => {
        if (!this.state.player) {
            return false
        }
        let dx = x - this.state.player.location.x;
        let dy = y - this.state.player.location.y;
        return isClose(dx, dy, 7);
    }
    movePlayer = () => {
        if (!this.state.canMoveThere || !this.state.highlightCell.location) {
            return
        }
        let dx = this.state.highlightCell.location.x - this.state.player.location.x
        let dy = this.state.highlightCell.location.y - this.state.player.location.y
        this.contract.move({dx, dy}).then((res) => this.updateView(res.lastResult));
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
        return (
            <div>
                {control}
                <Grid width={640} height={425} cellWidth={32} cellHeight={32}
                allCells={this.state.allCells} onHighlight={this.onHighlight}
                    images={this.state.images} cellInfos={this.state.cellInfos}
                    playerX={this.state.player && this.state.player.location.x} 
                    playerY={this.state.player && this.state.player.location.y} 
                onClick={this.movePlayer} />
                <div>Highlighted cell: {JSON.stringify(this.state.highlightCell)}</div>
                <div>Player: {JSON.stringify(this.state.player)}</div>
                {cellInfo && cellInfo.webUrl && <MiniGameView url={cellInfo.webUrl} contractId={cellInfo.contractId} />}
            </div>
        )
    }
}

export default function Index() {
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
