export function formatDate(seconds: number) {
    const date = new Date()

    date.setTime(seconds * 1000)

    return date
}
