import Component from 'react'
import Link from 'next/link'
import Head from 'next/head'
// import { Near } from 'nearlib'

const accountId = "alice.near";
const contractName = "metanear";

class Grid extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
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
            <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            cells: [{ location: { x: 1, y: 1 }, viewIndex: 1, contractId: "ads", webUrl: "123", owner: "xyz" }], 
            highlighCell: {},
            player: {location: {x: 0, y: 0}}
        }
    }
    nearConnect = async () => {
        const walletAccount = new nearlib.WalletAccount(contractName, "https://wallet.nearprotocol.com/");
        const accountId = walletAccount.getAccountId();
        console.log(accountId)
        const near = new nearlib.Near(new nearlib.NearClient(
            walletAccount,
            new nearlib.LocalNodeConnection("https://studio.nearprotocol.com/devnet"),
        ));
        this.contract = await near.loadContract(contractName, {
            viewMethods: ["lookAround", "getPlayer"],
            changeMethods: [],
            sender: accountId,
        });
        let view = await this.contract.lookAround()
        console.log(view)
        let player = await this.contract.getPlayer({accountId: this.props.accountId})
        console.log(player)
        this.setState({cells: view.cells || [], player})
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
    render() {
        return (
            <div>
                <Grid width={640} height={425} cellWidth={20} cellHeight={20} cells={this.state.cells} onHighlight={this.onHighlight} playerX={this.state.player.location.x} playerY={this.state.player.location.y} />
                <div>{JSON.stringify(this.state.highlighCell)}</div>
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
                <Game accountId="illia.near" />
            </div>
        </div>
    )
}