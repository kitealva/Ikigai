const baseURL = 'http://localhost:1010'

const showCards = document.querySelector('#cardDisplay')
const addButton = document.querySelector('#addCard')



const displayCards = (arr) => {
    for(let i = 0; i < arr.length; i++){ 
        createCard(arr[i])
    }
}

const createCard = (card) => {
    const oneCard = document.createElement('section')
    oneCard.classList.add('one-card')
    
    oneCard.innerHTML =`
        <img class="card-image" src= ${card.picture} />
        <p class="card-name">${card.name}</p>
        <p>${card.description}</p>
        <section>
        <button id= "dislike-button" onclick="updateCards(${card.id}, 'dislike')">Dislike</button>
        Popularity: ${card.likes}
        <button id="like-button" onclick="updateCards(${card.id}, 'like')">Like</button>
        </section>
        <button id="delete-button" onclick="deleteCards(${card.id})">Delete</button>
    `
    showCards.appendChild(oneCard)
}

const getAllCards = () => {
    axios.get(`${baseURL}/getCards`)

    .then((res) => {
        displayCards(res.data)
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteCards = (id) => {
    axios.delete(`${baseURL}/deleteCards/${id}`)
    .then((res) => {
        showCards.innerHTML = ''
        displayCards(res.data)
    })
}

const updateCards = (id, type) => {
    axios.put(`${baseURL}/updateLikes/${id}`, {type})
    .then((res) => {
        showCards.innerHTML = ''
        displayCards(res.data)
    })

}

const addCard = () =>{
    let nameInput = document.querySelector('#name')
    let descriptionInput = document.querySelector('#description')
    let pictureInput = document.querySelector('#picture')

    let newCard = {
        name: nameInput.value,
        description: descriptionInput.value,
        picture: pictureInput.value
    }

    axios.post(`${baseURL}/addCards`, newCard)
    .then((res) => {
        showCards.innerHTML = ''
        nameInput.value = ''
        descriptionInput.value =''
        pictureInput.value =''
        displayCards(res.data)
    })
}
addButton.addEventListener('click' , addCard)

getAllCards()