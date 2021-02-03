const ToteboardScoreboard = ({isEmpty, homeScore, awayScore, isEditable, homeInput, awayInput}) => {

    const editableDigits = () => {
        return (
            <div className="tote-board__score-predict">
                <input type="text" onChange={homeInput} value={homeScore}/>
                <input type="text" onChange={awayInput} value={awayScore}/>
            </div>
        )
    }

    const disabledDigits = () => {
        return (
            <div className="tote-board__score-predict">
                <input type="text" disabled value={homeScore}/>

                <input type="text" disabled value={awayScore}/>
            </div>
        )
    }

    const noDigits = () => {
        return (
            <div className="tote-board__score-predict">
                <h2>vs</h2>
            </div>
        )
    }

    if (!isEmpty && isEditable) {
        return editableDigits();
    } else if (!isEmpty && !isEditable) {
        return disabledDigits();
    } else {
        return noDigits();
    }
}

export default ToteboardScoreboard;