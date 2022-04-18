import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import { api } from "../components/Api";
import { UserInfo } from "../contexts/CurrentUserContext";
import { Cards } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

  function handleUpdateUser(currentUser) {
    api
      .editProfile(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok));
  }

  function handleUpdateAvatar(currentUser) {
    api
      .editAvatar(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const cardsAfterDelete = cardsInfo.filter((c) => c._id !== card._id);
        setCardsInfo(cardsAfterDelete);
      })
      .catch((err) => {
        console.log(err.ok);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((res) => {
          const likedCard = cardsInfo.map((c) =>
            c._id === card._id ? res : c
          );
          setCardsInfo(likedCard);
        })
        .catch((err) => {
          console.log(err.ok);
        });
    } else {
      api
        .putLike(card._id)
        .then((res) => {
          const likedCard = cardsInfo.map((c) =>
            c._id === card._id ? res : c
          );
          setCardsInfo(likedCard);
        })
        .catch((err) => {
          console.log(err.ok);
        });
    }
  }

  function handleAddPlaceCard(cards) {
    api
      .addCard(cards)
      .then((newCard) => {
        setCardsInfo([newCard, ...cardsInfo]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.ok);
      });
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
         <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={()=>{
          closeAllPopups();
         
        }}
        onAddPlace={handleAddPlaceCard}
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

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

     

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
    </UserInfo.Provider>
  );
}

export default App;
