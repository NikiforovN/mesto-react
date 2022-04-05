


function ImagePopup(props){
    return (
        <section className={`popup popup_difference_opacity ${props.show && 'popup_opened'}`} id="image-popup">
        <div className="popup__box">
            <figure className="popup__figure">
                <img src={props.card.link}  alt={props.card.name} className="popup__pic"/>
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
            <button type="button" className="close-icon buttons-hover" onClick={props.onClickClose}></button> 
         </div>
    </section>
    )
}

export default ImagePopup