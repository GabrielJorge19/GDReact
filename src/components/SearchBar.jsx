import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar(){

    let styles = {
        container: {
            backgroundColor: "#fff",
            borderRadius: 10, 
            border: '#cecece solid 1px',
        },
        input: {
            paddingLeft: '2%',
            width: '70%',
            height: 30,
            border: 'none',
            borderRight: '#cecece solid 4px',
            borderRadius: 10,
        },
        button: {
            width: '25%',
            height: 30,
            border: 'none',
            backgroundColor: '#fff'
        }
    }

    return (
        <div style={styles.container}>
            <input style={styles.input} type="text" placeholder="Tema" list="temas" />
            <button style={styles.button}><AiOutlineSearch /></button>
            <datalist id="temas">
                <option value='Some'></option>
            </datalist>
        </div>
    )
}

export default SearchBar