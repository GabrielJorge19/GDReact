import { DataApp } from './Context';
import { useState, useEffect, useContext } from 'react';
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export function Footer() {
    const user = useContext(DataApp);
    const colors = user.colors;
    const isMobile = user.isMobile;

    let styles = {
        container: {
            backgroundColor: colors.header,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        },
        content: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '800px',
            width: "94%",
            height: '6vh',
            padding: "2vh 5%",
            // backgroundColor: '#ccc'
        }
    }

    return <div style={styles.container}>
        <div style={styles.content}>


            <SocialMedias />



            <div style={{
                textAlign: 'center',
                color: '#B394A1',
                fontSize: '.6em',
            }}>
                <p>Desenvolvido por</p>
                <a href="https://github.com/GabrielJorge19" target="_blank" style={{ color: '#B394A1', textDecoration: (isMobile) ? 'underline' : 'none' }}
                    onMouseEnter={(event) => {
                        event.target.style.textDecoration = 'underline';
                        event.target.style.color = 'white';
                    }}

                    onMouseLeave={(event) => {
                        event.target.style.textDecoration = 'none';
                        event.target.style.color = '#B394A1';
                    }}

                >Gabriel Jorge</a>
            </div>



            <div style={{
                color: '#EEE7EA',
                fontSize: (isMobile) ? '.7em' : '.8em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // fontWeight: 'lighter'
            }}>
                {/* <p>Horario de funcionamento</p> */}
                {/* <p>Segunda à sexta 13:00 às 18:00</p> */}
                <p>Seg. à sex 13:00 às 18:00</p>
                <p>Sábado 08:00 às 12:00</p>
            </div>


        </div>

    </div>
}


function SocialMedias() {

    let styles = {
        container: {
            display: 'flex',
            gap: 10,
            height: '100%',
            // backgroundColor: 'blue',

            alignItems: 'center',
        },
        icon: {
            // width: '6vh',
            // height: '6vh',


            width: '40px',
            height: '40px',


            backgroundColor: '#1878F3',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return <div style={styles.container}>
        <a href="https://www.instagram.com/gabrieldecoracoes/" target="_blank" style={{ ...styles.icon, backgroundImage: 'linear-gradient(#880CDC, #F7BF0A)' }}><FaInstagram size={30} color='white' /></a>
        <a href="https://www.facebook.com/profile.php?id=100054538596867" target="_blank" style={styles.icon}><FaFacebookF color="white" size={25} /></a>
    </div>
}
