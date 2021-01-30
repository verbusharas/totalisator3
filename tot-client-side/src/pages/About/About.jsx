
const About = () => {


    const render = (totalisator) => {
        return (
            <p>{totalisator.title}</p>
        )
    }

    return (
        <main>
            <section className="graph-section">
            </section>
            {/*<section className="form-section">*/}
            {/*    <h2>About the Webpage (state)</h2>*/}
            {/*    {totalisatorList.map(t=>render(t))}*/}
            {/*    {totalisator &&*/}
            {/*    <>*/}
            {/*        <h2>About the Webpage (redux)</h2>*/}
            {/*        <p>SELECTED: {totalisator.title}</p>*/}
            {/*        <p>SELECTED: {totalisator.players[1]?.name}</p>*/}
            {/*    </>*/}
            {/*    }*/}

            {/*</section>*/}

        </main>
    )
}

export default About;


