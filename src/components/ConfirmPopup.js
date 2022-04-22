import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function ConfirmPopup(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.deleteCard);
  }
  return (
    <PopupWithForm
      popupType="popup-confirm"
      title="Вы уверены?"
      show={props.isOpen}
      onClickClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <button
        className="popup__button popup__button_difference_confirm-form"
        type="submit"
      >
        {props.isLoading ? "Удаление..." : "Да"}
      </button>
    </PopupWithForm>
  );
}
export default ConfirmPopup;
