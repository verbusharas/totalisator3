import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {Provider} from "react-redux";
import configStore, {login, logout} from "./store/slices/userSlice";

const store = configStore();

function App() {

    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Content/>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;
