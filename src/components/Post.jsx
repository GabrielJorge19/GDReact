import { Carousel } from './Carousel';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MdPix, MdFavoriteBorder, MdFavorite, MdShare } from 'react-icons/md';
import { FaCheck } from "react-icons/fa";



import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import { Navigation, Pagination, Scrollbar, Zoom, Thumbs, FreeMode } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';



export function Post({ data, onView }) {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    const [mediaIndex, setMediaIndex] = useState('');
    const startTimeOnView = useRef(0);
    const navigate = useNavigate();
    let title = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    const [hoverTitle, setHoverTitle] = useState(false)
    const [copied, setCopied] = useState(false);

    const styles = {
        container: {
            backgroundColor: '#fff',
            width: '100%',
            // padding: '1% 0% 0px',
            display: 'flex',
            flexDirection: 'column',
            // borderRadius: 10,
            overflow: 'hidden',
            // borderBottom: '1px solid #ccc',
            // borderBottom: '1px solid #ccc',
            position: 'relative',
        },
        header: {
            width: '90%',
            padding: '10px 5% 15px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // gap: '2%',
            fontSize: '1.6em',
            color: '#fff',
            // color: 'white',
            // transform: 'translate(00px, 100%)',
            backgroundImage: 'linear-gradient(#00000088 90%, #00000000 90%)',
            // backgroundColor: '#00000088',
            // backgroundImage: 'linear-gradient(#a5c9aeaa 50%, #00000000)',
            // backgroundImage: 'linear-gradient(#96bbd5aa 50%, #00000000)',
            zIndex: 2,
            position: 'absolute',

        },
        footer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '0px',
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

    const share = () => {
        try {
            navigator.clipboard.writeText(window.location.href + 'decoration/' + data.id);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000)
        } catch (e) {

        }

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


        <div style={styles.header} onMouseEnter={() => setHoverTitle(true)} onMouseLeave={() => setHoverTitle(false)} >
            <p style={{
                fontFamily: 'cursive',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: (hoverTitle) ? 'underline' : 'none',
                // color: '#6C4F5C',
                textShadow: '0px 0px 3px white',

            }} onClick={() => { navigate('decoration/' + data.id) }}>{title}</p>
            {(copied) ?
                <div style={{
                    display: 'flex',
                    fontSize: '.7em',
                    gap: 10
                }}>
                    <p>Link copiado </p>
                    <FaCheck style={{ color: 'green' }} />
                </div>

                : <MdShare style={{ color: 'white', cursor: 'pointer' }} onClick={share} />}
        </div>

        <Swiper
            slidesPerView={1}
            centeredSlides={false}
            grabCursor={true}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper"
            spaceBetween={20}
            style={{ backgroundColor: '##888', padding: 0, width: '100%', height: 'auto', '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
        >
            {data.media.map((media, index) => {
                return <SwiperSlide key={index}

                    style={{
                        width: '100%',
                        // height: '100vw',
                    }}
                >
                    <img style={
                        {
                            width: '100%',
                            aspectRatio: 1,
                            // maxHeight: 'min(96vw, 500px)',




                        }} src={serverUrl + media.src} />
                </SwiperSlide>
            })}
        </Swiper>

        {/* <Carousel images={data.media} onChange={onChangeImage} countIndicator={false} /> */}


        {/* <div style={styles.footer}>
            { <div style={styles.bannerIndicator}>
                {data.media.map((item, index) => {
                    return <div style={{ ...styles.indicatorButton, backgroundColor: (index == mediaIndex) ? '#888' : '#ccc', marginTop: (index == mediaIndex) ? -3 : 0 }} key={index} />
                })}
            </div> }
        </div>*/}
    </div>
}