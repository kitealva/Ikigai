const cards = require('./db.json')
let cardId = 4

// Get, Put, Push, Delete

module.exports = {
    getCards: (req, res) => {
        res.status(200).send(cards)
    },

    addCards: (req, res) => {
        const {name, picture, description} = req.body

        let newCardsObject = {
            id: cardId,
            name: name,
            picture: picture,
            description: description, 
            likes: 0
        }

        cards.push(newCardsObject)

        cardId++

        res.status(200).send(cards)
    },

    
    deleteCards: (req,res) => {
        const index = cards.findIndex(el => el.id === +req.params.id)

        cards.splice(index, 1)

        res.status(200).send(cards)
    },

    updateLikes: (req, res) => {
        const index = cards.findIndex(el => el.id === +req.params.id)
        const {type} = req.body

        if(type === 'like'){
            cards[index].likes++
        }else if(type === 'dislike'){
            cards[index].likes--
        }

        res.status(200).send(cards)
    }
    
}