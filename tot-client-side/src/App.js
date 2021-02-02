import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {Provider} from "react-redux";
import store from "./store"
import LiveFeedMonitor from "./monitor/LiveFeedMonitor";
import useTotalisator from "./hooks/useTotalisator";
import useUser from "./hooks/useUser";


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
