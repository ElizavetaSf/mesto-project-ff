function addCard(cardData, deleteCard, showPopup, like) {
  const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = card.querySelector('.card__image')
  const cardName = card.querySelector('.card__title')
  cardImage.src = cardData.link
  cardImage.alt = cardData.name
  cardName.textContent = cardData.name
  card
	  .querySelector('.card__delete-button')
	  .addEventListener('click', deleteCard)
  cardImage.addEventListener('click', () =>
    showPopup(cardImage.src, cardName.textContent)
  )
    card.querySelector('.card__like-button').addEventListener('click', like)
  return card
}

function deleteCard(evt) {
  evt.target.closest('.card').remove()
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export { addCard, deleteCard, toggleLike }
