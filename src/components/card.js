import { placeCards } from './index.js'

function addCard(cardData, deleteCard, showPopup, like) {
	const cardTemplate = document.querySelector('#card-template').content
	const card = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = card.querySelector('.card__image')
	const cardName = card.querySelector('.card__title')
	cardImage.src = cardData.link
	cardName.textContent = cardData.name
	card
		.querySelector('.card__delete-button')
		.addEventListener('click', deleteCard)
	cardImage.addEventListener('click', () =>
		showPopup(cardImage.src, cardName.textContent)
	)
	placeCards.addEventListener('click', like)
	return card
}

function deleteCard(evt) {
	evt.target.parentElement.remove()
}

function toggleLike(evt) {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active')
	}
}

export { addCard, deleteCard, toggleLike }
