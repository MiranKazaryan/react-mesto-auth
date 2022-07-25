import successIcon from "../images/status_success.svg";
import errorIcon from "../images/status_error.svg";

//компонент подтверждения удаления
function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const successStatusText = "Вы успешно зарегистрировались!";
  const errorStatusText = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container tooltip__container">
        <img
          className="tooltip__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt="Статус"
        />
        <h2 className="tooltip__title">
          {isSuccess ? successStatusText : errorStatusText}
        </h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
