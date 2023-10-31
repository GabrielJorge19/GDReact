import { useContext } from 'react';
import { DataApp } from './Context';
import { BiArrowBack } from 'react-icons/bi';
import { MdPix } from 'react-icons/md';
import LineButtons from './LineButtons';
import HorizontalList from './HorizontalList';
import { Carousel } from './Carousel';


function DecorationPage(props) {
    const decoration = useContext(DataApp).getDecoration(props.url);

    let images = [
        { fileName: '1.jpg', src: 'decoracao/abelinha/1.jpg' },
        { fileName: '2.jpg', src: 'decoracao/abelinha/2.jpg' },
        { fileName: '3.jpg', src: 'decoracao/abelinha/3.jpg' },
        { fileName: '4.jpg', src: 'decoracao/abelinha/4.jpg' },
        { fileName: 'IMG-20231015-WA0003.jpg', src: 'decoracao/abelinha/IMG-20231015-WA0003.jpg' },
    ]

    console.log(decoration);
    // console.log(decoration);

    let styles = {
        container: {
            width: '100%',
            height: '100vh',
            margin: '0px auto',
            backgroundColor: '#eee',
            // overflowY: 'hidden',
        },
        padding: {
            overflowY: 'scroll',
            height: 'calc(100vh - 5vh - 7vh)',
            width: '94%',
            padding: '3vh 3% 1vh',
        }
    }

    return (<div style={styles.container}>
        <Title title={decoration.title} />
        <div style={styles.padding}>
            <Carousel images={images}/>
            <Payment price={decoration.price}/>
            <LineButtons />
            <ActionButton />
            {/* <Description /> */}
            <Wanring />
            <HorizontalList />
            <HorizontalList />
        </div>
    </div>)
}

function Title(props) {
    let styles = {
        container: {
            backgroundColor: '#fff',
            width: '92%',
            height: '5vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '10px 4%',
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

function Payment(props) {
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
                <span style={{ fontSize: 30 }}>{props.price},00</span>
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
        <h1 style={{ fontSize: 20, marginBottom: 30 }}>Cuidados</h1>
        <ul style={{ marginLeft: 20 }}>
            {cares.map((item, index) => {
                let style = {}
                if (index < cares.length - 1) style.marginBottom = 10;

                return (<li style={style} key={index}>{item}</li>)
            })}
        </ul>
    </div>)
}

export default DecorationPage;