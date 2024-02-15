function createCard(cardData, openDeletePopup, showPopup, like, userId) {
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
	const cardLikeButton = card.querySelector('.card__like-button')

	cardLikeButton.addEventListener('click', () => {
		like(cardData, cardLikeAmount, cardLikeButton)
	})

	if (cardData.likes.some(currentUser => currentUser._id === userId)) {
		cardLikeButton.classList.add('card__like-button_is-active')
	} else {
		cardLikeButton.classList.remove('card__like-button_is-active')
	}
	if (cardData.likes.length) {
		cardLikeAmount.textContent = cardData.likes.length
	} else {
		cardLikeAmount.textContent = ''
	}

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

function deleteCardElement(card) {
	card.remove()
}

function updateLikes(updatedCardData, cardLikeAmount, likeButton) {
	if (updatedCardData.likes.length) {
		cardLikeAmount.textContent = updatedCardData.likes.length
	} else {
		cardLikeAmount.textContent = ''
	}
	likeButton.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCardElement, updateLikes }
