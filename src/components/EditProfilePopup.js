import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    /* POPUP - PROFILE EDIT */
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
          value={name || ''}
          onChange={onChangeName}
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
          value={description || ''}
          onChange={onChangeDescription}
          required
        />
        <span className="popup__error" id="pofilesubtitle-input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup
