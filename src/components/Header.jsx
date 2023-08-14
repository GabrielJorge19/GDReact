import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

function Header() {
  
    const styles = {
        container: {
            width: "94%",
            height: '9vw',
            padding: "3vw",
            marginBottom: 30,
            display: "flex",
            justifyContent: 'space-between',
        },
        logo: {
            height: "100%",
            borderRadius: '10px',
            boxShadow: "1px 1px 5px rgb(56,218,255)"
        },
        input: {
            paddingLeft: '2%',
            width: '70%',
            border: 'none',
            borderRadius: '10px',
        },
        button: {
            width: '12%',
            height: '9vw',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: "rgb(255,101,195)"
        }
    }
  
    const [textInput, setTextInput] = useState(null);
    const search = () => {console.log(textInput)}

    return (
      
      <div style={styles.container}>
        <img style={styles.logo} src="./src/assets/logo.jpg" />
        <input style={styles.input} type="text" placeholder="Buscar tema" list="temas" 
        onChange={(input) => {setTextInput(input.target.value)}}/>
        <button style={styles.button} onClick={search}><AiOutlineSearch size={20} color='white'/></button>
        <datalist id="temas">
            <option value='Some'></option>
        </datalist>
        
      </div>
     
    )
  }

export default Header;