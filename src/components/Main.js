import profileEditButtonPic from '../images/profile__edit-button.svg'
import profileAddButtonPic from '../images/profile__add-button.svg'
import React from 'react'





function Main(props){

    



  
   

    return(

        <main>
        <section className="profile">
            <div className="profile__avatar" onClick={props.handleEditAvatarPopupOpen}>
                <img src={props.avatar} alt="Жак-Ив Кусто" className="profile__pic" />
            </div>
            <div className="profile__info">
                <div className="profile__info-first-row">
                    <h1 className="profile__name">{props.name}</h1>
                    <button  type="button" className="profile__edit-button buttons-hover" name="Редактировать профиль" onClick={props.handleEditProfilePopupOpen} >
                        <img src={profileEditButtonPic} alt="карандаш" className="profile__edit-button-pic"/>
                    </button>
                </div>
                <p className="profile__status">{props.about}</p>
            </div>
            <button  type="button" className="profile__add-button buttons-hover" onClick={props.handleAddPopupOpen}> 
                <img src={profileAddButtonPic} alt="Плюс" className="profile__add-button-pic"/>
            </button>
        </section>    
    </main>
    )
}
export default Main