export default ({type, text}) => {
    return (
        <button type={type} className="form-section__button">
            {text}
        </button>
    )
}