import React from 'react'
import Contact from './Contact'

const Contacts = ({ persons, filter, deletePerson }) => {
    return persons.map(person =>
        <Contact
            key={person.name}
            name={person.name}
            number={person.number}
            filter={filter}
            deletePerson={deletePerson}
            personId = {person.id}
        />
    )
}

export default Contacts