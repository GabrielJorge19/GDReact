import Header from './components/Header';
import DecorationPage from './components/DecorationPage';
import { createContext } from 'react';

//useContext



import Home from './Home';

function App() {
    let style = {
        // padding: 20,
        backgroundImage: 'linear-gradient(rgb(56,218,255) 150px, #eee 250px)',
        fontFamily: 'arial',
        height: '100vh',
        // overflowY: 'scroll',
    }

    const DataApp = createContext(null);

    return (
        <DataApp.Provider value={{ nome: 'some' }}>

            <div style={style}>
                <Header />
                <div style={{overflowY: 'scroll', height: 'calc(100vh - 15vw - 40px)'}}>

                    <DecorationPage />
                    {/* <Home /> */}
                </div>
            </div>
        </DataApp.Provider>

    )
}

export default App;



