export function Users({ data }) {
    const styles = {
        container: {
            width: '98%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: '1%',
            gap: '1vh 1%',
        },
        user: {
            borderRadius: 10,
            display: 'flex',
            backgroundColor: '#aaa',
            flexBasis: '22%',
            flexGrow: 1,
            maxWidth: '200px',
            flexDirection: 'column',
            padding: '1%',
            gap: '2vh',
        },
        keyWords: {
            backgroundColor: '#888',
            borderRadius: 10,
            padding: '3%',
            paddingBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: '.5vh',
        },
        keyWord: {
            width: '93%',
            padding: '8px 2% 8px 5%',
            // backgroundColor: '#bde6ff',
            backgroundColor: '#fff',
            borderRadius: 5,
            display: 'flex',
            gap: '6%',
            fontSize: 20,
            // fontWeight: 'bold',
        }
    };

    return <div style={styles.container}>
        {data.map((user, index) => {
            let lastTimeSeen = new Date().getTime();
            lastTimeSeen -= user.lastTimeSeen;
            lastTimeSeen /= 1000;
            lastTimeSeen = (lastTimeSeen > 60) ? (lastTimeSeen / 60).toFixed() + ' min' : lastTimeSeen.toFixed() + ' sec';
            let interactedPost = user.userReport.length;

            let totalTimeOnPosts = user.userReport.reduce((totalTime, post) => totalTime + post.timeOnView, 0);
            totalTimeOnPosts = Number(totalTimeOnPosts.toFixed(2));

            let totalImagesChanges = user.userReport.reduce((totalImagesChanges, post) => totalImagesChanges + post.imagesChanges, 0);

            let keyWords = [];



            for (const [key, value] of Object.entries(user.keyWords)) {
                let v = Number((value * 100).toFixed(1));
                keyWords.push({value: v, word: key});
            }

            keyWords.sort((a, b) => (a.value < b.value)?1:-1);

            keyWords = keyWords.splice(0, 5);





            return <div style={styles.user} key={index}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', width: '100px', height: '100px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px' }}>
                        {user.id}
                    </div>
                </div>
                {/* <p style={{ width: '100%', backgroundColor: 'white', textAlign: 'center', fontSize: 20, borderRadius: 5, padding: '5px 0px' }}>{interactedPost} | {lastTimeSeen}</p> */}
                <p style={{ width: '100%', backgroundColor: 'white', textAlign: 'center', fontSize: 20, borderRadius: 5, padding: '5px 0px' }}>{totalTimeOnPosts}s | {totalImagesChanges}</p>
                <div style={styles.keyWords}>
                    <p style={{ width: '100%', color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: '10px 0px' }}>KeyWords</p>
                    {keyWords.map((keyWord, index) => {
                        return <div key={index} style={styles.keyWord}>
                            <p style={{width: '4ch', textAlign: 'right'}}>{keyWord.value}</p><p> {keyWord.word}</p>
                        </div>
                    })}
                </div>
            </div>;

        })}
    </div>;
}
