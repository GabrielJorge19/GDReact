import { useEffect, useRef } from 'react';
import { Feed } from './components/Feed';
import Header from './components/Header';


function Home() {

    return (<div >
        {/* <Header /> */}
        <Feed />
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