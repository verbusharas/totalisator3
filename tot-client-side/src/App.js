import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {Provider} from "react-redux";
import store from "./store"
import LiveFeedMonitor from "./monitor/LiveFeedMonitor";


function App() {

    return (
        <Provider store={store}>
            <LiveFeedMonitor>
            <Router>
                <Header/>
                <Content/>
                <Footer/>
            </Router>
            </LiveFeedMonitor>
        </Provider>
    );
}

export default App;
