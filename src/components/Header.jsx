import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import LineButtons from './LineButtonsHeader';

function Header() {
    let width = window.innerWidth

    const styles = {
        container: {
            width: '100%', 
            backgroundColor: 'rgba(56,218,255, 1)',
            position: "fixed",
            zIndex: 5,
            top: 0,
            display: "flex",
            justifyContent: "center",
        },
        content: {
            maxWidth: '800px', 
            width: "94%",
            height: '4vh',
            padding: "1vh 3%",
            display: "flex",
            justifyContent: 'space-between',
            gap: '3%',
        },
        
        logo: {
            height: "100%",
            borderRadius: '10px',
            boxShadow: '1px 3px 1px #666',
            backgroundColor: 'white',
            objectFit: 'contain',
        },
        input: {
            paddingLeft: '2%',
            width: '70%',
            border: 'none',
            borderRadius: 10,
            height: '100%',
            boxShadow: '1px 3px 1px #666',
        },
        button: {
            width: '12%',
            borderRadius: '10px',
            border: 'none',
            height: '100%',
            boxShadow: '1px 3px 1px #666',
        },
    }

    if (width > 500) {
        styles.content = { ...styles.content, height: '6vh', padding: '1vh 0px' }
        styles.input = { ...styles.input, flex: 1, fontSize: '1em' }
        styles.logo = { ...styles.logo, minWidth: '7vh'}
        styles.button = { ...styles.button, width: '7vh'}
        styles.lineButtons = { width: '30%' }
    }

    const [textInput, setTextInput] = useState(null);
    const search = () => { console.log(textInput) }


    return (

        <div style={styles.container}>
            <div style={styles.content}>
                <img style={styles.logo} src="./src/assets/logo.png" />
                <input style={styles.input} type="text" placeholder="Buscar tema" list="temas"
                    onChange={(input) => { setTextInput(input.target.value) }} />
                <button style={styles.button} onClick={search}><AiOutlineSearch size={20} /></button>
                {/* {(width >= 500) ? <LineButtons style={styles.lineButtons} /> : ''} */}
                <datalist id="temas">
                    <option value='Some'></option>
                </datalist>
            </div>
        </div>

    )
}

export default Header;