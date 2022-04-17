import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import { api } from "../components/Api";
import { UserInfo } from "../contexts/CurrentUserContext";
import { Cards } from "../contexts/CardsContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({
    name: "Жак Кустов",
    about: "Исследователь",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Jacque_Fresco_and_lemon_tree.jpg",
  });
  const [cardsInfo, setCardsInfo] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCardsInfo(cards);
      })
      .catch((err) => {
        console.log(err.ok);
      });
  }, []);

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupOpen(title, link) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: title,
      link: link,
    });
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <UserInfo.Provider value={currentUser}>
      <Header />

      <Cards.Provider value={cardsInfo}>
        <Main
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
          onImagePopup={handleImagePopupOpen}
          setCard={setCardsInfo}
        />
      </Cards.Provider>

      <Footer />

      <ImagePopup
        card={selectedCard}
        show={isImagePopupOpen}
        onClickClose={() => {
          closeAllPopups();
          setSelectedCard({
            name: "",
            link: "",
          });
        }}
      />

      <PopupWithForm
        popupType="edit-form"
        title="Редактировать профиль"
        show={isEditProfilePopupOpen}
        onClickClose={closeAllPopups}
      >
        <div className="popup__field-container">
          <input
            type="text"
            className="popup__field"
            name="name"
            defaultValue="Жак-Ив Кусто"
            id="name"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error popup__name-error"></span>
        </div>
        <div className="popup__field-container">
          <input
            type="text"
            className="popup__field"
            name="about"
            defaultValue="Исследователь океана"
            id="status"
            placeholder="Введите вашу профессию"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error popup__status-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        popupType="add-place"
        title="Новое место"
        show={isAddPlacePopupOpen}
        onClickClose={closeAllPopups}
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
          />
          <span className="popup__input-error popup__link-error"></span>
        </div>
      </PopupWithForm>

      {/* <PopupWithForm
        popupType='popup-confirm'
        title='Вы уверены?'
        show={showPopup}
        onClickClose={function popupClose(){
            setShowPopup(false)}}>
        <form className="popup__container" method="get" noValidate>
            <button className="popup__button popup__button_difference_confirm-form" type="submit">Да</button>
        </form>
    </PopupWithForm> */}

      <PopupWithForm
        popupType="change-avatar"
        title="Обновить аватар"
        show={isEditAvatarPopupOpen}
        onClickClose={closeAllPopups}
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
          />
          <span className="popup__input-error popup__avatar-link-error"></span>
        </div>
      </PopupWithForm>
    </UserInfo.Provider>
  );
}

export default App;
