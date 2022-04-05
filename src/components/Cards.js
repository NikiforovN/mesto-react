

function Cards(props){
    
     

    return(
       
        <div className="element">
            <img  src={props.link} alt={props.name} className="element__image" onClick={()=>{
                props.handleImagePopupOpen(props.name,props.link)
            }}/>
            <button  type="button" className="element__trash-button"></button>
            <div className="element__content">
                <h2 className="element__title">{props.name}</h2>
                <div className="element__like-container">
                    <button  type="button" className="element__like-button"></button>
                    <span  className="element__like-number"></span>
                </div>
            </div>
        </div>
        
    )
}

export default Cards