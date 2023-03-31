function converDecimal(event) {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
        event.target.value = value.toFixed(2);
    }
}

export default converDecimal