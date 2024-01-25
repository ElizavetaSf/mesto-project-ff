function openPopup(modalWindow) {
  modalWindow.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closePopupEsc)
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup)
	}
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup)
	}
}

export { openPopup, closePopup, closePopupOverlay }
