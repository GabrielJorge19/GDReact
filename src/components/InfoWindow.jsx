import { useState } from 'react';
import { useRef } from 'react';
import { InfoWindowCtx } from './Context';
import { Retirada, Montagem, ComoChegar, PegueEMonte } from './infos';


function InfoWindow(props) {
    let infos = {
        retirada: <Retirada />,
        montagem: <Montagem />,
        comoChegar: <ComoChegar />,
        pegueEMonte: <PegueEMonte />
    }

    // const width = window.innerWidth
    const window = useRef(null);
    const [type, setType] = useState('');

    let styles = {
        container: {
            display: 'none',
            width: "100vw",
            height: "100vh",
            top: "0px",
            left: 0,
            backgroundColor: '#cccccc88',
            transition: 'all .2s',
            overflow: 'hidden',
            fontFamily: 'arial',
            zIndex: 100,
            justifyContent: 'center',
            // alignContent: 'center',
            alignItems: 'center',
        },
        main: {
            width: "100%",
            height: "90vh",
            maxWidth: 500,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: '1%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        button: {
            width: "40%",
            backgroundColor: '#fff',
            border: 'none',
            fontSize: "30px",
            color: "rgb(255,101,195)",
            fontWeight: "bold",
            padding: '10px 0px',
        }
    }

    function show(type) {
        setType(type);

        window.current.style.display = 'flex';
        window.current.style.position = 'fixed';
        window.current.children[0].scrollTo(0, 0);

        setTimeout(() => {
            window.current.style.transform = 'scale(1)';
            window.current.style.opacity = '1';
        }, 10);
    }

    const hide = () => {

        window.current.style.transform = 'scale(.01)';
        window.current.style.opacity = '0';


        setTimeout(() => {
            window.current.style.display = 'none';
        }, 200);

    }

    return (
        <InfoWindowCtx.Provider value={{ show }}>
            <div style={styles.container} ref={window}>
                <div style={styles.main}>
                    {infos[type]}
                    {/* <div style={styles.buttonContainer}> */}
                    <button style={styles.button} onClick={hide}>Fechar</button>
                    {/* <div style={{ backgroundColor: '#fff', width: '100%', height: '30%' }}></div> */}
                    {/* </div> */}
                </div>
            </div>
            {props.children}
        </InfoWindowCtx.Provider>
    )
}

export default InfoWindow
