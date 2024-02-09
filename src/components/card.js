import { openPopup, closePopup } from './modal.js'
import { deleteCardApi, } from './api.js'
import { openDeletePopup, userId } from './index.js'

function createCard(cardData, openDeletePopup, showPopup, like) {
	const cardTemplate = document.querySelector('#card-template').content
	const card = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = card.querySelector('.card__image')
	const cardName = card.querySelector('.card__title')
	const cardLikeAmount = card.querySelector('.card__like-amount')
	const cardDeleteButton = card.querySelector('.card__delete-button')
	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardName.textContent = cardData.name
	cardImage.addEventListener('click', () =>
		showPopup(cardImage.src, cardName.textContent)
	)
	card.querySelector('.card__like-button').addEventListener('click', like)

	if (!(cardData.owner._id === userId)) {
		cardDeleteButton.classList.add('card__delete-button-hidden')
	} else {
		cardDeleteButton.classList.remove('card__delete-button-hidden')
		cardDeleteButton.addEventListener('click', () => {
			openDeletePopup(card, cardData)
		})
	}
	if (cardData.likes.length) {
		cardLikeAmount.textContent = cardData.likes.length
	} else {
		cardLikeAmount.textContent = ''
	}

	return card
}

function toggleLike(evt) {
	evt.target.classList.toggle('card__like-button_is-active')
}

export { createCard, toggleLike }
