import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    /* POPUP - EDIT AVATAR */
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_avatar-url"
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на изображение"
          ref={avatarRef}
          required
        />
        <span className="popup__error" id="avatar-input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup