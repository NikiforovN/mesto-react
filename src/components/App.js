import React from 'react';
import Header from '../components/Header'
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import {api} from '../components/Api'
import Cards from './Card'
import ImagePopup from '../components/ImagePopup';
   

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =  React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =  React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =  React.useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] =  React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({name:'', link:''})

    const [userData, setUserData] = React.useState({name: 'Жак Кустов', about:'Исследователь', avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Jacque_Fresco_and_lemon_tree.jpg'})
    const [cardsInfo, setCardsInfo] = React.useState([])

    React.useEffect(()=>{
        Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setUserData(userData);
      setCardsInfo(cards) 
    })
    .catch((err) => {
      console.log(err.ok)
    });
    },[])

    
  return (
     <body className="root">
    <Header />
    <Main 
        handleEditProfilePopupOpen={function popupOpen(){
            setIsEditProfilePopupOpen(true)
           }}
        handleAddPopupOpen={function popupOpen(){
            setIsAddPlacePopupOpen(true)
        }}
        handleEditAvatarPopupOpen={function popupOpen(){
            setIsEditAvatarPopupOpen(true)
        }}   
        name={userData.name}
        avatar={userData.avatar}
        about={userData.about}
    />
     <section className="elements">
        {
        cardsInfo.map(item => {
           
            return (<Cards 
                link={item.link} 
                name={item.name} 
                key={item._id} 
                handleImagePopupOpen={
                    function popupOpen(name,link){
                    setIsImagePopupOpen(true)
                    setSelectedCard({
                        name: name,
                        link: link
                    })  
            }
        }/>) 
        })
        }
    </section>
    <Footer />

    <ImagePopup
    card={selectedCard}
    show={isImagePopupOpen}
    onClickClose={function popupClose(){
        setIsImagePopupOpen(false)
        setSelectedCard({
            name: '',
            link: ''
        })}}/>
  
    <PopupWithForm
        popupType='edit-form'
        title='Редактировать профиль' 
        show={isEditProfilePopupOpen}
        onClickClose={function popupClose(){
            setIsEditProfilePopupOpen(false)}}>
        <form className="popup__container" method="get" noValidate>
                <div className="popup__field-container">
                    <input type="text" className="popup__field" name="name" defaultValue="Жак-Ив Кусто" id="name" placeholder="Введите ваше имя" minLength="2" maxLength="40" required/>
                    <span className="popup__input-error popup__name-error"></span>
                </div>
                <div className="popup__field-container">
                    <input type="text" className="popup__field" name="about" defaultValue="Исследователь океана" id="status" placeholder="Введите вашу профессию" minLength="2" maxLength="200" required/>
                    <span className="popup__input-error popup__status-error"></span>
                </div>
                <button className="popup__button" type="submit">Сохранить</button>
            </form>
    </PopupWithForm>

    <PopupWithForm
        popupType='add-place'
        title='Новое место'
        show={isAddPlacePopupOpen}
        onClickClose={function popupClose(){
            setIsAddPlacePopupOpen(false)}}>
            <form className="popup__container" method="get" noValidate>
                <div className="popup__field-container">
                    <input type="text" className="popup__field" name="name" defaultValue="" id="title" placeholder="Название" minLength="2" maxLength="30" required/>
                    <span className="popup__input-error popup__title-error"></span>
                </div>
                <div className="popup__field-container">
                    <input type="url" className="popup__field" name="link" defaultValue="" id="link" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error popup__link-error"></span>
                </div>
                <button className="popup__button" type="submit">Создать</button>
            </form>
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
        popupType='change-avatar'
        title='Обновить аватар'
        show={isEditAvatarPopupOpen}
        onClickClose={function popupClose(){
            setIsEditAvatarPopupOpen(false)}}>
       <form className="popup__container" method="get" noValidate>
                <div className="popup__field-container">
                    <input type="url" className="popup__field" name="avatar" defaultValue="" id="avatar-link" placeholder="Ссылка" minLength="2" maxLength="250" required/>
                    <span className="popup__input-error popup__avatar-link-error"></span>
                </div>
                <button className="popup__button" type="submit">Сохранить</button>
            </form>
    </PopupWithForm>

</body>  
  );
}

export default App;
