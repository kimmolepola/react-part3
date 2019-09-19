
const find = (persons, id) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === id) {
            return i
        }
    }
    return -1
}

export default find