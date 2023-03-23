export default function globalFilter(data, filteredValue) {
    return data.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filteredValue.toLowerCase())
        })
    })
}