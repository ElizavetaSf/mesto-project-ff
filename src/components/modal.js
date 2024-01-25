function openPopup(modalWindow) {
	modalWindow.classList.add('popup_is-opened')
  modalWindow.addEventListener('click', closePopupOverlay)
	document.addEventListener('keydown', closePopupEsc)
  const closeButtons = document.querySelectorAll('.popup__close')
	closeButtons.forEach(button => {
		button.addEventListener('click', () => {
			closePopup(modalWindow)
		})
	})

}

function closePopup(modalWindow) {
	modalWindow.classList.remove('popup_is-opened')
}

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_is-opened')

  if (evt.target === evt.currentTarget) {
		closePopup(openedPopup)
	} 
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector('.popup_is-opened')

  if (evt.key === 'Escape') {
		closePopup(openedPopup)
    document.removeEventListener('keydown', closePopupEsc)
	}
}

export { openPopup, closePopup }