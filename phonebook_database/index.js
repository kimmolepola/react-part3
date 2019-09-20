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

/* const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path  :', request.path)
    console.log('Body  :', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
 */
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
        .catch(error => next(error))
    res.json(person)
})

app.get('/api/persons/', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    console.error("Unknown endpoint")
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




/*

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
