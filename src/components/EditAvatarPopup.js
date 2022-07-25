import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
//компонент редактирования аватара
function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoad,
  handleOverlayClose,
}) {
  //использование контекста с текущими значениями пользователя const currentUser = useContext(CurrentUserContext);
  //стейт аватара
  const [avatar, setAvatar] = useState("");
  //валидация
  const [linkValid, setLinkValid] = useState(false);
  const [errorLinkMessage, setErrorLinkMessage] = useState("");
  //обнуление инпутов после ввода без сабмита и обновление аватара
  useEffect(
    (e) => {
      setLinkValid(false);
      setErrorLinkMessage("");
      setAvatar("");
    },
    [isOpen]
  );
  //функция при изменение инпута link
  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    setLinkValid(e.target.validity.valid);
    setErrorLinkMessage(e.target.validationMessage);
  }
  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }
  //проверка валидности данных
  const isValid = linkValid;

  return (
    <PopupWithForm
      title="Обновить аватар?"
      name="avatar"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      handleOverlayClose={handleOverlayClose}
      isValid={isValid}
    >
      <input
        value={avatar}
        onChange={handleAvatarChange}
        className={`popup__input popup__input_type_img-link ${
          errorLinkMessage && "popup__input_type_error"
        }`}
        maxLength="80"
        name="link"
        id="input-linkAv"
        placeholder="Ссылка на картинку"
        type="url"
        required
      />
      <span className="popup__input-error input-linkAv-error">
        {errorLinkMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
