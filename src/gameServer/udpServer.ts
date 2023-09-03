import { GameServerParams } from '../entity/GameServerParams'
import * as udp from 'dgram'
var ip = require('ip')

let server = null
let port = null
let clients = []
let idIncrement = 0
let listener = async (id, msg) => {}

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

const send = (id, obj) => {
    return new Promise((resolve, reject) => {
        try {
            let client = clients.find((_client) => _client.id == id)
            if (client) {
                server.send(JSON.stringify(obj), client.info.port, client.info.address, (error) => {
                    if (error) {
                        reject(error.message)
                    } else {
                        resolve(null)
                    }
                })
            }
        } catch (err) {
            console.log('Send error - ', err)
            reject(err.message)
        }
    })
}

const broadcast = (obj) => {
    return Promise.all(
        clients.map((client) => {
            return new Promise((resolve, reject) => {
                try {
                    if (client) {
                        server.send(JSON.stringify(obj), client.info.port, client.info.address, (error) => {
                            if (error) {
                                reject(error.message)
                            } else {
                                resolve(null)
                            }
                        })
                    }
                } catch (err) {
                    console.log('Send error - ', err)
                    reject(err.message)
                }
            })
        })
    )
}

const broadcastWithoutOneClient = (id, obj) => {
    return Promise.all(
        clients
            .filter((client) => client.id != id)
            .map((client) => {
                return new Promise((resolve, reject) => {
                    try {
                        if (client) {
                            server.send(JSON.stringify(obj), client.info.port, client.info.address, (error) => {
                                if (error) {
                                    reject(error.message)
                                } else {
                                    resolve(null)
                                }
                            })
                        }
                    } catch (err) {
                        console.log('Send error - ', err)
                        reject(err.message)
                    }
                })
            })
    )
}

const onMessage = (msg, info) => {
    try {
        let existsClient = clients.find(
            (client) => client.info.address == info.address && client.info.port == info.port
        )
        if (!existsClient) {
            let newClient = {
                info,
                id: idIncrement
            }
            idIncrement = idIncrement + 1
            clients.push(newClient)
            existsClient = newClient
        }

        listener(existsClient.id, JSON.parse(msg))
    } catch (err) {
        console.log('udpServer onMessage error - ', err)
    }
}

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

const setListener = (callback) => {
    listener = callback
}

export default {
    init,
    stop,
    setListener,
    send,
    broadcast,
    broadcastWithoutOneClient
}
