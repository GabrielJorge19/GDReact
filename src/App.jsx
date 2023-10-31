import DecorationPage from './components/DecorationPage';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './Home';
import DevPage from './DevPage';

function App() {

    let style = {
        fontFamily: 'arial',
        height: '100vh',
    }

    return (<div style={style}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dev" element={<DevPage />} />
                <Route path="/deco" Component={(props) => <DecorationPage {...props} url={useParams()['*']}/>}/>
            </Routes>
        </BrowserRouter>
    </div>

    )
}

export default App;



