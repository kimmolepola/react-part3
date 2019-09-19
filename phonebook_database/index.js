require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number
    if (name === "" || name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (number === "" || number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }

    const person = new Person({ name: req.body.name, number: req.body.number })
    person.save().then(res => {
        console.log(`added ${req.body.name} number ${req.body.number} to phonebook`)
    })
    res.json(person)
})

app.get('/api/persons/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

/*
app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number
    if (name === "" || name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (number === "" || number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }
    if (persons.find(person => person.name === name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    const id = Math.floor(Math.random() * 10000000)
    let person = { name: req.body.name, number: req.body.number }
    person.id = id
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people</div><div>${Date()}</div>`)
}) */
