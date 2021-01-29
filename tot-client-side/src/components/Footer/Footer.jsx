import "./Footer.css";

const Footer = () => (

<footer className="footer mt-3 py-3 navbar-light bg-light position-bottom position-sticky">
    <div className="container">
        <span className="text-muted">© {new Date().getFullYear()} Šarūnas Verbus. All Rights Reserved</span>
    </div>
</footer>

)

export default Footer;