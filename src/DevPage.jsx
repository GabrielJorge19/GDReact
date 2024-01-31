import { useState, useEffect } from 'react';
import { Decorations } from './dev/Decorations';
import { Users } from './dev/Users';

export default function Page() {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    const [page, setPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [decorations, setDecorations] = useState([]);

    const styles = {
        container: {
            width: '100%',
            height: '92vh',
            display: 'flex',
            marginTop: '8vh',
        },
        aside: {
            width: '20%',
            backgroundColor: '#eee',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            paddingTop: '50px',
            borderRight: '1px solid #444',
        },
        main: {
            width: '80%',
            padding: 0,
            overflowY: 'scroll',
        },
        button: {
            width: '100%',
            border: 'none',
            fontSize: '20px',
            textAlign: 'left',
            padding: '15px 0px 15px 10px',
            backgroundColor: '#444',
            color: 'white',
        }
    }

    let buttons = [
        { title: 'Users', component: <Users data={users} /> },
        { title: 'Decorations', component: <Decorations data={decorations} /> },
    ]

    useEffect(() => {
        fetch(serverUrl + 'devInfo', { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(response => response.json())
            .then(response => {
                // console.log("response ", response)
                setUsers(response.users);
                setDecorations(response.decorations);

                console.log('Response ', response);
            })
            .catch(err => console.log(err))
    }, []);

    return <div style={styles.container}>
        <div style={styles.aside}>
            {buttons.map((button, index) => <button style={styles.button} key={button.title} onClick={() => setPage(index)}>
                {button.title}
            </button>)}
        </div>
        <div style={styles.main}>
            {buttons[page].component}
        </div>
    </div>
}
