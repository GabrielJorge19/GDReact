import { FaBoxes, FaStore, FaPuzzlePiece } from 'react-icons/fa';
import { GiPerson, GiPartyPopper } from 'react-icons/gi';
import { PiPuzzlePiece, PiPuzzlePieceThin } from 'react-icons/pi';
import { useState, useEffect, useRef } from 'react';
import { ImWhatsapp } from 'react-icons/im';


export function Retirada() {

    let styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '86%',
        },
        title: {
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'justify',
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5% 0px',
            borderRadius: 10,
            width: '90%',
            backgroundColor: '#eee',
            border: '1px solid #888',

        },
        icon: {
            width: '20%',
        },
        text: {
            width: '70%',
            padding: '0px 3%',
            textAlign: 'justify',

        },
    }

    return (<div style={styles.container}>
        <h1 style={styles.title}>Retirar</h1>

        <div style={styles.contentContainer}>
            <ImWhatsapp size={40} style={styles.icon} />
            <p style={styles.text}>Basta combinar por WhatsApp um horario pra retirar os itens alugados e nesse momento será combinado o horario da devolução.</p>

        </div>
    </div>)
}

export function PegueEMonte() {

    let styles = {
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            alignSelf: 'center',
            height: '20%',
            display: 'flex',
            alignItems: 'center',

        },
        contentContainer: {
            padding: 20,
            height: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        content: {
            width: '100%',
            height: '20%',
            flexWrap: 'wrap',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
            border: '1px solid #888',
        },
        contentTitle: {
            width: '50%',
            textAlign: 'center',
        },
        contentAnimation: {
            width: '45%',
            display: 'flex',
            justifyContent: 'center',
        }


    }

    const [sideAnimation, setSideAnimation] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(2);
    const animating = useRef(false);

    useEffect(() => {
        setTimeout(() => { if (!animating.current) { move(); animating.current = true } }, 1000);
        return () => {
            animating.current = false;
        }
    }, [])

    function move(direction = true) {
        let time = (direction) ? 3 : 0;
        setSideAnimation(direction);
        setAnimationDuration(time);
        setTimeout(() => {
            if (!animating.current && direction) return;
            move(!direction)
        },
            time * 1000 + 20)
    }


    return (<div style={styles.container}>
        <h1 style={styles.title}>Pegue e monte</h1>
        <div style={styles.contentContainer}>
            <div style={styles.content}>
                <h1 style={styles.contentTitle}>Pegue</h1>
                <div style={styles.contentAnimation}>
                    <FaStore size={20} style={{ width: '25%' }} />
                    <FaBoxes size={20} style={{
                        width: '25%',
                        margin: `0px ${(sideAnimation) ? 0 : 20}% 0px ${(sideAnimation) ? 20 : 0}%`,
                        transition: `all ${animationDuration}s`,
                    }} />
                    <GiPerson size={20} style={{ width: '25%' }} />
                </div>
            </div>

            <div style={styles.content}>
                <h1 style={styles.contentTitle}>Monte</h1>
                <div style={styles.contentAnimation}>

                    <PiPuzzlePiece size={30} />
                    <PiPuzzlePieceThin size={30} style={{
                        transform: 'translateX(-10px)',
                        paddingLeft: `${(sideAnimation) ? 0 : 30}%`,
                        transition: `all ${animationDuration}s`,

                    }} />
                </div>
            </div>

            <div style={styles.content}>

                <h1 style={styles.contentTitle}>Aproveite</h1>
                <div style={styles.contentAnimation}>

                    <GiPartyPopper size={20} style={{
                        transform: `translateY(${(sideAnimation) ? -5 : 5}px)`,
                        transition: `all ${animationDuration}s`,
                    }} />
                    <GiPerson size={20} />
                    <GiPerson size={20} />
                    <GiPerson size={20} />
                    <GiPartyPopper size={20} style={{
                        transform: `translateY(${(sideAnimation) ? -5 : 5}px)`,
                        transition: `all ${animationDuration}s`,
                    }} />

                </div>

            </div>


            <div style={styles.content}>
                <h1 style={styles.contentTitle}>Devolva</h1>
                <div style={styles.contentAnimation}>
                    <FaStore size={20} style={{ width: '25%' }} />
                    <FaBoxes size={20} style={{
                        width: '25%',
                        margin: `0px ${(sideAnimation) ? 20 : 0}% 0px ${(sideAnimation) ? 0 : 20}%`,
                        transition: `all ${animationDuration}s`,
                    }} />
                    <GiPerson size={20} style={{ width: '25%' }} />
                </div>

            </div>

        </div>
    </div>)
}

export function Montagem() {

    let styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
        },
        title: {
            height: '20%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'justify',
            padding: '20px 0px',
            marginBottom: '30%',
        },
        text: {
            width: '80%',
            textAlign: 'justify',
            padding: '5%',
            borderRadius: 10,
            backgroundColor: '#eee',
            border: '1px solid #888',

        },
    }

    return (<div style={styles.container}>
        <h1 style={styles.title}>Montagem</h1>
        <p style={styles.text}>Nossas decorações são faceis de montar porque são intuitiva, mas não se precupe, se tiver alguma dificuldade pode nos mandar uma mensagem que o ajudaremos</p>
    </div>)
}

export function ComoChegar() {
    let styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '100%',
        },
        title: {
            height: '10%',
            display: 'flex',
            alignItems: 'center',
        },
        iframe: {
            width: "95%",
            height: '50%',
            border: '1px solid #ccc',
            borderRadius: 10,
        },
        button: {
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            boxShadow: '10px 10px 3px #ccc',
            fontSize: 30,
            padding: '3% 5%',
            borderRadius: 10,
            textDecoration: 'none',
            color: 'black',
        }
    }

    return (<div style={styles.container}>
        <h1 style={styles.title}>Como chegar</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.949917135031!2d-46.392006625064596!3d-23.4983133592781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce638f7da74749%3A0x5cde58749807d55f!2zR2FicmllbCBEZWNvcmHDp8O1ZXM!5e0!3m2!1spt-BR!2sbr!4v1693855869583!5m2!1spt-BR!2sbr" style={styles.iframe} />
        <a style={styles.button} href='https://goo.gl/maps/THukoi4uYwLncw7j9'>Como chegar</a>
        {/* <p>mapa</ p>
        <p>link maps</ p>
        <p>rua e numero</ p> */}
    </div>)
}