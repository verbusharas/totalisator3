export default ({text, link, to}) => {
    return (
        <p className="form-section__undertext">
            {`${text} `}<a href={to}>{link}</a>
        </p>
    )
}