import React from 'react'

const Contact = ({ name, number, filter, deletePerson, personId }) => {
    if (name.toLowerCase().includes(filter)) {
        return (
            <div>{name} {number}
            <button onClick={() => deletePerson(personId, name)}>delete</button>
            </div>
        )
    }
    return <></>
}

export default Contact