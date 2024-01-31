import { useContext, useEffect, useRef, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { MdPix, MdShare } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DataApp } from './Context';
import Header from './Header';
import HorizontalList from './HorizontalList';
import LineButtons from './LineButtons';



import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';


function DecorationPage() {
    const location = useLocation();
    let url = window.location.href;
    const serverUrl = url.slice(0, url.lastIndexOf(':') + 1) + '3000/';
    const decorationId = location.pathname.split('/decoration/')[1];
    const user = useContext(DataApp);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const width = window.innerWidth;
    const height = window.innerHeight;
    let isMobile = width <= 600;
    const [data, setData] = useState({ title: '', images: [] });
    const [similars, setSimilars] = useState([]);
    const [recomendations, setRecomendations] = useState([]);
    const similarsComponentRef = useRef(null);
    const colors = useContext(DataApp).colors;
    const [cep, setCep] = useState(false);
    const [cepMsg, setCepMsg] = useState('');

    let styles = {
        container: {
            width: '100%',
            // height: '100vh',
            margin: '0px auto',
            backgroundColor: colors.decorationBackground,
            // backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: '20vh',
        },
        padding: {
            width: '94%',
            padding: '0vh 3% 1vh',
            maxWidth: 1000,
            marginTop: (isMobile) ? '8vh' : '15vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
        },
        image: {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
        },
        swipeContainer: {
            width: '100%',
            height: '105vw',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            gap: '1%',
            backgroundColor: 'black',
            borderRadius: 5,
        },
        swipe: { height: '90%', width: '100%', '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' },
        swipeFooter: { height: '10%', width: '100%', cursor: 'pointer' },
        rentButtonsContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
        rentButton: {
            // width: '50%',
            flex: 3,
            borderRadius: 5,
            padding: '5% 8%',
            backgroundColor: '#497179',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
            border: 'none',
        },
        seeSimilarsButton: {
            padding: '1% 2%',
            borderRadius: 5,
            height: '100%',
            border: '1px solid #497179',
            backgroundColor: '#fff',
            fontSize: 20,
            color: '#497179',
            flex: 1,
        }
    }

    if (width > 600) {
        let wid = (height > width) ? width * .6 : height * .7;
        styles.swipeContainer = { ...styles.swipeContainer, width: wid, height: wid * 1.05 }
    }

    if (width > 1000) {
        let wid = (height > width) ? width * .6 : height * .7;
        styles.swipeContainer = { ...styles.swipeContainer, width: wid, height: wid * 1.05 }
    }

    async function getData() {
        let opt = {
            method: 'POST',
            body: JSON.stringify({ decorationId: decorationId, userId: user.id }),
            headers: { "Content-Type": "application/json" },
        }

        fetch(user.serverUrl + 'getSimilar', opt)
            .then((response) => response.json())
            .then((response) => {
                setData(response.decoration)
                setSimilars(response.similarDecorations)
                setRecomendations(response.userRecomendation)
            })

    }

    const seeSimilarHandler = () => {
        similarsComponentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const handleZipCode = (event) => {
        let input = event.target
        input.value = zipCodeMask(input.value)
    }

    const zipCodeMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2');


        if (value.length == 9) {
            let cep = Number(value.split('-')[0]);
            let cepOk = (cep > 8000 && cep < 8299) || (cep > 8400 && cep < 8699) || (cep == 12345);

            setCep(cepOk);
            setCepMsg((cepOk)?'CEP validado':'Ainda não atendemos a sua região');

            user.setCep({value, acceptable: cepOk})
        } else {
            setCepMsg('');
            setCep(false);
        }


        return value
    }

    const handleActionButtonClick = () => {

        if(cep){
            let title = data.title.charAt(0).toUpperCase() + data.title.slice(1);
            let linkWhatsapp = `https://api.whatsapp.com/send?phone=5511953409733&text=Ol%C3%A1%2C%20tenho%20interesse%20na%20decora%C3%A7%C3%A3o%20${title}.`;

            window.open(linkWhatsapp, '_blank').focus();            
        } else if(!(!!cepMsg)){
            alert('Insira seu CEP');
            document.getElementById('cep').focus();
        } else {
            alert('Infelizmente ainda não atendemos a sua região');
        }
            
        
    }

    useEffect(() => {
        getData();
        // console.log('here ' + user.id);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth', });
    }, [location]);

    return (<div style={styles.container}>
        <Header />
        <div style={styles.padding}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, }}>

                <div style={styles.swipeContainer}>
                    <Swiper
                        style={styles.swipe}
                        zoom={true}
                        navigation={true}
                        modules={[Navigation, Zoom, FreeMode, Thumbs]}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper }}
                        onActiveIndexChange={(event) => setCurrentIndex(event.activeIndex)}
                    >

                        {data.images.map((image, index) => {
                            return <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }} >
                                <div className="swiper-zoom-container" style={{ width: '100%', height: '100%' }}>
                                    <img style={styles.image} src={serverUrl + image.src} key={index} />
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        modules={[Navigation, Thumbs, FreeMode]}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        style={styles.swipeFooter}

                    >

                        {data.images.map((image, index) => {
                            return <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }} >

                                <div className="swiper-zoom-container" style={{ width: '100%', opacity: (currentIndex == index) ? 1 : .4 }}>
                                    <img style={{ ...styles.image, height: 'auto' }} src={serverUrl + image.src} key={index} />
                                </div>

                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>

                <div style={{ maxHeight: '100%', flex: 1, backgroundColor: '#fff', minWidth: 150, padding: (isMobile) ? '5px' : '1%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5, border: (isMobile) ? '' : '1px solid #ccc' }}>
                    <Title title={data.title} />
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 30,
                        padding: '30px 10px',

                    }}>

                        <Payment price={150} />
                        <div>
                            <p>Verificar <br />disponibilidade</p>
                            <input placeholder='CEP' id='cep' maxLength="9" onKeyUp={handleZipCode} style={{ height: 30, border: 'none', borderBottom: '1px solid #ccc', minWidth: 50, flex: 1, fontSize: 16, backgroundColor: 'transparent', marginTop: 5, paddingLeft: 5, cursor: 'pointer' }} />
                            <p style={{ color: (cep)?'green':'red', fontSize: 13, marginTop: 5 }}>{
                            
                            cepMsg
                            
                            
                            
                            
                            }</p>
                        </div>
                        <LineButtons />
                    </div>
                    <ActionButton onSeeSimilars={seeSimilarHandler} onRent={handleActionButtonClick} />
                </div>
            </div>

            <HorizontalList title={'Para você'} decorations={recomendations} borderBottom={false} />
            <HorizontalList title={'Similares'} decorations={similars} ref={similarsComponentRef} borderBottom={false} />
        </div>
    </div>)
}



function Title({ title }) {
    let isMobile = window.innerWidth <= 600;
    const colors = useContext(DataApp).colors;
    let decorationTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const [copied, setCopied] = useState(false);

    const share = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000)
        } catch (e) {

        }

    }

    return (<div style={{ display: 'flex', width: '94%', gap: 0, justifyContent: 'space-between', marginBottom: 0, alignContent: 'flex-end', backgroundColor: colors.decorationTitle, padding: '3%', borderRadius: 5 }}>
        <h1 style={{ color: 'white', fontSize: (isMobile) ? '1.5rem' : '2rem' }}>{decorationTitle}</h1>
        <div style={{ display: 'flex', gap: 5 }}>

            {/* {(false) ? <MdFavorite size={30} style={{ color: 'white' }} /> : <MdFavoriteBorder size={30} style={{ color: 'white' }} />} */}
            {(copied) ? <FaCheck size={35} style={{ color: 'green' }} /> : <MdShare size={30} style={{ color: 'white', cursor: 'pointer' }} onClick={share} />}

            {/* {(copied)?'':<div />} */}

            <AlertCopied copied={copied} />

        </div>
    </div>)
}

const AlertCopied = ({ copied }) => {

    const ref = useRef(null)

    useEffect(() => {
        if (copied) ref.current.style.top = '80px';
        else ref.current.style.top = '0px';
    }, [copied]);


    return <div style={{
        position: 'fixed',
        height: 60,
        width: 180,
        backgroundColor: 'white',
        borderRadius: 40,
        left: '50%',
        top: 0,
        translate: `-50% -100%`,
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px',
        gap: 20,
        fontSize: '20px',
        border: '3px solid #7DDD67',
        transition: 'top .3s',
    }} ref={ref}>

        <FaCheck size={35} style={{ color: '#7DDD67' }} />
        <p>Link copiado</p>
    </div>;
};

function Payment({ price }) {
    let styles = {
        container: {
            width: '92%',
            backgroundColor: '#fff',
            padding: '4%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginBottom: 20,
            borderRadius: 10,
            // borderBottom: '1px solid #888',
        },
        left: {
            width: '40%',
        }
    }

    return (<div style={{ width: '100%', padding: '0%', display: 'flex', justifyContent: 'aspace-between', alignItems: 'center', marginBottom: 0, borderRadius: 0, borderBottom: '0px solid #507C85', gap: 20 }}>
        <div style={{}}>
            <p>
                <span style={{ fontSize: 15 }}>R$ </span>
                <span style={{ fontSize: 30 }}>{price},00</span>
            </p>
            <p style={{ fontSize: 12 }}>ou até 12X com juros</p>
        </div>
        <MdPix size={45} color={'#32BCAD'} />
    </div>)
}

function ActionButton({ onSeeSimilars, onRent }) {

    const colors = useContext(DataApp).colors;

    let styles = {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
        text: {
            // width: '50%',
            flex: 3,
            borderRadius: 5,
            padding: '5% 8%',
            backgroundColor: colors.mainButton,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
            // border: 'none',
            border: '1px solid #9BABBE',
            cursor: 'pointer',
        },
        secontButton: {
            padding: '1% 2%',
            borderRadius: 5,
            height: '100%',
            border: '1px solid ' + colors.mainButton,
            backgroundColor: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.mainButton,
            flex: 1,
            cursor: 'pointer',
        }
    }

    return (<div style={styles.container}>
        <button style={styles.text} onClick={onRent}>ALUGAR</button>
        <button style={styles.secontButton} onClick={onSeeSimilars}>ver <br />similares</button>
    </div>)
}

export default DecorationPage;