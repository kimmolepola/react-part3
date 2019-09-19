/* exported person */

const CheckIfExists = (persons, newName) => {
    for (const person of persons) { // eslint-disable-line no-unused-vars
        if (person.name.toLowerCase() === newName.toLowerCase()) {
            return person.id
        }
    }
    return -1
}

export default CheckIfExists