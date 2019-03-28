import Component from 'react'
import Link from 'next/link'
import Head from 'next/head'
// import { Near } from 'nearlib'

const contractId = "metanear";
const appTitle = "Meta NEAR"
const baseUrl = "http://localhost:3000"

class Grid extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        ctx.fillStyle = "#FF0000";
        for (let i = 0; i < this.props.width / this.props.cellWidth; ++i) {
            ctx.beginPath()
            ctx.moveTo(i * this.props.cellWidth, 0)
            ctx.lineTo(i * this.props.cellWidth, this.props.height)
            ctx.stroke()
        }
        for (let i = 0; i < this.props.height / this.props.cellHeight; ++i) {
            ctx.beginPath()
            ctx.moveTo(0, i * this.props.cellHeight)
            ctx.lineTo(this.props.width, i * this.props.cellHeight)
            ctx.stroke()
        }
        for (let i = 0; i < this.props.cells.length; ++i) {
            ctx.fillRect(
                (this.props.cells[i].location.x) * this.props.cellWidth,
                (this.props.cells[i].location.y) * this.props.cellHeight,
                this.props.cellWidth,
                this.props.cellHeight)
        }
        ctx.beginPath()
        ctx.arc((this.props.playerX + 0.5) * this.props.cellWidth, (this.props.playerY + 0.5) * this.props.cellHeight, this.props.cellWidth / 2 - 3, 0, 2 * Math.PI)
        ctx.stroke()
        document.addEventListener('mousemove', this.onMouseMove, false)
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove, false)
    }
    onMouseMove = (e) => {
        this.props.onHighlight(Math.floor(e.offsetX / this.props.cellWidth), Math.floor(e.offsetY / this.props.cellHeight))
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

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            cells: [], 
            highlighCell: {},
            player: null
        }
        this.walletAccount = null
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
            changeMethods: ["move"],
            sender: accountId,
        });
        let view = await this.contract.lookAround({ accountId })
        console.log(view)
        this.setState({ cells: view.cells || [] })
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
        let highlighCell = {}
        for (let i = 0; i < this.state.cells.length; ++i) {
            if (this.state.cells[i].location.x == x && this.state.cells[i].location.y == y) {
                highlighCell = this.state.cells[i]
                break
            }
        }
        this.setState({highlighCell})
    }
    login = () => {
        this.walletAccount.requestSignIn(
            contractId,
            appTitle,
            baseUrl + '/',
            baseUrl + '/',
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
                let view = await this.contract.lookAround({ accountId })
                console.log(view)
                this.setState({ cells: view.cells || [] })
            })
        })
        // console.log(this.state.highlighCell)
    }
    render() {
        let control;
        if (this.walletAccount && this.walletAccount.isSignedIn()) {
            control = <WalletLogout accountId={this.walletAccount.getAccountId()} onClick={this.logout} />
        } else {
            control = <WalletLogin onClick={this.login} />
        }
        return (
            <div>
                {control}
                <Grid width={640} height={425} cellWidth={20} cellHeight={20} 
                cells={this.state.cells} onHighlight={this.onHighlight} 
                    playerX={this.state.player && this.state.player.location.x} 
                    playerY={this.state.player && this.state.player.location.y} 
                onClick={this.movePlayer} />
                <div>Highlighted cell: {JSON.stringify(this.state.highlighCell)}</div>
                <div>Player: {JSON.stringify(this.state.player)}</div>
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