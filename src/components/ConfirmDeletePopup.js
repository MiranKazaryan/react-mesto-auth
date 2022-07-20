import PopupWithForm from "./PopupWithForm";
//компонент подтверждения удаления
function ConfirmDeletePopup({ isOpen, onClose, onConfirm, isLoad }) {
  //функция сабмита
  function handleConfirm(e) {
    e.preventDefault();
    onConfirm();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirm}
      isLoad={isLoad}
      isValid={true}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
