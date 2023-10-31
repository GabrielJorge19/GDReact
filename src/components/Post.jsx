import { Carousel } from './Carousel';
import { BsThreeDotsVertical, BsFillSendFill } from 'react-icons/bs';
import { MdOutlineExpandMore, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useEffect, useState, useRef } from 'react';

export function Post({ data, onView }) {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    const [mediaIndex, setMediaIndex] = useState('');
    const [displayMore, setDisplayMore] = useState(false);
    const startTimeOnView = useRef(0);

    const styles = {
        container: {
            backgroundColor: '#fff',
            width: '100%',
            padding: '1% 0% 0px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            overflow: 'hidden',
        },
        header: {
            width: '98%',
            padding: '1%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2%',
        },
        footer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30px',
            width: '100%',
        },
        button: {
            border: 'none',
            fontSize: 23,
            height: '100%',
            // backgroundColor: '#aaaaaaff',
            color: '#000',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 0,
            textShadow: '0px 0px 2px #fff',
        },
        bannerIndicator: {
            display: 'flex',
            width: 5 + data.media.length * 1.2 + "%",
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'start',
            paddingTop: 10,
        },
        indicatorButton: {
            width: 6,
            height: 6,
            borderRadius: 6,
        },
    }

    const onChangeImage = (index) => {
        setMediaIndex(index);
        data.report.imagesChanges += 1;
    }

    useEffect(() => {
        if (onView) {
            startTimeOnView.current = new Date().getTime();
        } else {
            let newTIme = new Date().getTime();
            let time = (newTIme - startTimeOnView.current) / 1000;
            if (time < 60) data.report.timeOnView += Number(time.toFixed(2));
        }
    }, [onView]);

    useEffect(() => {
        data.report = {
            timeOnView: 0,
            imagesChanges: 0,
            seeMoreClick: 0,
        }
    }, []);

    return <div style={styles.container}>
        <div style={styles.header} >
            <img src={serverUrl + data.picture.src} style={{ width: 50, height: 50, borderRadius: '50%', }} />
            <div style={{ flex: 1 }}>
                <p>{data.title}</p>
            </div>

        </div>
        <Carousel images={data.media} onChange={onChangeImage} countIndicator={false} />
        <div style={styles.footer}>
            <div style={styles.bannerIndicator}>
                {data.media.map((item, index) => {
                    return <div style={{ ...styles.indicatorButton, backgroundColor: (index == mediaIndex) ? '#888' : '#ccc', marginTop: (index == mediaIndex) ? -3 : 0 }} key={index} />
                })}
            </div>
        </div>
    </div>
}