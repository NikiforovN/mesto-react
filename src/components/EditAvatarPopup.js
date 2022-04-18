import React, { useRef } from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup(props) {
  let avatarInput = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
    avatarInput.current.value='';
  }
  return (
    <PopupWithForm
      popupType="change-avatar"
      title="Обновить аватар"
      show={props.isOpen}
      onClickClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field-container">
        <input
          type="url"
          className="popup__field"
          name="avatar"
          defaultValue=""
          id="avatar-link"
          placeholder="Ссылка"
          minLength="2"
          maxLength="250"
          required
          ref={avatarInput}
        />
        <span className="popup__input-error popup__avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
