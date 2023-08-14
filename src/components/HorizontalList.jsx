import { useRef, useState } from "react";
import { BsArrowRight } from 'react-icons/bs';

function HorizontalList(props){
    const [data, setData] = useState(props.data);
    let container = useRef(null);

    let styles = {
        container: {
            backgroundColor: 'white',
            display: "flex",
            flexDirection: "column",
            width: '95%',
            margin: 'auto',
            marginBottom: 10,
            borderRadius: 10,
            paddingBottom: 10,
        },
        HorizontalListContainer: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 10,
        },
        titleContainer: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 30,
            padding: '10px 30px 10px 10px',
            fontSize: 10,
        },
        title: {
            fontSize: 15,
        },
        moreContainer: {
            color: 'blue',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }
    }

    return (
        <>
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>{data.title}</h1>
                <div style={styles.moreContainer}
                    onClick={() => {alert('more')}}>
                    <p style={{marginRight: 5}}>Ver mais</p>
                    <BsArrowRight size={15}/>
                </div>
            </div>
            <div style={styles.HorizontalListContainer} ref={container}>
                {data.data.map((item, index) => {
                    if(data.dataType == 'component') return item.component;
                    if(data.dataType == 'images') return <ImageItem key={index} data={item}/>
                    })}
            </div>
        </div>
        </>
    );
}

function ImageItem(props){
    let styles = {
        container: {
            display: "inline-block",
            width: "40vw",
            height: "40vw",
            marginRight: 10,
            //backgroundColor: '#888',
            backgroundImage: 'url(' + props.data.src + ')',
            backgroundSize: '100% 100%',
            borderRadius: "10px",
        },
        title: {
            width: "100%",
            height: '100%',
            backgroundImage: 'linear-gradient(rgb(0,0,0,0) 80%, rgba(0,0,0,.6) 85%)',
            display: 'flex',
            alignItems: 'flex-end',
            color: 'white',
            fontSize: 10,
            borderRadius: 10,
        }, 
        text: {
            marginBottom: 10,
            marginLeft: 20,
            fontWeight: "bold",
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.title}>
                <p style={styles.text}>{props.data.title}</p>
            </div>
        </div>)
}


export default HorizontalList;