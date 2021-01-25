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
                <h1
                    style={{color:"white"}}
                    onClick={()=>store.dispatch(login({name:"Tomukas", surname:"Tomukaitis"}))}>
                    Login Tomas</h1>
                <h1
                    style={{color:"white"}}
                    onClick={()=>store.dispatch(logout())}>
                    Logout</h1>
                <Content/>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;
