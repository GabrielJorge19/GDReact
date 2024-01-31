import DecorationPage from './components/DecorationPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home';
import DevPage from './DevPage';
import { Feed } from './components/Feed';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { SearchPage } from './components/SearchPage';

function App() {

    let style = {
        fontFamily: 'arial',
        height: '100vh',
        width: '100%',

    }

    return (<div style={style}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/search:/*" element={<SearchPage />} />
                <Route path="/decoration/*" element={<DecorationPage />}/>


                
                <Route path="/dev" element={<DevPage />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>

    )
}

export default App;



