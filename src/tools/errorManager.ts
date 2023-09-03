export const ERRORS = {
    BUILD_EXIST: 1
}

export const getError = (code) => {
    return {
        errorCode: code
    }
}