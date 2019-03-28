import Component from 'react'
import Link from 'next/link'
import Head from 'next/head'
// import { Near } from 'nearlib'

const contractId = "metanear";
const appTitle = "Meta NEAR"
const baseUrl = "http://localhost:3000"

const locationKey = (location) => JSON.stringify(location)
const cellKey = (cell) => locationKey(cell.location)

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
        Object.values(this.props.allCells).forEach((cell) => {
            ctx.fillStyle = ["#AA6666", "#AAAA66", "#AA66AA", "#6666AA", "#333333"][cell.viewIndex]
            ctx.fillRect(
                centerX + (cell.location.x - this.props.playerX) * this.props.cellWidth,
                centerY + (cell.location.y - this.props.playerY) * this.props.cellHeight,
                this.props.cellWidth,
                this.props.cellHeight)
        })
        Object.values(this.props.cells).forEach((cell) => {
            ctx.fillStyle = ["#FF9999", "#FFFF99", "#FF99FF", "#9999FF", "#666666"][cell.viewIndex]
            ctx.fillRect(
                centerX + (cell.location.x - this.props.playerX) * this.props.cellWidth,
                centerY + (cell.location.y - this.props.playerY) * this.props.cellHeight,
                this.props.cellWidth,
                this.props.cellHeight)
        })
        ctx.beginPath()
        ctx.arc(centerX + (0.5) * this.props.cellWidth, centerY + (0.5) * this.props.cellHeight, this.props.cellWidth / 2 - 3, 0, 2 * Math.PI)
        ctx.stroke()
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
            cells: {},
            allCells: {},
            highlighCell: {},
            player: null
        }
        this.walletAccount = null
    }
    fetchCells = async(accountId) => {
        let view = await this.contract.lookAround({ accountId })
        console.log(view)
        let cells = {}
        if (view.cells) {
            view.cells.forEach((cell) => {
                cells[cellKey(cell)] = cell;
            });
        }
        this.setState({ cells, allCells: Object.assign(this.state.allCells, cells) })
    }
    nearConnect = async () => {
        this.walletAccount = new nearlib.WalletAccount(contractId, "https://wallet.nearprotocol.com/");
        const accountId = this.walletAccount.getAccountId();
        console.log(accountId)
        const near = new nearlib.Near(new nearlib.NearClient(
            this.walletAccount,
            new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet"),
        ));
        this.contract = await near.loadContract(contractId, {
            viewMethods: ["lookAround", "getPlayer"],
            changeMethods: ["move", "deploy"],
            sender: accountId,
        });
        window.contract = this.contract
        await this.fetchCells(accountId)
        if (accountId) {
            let player = await this.contract.getPlayer({ accountId })
            console.log(player)
            this.setState({player})
        }
    }
    componentDidMount() {
        this.nearConnect();
    }
    onHighlight = (x, y) => {
        let highlighCell = this.state.allCells[locationKey({x, y})] || {}
        this.setState({highlighCell})
    }
    login = () => {
        this.walletAccount.requestSignIn(
            contractId,
            appTitle,
        );
    }
    logout = () => {

    }
    movePlayer = () => {
        let dx = 0
        let dy = 0
        if (Math.abs(this.state.player.location.x - this.state.highlighCell.location.x) == 1) {
            dx = this.state.player.location.x > this.state.highlighCell.location.x ? -1 : 1
        } else if (Math.abs(this.state.player.location.y - this.state.highlighCell.location.y) == 1) {
            dy = this.state.player.location.y > this.state.highlighCell.location.y ? -1 : 1
        }
        this.contract.move({dx, dy}).then(() => {
            const accountId = this.walletAccount.getAccountId();
            this.contract.getPlayer({ accountId }).then(async (player) => {
                console.log(player)
                this.setState({ player })
                await this.fetchCells(accountId)
            })
        })
    }
    render() {
        let control;
        if (this.walletAccount && this.walletAccount.isSignedIn()) {
            control = <WalletLogout accountId={this.walletAccount.getAccountId()} onClick={this.logout} />
        } else {
            control = <WalletLogin onClick={this.login} />
        }
        let cell = null;
        if (this.state.player) {
            cell = this.state.cells[locationKey(this.state.player.location)];
        }
        return (
            <div>
                {control}
                <Grid width={640} height={425} cellWidth={20} cellHeight={20} 
                cells={this.state.cells} allCells={this.state.allCells} onHighlight={this.onHighlight}
                    playerX={this.state.player && this.state.player.location.x} 
                    playerY={this.state.player && this.state.player.location.y} 
                onClick={this.movePlayer} />
                <div>Highlighted cell: {JSON.stringify(this.state.highlighCell)}</div>
                <div>Player: {JSON.stringify(this.state.player)}</div>
                {cell && <MiniGameView url={cell.webUrl} contractId={cell.contractId} />}
            </div>
        )
    }
}

export default function Index() {
    return (
        <div>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/nearlib@0.4.2/dist/nearlib.js"></script>
            </Head>
            <div>
                <Game />
            </div>
        </div>
    )
}
