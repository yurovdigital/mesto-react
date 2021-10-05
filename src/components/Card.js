import React from 'react'

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="photo-grid__card">
      <button
        className="photo-grid__delete-button"
        type="button"
        aria-label="Удалить изображение"
      ></button>
      <img
        className="photo-grid__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__container">
        <h2 className="photo-grid__title">{props.card.name}</h2>
        <div className="photo-grid__like-container">
          <button
            className="photo-grid__like-button"
            type="button"
            aria-label="Поставить лайк фотографии"
          ></button>
          <p className="photo-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card