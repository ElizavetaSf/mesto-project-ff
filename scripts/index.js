// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

/*
  function addCards() {
		const placeCards = document.querySelector('.places__list')
		const cardTemplate = document.querySelector('#card-template').content
		initialCards.forEach(element => {
			const card = cardTemplate.querySelector('.card').cloneNode(true)
			card.querySelector('.card__image').src = element.link
			card.querySelector('.card__title').textContent = element.title

			placeCards.append(card)

			card
				.querySelector('.card__delete-button')
				.addEventListener('click', function () {
					card.remove()
				})
		})
	}

addCards();
*/

function addCard(cardData, deleteCard) {
	const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  card.querySelector('.card__image').src = cardData.link
	card.querySelector('.card__title').textContent = cardData.name
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard)
    return card
}

function deleteCard(event) {
	event.target.parentElement.remove()
}

function displayCards() { 
const placeCards = document.querySelector('.places__list')
initialCards.forEach(element => {
  placeCards.append(addCard(element, deleteCard))
})
}

displayCards();

