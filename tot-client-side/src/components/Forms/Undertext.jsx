const Undertext = ({text, link, to}) => {
    return (
        <p className="form-section__undertext">
            {`${text} `}<a href={to}>{link}</a>
        </p>
    )
}

export default Undertext;