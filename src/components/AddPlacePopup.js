import React, { useRef } from "react";
import PopupWithForm from "../components/PopupWithForm";
import { Cards } from "../contexts/CardsContext";

function AddPlacePopup(props) {

  const nameInput = useRef();
  const linkInput = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name: nameInput.current.value,
      link: linkInput.current.value,
    });
    nameInput.current.value='';
    linkInput.current.value='';
  }


  return (
    <PopupWithForm
      popupType="add-place"
      title="Новое место"
      show={props.isOpen}
      onClickClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field-container">
        <input
          type="text"
          className="popup__field"
          name="name"
          defaultValue=""
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          ref={nameInput}
        />
        <span className="popup__input-error popup__title-error"></span>
      </div>
      <div className="popup__field-container">
        <input
          type="url"
          className="popup__field"
          name="link"
          defaultValue=""
          id="link"
          placeholder="Ссылка на картинку"
          required
          ref={linkInput}
        />
        <span className="popup__input-error popup__link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
