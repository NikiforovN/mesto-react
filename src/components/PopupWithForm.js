function PopupWithForm(props) {

 

  function handleOverlayClose(evt){
    if (evt.target === evt.currentTarget)
    props.onClickClose();
  }

  return (
    <section
      className={`popup ${props.show && "popup_opened"}`}
      id={props.popupType}
      onClick={handleOverlayClose}
    >
      <div
        className={`popup__rectangle ${
          props.popupType === "popup-confirm" &&
          "popup__rectangle_difference_height"
        }`}
      >
        <h2 className="popup__title">{props.title}</h2>
        <button
          type="button"
          className="close-icon buttons-hover"
          onClick={props.onClickClose}
        ></button>
        <form
          className="popup__container"
          method="get"
          onSubmit={props.onSubmit}
        >
          {props.children}
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
