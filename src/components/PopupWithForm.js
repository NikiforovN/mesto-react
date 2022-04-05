

function PopupWithForm(props){

    return (
        <section className={`popup ${props.show && 'popup_opened'}`} id={props.popupType}>
        <div className={`popup__rectangle ${(props.popupType==='popup-confirm') && 'popup__rectangle_difference_height'}`}>
            <h2 className="popup__title">{props.title}</h2>
            <button type="button" className="close-icon buttons-hover" onClick={props.onClickClose}></button>
            {props.children}
        </div>
    </section>
    )
}
export default PopupWithForm