import '../index.css'
//import { initialCards } from './cards.js'
import { createCard, deleteCardElement, updateLikes } from './card.js'
import { openPopup, closePopup, closePopupOverlay } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import {
	promiseAll,
	patchUserData,
	postNewCard,
	removeLike,
	addLike,
	deleteCardApi,
	patchUserAvatar,
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
const buttonSubmitProfileForm = formElementEdit.querySelector('.popup__button')
const formElementAddCard = document.querySelector(
	'.popup__form[name=new-place]'
)
const formElementEditAvatar = document.querySelector(
	'.popup__form[name=edit-avatar]'
)
const avatarInput = formElementEditAvatar.querySelector(
	'.popup__input_type_url'
)
const buttonSubmitAvatar = formElementEditAvatar.querySelector('.popup__button')
const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const imageContent = imagePopup.querySelector('.popup__image')
const imagePopupCaption = imagePopup.querySelector('.popup__caption')
const placeNameInput = formElementAddCard.querySelector(
	'.popup__input_type_card-name'
)
const linkInput = formElementAddCard.querySelector('.popup__input_type_url')
const buttonSubmitNewCard = formElementAddCard.querySelector('.popup__button')
const closeButtons = document.querySelectorAll('.popup__close')
const validationSelectors = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}
const popupDeleteCard = document.querySelector('.popup_type_delete-card')
const buttonPopupDeleteCard = popupDeleteCard.querySelector('.popup__button')
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar')
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

function addEditAvatarPopup() {
	profileImage.addEventListener('click', () => {
		formElementEditAvatar.reset()
		clearValidation(formElementEditAvatar, validationSelectors)
		openPopup(editAvatarPopup)
	})
	formElementEditAvatar.addEventListener(
		'submit',
		handleFormElementEditAvatarSubmit
	)
}

function addNewCardPopup() {
	const newCardButton = document.querySelector('.profile__add-button')
	newCardButton.addEventListener('click', () => {
		formElementAddCard.reset()
		clearValidation(formElementAddCard, validationSelectors)
		openPopup(newCardPopup)
	})
	formElementAddCard.addEventListener('submit', handleFormElementAddSubmit)
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
	renderLoading(true, buttonSubmitNewCard)
	postNewCard(newCard)
		.then(function (result) {
			closePopup(newCardPopup)
			placeCards.prepend(
				createCard(
					result,
					openDeletePopup,
					openPopupFullImage,
					toggleLike,
					userId
				)
			)
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			renderLoading(false, buttonSubmitNewCard)
		})
}

function handleFormElementEditSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, buttonSubmitProfileForm)
	patchUserData(nameInput, jobInput)
		.then(result => {
			closePopup(editPopup)
			profileName.textContent = result.name
			profileDescription.textContent = result.about
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			renderLoading(false, buttonSubmitProfileForm)
		})
}

function handleFormElementEditAvatarSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, buttonSubmitAvatar)
	patchUserAvatar(avatarInput)
		.then(result => {
			closePopup(editAvatarPopup)
			profileImage.style = `background-image: url('${result.avatar}')`
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			renderLoading(false, buttonSubmitAvatar)
		})
}

function displayCards(initialCards) {
	initialCards.forEach(card => {
		placeCards.append(
			createCard(card, openDeletePopup, openPopupFullImage, toggleLike, userId)
		)
	})
}

function setUserData(userData) {
	profileName.textContent = userData.name
	profileDescription.textContent = userData.about
	profileImage.style = `background-image: url('${userData.avatar}')`
	userId = userData._id
}

editPopup.addEventListener('click', closePopupOverlay)
newCardPopup.addEventListener('click', closePopupOverlay)
imagePopup.addEventListener('click', closePopupOverlay)
popupDeleteCard.addEventListener('click', closePopupOverlay)
editAvatarPopup.addEventListener('click', closePopupOverlay)

closeButtons.forEach(button => {
	button.addEventListener('click', () => {
		const openedPopup = document.querySelector('.popup_is-opened')
		closePopup(openedPopup)
	})
})

function openDeletePopup(card, cardData) {
	currentCardData = cardData
	currentCard = card
	openPopup(popupDeleteCard)
}

buttonPopupDeleteCard.addEventListener('click', () => {
	deleteCard(currentCard, currentCardData)
})

function deleteCard(currentCard, currentCardData) {
	const currentCardId = currentCardData._id
	deleteCardApi(currentCardId)
		.then(() => {
			closePopup(popupDeleteCard)
			deleteCardElement(currentCard)
		})
		.catch(err => {
			console.log(err)
		})
}

function toggleLike(cardData, cardLikeAmount, likeButton) {
	if (likeButton.classList.contains('card__like-button_is-active')) {
		removeLike(cardData._id)
			.then(updatedCardData => {
				updateLikes(updatedCardData, cardLikeAmount, likeButton)
			})
			.catch(err => {
				console.log(err)
			})
	} else {
		addLike(cardData._id)
			.then(updatedCardData => {
				updateLikes(updatedCardData, cardLikeAmount, likeButton)
			})
			.catch(err => {
				console.log(err)
			})
	}
}

function renderLoading(isLoading, button) {
	if (isLoading) {
		button.textContent = 'Сохранение...'
	} else {
		button.textContent = 'Сохранить'
	}
}

enableValidation(validationSelectors)

addEditPopup()
addNewCardPopup()
addEditAvatarPopup()

promiseAll()
	.then(([resUserData, resInitialCards]) => {
		setUserData(resUserData)
		displayCards(resInitialCards)
	})
	.catch(err => {
		console.log(err)
	})

export {
	placeCards,
	profileName,
	profileDescription,
	profileImage,
	nameInput,
	jobInput,
	userId,
}
