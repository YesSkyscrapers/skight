import 'reflect-metadata'
import { skyes } from 'skyes'
import { ormconfig, serverConfig } from '../config'

const runApp = async () => {
    await skyes.init({
        ormconfig,
        serverConfig
    })
}

export default runApp
