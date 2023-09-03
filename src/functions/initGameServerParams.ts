import { skyes, entityManager } from 'skyes'
import { GameServerParams } from '../entity/GameServerParams'
import { defaultGameServerParams } from '../../config'
const { v4: uuidv4 } = require('uuid')

export const initGameServerParams = async () => {
    let currentParams = (
        await entityManager.read(
            GameServerParams,
            {
                pageIndex: 0,
                pageSize: 1
            },
            []
        )
    ).data[0]

    if (!currentParams) {
        currentParams = (await entityManager.create(GameServerParams, defaultGameServerParams)).entity
    }

    return currentParams
}
