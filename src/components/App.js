import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState()
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState()
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState()
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})

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
    setSelectedCard({name: '', link: ''})

  }

  return (
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
        />

        {/* FOOTER */}
        <Footer />

        {/* POPUP - PROFILE EDIT */}
        <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <section className="popup__section">
            <input
              className="popup__input popup__input_type_title"
              type="text"
              name="name"
              id="profiletitle-input"
              placeholder="Имя профиля"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error" id="profiletitle-input-error"></span>
          </section>
          <section className="popup__section">
            <input
              className="popup__input popup__input_type_subtitle"
              type="text"
              name="about"
              id="pofilesubtitle-input"
              placeholder="Описание профиля"
              minLength="2"
              maxLength="200"
              required
            />
            <span
              className="popup__error"
              id="pofilesubtitle-input-error"
            ></span>
          </section>
        </PopupWithForm>

        {/* POPUP - ADD PHOTO */}
        <PopupWithForm
          name="add-photo"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <section className="popup__section">
            <input
              className="popup__input popup__input_type_photo-name"
              type="text"
              name="name"
              id="phototitle-input"
              placeholder="Название изображения"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error" id="phototitle-input-error"></span>
          </section>
          <section className="popup__section">
            <input
              className="popup__input popup__input_type_photo-url"
              type="url"
              name="link"
              id="photourl-input"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__error" id="photourl-input-error"></span>
          </section>
        </PopupWithForm>

        {/* POPUP - EDIT AVATAR */}
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <section className="popup__section">
            <input
              className="popup__input popup__input_type_avatar-url"
              type="url"
              name="avatar"
              id="avatar-input"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__error" id="avatar-input-error"></span>
          </section>
        </PopupWithForm>

        {/* POPUP - IMAGE FULLSCREEN */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* <!-- POPUP - DELETE PHOTO  -->
        <article className="popup popup_confirm-delete">
          <div className="popup__container">
            <button
              type="button"
              className="popup__close-button"
              aria-label="Закрыть окно"
            ></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <button
              className="popup__submit-button popup__submit-button_confirm-delete"
              type="submit"
            >
              Да
            </button>
          </div>
        </article> */}
      </div>
    </div>
  )
}

export default App
