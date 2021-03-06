const ServerErrorMessage = ({message}) => {
    if (message) {
        return (<p className="form-section__field-error">{`Server error: ${message}`}</p>)
    } else return(<></>)
}

export default ServerErrorMessage;