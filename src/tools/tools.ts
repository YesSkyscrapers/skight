export const waitFor = (delay) => {
    return new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, delay)
    })
}