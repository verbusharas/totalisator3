
const FixtureRegisterForm = (props) => {
    return (
        <form className="content-container" onSubmit={props.onSubmit}>
            <span>Save selected fixtures to totalisator:</span>
            <select id="cars" name="cars">
                <option value="volvo">WorkTotalisator</option>
                <option value="saab">FriendsTotalisator</option>
            </select>
            <button type="submit">SAVE</button>
        </form>
    )
}

export default FixtureRegisterForm;