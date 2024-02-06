import { useState, useEffect, useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClose } from "react-icons/md";
import LineButtons from './LineButtonsHeader';
import { useNavigate } from "react-router-dom";
import { DataApp } from './Context';
import { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SearchPage } from './SearchPage';

export default function Header() {

    const user = useContext(DataApp);
    const [suggestions, setSuggestions] = useState(['rosa', 'menina', 'azul', 'menino', 'infantil'])
    const colors = user.colors;

    const navigate = useNavigate();
    let width = window.innerWidth;
    const [showInput, setShowInput] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // console.log(window.location.href);

    const styles = {
        container: {
            width: '100%',
            // backgroundColor: 'rgba(56,218,255, 1)',
            // backgroundColor: '#497179',
            position: "fixed",
            zIndex: 5,
            top: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",

        },
        content: {
            maxWidth: '800px',
            width: "94%",
            height: '3vh',
            padding: "5vh 3% 2vh",
            display: "flex",
            justifyContent: 'space-between',
            gap: '3%',
        },
        logo: {
            height: "100%",
            maxWidth: '50px',
            borderRadius: '10px',
            backgroundColor: 'white',
            objectFit: 'contain',
        },
        search: {
            width: (showInput) ? '70%' : '10vw',
            transition: 'width .3s',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        inputContainer: {

            width: 'calc(100% - 10vw)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: '10px',
        },
        input: {
            width: '100%',
            border: 'none',
            borderLeft: '2px solid white',
            textAlign: 'center',
            height: '100%',

        },
        button: {
            minWidth: '10vw',
            borderRadius: '10px',
            border: 'none',
            height: '100%',
            backgroundColor: 'transparent',
            cursor: 'pointer',
        },
    }

    if (width > 500) {
        styles.content = { ...styles.content, padding: '2vh 0px' }
        styles.input = { ...styles.input, flex: 1, fontSize: '1em' }
        styles.logo = { ...styles.logo, minWidth: '7vh' }
        styles.button = { ...styles.button, width: '7vh' }
        styles.lineButtons = { width: '30%' }
    }

    // const search = () => user.search(textInput)

    useEffect(() => {
        // if (textInput.length >= 3) console.log('get sugestions');

        let words = user.getSuggestionsWords(textInput);

        setSuggestions(words);

    }, [textInput]);

    useEffect(() => {

    }, []);

    return (

        <div style={styles.container}>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center", backgroundColor: colors.header }}>
                <div style={styles.content}>

                    <img style={styles.logo} src="../src/assets/logo.png" onClick={() => navigate('/')}/>

                    <div style={styles.search}>
                        <div style={styles.inputContainer}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}

                        >

                            <input style={styles.input} type="text" placeholder="Buscar tema" id="searchBar"
                                onChange={(event) => { setTextInput(event.target.value) }}
                                onKeyDown={(event) => { if (event.key == "Enter") navigate('/search:/' + event.target.value.toLowerCase()) }}
                            />


                            <div style={{
                                width: 'calc(100% + 2px)',
                                backgroundColor: '#fff',
                                display: (showInput && showSuggestions) ? 'flex' : 'none',
                                flexDirection: 'column',
                                gap: 1,
                                padding: '5px 0px',
                            }}>

                                {suggestions.map((item, i) => {
                                    return <div key={i} style={{
                                        width: '96%', backgroundColor: '#ddd',
                                        padding: '10px 2%',
                                        cursor: 'pointer',
                                    }}
                                        onMouseEnter={(event) => event.target.style.backgroundColor = '#ccc'}
                                        onMouseLeave={(event) => event.target.style.backgroundColor = '#ddd'}
                                        onClick={() => navigate('/search:/' + item)}
                                    >{
                                            item.charAt(0).toUpperCase() + item.slice(1)
                                        }
                                    </div>
                                })}
                                {(suggestions.length == 0) ? <div style={{
                                    width: '96%', backgroundColor: '#ddd',
                                    padding: '10px 2%',
                                    textAlign: 'center',
                                }}>Nenhuma sugestão encontrata</div> : ''}
                            </div>
                        </div>

                        <button style={styles.button} onClick={() => {
                            setShowInput(prev => !prev);
                            if (!showInput) document.getElementById('searchBar').focus();
                        }}>
                            {(!showInput) ?
                                <AiOutlineSearch size={25} color='white' /> :
                                <MdClose size={25} color='white' />
                            }
                        </button>
                    </div>
                </div>
            </div>
            {/* */}
            {/* <SearchPage searchResult={searchResult} /> */}
        </div>

    )
}













