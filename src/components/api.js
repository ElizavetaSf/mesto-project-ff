import {
	profileName,
	profileDescription,
	profileImage,
	displayCards,
	nameInput,
	jobInput,
} from './index.js'

const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
	headers: {
		authorization: 'db6ab1c8-ea08-4389-b55d-022e22264431',
		'Content-Type': 'application/json',
	},
}

const getUserData = fetch(`${config.baseUrl}/users/me`, {
	headers: config.headers,
})
	.then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
	.catch(err => {
		console.log(err)
	})

const getInitialCards = fetch(`${config.baseUrl}/cards`, {
	headers: config.headers,
})
	.then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
	.catch(err => {
		console.log(err)
	})

const promiseAll = () => {
	Promise.all([getUserData, getInitialCards])
		.then(([resUserData, resInitialCards]) => {
			profileName.textContent = resUserData.name
			profileDescription.textContent = resUserData.about
			profileImage.style = `background-image: url('${resUserData.avatar}')`
			displayCards(resInitialCards)
		})
		.catch(err => {
			console.log(err)
		})
}

function patchUserData(nameInput, jobInput) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: `${nameInput.value}`,
			about: `${jobInput.value}`,
		}),
	})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
		.catch(err => {
			console.log(err)
		})
}

function postNewCard(newCard) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: `${newCard.name}`,
			link: `${newCard.link}`,
		}),
	})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
    
		.catch(err => {
			console.log(err)
		})
}

export { promiseAll, patchUserData, postNewCard, getInitialCards }
