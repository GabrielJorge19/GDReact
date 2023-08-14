import { useState } from 'react';
import LineButtons from './LineButtons';

//"./src/assets/1.jpg"

function Decoration() {
    const [data, setData] = useState([1,2,3,4,1,2,3,4]);


    let styles = {
        container: {

        },
        bannerContainer: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 10,
            marginBottom: 20,
        },
        banner: {
            display: "inline-block",
            //width: "90vw",
            height: "100vw",
            marginRight: 10,
        },
    }

    return (
        <div style={styles.container}>
            <h1>Titulo</h1>
            <div style={styles.bannerContainer}>
                {data.map((item, index) => {
                        return <Banner style={styles.banner} key={index} data={item}/>
                })}
            </div>
            <p>R$ 150,00</p>
            <LineButtons />
            <p>Essa é a descrição</p>
        </div>
    );
}


function Banners(){
    const [data, setData] = useState([1,2,3,4,1,2,3,4]);
    let styles = {
        bannerContainer: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 10,
            marginBottom: 20,
        },
        banner: {
            display: "inline-block",
            //width: "90vw",
            height: "100vw",
            marginRight: 10,
        },
    }

 

  


    return(
        <>
        <div style={styles.bannerContainer}>
            {data.map((item, index) => {
                    return <Banner style={styles.banner} key={index} data={item}/>
            })}
        </div>
        </>
    )
}

function Banner(props){
    let styles = {
        imgs: {
            width: '100%',
            height: '100%',
            opacity: 1,
            borderRadius: 10,
        }
    }

    return(
        <div style={props.style}>
            <img style={styles.imgs} src={"./src/assets/3.jpg"} />
        </div>)
}

export default Decoration