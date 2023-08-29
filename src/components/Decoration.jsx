import { useState, useRef, useEffect } from 'react';
import LineButtons from './LineButtons';

//"./src/assets/1.jpg"

function Decoration() {
    const [data, setData] = useState([1, 2, 3, 4, 1, 2, 3, 4]);

    let d = {
        value: 150,
        description: 'Essa é uma decoração do marinheiro com balões vermelhos e brancos',
    }

    const imagesContainer = useRef(null);
    const [updates, setUpdates] = useState(0);
    const imgIndex = useRef(0);

    let styles = {
        container: {
            width: '100%',
            backgroundColor: '#fff',
            margin: '0px auto 20px',
            borderRadius: 10,
            //backgroundColor: '#ccc',
            borderBottom: '1px solid #888',
        },
        titleContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            //backgroundColor: '#ccc',
            borderRadius: '10px 10px 0px 0px',

        },
        title: {
            fontSize: 20,
            fontFamily: 'Arial Black',
        },
        numberImages: {
            width: 50,
            // padding: '2px 5px',
            fontFamily: 'Arial Black',
            textAlign: 'center',
        },
        imagesContainer: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
        },
        imageDiv: {
            display: "inline-block",
            width: "100%",
            height: "100vw",
            backgroundColor: '#888',
        },
        descriptionContainer: {
            padding: 20,
            borderRadius: '0px 0px 10px 10px',
        },
        value: {
            fontSize: 18,
            fontWeigth: 'bold',
            fontFamily: 'Arial Black',
        },
        description: {
            fontSize: 13,
            fontFamily: 'Arial',
        }
    }

    useEffect(() => {
        if (imagesContainer.current) {
            imagesContainer.current.scrollTo(100,0);
            imagesContainer.current.addEventListener('scrollend', () => {
                let d = imagesContainer.current.children[imgIndex.current].getBoundingClientRect().left;
                if (d > 30 || d < 0) {
                    if (imagesContainer.current == undefined) return;
                    let banners = [...imagesContainer.current.children];
                    let modulo = (value) => { return Math.sqrt(Math.pow(value, 2)) }
                    let next = {
                        index: 0,
                        banner: banners[0],
                        distance: 1000,
                    }

                    banners.map((item, index) => {
                        let br = item.getBoundingClientRect().left;
                        if (modulo(br) < next.distance) {
                            next.index = index;
                            next.banner = item;
                            next.distance = modulo(br);
                        }
                    })

                    imgIndex.current = next.index;
                    setUpdates(next.index);
                    let bannerRect = next.banner.getBoundingClientRect();
                    let padding = (window.innerWidth - bannerRect.width) / 2;
                    imagesContainer.current.scrollBy({ left: bannerRect.left - padding, top: 0, behavior: "smooth", });

                }
            });
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Marinheiro</h1>
                <p style={styles.numberImages}>{updates + 1}/4</p>
            </div>
            <div style={styles.imagesContainer} ref={imagesContainer}>
                {data.map((item, index) => {
                    return (
                        <div style={styles.imageDiv} key={index}>
                            <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center' }}>
                                <img style={{maxWidth: '100%'}} src={"./src/assets/" + item + ".jpg"} />
                            </div>
                        </div>)
                })}
            </div>
            <div style={styles.descriptionContainer}>
                <p>
                    <span style={styles.title}>R${d.value},00</span>
                    <span style={styles.description}>, {d.description}</span>
                </p>
            </div>
        </div>
    );
}

export default Decoration