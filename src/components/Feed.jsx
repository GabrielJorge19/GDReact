import { useState, useEffect, useRef } from 'react';
import { Post } from './Post.jsx';

export function Feed() {
    let serverUrl = window.location.href.slice(0, window.location.href.lastIndexOf(':') + 1) + '3000/';
    let width = window.innerWidth;
    let height = window.innerHeight;
    const [pov, setPov] = useState(0);
    const [posts, setPosts] = useState([]);
    const postOnView = useRef(0);
    const [gettingPosts, setGettingPosts] = useState(false);
    const feed = useRef(null);
    const userId = useRef(null);

    let styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItens: 'center',
            gap: '2vh',
            width: '96%',
            maxWidth: '500px',
            backgroundColor: '#ddd',
            margin: 'auto',
            padding: '2%',
            marginTop: (width > 500) ? '8vh' : '6vh',
        }
    }

    const getUserReport = () => {
        let postsReport = [];

        posts.map(post => {
            let timeOnView = post.report.timeOnView;

            if (timeOnView > 1) {
                postsReport.push({ id: post.id, ...post.report })
                resetReport(post);
            }
        });

        return postsReport;
    }

    const resetReport = (post) => {
        post.report.timeOnView = 0;
        post.report.imagesChanges = 0;
    }

    const getPosts = async () => {


        fetch(serverUrl + 'posts', { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(response => response.json())
            .then(response => {
                // console.log("response ", ...response.posts)
                setPosts(response.posts);
                // setGettingPosts(false);
                userId.current = response.userId
            })
            .catch(err => console.log(err))
    }

    const getMorePosts = async () => {
        if (gettingPosts) return;
        let userReport = getUserReport();
        setGettingPosts(true);

        fetch(serverUrl + 'posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId.current, userReport })
        })
            .then(response => response.json())
            .then(response => {
                setPosts([...posts, ...response.posts]);
                setGettingPosts(false);
            })
            .catch(err => console.log(err))
    }

    const updatePov = (value) => {
        setPov(prevState => prevState + value);
        postOnView.current += value;
    }

    useEffect(() => {
        getPosts();
        window.addEventListener('scroll', () => {
            let post = feed.current.children[postOnView.current].getBoundingClientRect();
            let margin = parseInt(styles.container.marginTop);
            let half = ((margin + 50 - margin / 2) / 100) * height;
            let gap = parseInt(styles.container.gap) * height / 200;

            if (post.top - gap > half) updatePov(-1);
            if ((post.top + post.height + gap) < half) updatePov(1);
        })


        document.addEventListener('visibilitychange', function () {
            let time = new Date().getSeconds();
            if (document.hidden) setPov(-1); 
            else setPov(postOnView.current);              
        }, false);
    }, [])

    useEffect(() => { if (posts.length - pov - 1 <= 3 && posts.length > 3) getMorePosts() }, [pov])

    return <div style={styles.container} ref={feed}>
        {posts.map((post, index) => {
            let onView = index == pov;
            return <Post data={post} key={post.id} onView={onView} />
        })}
    </div>
}