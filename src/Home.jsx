import { useRef, useEffect, useContext } from 'react';
import LineButtons from './components/LineButtons';
import Banner from './components/Banner';
import HorizontalList from './components/HorizontalList';
import Decoration from './components/Decoration';
import Header from './components/Header';
import { DataApp } from './components/Context';
import { Feed } from './components/Feed';


function Home() {
    const width = window.innerWidth;
    const decoration = useContext(DataApp);
    const bannerImages = decoration.getBannerImages();
    const randomDecoration = decoration.getRandomDecoration();

    let padding = 8 - (width / 200)
    let styles = {
        padding: {
            padding: `0px ${padding/2}% 0px ${padding/2}%`,
            width: `${100 - padding}%`,
        }
    }

    return (<div style={{}}>
        <Header />
        <Feed />
        {/* <Decoration data={randomDecoration}/> */}
        {/* <div style={{ overflowY: 'scroll', height: 'calc(100vh - 15vh)'}}>
            <Banner images={bannerImages} />
            <div style={styles.padding}>
                {(width < 500)?<><LineButtons /><Decoration data={randomDecoration}/></>:''}
                
                <HorizontalList />
                <HorizontalList />
                <HorizontalList />
            </div>
        </div> */}

    </div>)
}

export default Home;








function Teste() {
    const con = useRef(null);
    const big = useRef(null);
    const view = useRef(false);
    const u = useRef(false);
    let count = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
    let styles = {
        container: {
            width: '90%',
            height: '70vh',
            backgroundColor: '#fff',
            padding: '20px 0px',
            overflow: 'scroll',
        },
        small: {
            width: '100%',

            backgroundColor: '#888',
        },
        big: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: "#000",
            // overflowY: 'scroll',
            transform: 'scale(.1)',
            zIndex: 100,
        },
        min: {
            width: '100%',
            height: '40vw',
            backgroundColor: '#ff0',
            border: '1px solid #000',
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 80,
        },
    }

    const comp = (theme = 'light') => {
        return (<div>
            {count.map((item, index) => {
                return <div style={styles.min} key={index}>{theme} - {item}</div>
            })}
        </div>)
    }

    useEffect(() => {
        if (!con.current) return;


        if (u.current == false) {
            con.current.addEventListener('click', (event) => {

                console.log(view.current);
                view.current = !view.current;
                big.current.style.transform = (view.current) ? 'scale(.1)' : 'scale(1)';
            })
            u.current = true;
        }
    }, []);

    return (<div style={styles.container} ref={con}>
        <div style={styles.small}>
            {comp()}
        </div>
        <div style={styles.big} ref={big}>
            {comp('')}
        </div>
    </div>)
}