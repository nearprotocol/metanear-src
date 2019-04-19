import Component from 'react'
import Head from 'next/head'

class Hello extends React.Component {
    render() {
        return (
            <h1>WELCOME TO METANEAR</h1>
        )
    }
}

export default function Index() {
    return (
        <div>
            <Head>

            </Head>
            <div>
                <Hello />
            </div>
        </div>
    )
}
