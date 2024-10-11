
const ConsoleValue = (request) => {

    Object.entries(request).forEach(([key, value]) => {
        console.log(`${key}  === ${value}`)

    })
}
export { ConsoleValue }