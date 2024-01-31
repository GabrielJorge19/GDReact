import { useContext, useEffect, useState } from 'react';
import { DataApp } from './Context';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowRight } from "react-icons/fa6";
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';

export function SearchPage() {

    const user = useContext(DataApp);
    const [searchResult, setSearchResult] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    let styles = {
        container: {
            width: '100%',
            backgroundColor: '#ccc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // overflow: 'scroll',
            paddingTop: '10vh',
            minHeight: '80vh ',
        },
        content: {
            width: '100%',
            maxWidth: 800,
            padding: '1% 1% 5%',
            gap: 20,
            display: 'flex',
            flexDirection: 'column',
        },
        decoration: {
            // backgroundColor: '#fff',
            borderRadius: 5,
            backgroundColor: 'white',
            padding: '1% 1%',
            display: 'flex',
            flexDirection: 'column',
            // alignContent: 'space-between',
            gap: 10
        },
        title: {
            fontSize: 25,
            padding: '10px 0px',
            // fontWeight: 'bold',
        },
        image: {
            width: '100%',
            aspectRatio: 1,
            resizeMode: 'contain',
            objectFit: 'fill',
            borderRadius: 5
        }
    };

    // const updateSearchResult = (result) => setSearchResult(result);
    








    const search = async (text) => {
        let result = await user.search(text);

        // console.log(text, decodeURI(text));

        document.getElementById('searchBar').value = text;

        setSearchResult(result);

    }



    useEffect(() => {
        let text = decodeURI(location.pathname.replace('/search:/', ''));
        search(text);
    }, [location.pathname]);




























    return <div style={styles.container}>
        <Header/>
        <div style={styles.content}>

            {searchResult.map((decoration) => {

                let title = decoration.title.charAt(0).toUpperCase() + decoration.title.slice(1);

                return <div key={decoration.id} style={styles.decoration}>
                    <p style={styles.title}>{title}</p>
                    <Swiper slidesPerView={'auto'} spaceBetween={'1%'}>
                        {/* <SeeMoreSlide /> */}
                        {decoration.images.slice(0, 3).map((image, index) => {

                            return <SwiperSlide key={index}
                                style={{ width: '24%' }}>
                                <img src={user.serverUrl + image.src} style={styles.image} />

                            </SwiperSlide>;
                        })}
                        <SwiperSlide style={{
                            width: 'calc(24% - 0px)',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            aspectRatio: 1,
                            borderRadius: 5,
                            cursor: 'pointer',
                            overflow: 'hidden',
                            backgroundColor: '#F6CBDE',
                            // border: '1px solid #ccc',

                        }}
                            onClick={() => {
                                navigate('/decoration/' + decoration.id);
                            }}
                            onMouseEnter={(event) => {
                                // console.log(event.target.children[0]);
                                // event.target.children[0].style.padding = '40px';
                                // event.target.children[0].style.backgroundImage = 'radial-gradient(#ccc 50%, white 70%)';
                                // event.target.children[0].style.transform = 'scale(1.5)'; 

                                event.target.children[0].style.backgroundImage = 'linear-gradient(to bottom left, #EAD7E0, #BC8AA2)';
                                event.target.style.backgroundColor = '#fff';
                                event.target.children[0].style.backgroundColor = '#F6CBDE'; 
                                event.target.children[0].children[0].style.color = '#fff'; 
                                // event.target.children[0].style.boxShadow = '-3px 10px 3px #aaa';
                                event.target.children[0].style.boxShadow = '0px 0px 5px #aaa';

                            }}
                            
                            onMouseLeave={(event) => {
                                // console.log('here');
                                // console.log(event.target.children);
                                // event.target.children[0].style.backgroundImage = 'radial-gradient(#ccc 30%, white 40%)';
                                // event.target.children[0].style.padding = '20px';
                                
                                event.target.children[0].style.backgroundImage = '';
                                event.target.children[0].style.backgroundColor = '#fff'; 
                                event.target.children[0].style.boxShadow = '';
                                event.target.children[0].children[0].style.color = '#C79BAF'; 
                                event.target.style.backgroundColor = '#F6CBDE';
                                
                                // event.target.children[0].style.transform = 'scale(1)'; 
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    padding: 20,
                                    transition: 'all .2s',
                                    position: 'absolute',
                                    // border: '3px solid #fff',
                                    // boxShadow: '3px 10px 3px #888'
                                }}>
                                <FaArrowRight size={40} color='#C79BAF'/>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>;
            })}

        </div>



    </div>;
}
