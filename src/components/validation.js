function enableValidation(validationSelectors) {
  const formList = Array.from(
		document.querySelectorAll(validationSelectors.formSelector)
	)
  formList.forEach(formElement => {
		setEventListeners(formElement, validationSelectors)
	})
}

function setEventListeners(formElement, validationSelectors) {
	const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector))
  const buttonElement = formElement.querySelector(validationSelectors.submitButtonSelector)
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, validationSelectors)
      toggleButtonState(inputList, buttonElement)
		})
	})
}

function isValid(formElement, inputElement, validationSelectors) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}

	if (!inputElement.validity.valid) {
    showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
      validationSelectors
		)
	} else {
    hideInputError(formElement, inputElement, validationSelectors)
	}
}

function showInputError(formElement, inputElement, errorMessage, validationSelectors) {
	const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(validationSelectors.inputErrorClass)
  formError.classList.add(validationSelectors.errorClass)
  formError.textContent = errorMessage
}

function hideInputError(formElement, inputElement, validationSelectors) {
	const formError = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationSelectors.inputErrorClass)
	formError.classList.remove(validationSelectors.errorClass)
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
	if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
	} else {
    buttonElement.disabled = false
  }
}

function clearValidation(formElement, validationSelectors) {
  const allFormErrors = Array.from(formElement.querySelectorAll('.popup__error'))
  const inputList = Array.from(
		formElement.querySelectorAll(validationSelectors.inputSelector)
	)
  const submitButtonAddCard = formElement.querySelector('.popup__button')
  allFormErrors.forEach(element => {
		element.classList.remove(validationSelectors.errorClass)
	})
  inputList.forEach(element => {
		element.classList.remove(validationSelectors.inputErrorClass)
	})
  toggleButtonState(inputList, submitButtonAddCard)
}

export { enableValidation, clearValidation }