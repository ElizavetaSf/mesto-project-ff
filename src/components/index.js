import '../index.css';
import { initialCards } from './cards.js'
import { addCard, deleteCard, toggleLike } from './card.js'
import { openPopup, closePopup } from './modal.js'

export const placeCards = document.querySelector('.places__list')
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')
const editPopup = document.querySelector('.popup_type_edit')
const formElementEdit = document.querySelector('.popup__form[name=edit-profile]')
const nameInput = formElementEdit.querySelector('.popup__input_type_name')
const jobInput = formElementEdit.querySelector('.popup__input_type_description')
const formElementAdd = document.querySelector('.popup__form[name=new-place]')
const newCardPopup = document.querySelector('.popup_type_new-card')

function addEditPopup() {
	const editButton = document.querySelector('.profile__edit-button')
	editButton.addEventListener('click', () => {
		nameInput.value = profileName.textContent
		jobInput.value = profileDescription.textContent
		openPopup(editPopup)
	})
	formElementEdit.addEventListener('submit', handleFormSubmit)
}

function addNewCardPopup() {
	const newCardButton = document.querySelector('.profile__add-button')
	newCardButton.addEventListener('click', () => {
		formElementAdd.reset()
		openPopup(newCardPopup)
	})
	formElementAdd.addEventListener('submit', handleFormSubmit)
}

function addCardPopup(cardLink, cardName) {
	const imagePopup = document.querySelector('.popup_type_image')
	const imageContent = imagePopup.querySelector('.popup__image')
	const imagePopupCapt = imagePopup.querySelector('.popup__caption')
	imageContent.src = cardLink
	imagePopupCapt.textContent = cardName
	openPopup(imagePopup)
}

function handleFormSubmit(evt) {
	evt.preventDefault()
	if (evt.currentTarget === formElementEdit) {
		profileName.textContent = nameInput.value
		profileDescription.textContent = jobInput.value
		closePopup(editPopup)
	} else if (evt.currentTarget === formElementAdd) {
		const placeNameInput = formElementAdd.querySelector(
			'.popup__input_type_card-name'
		)
		const linkInput = formElementAdd.querySelector('.popup__input_type_url')
		const newCard = {
			name: `${placeNameInput.value}`,
			link: `${linkInput.value}`,
		}
		placeCards.prepend(addCard(newCard, deleteCard, addCardPopup, toggleLike))
		closePopup(newCardPopup)
	}
}

function displayCards() {
	initialCards.forEach(element => {
		placeCards.append(addCard(element, deleteCard, addCardPopup, toggleLike))
	})
}

displayCards();
addEditPopup();
addNewCardPopup();




