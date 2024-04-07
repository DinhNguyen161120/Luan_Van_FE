export const convertStringDateToDate = (stringDate: string): string => {
    let date = new Date(parseInt(stringDate))
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}