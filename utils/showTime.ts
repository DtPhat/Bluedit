const showTime = (inserted_at : Date) : String => {
    const today = new Date();
    const insertedDay = new Date(inserted_at)
    const timediff = today.getTime() - insertedDay.getTime();
    const daydiff = Math.round(timediff / (1000 * 3600 * 24))
    const hourdiff = Math.round(timediff / (1000 * 3600))
    const minutediff = Math.round(timediff / (1000 * 60))
    const seconddiff = Math.round(timediff / (1000))
    if (daydiff > 0) {
        return `${daydiff} day${daydiff === 1 ? '' : 's'} ago`
    } else if (hourdiff > 0) {
        return `${hourdiff} hour${hourdiff === 1 ? '' : 's'} ago`
    } else if (minutediff > 0) {
        return `${minutediff} minute${minutediff === 1 ? '' : 's'} ago`
    } else {
        return `${seconddiff} second${seconddiff === 1 ? '' : 's'} ago`
    }
}
export default showTime