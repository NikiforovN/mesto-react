import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import { api } from "../utils/Api";
import { UserInfo } from "../contexts/CurrentUserContext";
import { Cards } from "../contexts/CardsContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [deletedCard, setDeletedCard] = React.useState();
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

  function handleConfirmPopupOpen(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
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

  function handleCardDelete(deletedCard) {
    api
      .deleteCard(deletedCard._id)
      .then((res) => {
        const cardsAfterDelete = cardsInfo.filter(
          (c) => c._id !== deletedCard._id
        );
        setCardsInfo(cardsAfterDelete);
        closeAllPopups();
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
          onConfirmPopup={handleConfirmPopupOpen}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={() => {
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

      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onCardDelete={handleCardDelete}
        onClose={closeAllPopups}
        deleteCard={deletedCard}
      />
    </UserInfo.Provider>
  );
}

export default App;
