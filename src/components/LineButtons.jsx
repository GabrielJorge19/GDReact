import { useRef, useState, useContext } from 'react';
import { MdOutlineWatchLater, MdOutlinePayments } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { RiCoupon3Line } from 'react-icons/ri';
import { BsGearFill } from 'react-icons/bs';
import DecorationPage from './DecorationPage';

import { InfoWindowCtx } from './Context';


function LineButtons() {
    const InfoWindow = useContext(InfoWindowCtx);

    const buttons = [
        { icon: <RiCoupon3Line />, text: "Pegue e monte", cod: "pegueEMonte"},
        { icon: <LuMapPin />, text: "Retirada", cod: "retirada"},
        { icon: <BsGearFill />, text: "Montagem", cod: "montagem"},
        { icon: <RiCoupon3Line />, text: "Como chegar", cod: "comoChegar"},
    ];

    let styles = {
        buttonContainer: {
            display: "flex",
            justifyContent: "space-evenly",
            width: '95%',
            margin: 'auto',
            marginBottom: 20,
            padding: '10px 0px',
            borderRadius: '10px',
        },
        button: {
            width: "25%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        icon: {
            width: "12vw",
            height: '12vw',
            borderRadius: '15vw',
            boxShadow: '10px 5px 8px #ccc',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            backgroundColor: 'white',
        },
        text: {
            textAlign: "center",
            fontSize: 10,
            marginTop: 10,
        }
    }

    const [show, setShow] = useState(false);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={styles.buttonContainer}>
                    {buttons.map((item, index) => {
                        return <div style={styles.button}
                            onClick={() => {
                                setShow(index); 
                                
                                InfoWindow.show(buttons[index].cod)
                            }}
                            key={index}>
                            <div style={styles.icon}>
                                {item.icon}
                            </div>
                            <p style={styles.text}>{item.text}</p>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default LineButtons


function Map() {
    const dataApp = useDataApp()
    const [text, setText] = useState(null);

    let styles = {
        container: {
            width: "100%",
        }
    }

    let inputDiv = <div>
        <input onChange={(event) => { setText(event.target.value) }} type='number' pattern="\d{5}-\d{3}" />
        <button onClick={() => { dataApp.setCep(text) }}>Localizar</button>
    </div>

    return (<div style={styles.container}>
        <h1>{(dataApp.cep) ? dataApp.cep : inputDiv}</h1>
        

    </div>)
}