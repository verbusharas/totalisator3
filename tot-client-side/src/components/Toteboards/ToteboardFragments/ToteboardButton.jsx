const ToteboardButton = ({text, handleClick, disabled}) => {
    return (
        <button className="tote-board__button" onClick={handleClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default ToteboardButton;