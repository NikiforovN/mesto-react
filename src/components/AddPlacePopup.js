import React from "react";
import PopupWithForm from "../components/PopupWithForm";
import { Cards } from "../contexts/CardsContext";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const cards = React.useContext(Cards);

  React.useEffect(() => {
    setName(cards.name);
    setLink(cards.link);
  }, [cards]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

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
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-error popup__title-error"></span>
      </div>
      <div className="popup__field-container">
        <input
          type="url"
          className="popup__field"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
          value={link}
        />
        <span className="popup__input-error popup__link-error"></span>
      </div>
      <button className="popup__button" type="submit">
        {props.isLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
