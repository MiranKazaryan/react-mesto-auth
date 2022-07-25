import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
//компонент попапа редактирования профиля
function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoad,
  handleOverlayClose,
}) {
  //стейты имени и описания пользователя
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //валидация
  const [nameValid, setNameValid] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [errorDescriptionMessage, setErrorDescriptionMessage] = useState("");
  //использование контекста с текущими значениями пользователя
  const currentUser = useContext(CurrentUserContext);

  //обновление инпутов после ввода без/с submit
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameValid(false);
    setErrorNameMessage("");
    setDescriptionValid(false);
    setErrorDescriptionMessage("");
  }, [currentUser, isOpen]);
  //функция при изменение инпута name
  function handleNameChange(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorNameMessage(e.target.validationMessage);
  }
  //функция при изменение инпута description
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setDescriptionValid(e.target.validity.valid);
    setErrorDescriptionMessage(e.target.validationMessage);
  }
  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  //проверка валидности данных
  const isValid = descriptionValid && nameValid;
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      handleOverlayClose={handleOverlayClose}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_name ${
          errorNameMessage && "popup__input_type_error"
        }`}
        minLength="2"
        maxLength="40"
        name="name"
        placeholder="Имя"
        id="input-name"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error input-name-error">
        {errorNameMessage}
      </span>
      <input
        className={`popup__input popup__input_type_description${
          errorDescriptionMessage && "popup__input_type_error"
        }`}
        minLength="2"
        maxLength="200"
        name="about"
        placeholder="Вид деятельности"
        id="input-description"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__input-error input-description-error">
        {errorDescriptionMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
