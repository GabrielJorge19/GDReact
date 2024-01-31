import { useState, useEffect } from 'react';
import { Carousel } from '../components/Carousel';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';

export function Decorations({ data }) {
    const [moreInfoIndex, setMoreInfoIndex] = useState(-1);

    const styles = {
        container: {
            width: '98%',
            padding: '1%',
            position: 'relative',
            backgroundColor: '#ccc',
        }
    };

    return <div style={styles.container}>
        {(moreInfoIndex >= 0) ? <Decoration data={data[moreInfoIndex]} exit={() => setMoreInfoIndex(-1)} /> : <Decons data={data} onSelect={setMoreInfoIndex} />}
    </div>;
}

let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';

function Decons({ data, onSelect }) {

    data.sort((a, b) => {
        if (a.id == b.id) return 0;
        return (a.id < b.id) ? -1 : 1;
    })

    const styles = {

        decorations: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1vh 1%',
        },
        decoration: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            flexBasis: '25%',
            flexGrow: 1,
            borderRadius: 10,
            padding: '1%',
            gap: 10,
        },
        img: {
            width: '60px',
            height: '60px',
            borderRadius: '10px',
        },
        keyWord: {
            padding: '2px 5px',
            backgroundColor: '#bde6ff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 15,
        },
    };

    return <div style={styles.decorations}>
        {data.map((decoration, index) => {
            return <div style={styles.decoration} key={decoration.id} onClick={() => onSelect(index)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <img src={serverUrl + decoration.images[0].src} style={styles.img} />
                    <div style={{ flex: 1 }}>
                        <p>Id: {decoration.id}</p>
                        <p>{decoration.title}</p>
                    </div>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                    {decoration.keyWords.map((keyword, index) => {
                        return <p style={styles.keyWord} key={index}>{keyword}</p>
                    })}
                </div>
            </div>;
        })}
    </div>
}

const Decoration = ({ data, exit }) => {
    let [keyWords, setKeyWords] = useState(data.keyWords);
    const [needSave, setNeedSave] = useState(false);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: '98%',
            padding: '1%',
        },
        info: {
            width: '50%',
            height: 600,
            borderLeft: '2px solid #ccc',
            paddingLeft: '5%',
        },
        infoHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        infoHeaderSave: {
            border: 'none',
            backgroundColor: '#ab00ad',
            color: (needSave) ? 'white' : '#aaa',
            fontWeight: 'bold',
            fontSize: 20,
            padding: '10px 20px',
            borderRadius: 10,
        },
        keyWordsContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: '20px',
            gap: '10px',
        },
        keyWord: {
            padding: '5px 10px',
            backgroundColor: '#bde6ff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 20,
        },
        keyWordAddInput: {
            fontSize: 18,
            height: '100%',
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            minWidth: '10ch',
        }
    };

    // console.log(data);

    const saveKeyWords = () => {
        if (!needSave) return;

        data.keyWords = keyWords;
        fetch(serverUrl + 'setKeyWords', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ id: data.id, keyWords })
        }).then(response => response.json())
            .then(response => { if (response.sucess) setNeedSave(false) })
            .catch(err => console.log('Erro ', err))


    }

    return <div style={styles.container}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
        }}>

            <h1 style={{ textAlign: 'center', width: '100%' }}>{data.title}</h1>
            <Carousel images={data.images} />
        </div>
        <div style={styles.info}>
            <div style={styles.infoHeader}>
                <button style={styles.infoHeaderSave} onClick={saveKeyWords}>Salvar</button>
                <AiOutlineClose size={30} onClick={exit} />
            </div>
            <div style={styles.keyWordsContainer}>
                <h2 style={{ width: '100%' }}>KeyWords</h2>

                {keyWords.map((keyWord, index) => {
                    return <div key={index} style={styles.keyWord}>
                        <AiOutlineCloseCircle onClick={() => {
                            setKeyWords(keyWords.filter((item, itemIndex) => itemIndex != index))
                            setNeedSave(true);
                        }} />
                        <p style={{}}>{keyWord}</p>
                    </div>;
                })}
                <div style={styles.keyWord}>
                    <GrAdd size={15} />
                    <input type='text' style={styles.keyWordAddInput} placeholder={'keyWord'} onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            let value = e.target.value;
                            if (value.length > 2) setKeyWords(prev => [...prev, value]);
                            e.target.value = '';
                            setNeedSave(true);
                        } else e.target.style.width = e.target.value.length + 2 + 'ch';
                    }}
                    />
                </div>
            </div>
        </div>
    </div>;
};
