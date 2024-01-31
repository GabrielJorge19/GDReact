import { useRef, useState, useContext } from 'react';
import { MdOutlineWatchLater, MdOutlinePayments } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { RiCoupon3Line } from 'react-icons/ri';
import { BsGearFill } from 'react-icons/bs';
import DecorationPage from './DecorationPage';
import { DataApp } from './Context';
import { InfoWindowCtx } from './Context';


function LineButtons() {
    const InfoWindow = useContext(InfoWindowCtx);
    const colors = useContext(DataApp).colors;

    const buttons = [
        { icon: <RiCoupon3Line />, text: "Pegue e monte", cod: "pegueEMonte"},
        { icon: <LuMapPin />, text: "Retirada", cod: "retirada"},
        { icon: <BsGearFill />, text: "Montagem", cod: "montagem"},
        { icon: <RiCoupon3Line />, text: "Como chegar", cod: "comoChegar"},
    ];

    let styles = {
        buttonContainer: {
            display: "flex",
            gap: 15,
            width: '100%',
            padding: '0px 0px',
            borderRadius: '10px',
        },
        button: {
            width: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            cursor: 'pointer',
        },
        icon: {
            backgroundColor: '#fff',
            width: 40,
            height: 40,
            borderRadius: 10,
            boxShadow: '4px 4px 5px #000',
            // boxShadow: '5px 5px 3px ' + colors[2],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            // color: colors[2],
            border: '1px solid black',
            // border: '1px solid ' + colors[2],
        },
        text: {
            textAlign: "center",
            fontSize: 13,
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