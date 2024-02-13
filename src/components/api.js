const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
	headers: {
		authorization: 'db6ab1c8-ea08-4389-b55d-022e22264431',
		'Content-Type': 'application/json',
	},
}

const getUserData = () => {
	return fetch(`${config.baseUrl}/users/me`, {
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
}

const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
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
}

const promiseAll = () => {
	return Promise.all([getUserData(), getInitialCards()])
}

function patchUserData(nameInput, jobInput) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: `${nameInput.value}`,
			about: `${jobInput.value}`,
		}),
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
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
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
}

function deleteCardApi(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
}

function addLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
}

function removeLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
}

function patchUserAvatar(avatarInput) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: `${avatarInput.value}`,
		}),
	}).then(res => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	})
}

export {
	promiseAll,
	patchUserData,
	postNewCard,
	getInitialCards,
	getUserData,
	deleteCardApi,
	removeLike,
	addLike,
	patchUserAvatar,
}
