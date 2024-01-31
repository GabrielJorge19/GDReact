import { useState, useEffect, useRef, useContext } from 'react';
import { DataApp } from './Context';
import { Post } from './Post.jsx';
import Header from './Header';

export function Feed() {
    const user = useContext(DataApp);
    let width = window.innerWidth;
    let height = window.innerHeight;
    const [pov, setPov] = useState(0);
    const [posts, setPosts] = useState([]);
    const postOnView = useRef(0);
    const feed = useRef(null);
    const colors = useContext(DataApp).colors;

    let styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItens: 'center',
            gap: '2vh',
            // width: '96%',
            width: (width < 500) ? '100%' : '96%',
            margin: 'auto',
            maxWidth: '500px',
            backgroundColor: colors.feedBackground,
            // padding: '2%',
            padding: (width < 500) ? '10px 0px' : '2%',
            paddingTop: (width > 500) ? '15vh' : '10vh',
        }
    }

    const updatePov = (value) => {
        setPov(prevState => prevState + value);
        postOnView.current += value;
    }

    const visibilitychange = () => {
        if (document.hidden) setPov(-1);
        else setPov(postOnView.current);
    }

    const scroolEvent = () => {
        let post = feed.current.children[postOnView.current].getBoundingClientRect();
        let margin = parseInt(styles.container.paddingTop);
        let half = ((margin + 50 - margin / 2) / 100) * height;
        let gap = parseInt(styles.container.gap) * height / 200;

        if (post.top - gap > half) updatePov(-1);
        if ((post.top + post.height + gap) < half) updatePov(1);
    }

    const updatePosts = () => {
        setPosts(user.posts);
    }

    useEffect(() => {
        window.addEventListener('scroll', scroolEvent);
        window.addEventListener('visibilitychange', visibilitychange, false);
        user.addEventListener('postsUpdated', updatePosts);
        user.getPosts();

        return () => {
            window.removeEventListener('scroll', scroolEvent);
            window.removeEventListener('visibilitychange', visibilitychange);
            user.removeEventListener('postsUpdated', updatePosts);
        }
    }, [])

    useEffect(() => {
        if (user.posts.length - pov - 1 <= 3 && user.posts.length > 3) user.getPosts();
    }, [pov])

    return <div style={{
        backgroundColor: colors.feedPostsBackground
    }}>
        <Header />
        <div style={styles.container} ref={feed}>
            {user.posts.map((post, index) => {
                let onView = index == pov;
                return <Post data={post} key={post.id} onView={onView} />
            })}
        </div>
    </div>
}