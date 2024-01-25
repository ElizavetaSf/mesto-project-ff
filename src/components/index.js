import '../index.css'
import { initialCards } from './cards.js'
import { addCard, deleteCard, toggleLike } from './card.js'
import { openPopup, closePopup, closePopupOverlay } from './modal.js'

const placeCards = document.querySelector('.places__list')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const editPopup = document.querySelector('.popup_type_edit')
const formElementEdit = document.querySelector(
	'.popup__form[name=edit-profile]'
)
const nameInput = formElementEdit.querySelector('.popup__input_type_name')
const jobInput = formElementEdit.querySelector('.popup__input_type_description')
const formElementAdd = document.querySelector('.popup__form[name=new-place]')
const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const imageContent = imagePopup.querySelector('.popup__image')
const imagePopupCaption = imagePopup.querySelector('.popup__caption')
const placeNameInput = formElementAdd.querySelector(
	'.popup__input_type_card-name'
)
const linkInput = formElementAdd.querySelector('.popup__input_type_url')
const closeButtons = document.querySelectorAll('.popup__close')

function addEditPopup() {
	const editButton = document.querySelector('.profile__edit-button')
	editButton.addEventListener('click', () => {
		nameInput.value = profileName.textContent
		jobInput.value = profileDescription.textContent
		openPopup(editPopup)
		})
	formElementEdit.addEventListener('submit', handleFormElementEditSubmit)
}

function addNewCardPopup() {
	const newCardButton = document.querySelector('.profile__add-button')
	newCardButton.addEventListener('click', () => {
		formElementAdd.reset()
		openPopup(newCardPopup)
	})
	formElementAdd.addEventListener('submit', handleFormElementAddSubmit)
}

function openPopupFullImage(cardLink, cardName) {
	imageContent.src = cardLink
	imageContent.alt = cardName
	imagePopupCaption.textContent = cardName
	openPopup(imagePopup)
}

function handleFormElementAddSubmit(evt) {
	evt.preventDefault()
	const newCard = {
		name: `${placeNameInput.value}`,
		link: `${linkInput.value}`,
	}
	placeCards.prepend(
		addCard(newCard, deleteCard, openPopupFullImage, toggleLike)
	)
	closePopup(newCardPopup)
}

function handleFormElementEditSubmit(evt) {
	evt.preventDefault()
	profileName.textContent = nameInput.value
	profileDescription.textContent = jobInput.value
	closePopup(editPopup)
	closePopup(newCardPopup)
}

function displayCards() {
	initialCards.forEach(element => {
		placeCards.append(
			addCard(element, deleteCard, openPopupFullImage, toggleLike)
		)
	})
}

editPopup.addEventListener('click', closePopupOverlay)
newCardPopup.addEventListener('click', closePopupOverlay)
imagePopup.addEventListener('click', closePopupOverlay)

closeButtons.forEach(button => {
	button.addEventListener('click', () => {
		const openedPopup = document.querySelector('.popup_is-opened')
		closePopup(openedPopup)
	})
})

displayCards()
addEditPopup()
addNewCardPopup()

export { placeCards }
