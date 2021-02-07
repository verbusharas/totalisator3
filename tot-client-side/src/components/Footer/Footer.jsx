import "./Footer.css";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation('footer');
    return (
        <footer className="footer mt-3 py-3 navbar-light bg-light position-bottom position-sticky">
            <div className="container">
                <span className="text-muted">© {new Date().getFullYear()} Šarūnas Verbus. {t("copyright-text")}</span>
            </div>
        </footer>
    )
}

export default Footer;