import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = React.useState({})
  // Карточки
  const [cards, setCards] = React.useState([])

  // API
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Обновление данных профиля
  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Обновление аватара
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Получение изначальных карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Лайк карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    })
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deletePhoto(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Добавление карточки
  function handleAddPlaceSubmit(card) {
    api
      .addNewPhoto(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Открытие Popup'ов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setEditAvatarOpen(false)
    setAddPlaceOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {/* HEADER */}
          <Header />

          {/* MAIN */}
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />

          {/* FOOTER */}
          <Footer />

          {/* POPUP - PROFILE EDIT */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* POPUP - EDIT AVATAR */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* POPUP - ADD PHOTO */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* POPUP - IMAGE FULLSCREEN */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
