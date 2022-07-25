//компонент для открытия картинки
function ImagePopup({ card, onClose, handleOverlayClose }) {
  return (
    <section
      className={`popup popup_view ${card.link && "popup_opened"}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__area">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <p className="popup__view-title">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
