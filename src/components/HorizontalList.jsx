import { forwardRef, useContext, useRef } from "react";
import { BsArrowRight } from 'react-icons/bs';
import { SlDislike } from "react-icons/sl";
import { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { DataApp } from './Context';
import { useNavigate } from "react-router-dom";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function HorizontalList({ title, decorations }, ref) {
    const user = useContext(DataApp);
    let width = window.innerWidth;
    const navigate = useNavigate();
    const colors = useContext(DataApp).colors;

    let styles = {
        container: {
            position: "relative",
            display: "flex",
            gap: 10,
            flexDirection: "column",
            width: '100%',
            // padding: '0px',
            // marginBottom: 30,
            // marginTop: 20,

        },
        titleContainer: {
            paddingLeft: '0%',
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: '0.6em',
        },
        decoration: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            backgroundColor: colors.decorationSugestionBackground,
            padding: '5% 3%',
            borderRadius: '5px',
            // border: '1px solid #ccc', // + colors.secondaryButton,
            // boxShadow: '
            // boxShadow: '0px 4px 2px -2px gray',
            // boxShadow: '0px 15px 10px -15px #111', 

            // boxShadow: '5px 5px 5px #000',

        },
        image: {
            width: "100%",
            height: 200,
            objectFit: 'cover',
            display: 'flex',
            alignItems: 'flex-end',
            color: 'white',
            fontSize: 10,
            borderRadius: 5,
            aspectRatio: 1,
        },
        decorationTitle: {
            width: '96%',
            padding: '3% 2%',
            fontSize: '1em',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },

        buttons: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0% 0%',
            gap: 10,

        },
        primary: {
            display: 'flex',
            width: "50%",
            flex: 5,
            padding: '3% 2% 3% 4%',
            borderRadius: 5,
            border: 'none',
            // border: '1px solid ' + colors.secondaryButton,
            backgroundColor: colors.secondaryButton,
            // backgroundColor: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            // color: colors.secondaryButton,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            transition: 'all .1s',
            opacity: .5,
            cursor: 'pointer',
        },
        secondary: {
            padding: '1% 2%',
            borderRadius: 5,
            border: '1px solid ' + colors.secondaryButton,
            backgroundColor: colors.secondaryButton + '00',
            fontSize: 15,
            color: colors.secondaryButton,
            flex: 1,
            cursor: 'pointer',

        },
    }

    if (width > 500) {
        styles.image = { ...styles.image }
        styles.decoration = { ...styles.decoration, }
        styles.HorizontalListContainer = { ...styles.HorizontalListContainer, gap: '1%' }
        styles.titleContainer = { ...styles.titleContainer, fontSize: '0.8em' }
        styles.decorationTitle = { ...styles.decorationTitle, fontSize: '1.5em' }
    }

    const hoverMainButton = (event) => event.target.style.opacity = (event.type == "mouseenter") ? 1 : .5;

    const hoverSecondaryButton = (event) => {
        // Cor hexadecimal com opacidade é convertida em rgba()

        let backgroundColor = event.target.style.backgroundColor;
        let color = event.target.style.color;
        let bc = (opacity) => backgroundColor.substring(0, backgroundColor.lastIndexOf(',') + 1) + ' ' + opacity + ')';

        
        if (event.type == "mouseenter") {
            
            backgroundColor = bc(.99);
            color = 'white';
        } else {
            
            color = colors.secondaryButton;
            backgroundColor = bc(0)
        }


        // console.log(backgroundColor);
    }

    const hoverDecoration = (event) => {
        let style = event.target.style;

        if (event.type == "mouseenter") {

            style.backgroundColor = '#ccc';
        } else {

            style.backgroundColor = colors.decorationSugestionBackground;

        }

    }










    return (
        <div style={styles.container} ref={ref}>
            <div style={styles.titleContainer}>
                <h1 style={{}}>{title}</h1>
                {/* <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.3em',
                    paddingRight: '1em',

                }}
                    onClick={() => { alert('more') }}>
                    <p style={{ marginRight: 10 }}>Ver mais</p>
                    <BsArrowRight size={15} />
                </div> */}
            </div>
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={false}
                slidesPerGroupSkip={3}
                grabCursor={true}
                loop={true}
                modules={[Keyboard, Scrollbar]}
                className="mySwiper"
                spaceBetween={20}
                style={{ height: 'auto', width: '100%', '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff', paddingBottom: '0%' }}
            >
                {decorations.map((item, index) => {
                    let decorationTitle = item.title.charAt(0).toUpperCase() + item.title.slice(1);
                    return <SwiperSlide key={index} style={{ backgroundColor: '##497179', width: '200px' }}>
                        <div style={styles.decoration}
                            // onMouseEnter={hoverDecoration}
                            // onMouseLeave={hoverDecoration}

                        >
                            <img src={user.serverUrl + item.images[0].src} style={styles.image} />
                            {/* <p style={styles.decorationTitle}>{decorationTitle}</p> */}
                            <div style={styles.buttons}>
                                <button style={styles.primary}
                                    onClick={() => { navigate('/decoration/' + item.id) }}
                                    onMouseEnter={hoverMainButton}
                                    onMouseLeave={hoverMainButton}
                                >{decorationTitle}</button>
                                <button style={styles.secondary}
                                    onClick={() => console.log('Dislike')}
                                    onMouseEnter={hoverSecondaryButton}
                                    onMouseLeave={hoverSecondaryButton}
                                ><SlDislike /></button>
                            </div>
                        </div>
                    </SwiperSlide>
                })}


            </Swiper>
        </div>
    );
}

export default forwardRef(HorizontalList);