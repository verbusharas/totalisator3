const Standings = () => {
    return (
        <article className="standings">
            <table>
                <tbody>
                <tr>
                    <td className="standings__player">DALIA IBELHAUPTAITĖ</td>
                    <td className="standings__points">8750</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                <tr>
                    <td className="standings__player">ARNOLD SCHWARTZENEGGER</td>
                    <td className="standings__points">7500</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                <tr>
                    <td className="standings__player standings__player--highlighted">ZLATAN IBRAHIMOVIČ</td>
                    <td className="standings__points standings__points--highlighted">7250</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                <tr>
                    <td className="standings__player">VALDAS ADAMKUS</td>
                    <td className="standings__points">4400</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                <tr>
                    <td className="standings__player">GINTARĖ KARALIŪNAITĖ</td>
                    <td className="standings__points">780</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                <tr>
                    <td className="standings__player">UGNIUS KIGUOLIS</td>
                    <td className="standings__points">50</td>
                    <td className="standings__player" style={{backgroundColor:"var(--dark-teal)", color:"var(--white-blue)"}}>kick</td>
                </tr>
                </tbody>
            </table>
        </article>
    )
}

export default Standings;