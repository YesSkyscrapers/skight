let logic = {
    players: []
}

const updateLogic = (changeFunc) => {
    changeFunc(logic)
}

export { updateLogic }
