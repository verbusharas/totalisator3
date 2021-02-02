import top from "../../assets/bg-images/chest/chest3-top.png"
import mid from "../../assets/bg-images/chest/chest3-mid1.png"
import preBottom from "../../assets/bg-images/chest/chest3-pre-bottom.png"
import bottom from "../../assets/bg-images/chest/chest3-bottom.png"
import {useEffect} from "react";


const HomePage = () => {
    useEffect(() => {

    }, [])
    return (
        <main className="default">
            <section className="text-section">
                <article className="text-section__article">
                    <h2>WELCOME TO FRESH NEW <strong>TOTALISATOR 3.0</strong>!</h2>
                    <div className="text-section__description">
                        <div>
                            Who is better soccer oracle you or <a href="https://en.wikipedia.org/wiki/Paul_the_Octopus">Paul the Octopus</a>  ?

                            <p>Create your custom totalisator and find
                                out!
                            </p>
                            <p>
                                Invite
                                colleagues or friends to compete against place your predictions and cheer for your score
                                to
                                be
                                the most
                                precise.
                            </p>
                        </div>
                        <p>Creating your totalisator is super easy and completely <strong>free</strong>.</p>

                        <p>Sign up and try it yourself!</p>

                        <button className="form-section__button">
                            Sign Up
                        </button>
                        <p className="form-section__undertext">Not your first time? <a href="/">Sign In</a></p>
                    </div>
                </article>

                <article className="text-section__article text-section__article--secondary">
                    <h2>NOT CONVICED?</h2>
                    <div className="text-section__description">
                        <p>
                            If having doubts check out these example <a href="/">screenshots</a>.
                        </p>
                        <p>Managing totalisator is clear and simple. You don't need to create matches manually - just select a date
                            and
                            pick out matches you like from the list.</p>
                        <p>If you have any suggestions how to make this page more awesome feel free to <a href="/">contact
                            us</a>.</p>
                    </div>
                </article>
            </section>
            <section className="vfx-section parallax-container">
                <div className="parallax-item" data-depth="0.1">
                    <img className="ball" src={top} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="0.4">
                    <img className="particles" src={mid} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="1">
                    <img className="shadow" src={preBottom} alt="racoon"/>
                </div>
                <div className="parallax-item" data-depth="0.7">
                    <img className="human" src={bottom} alt="racoon"/>
                </div>
            </section>
        </main>
    )
}
export default HomePage;