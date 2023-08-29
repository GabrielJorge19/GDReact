import { useRef, useState, useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { MdPix } from 'react-icons/md';
import LineButtons from './LineButtons';
import HorizontalList from './HorizontalList';


function DecorationPage() {

    let styles = {
        container: {
            width: '95%',
            margin: '0px auto',
            backgroundColor: '#eee',
            borderRadius: 10,
            paddingBottom: 20,
        }
    }

    return (<div style={styles.container}>
        <Title title={'Marinheiro'} />
        <Carousel />
        <Payment />
        <LineButtons />
        <ActionButton />
        <Description />
        <Wanring />
        <HorizontalList />
        <HorizontalList />
    </div>)
}

function Title(props) {
    let styles = {
        container: {
            backgroundColor: '#fff',
            width: '92%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '10px 4%',
            marginBottom: 20,
            borderRadius: '10px 10px 0px 0px',
        },
        title: {
            marginLeft: 20,
            fontFamily: 'arial',
            fontSize: 25,
        }

    }
    return (<div style={styles.container}>
        <BiArrowBack size={40} />
        <h1 style={styles.title}>{props.title}</h1>
    </div>)
}

function Carousel() {
    let data = [3, 2, 3, 4, 1, 2, 3, 4];

    let styles = {
        container: {
            width: '100%',
            height: '90vw',
            margin: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            // border: '1px solid #000',
            backgroundColor: 'rgba(0, 0, 0, .3)',
            marginBottom: 30,
        },
        back: {
            width: '100%',
            height: '100%',
            whiteSpace: "nowrap",
            overflowX: 'hidden',
            overflowY: 'hidden',
        },
        listItem: {
            display: 'inline-block',
            width: '101%',
            height: '100%',

        },
        front: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'all 1s linear 1s',
        },
        button: {
            height: '100%',
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 5%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .3)',
        },
        indexImages: {
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '5px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial Black',
            borderRadius: 20,
            boxShadow: '2px 2px 5px #888',
            backgroundColor: 'rgba(255, 255, 255, .3)',
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        image: {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    }

    const imagesContainer = useRef(null);
    const index = useRef(0);
    const buttonsContainer = useRef(null);
    const [indexState, setIndexState] = useState(0);
 
    useEffect(() => {
        if(!buttonsContainer.current) return;
        buttonsContainer.current.style.opacity = .1;
    }, []);

    const scroll = (next = true) => {
        if(!imagesContainer.current) return;

        if(next && index.current < data.length -1) index.current += 1;
        if(!next && index.current > 0) index.current -= 1;
        setIndexState(index.current);
        let children = [...imagesContainer.current.children][index.current];
        let padding = (window.innerWidth - imagesContainer.current.getBoundingClientRect().width) / 4;

        imagesContainer.current.scrollBy({left: children.getBoundingClientRect().left - padding, behavior: 'smooth'})
    }

    return (
        <div>
            <div style={styles.container}>
                <div style={styles.back} ref={imagesContainer}>
                    {data.map((element, index) => {
                        return <div key={index} style={styles.listItem}>
                            <div style={styles.imageContainer}>
                                <img style={styles.image} src={"./src/assets/" + element + ".jpg"}/>
                            </div>
                        </div>;
                    })}
                </div>
                <div style={styles.front} ref={buttonsContainer}>
                    <div style={styles.button} onClick={() => { scroll(false) }}><MdNavigateBefore size={400} color='white' /></div>
                    <div style={styles.button} onClick={() => { scroll(true) }}><MdNavigateNext size={400} color='white' /></div>
                </div>
                <div style={styles.indexImages}>{indexState+1}/{data.length}</div>
            </div>
        </div>
    );
}

function Payment() {
    let styles = {
        container: {
            width: '92%',
            backgroundColor: '#fff',
            padding: '4%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            borderRadius: 10,
            borderBottom: '1px solid #888',
        },
        left: {
            width: '40%',
        }
    }

    return (<div style={styles.container}>
        <div style={styles.left}>
            <p style={styles.a}>
                <span style={{ fontSize: 15 }}>R$ </span>
                <span style={{ fontSize: 30 }}>150,00</span>
            </p>
            <p style={{ fontSize: 12 }}>ou até 12X com juros</p>
        </div>
        <MdPix size={45} color={'#32BCAD'} />
    </div>)
}

function ActionButton() {
    let styles = {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        text: {
            width: '50%',
            borderRadius: 20,
            padding: '5% 8%',
            backgroundColor: '#F690FF',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
            border: 'none',
            textShadow: '0px 0px 5px #fff',
        }
    }

    return (<div style={styles.container}>
        <button style={styles.text}>ALUGAR</button>
    </div>)
}

function Description() {
    let styles = {
        container: {
            width: '90%',
            backgroundColor: '#fff',
            padding: '5%',
            marginBottom: 20,
            borderRadius: 10,
            borderBottom: '1px solid #888',
        },
        title: {
            // width: '100%',
            fontSize: 20,
            // textAlign: 'center',
            marginBottom: 20,
        },
        text: {

        }
    }

    return (<div style={styles.container}>
        <h1 style={styles.title}>Descrição</h1>
        <p style={styles.text}>Essa é a descrição da decoração, aqui contarei caracteristicas individuais de cada decoração e algumas vantagens de escolher nossas decorações.</p>
    </div>)
}

function Wanring() {
    let cares = [
        'Items de madeira são altamente sensiveis a água.',
        'Alguns materias como papel crepom podem manchar permanentemente Items de madeira e tecidos.',
        'Velas que soltam fagulhas podem queimar os tecidos.',
        'Mais alguma informação importante.'
    ];


    let styles = {
        container: {
            width: '90%',
            backgroundColor: '#fff',
            padding: '5%',
            borderRadius: 10,
            marginBottom: 20,
            borderBottom: '1px solid #888',
        }
    }

    return (<div style={styles.container}>
        <h1 style={{fontSize: 20, marginBottom: 30}}>Cuidados</h1>
        <ul style={{marginLeft: 20}}>
            {cares.map((item, index) => {
                let style = {}
                if(index < cares.length - 1) style.marginBottom = 10;

                return (<li style={style} key={index}>{item}</li>)
            })}
        </ul>
    </div>)
}

export default DecorationPage;