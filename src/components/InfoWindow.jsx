import {useRef, useEffect} from 'react';

function InfoWindow(props){
    const window = useRef(null);

    let styles = {
        container: {
            display: 'none',
            width: "100vw",
            height: "100vh",
            top: "0px",
            left: 0,
            backgroundColor: 'white',
            transition: 'all .2s',
            overflow: 'hidden',
        },
        main: {
            width: "100vw",
            height: "100vh",
            overflowY: 'scroll',
        },
        button: {
            width: "30vw",
            height: "10%",
            backgroundColor: '#fff',
            border: 'none',
            fontSize: "30px",
            color: "rgb(255,101,195)",
            fontWeight: "bold",
            margin: '0px 0px 70px',
        }
    }

    useEffect(() => {
        //if(window.current) window.current.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
        console.log('here');
        if(props.show) show();

    }, [props.children])

    function show(){
        window.current.style.display = 'block';
        window.current.style.position = 'fixed';
        window.current.children[0].scrollTo(0,0);

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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button style={styles.button} onClick={hide}>Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default InfoWindow
