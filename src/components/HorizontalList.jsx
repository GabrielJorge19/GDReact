import { useEffect, useRef, useState, useContext } from "react";
import { BsArrowRight } from 'react-icons/bs';
import { IoCaretBackOutline, IoCaretForwardOutline } from 'react-icons/io5';
import { DataApp } from './Context';

function HorizontalList() {
    let width = window.innerWidth;
    const data = useContext(DataApp).getRandomCategorie();
    const [backButtom, setBackButtom] = useState(false);
    const [nextButtom, setNextButtom] = useState(false);
    let container = useRef(null);
    let decorations = useRef(null);
    const index = useRef(0);

    let styles = {
        container: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: '100%',
            // margin: 'auto',
            marginBottom: 30,
            borderRadius: 10,
            paddingBottom: 10,
            // boxShadow: '0px 0px 5px #fff',
            // backgroundColor: '#eee',
            // border: '1px solid #444',
        },
        titleContainer: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: '10px 10px 5px',
            fontSize: '0.6em',
        },
        HorizontalListContainer: {
            display: 'flex',
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 10,
            height: '100%',
            gap: '2%',
            overflowX: (width < 800) ? 'scroll' : 'hidden',
        },
        scrollButtons: {
            position: 'absolute',
            height: '40%',
            borderRadius: '50%',
            display: (width > 800)?'flex':'none',
            alignItems: 'center',
            bottom: '30%',
            color: 'white',
            transition: 'opacity .4s',
            zIndex: 100,
            // backgroundImage: 'radial-gradient(#000000ff, #00000000)',
        },
        decoration: {
            padding: '2%',
            minWidth: '20vh',
            maxWidth: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
        },
        image: {
            width: "100%",
            maxWidth: '100%',
            height: '25vh',
            objectFit: 'cover',
            display: 'flex',
            alignItems: 'flex-end',
            color: 'white',
            fontSize: 10,
            borderRadius: 10,

        },
        decorationTitle: {
            maxWidth: '100%',
            padding: '12% 0px 3%',
            margin: 'auto',
            fontWeight: "bold",
            fontSize: '1em',
        }
    }

    if (width > 500) {
        styles.image = { ...styles.image, height: '50vh' }
        styles.decoration = { ...styles.decoration, minWidth: '40vh', maxWidth: '40vh', padding: '0.7%', }
        styles.HorizontalListContainer = { ...styles.HorizontalListContainer, gap: '1%' }
        styles.titleContainer = { ...styles.titleContainer, fontSize: '0.8em' }
        styles.decorationTitle = { ...styles.decorationTitle, fontSize: '1.5em' }
    }

    const handleHoverContainer = (direction) => {
        let containerWidth = decorations.current.clientWidth;
        let decoWidth = decorations.current.children[0].getBoundingClientRect().width;
        let onViewCount = Math.floor(containerWidth / decoWidth);

        if(direction === 'back' && index.current > 0) setBackButtom(true);
        if(direction === 'forward' && index.current < data.decorations.length - onViewCount) setNextButtom(true);
    }

    const handleScroll = (direction) => {
        let containerWidth = decorations.current.clientWidth;
        let decoWidth = decorations.current.children[0].getBoundingClientRect().width;
        let onViewCount = Math.floor(containerWidth / decoWidth);

        if(direction == 'back') {
            if(index.current == 0) return;
            index.current -= 1;
        }
        else if(direction == 'forward') {
            if(index.current >= data.decorations.length - onViewCount) return;
            index.current += 1;
        }   

        let childLeft = decorations.current.children[index.current].getBoundingClientRect().left;
        decorations.current.scrollBy({ left: childLeft - width*0.02,  behavior: 'smooth' });
    }

    useEffect(() => {
        if (container.current) container.current.scrollTo({ top: 0, left: 3, behavior: 'smooth', });
    }, []);

    return (
        <div style={styles.container} ref={container}>
            <div style={styles.titleContainer}>
                <h1 style={{}}>{data.title}</h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.3em',
                    paddingRight: '1em',

                }}
                    onClick={() => { alert('more') }}>
                    <p style={{ marginRight: 10 }}>Ver mais</p>
                    <BsArrowRight size={15} />
                </div>
            </div>
            <div style={styles.HorizontalListContainer} ref={decorations}>
                {data.decorations.map((item, index) => {
                    return <div style={styles.decoration} key={index} onClick={() => {console.log('Open ' + item.title)}}>
                        <img src={item.img} style={styles.image} />
                        <p style={styles.decorationTitle}>{item.title}</p>
                    </div>
                })}
            </div>
            <div style={{...styles.scrollButtons, opacity: (backButtom) ? 1 : 0}} onMouseEnter={() => handleHoverContainer('back')} onMouseLeave={() => { setBackButtom(false)}}>
                <IoCaretBackOutline size={150} onClick={() => handleScroll('back')} />
            </div>
            <div style={{...styles.scrollButtons, right: 0, opacity: (nextButtom) ? 1 : 0}} onMouseEnter={() => handleHoverContainer('forward')} onMouseLeave={() => { setNextButtom(false)}}>
                <IoCaretForwardOutline size={150} onClick={() => handleScroll('forward')} />
            </div>
        </div>
    );
}

export default HorizontalList;