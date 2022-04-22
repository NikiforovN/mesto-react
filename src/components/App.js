import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
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
  const [isLoading, setIsLoading] = React.useState(false);

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
    setEventListenerOnEscKeydown();
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPopupOpen() {
    setEventListenerOnEscKeydown();
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setEventListenerOnEscKeydown();
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupOpen(title, link) {
    setEventListenerOnEscKeydown();
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: title,
      link: link,
    });
  }

  function handleConfirmPopupOpen(card) {
    setEventListenerOnEscKeydown();
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .editProfile(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .editAvatar(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err.ok))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(deletedCard) {
    setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
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
    setIsLoading(true);
    api
      .addCard(cards)
      .then((newCard) => {
        setCardsInfo([newCard, ...cardsInfo]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.ok);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") closeAllPopups();
  }

  function setEventListenerOnEscKeydown() {
    document.addEventListener("keydown", handleEscClose);
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
          isLoading={isLoading}
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
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onCardDelete={handleCardDelete}
        onClose={closeAllPopups}
        deleteCard={deletedCard}
        isLoading={isLoading}
      />
    </UserInfo.Provider>
  );
}

export default App;
