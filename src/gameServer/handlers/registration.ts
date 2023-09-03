import { REGISTRATION_END } from '../../constants/MessagesOutActions'
import { updateLogic } from '../gameLogic'
import udpServer from '../udpServer'

let idIncrementer = 0

const registration = (clientId) => {
    let newPlayerId = idIncrementer
    updateLogic((logic) => {
        logic.players.push({
            id: newPlayerId,
            clientId: clientId
        })
        idIncrementer = idIncrementer + 1
    })

    udpServer.send(newPlayerId, {
        action: REGISTRATION_END,
        playerId: newPlayerId
    })
}

export default registration
