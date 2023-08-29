import {useRef, useState} from 'react';
import InfoWindow from './InfoWindow';
import { MdOutlineWatchLater, MdOutlinePayments } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { RiCoupon3Line } from 'react-icons/ri';
import { BsGearFill } from 'react-icons/bs';
import DecorationPage from './DecorationPage';


const comp = (text) => {return <h1 style={{height: '200vh'}}>{text}</h1>}

function LineButtons(){
    const [buttonActive, setButtonActive] = useState(0);

    const buttons = [
        {icon: <LuMapPin />, text: "Retirada", component: comp("Retirada")},
        // {icon: <LuMapPin />, text: "Retirada", component: <DecorationPage />},
        {icon: <MdOutlineWatchLater />, text: "Horario", component: comp("Horario")},
        {icon: <BsGearFill />, text: "Montagem", component: comp("Montagem")},
        {icon: <MdOutlinePayments />, text: "Pagamento", component: comp("Pagamento")},
        {icon: <RiCoupon3Line />, text: "Cupons", component: comp("Cupons")},
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
            width: "12vw",
        },
        icon: {
            width: "100%",
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

    return(
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={styles.buttonContainer}>
                    {buttons.map((item, index) => {
                        return <div style={styles.button} 
                        onClick={() => {setButtonActive(index);setShow(true)}}
                        key={index}>
                            <div style={styles.icon}>
                                {item.icon}
                            </div>
                            <p style={styles.text}>{item.text}</p>
                        </div>
                    })}
                </div>   
            </div>
            <InfoWindow show={show}>{buttons[buttonActive].component}</InfoWindow>
        </>
    )
}

export default LineButtons


//<img style={styles.imgs} src="./src/assets/logo.jpg" />
//<img style={styles.icon} src={item.icon} />
