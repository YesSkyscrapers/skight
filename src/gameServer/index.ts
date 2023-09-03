import { REGISTRATION } from '../constants/MessagesInActions'
import { GameServerParams } from '../entity/GameServerParams'
import registration from './handlers/registration'
import udpServer from './udpServer'

const init = async (params: GameServerParams) => {
    await udpServer.init(params)
    udpServer.setListener(onMessage)
}

const onMessage = async (id, message) => {
    try {
        switch (message.action) {
            case REGISTRATION: {
                registration(id)
                break
            }
        }
    } catch (err) {
        console.log('gameServer onMessage error - ', err)
    }
}

export default {
    init
}
