export default ({type, text, onClick}) => {
    return (
        <button type={type} onClick={onClick} className="form-section__button">
            {text}
        </button>
    )
}