import { GameServerParams } from '../entity/GameServerParams'
import * as udp from 'dgram'
var ip = require('ip')

let server = null
let port = null

const onError = (error) => {
    console.log('Error: ' + error)
}

const onClose = () => {
    console.log('Socket is closed !')
}

const onListening = () => {
    var address = server.address()
    var port = address.port
    var family = address.family
    var ipaddr = address.address
    console.log('Server is started at port: ' + port)
    console.log('Server ip: ' + ipaddr)
    console.log('Server is IP4/IP6: ' + family)
}

const onMessage = (msg, info) => {}

const init = (params: GameServerParams) => {
    return new Promise((resolve, reject) => {
        const onListeningWrapper = () => {
            onListening()
            resolve(null)
        }

        let portForStart = params.lastRunPort
        if (!portForStart) {
            portForStart = params.allowedPortsFrom
        } else {
            portForStart = portForStart + 1
            if (portForStart > params.allowedPortsTo) {
                portForStart = params.allowedPortsFrom
            }
        }

        port = portForStart

        server = udp.createSocket('udp4')

        server.on('error', onError)
        server.on('close', onClose)
        server.on('listening', onListeningWrapper)
        server.on('message', onMessage)

        server.bind(port, ip.address())
    })
}

const stop = () => {
    server.close()
    server = null
    port = null
}

export default {
    init,
    stop
}
