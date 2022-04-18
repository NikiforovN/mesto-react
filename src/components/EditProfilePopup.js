import React from "react";
import PopupWithForm from "../components/PopupWithForm";
import {UserInfo} from '../contexts/CurrentUserContext'



function EditProfilePopup(props){

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(UserInfo);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    function handleNameChange(event){
        setName(event.target.value)
        console.log(name)
    }

    function handleDescriptionChange(event){
        setDescription(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()

        props.onUpdateUser({
            name,
            about: description,
          });
    }

    return(
        <PopupWithForm
        popupType="edit-form"
        title="Редактировать профиль"
        show={props.isOpen}
        onClickClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <div className="popup__field-container">
          <input
            type="text"
            className="popup__field"
            name="name"
            id="name"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error popup__name-error"></span>
        </div>
        <div className="popup__field-container">
          <input
            type="text"
            className="popup__field"
            name="about"
            id="status"
            placeholder="Введите вашу профессию"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error popup__status-error"></span>
        </div>
      </PopupWithForm>
    )
}
export default EditProfilePopup;