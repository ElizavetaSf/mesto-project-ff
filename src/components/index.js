
import '../index.css'
//import { initialCards } from './cards.js'
import { createCard, toggleLike } from './card.js'
import { openPopup, closePopup, closePopupOverlay } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import {
	promiseAll,
	patchUserData,
	postNewCard,
	getInitialCards,
	getUserData,
	deleteCardApi,
} from './api.js'

const placeCards = document.querySelector('.places__list')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
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
const validationSelectors = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}
const deletePopup = document.querySelector('.popup_type_delete-card')
const deletePopupButton = deletePopup.querySelector('.popup__button')
let currentCardData
let currentCard
let userId 

function addEditPopup() {
	const editButton = document.querySelector('.profile__edit-button')
	editButton.addEventListener('click', () => {
		nameInput.value = profileName.textContent
		jobInput.value = profileDescription.textContent
		clearValidation(formElementEdit, validationSelectors)
		openPopup(editPopup)
	})
	formElementEdit.addEventListener('submit', handleFormElementEditSubmit)
}

function addNewCardPopup() {
	const newCardButton = document.querySelector('.profile__add-button')
	newCardButton.addEventListener('click', () => {
		formElementAdd.reset()
		clearValidation(formElementAdd, validationSelectors)
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
	postNewCard(newCard).then(function (result) {
		placeCards.prepend(
			createCard(result, openDeletePopup, openPopupFullImage, toggleLike)
		)
	})
	closePopup(newCardPopup)
}

function handleFormElementEditSubmit(evt) {
	evt.preventDefault()
	patchUserData(nameInput, jobInput)
	profileName.textContent = nameInput.value
	profileDescription.textContent = jobInput.value
	closePopup(editPopup)
	closePopup(newCardPopup)
}

function displayCards(initialCards) {
	initialCards.forEach(card => {
		placeCards.append(
			createCard(card, openDeletePopup, openPopupFullImage, toggleLike)
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

function openDeletePopup(card, cardData) {
	currentCardData = cardData
	currentCard = card
	openPopup(deletePopup)
}

	deletePopupButton.addEventListener('click', () => {
		deleteCard(currentCard, currentCardData)
		closePopup(deletePopup)
	})

function deleteCard(currentCard, currentCardData) {
	const currentCardId = currentCardData._id
	deleteCardApi(currentCardId).then(function (result) {
		currentCard.remove()
	})
}

enableValidation(validationSelectors)

addEditPopup()
addNewCardPopup()

promiseAll()

export {
	placeCards,
	profileName,
	profileDescription,
	profileImage,
	displayCards,
	nameInput,
	jobInput,
	openDeletePopup,
	userId,
}
