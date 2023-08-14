import {useRef, useEffect} from 'react';

function InfoWindow(props){
    const window = useRef(null);
    let initRender = 0;

    let styles = {
        container: {
            display: 'none',
            width: "100vw",
            height: "calc(100vh - 28vw)",
            position: 'absolute',
            top: "15vw",
            left: 0,
            backgroundColor: 'white',
            transition: 'all .2s',
        },
        main: {
            width: "100vw",
            height: "90%",
            overflow: 'auto',
        },
        button: {
            float: 'right',
            width: "30vw",
            height: "10%",
            backgroundColor: 'white',
            border: 'none',
            fontSize: "30px",
            color: "rgb(255,101,195)",
            fontWeight: "bold",
            textShadow: "2px 2px 1px rgba(255,101,195, .5)",
        }
    }

    useEffect(() => {
        if(props.show) show();

    }, [props.children])

    function show(){
        window.current.style.display = 'block';

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
        <div style={styles.container} ref={window}>
            <div style={styles.main}>
                {props.children}
            </div>
            <button style={styles.button} onClick={hide}>Fechar</button>
        </div>
    )
}

export default InfoWindow
