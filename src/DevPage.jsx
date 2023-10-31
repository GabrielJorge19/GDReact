import { useState, useEffect } from 'react';

export default function Page() {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [decorations, setDecorations] = useState([]);

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        aside: {
            width: '20%',
            backgroundColor: '#ccc',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            paddingTop: '50px',
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
                console.log("response ", response)
                setUsers(response.users);
                setDecorations(response.decorations);
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



function Users({ data }) {
    const styles = {
        container: {
            width: '98%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: '1%',
            gap: '1%',
        },
        user: {
            backgroundColor: '#aaa',
            width: '20%',
            height: '20vh',
        }
    }

    return <div style={styles.container}>
        {data.map((user, index) => {
            let lastTimeSeen = new Date().getTime();
            lastTimeSeen -= user.lastTimeSeen;
            lastTimeSeen /= 1000;


            return <div style={styles.user} key={index}>
                <p>Id: {user.id}</p>
                <p>PS: {user.postsSeen.length}</p>
                <p>LTS: {(lastTimeSeen > 60) ? (lastTimeSeen / 60).toFixed() + ' min' : lastTimeSeen.toFixed() + ' sec'}</p>
            </div>

        })}
    </div>
}

function Decorations({ data }) {
    const [moreInfoDisplay, setMoreInfoDisplay] = useState(true);
    const [moreInfoIndex, setMoreInfoIndex] = useState(0);

    const styles = {
        container: {
            width: '98%',
            padding: '1%',
            position: 'relative',
        },
        decorations:{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1vh 1%',
        },
        decoration: {
            backgroundColor: '#aaa',
            width: '19%',
            height: '20vh',
        },
        moreInfo: {
            display: (moreInfoDisplay)?'flex':'none',
            backgroundColor: '#ffffff88',
            height: '100vh',
            width: '30%',
            position: 'fixed',
            top: 0,
            right: 0,
        },
    }

    console.log('data', data);

    return <div style={styles.container}>
        <div style={styles.decorations}>
            {data.map((decoration, index) => {
                return <div style={styles.decoration} key={decoration.id}
                    onClick={() => {
                        if(index == moreInfoIndex && moreInfoDisplay){setMoreInfoDisplay (false); return}
                        setMoreInfoDisplay(true);
                        setMoreInfoIndex(index);
                    }}
                    >
                    <p>ID: {decoration.id}</p>
                </div>
            })}
        </div>
        <div style={styles.moreInfo}>
            {/* <h1>{data[moreInfoIndex].title}</h1> */}
        </div>
    </div>;
}