import 'reflect-metadata'
import { skyes } from 'skyes'
import { ormconfig, serverConfig } from '../config'
import { initGameServerParams } from './functions/initGameServerParams'
import gameServer from './gameServer'

const runApp = async () => {
    await skyes.init({
        ormconfig,
        serverConfig
    })
    let gameServerParams = await initGameServerParams()
    gameServer.init(gameServerParams)
    console.log('Skight running...')
}

export default runApp
