import { useRef, useState, useEffect, useContext } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { DataApp } from './Context';

export function Carousel({ images, onChange, countIndicator = true }) {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    const appData = useContext(DataApp);
    const width = window.innerWidth;
    const initialX = useRef(0);
    const [nextImageDisplay, setNextImageDisplay] = useState(false);

    let styles = {
        container: {
            borderRadius: 10,
            width: '100%',
            margin: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        back: {
            width: '100%',
            whiteSpace: "nowrap",
            overflowX: 'hidden',
            overflowY: 'hidden',
        },
        listItem: {
            display: 'inline-block',
            width: '100%',
            height: '100%',
        },
        front: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '500px',
            display: (appData.isMobile) ? 'none' : 'flex',
            justifyContent: 'space-between',
            transition: 'all 1s linear 1s',
        },
        button: {
            height: '100%',
            width: '10%',
            display: 'flex',
            opacity: (nextImageDisplay) ? 1 : 0,
            alignItems: 'center',
            padding: '0px 5%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .3)',
            cursor: 'pointer',
            transition: 'all .5s',
        },
        indexImages: {
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '5px 10px',
            display: (countIndicator) ? 'flex' : 'none',
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
            height: '500px',
            objectFit: 'fill',
        }
    };

    const imagesContainer = useRef(null);
    const index = useRef(0);
    const buttonsContainer = useRef(null);
    const [indexState, setIndexState] = useState(0);

    useEffect(() => {
        if (!buttonsContainer.current) return;
        buttonsContainer.current.style.opacity = 1;
    }, []);

    const scroll = (next = true) => {
        if (!imagesContainer.current) return;

        if (next && index.current < images.length - 1) index.current += 1;
        if (!next && index.current > 0) index.current -= 1;
        setIndexState(index.current);
        let children = imagesContainer.current.children[index.current];
        let left = children.getBoundingClientRect().left - imagesContainer.current.getBoundingClientRect().left;
        imagesContainer.current.scrollBy({ left: left, behavior: 'smooth' });

        if (onChange != undefined) onChange(index.current);
    };

    const pressOut = (event) => {
        if (event.touches.length == 0) {
            let distance = Math.floor(event.changedTouches[0].clientX) - initialX.current;
            if (distance < -(width * .1)) scroll(true);
            if (distance > width * .1) scroll(false);
        }
    }

    const pressIn = (event) => {
        if (event.touches.length == 1) initialX.current = Math.floor(event.touches[0].clientX);
    }

    return (
        <div style={styles.container}
            onTouchStart={pressIn}
            onTouchEnd={pressOut}
            // onPressIn={() => console.log('click')}
            >

            <div style={styles.back} ref={imagesContainer}>
                {images.map((element, index) => {
                    return <div key={index} style={styles.listItem}>
                        <div style={styles.imageContainer}>
                            <img style={styles.image} src={serverUrl + element.src} />
                        </div>
                    </div>;
                })}
            </div>
            <div style={styles.front} ref={buttonsContainer}
                onMouseEnter={() => setNextImageDisplay(true)}
                onMouseLeave={() => setNextImageDisplay(false)}
            >
                <div style={styles.button} onClick={() => { scroll(false); }}><MdNavigateBefore size={400} color='white' /></div>
                <div style={styles.button} onClick={() => { scroll(true); }}><MdNavigateNext size={400} color='white' /></div>
            </div>
            <div style={styles.indexImages}>{indexState + 1}/{images.length}</div>
        </div>
    );
}
