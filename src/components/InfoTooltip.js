//компонент подтверждения удаления
function InfoTooltip({ isOpen, onClose, statusImage, status, title }) {

  return (
    <div className={isOpen ? 'popup popup_opened' : 'popup'} onClick={onClose}>
      <div className="popup__container">
        <img className="popup__status-image" src={statusImage} alt={`картинка регистрации: ${status}`}/>
        <p className="popup__status-caption">{title}</p>
        <button className="popup__closed" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;
