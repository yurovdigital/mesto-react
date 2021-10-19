import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    /* POPUP - ADD PHOTO */
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
          value={name}
          onChange={onChangeName}
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
          value={link}
          onChange={onChangeLink}
          required
        />
        <span className="popup__error" id="photourl-input-error"></span>
      </section>
    </PopupWithForm>
  )
}
export default AddPlacePopup
