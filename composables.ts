
const day: number = 86400000

export const pastDaysSinceDateInMs = (days: number) => {
    const now: number = new Date().getTime()
    return now - (day * days)
}

export const minutesListened = (tracks: Array<object>) => {
    let totalMs = 0
    tracks.forEach((item) => {
        totalMs += item.track.duration_ms
    })
    const totalMsNumber = Number(totalMs)
    return new Date(totalMsNumber).toISOString().slice(11, 19)
}