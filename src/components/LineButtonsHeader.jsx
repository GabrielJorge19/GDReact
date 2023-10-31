import { useRef, useState, useContext } from 'react';
import { MdOutlineWatchLater, MdOutlinePayments } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { RiCoupon3Line } from 'react-icons/ri';
import { BsGearFill } from 'react-icons/bs';
import DecorationPage from './DecorationPage';

import { InfoWindowCtx } from './Context';


function LineButtons({ style }) {
    const InfoWindow = useContext(InfoWindowCtx);

    const buttons = [
        { icon: <RiCoupon3Line />, text: "Pegue e monte", cod: "pegueEMonte" },
        { icon: <LuMapPin />, text: "Retirada", cod: "retirada" },
        { icon: <BsGearFill />, text: "Montagem", cod: "montagem" },
        { icon: <RiCoupon3Line />, text: "Como chegar", cod: "comoChegar" },
    ];

    let styles = {
        buttonContainer: {
            ...style,
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
        },
        icon: {
            width: '7vh',
            height: '7vh',
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,

            border: '1px solid #444',
            boxShadow: '2px 5px 1px #444',
            // color: "white",
            backgroundColor: '#ffffff',
        },
    }

    return (
        <div style={styles.buttonContainer}>
            {buttons.map((item, index) => {
                return <div style={styles.icon}
                    key={index}
                    onClick={() => {
                        InfoWindow.show(buttons[index].cod)
                    }}>
                    {item.icon}
                </div>
            })}
        </div>
    )
}

export default LineButtons