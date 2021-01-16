import "./Footer.css";

const year = new Date().getFullYear();

export default () => (
    // <div className="container">
    //     <footer className="footer text-muted">ePardė &copy; {year} All rights reserved</footer>
    // </div>

<footer className="footer mt-3 py-3 navbar-light bg-light position-bottom position-sticky">
    <div className="container">
        <span className="text-muted">© 2020 Šarūnas Verbus. All Rights Reserved</span>
    </div>
</footer>

)