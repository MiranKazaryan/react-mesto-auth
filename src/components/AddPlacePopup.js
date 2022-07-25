import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

//компонент добавления карточки
function AddPlacePopup({
  isOpen,
  onClose,
  onUpdatePlace,
  isLoad,
  handleOverlayClose,
}) {
  //стейты имени и описания картинки
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  //валидация
  const [nameValid, setNameValid] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [linkValid, setLinkValid] = useState(false);
  const [errorLinkMessage, setErrorLinkMessage] = useState("");

  //обнуление инпутов после ввода без сабмита
  useEffect(() => {
    setName("");
    setLink("");
    setNameValid(false);
    setErrorNameMessage("");
    setLinkValid(false);
    setErrorLinkMessage("");
  }, [isOpen]);
  //функция при изменение инпута name
  function handleNameCard(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setErrorNameMessage(e.target.validationMessage);
  }
  //функция при изменение инпута link
  function handleLink(e) {
    setLink(e.target.value);
    setLinkValid(e.target.validity.valid);
    setErrorLinkMessage(e.target.validationMessage);
  }
  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePlace({ name: name, link: link });
  }
  //проверка валидности
  const isValid = linkValid && nameValid;

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      isValid={isValid}
      handleOverlayClose={handleOverlayClose}
    >
      <input
        value={name || ""}
        onChange={handleNameCard}
        className={`popup__input popup__input_type_place ${
          errorNameMessage && "popup__input_type_error"
        }`}
        minLength="2"
        maxLength="30"
        name="place"
        id="input-place"
        placeholder="Название"
        type="text"
        required
      />
      <span className="popup__input-error input-place-error">
        {errorNameMessage}
      </span>
      <input
        value={link || ""}
        onChange={handleLink}
        className={`popup__input popup__input_type_img-link ${
          errorLinkMessage && "popup__input_type_error"
        }`}
        maxLength="80"
        name="link"
        id="input-link"
        placeholder="Ссылка на картинку"
        type="url"
        required
      />
      <span className="popup__input-error input-link-error">
        {errorLinkMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
