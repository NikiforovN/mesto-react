import profileEditButtonPic from "../images/profile__edit-button.svg";
import profileAddButtonPic from "../images/profile__add-button.svg";
import React from "react";
import { api } from "../components/Api";
import Cards from "./Card";

function Main(props) {
  const [userData, setUserData] = React.useState({
    name: "Жак Кустов",
    about: "Исследователь",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Jacque_Fresco_and_lemon_tree.jpg",
  });
  const [cardsInfo, setCardsInfo] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserData(userData);
        setCardsInfo(cards);
      })
      .catch((err) => {
        console.log(err.ok);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            src={userData.avatar}
            alt="Жак-Ив Кусто"
            className="profile__pic"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-first-row">
            <h1 className="profile__name">{userData.name}</h1>
            <button
              type="button"
              className="profile__edit-button buttons-hover"
              name="Редактировать профиль"
              onClick={props.onEditProfile}
            >
              <img
                src={profileEditButtonPic}
                alt="карандаш"
                className="profile__edit-button-pic"
              />
            </button>
          </div>
          <p className="profile__status">{userData.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button buttons-hover"
          onClick={props.onAddPlace}
        >
          <img
            src={profileAddButtonPic}
            alt="Плюс"
            className="profile__add-button-pic"
          />
        </button>
      </section>

      <section className="elements">
        {cardsInfo.map((item) => {
          return (
            <Cards
              link={item.link}
              name={item.name}
              key={item._id}
              like={item.likes.length}
              onCardClick={props.onImagePopup}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
