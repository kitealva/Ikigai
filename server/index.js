const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getCards, 
    addCards,
    deleteCards,
    updateLikes
} = require("./controller")

app.get('/getCards', getCards)
app.post('/addCards', addCards)
app.delete('/deleteCards/:id', deleteCards)
app.put('/updateLikes/:id', updateLikes)

app.listen(1010, () => console.log('Up on port 1010'))