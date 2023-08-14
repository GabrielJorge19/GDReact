import {useRef, useState, useEffect} from 'react';

function Banners(){
    const [data, setData] = useState([1,2,3,4,1,2,3,4]);
    let styles = {
        bannerContainer: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 10,
            marginBottom: 20,
        },
        banner: {
            display: "inline-block",
            width: "90vw",
            height: "50vw",
            marginRight: 10,
        },
    }

    let time = 2000;
    let timeOut = null;
    const [i, setI] = useState(0);
    
    const index = useRef(0);
    const banner = useRef(null);
    const onView = useRef(true);
    const running = useRef(true);

    const ii = useRef(0);


    useEffect(() => {
        timer(nextBanner);
    
        if(banner.current) banner.current.addEventListener('scrollend', () => {
            let d = banner.current.children[index.current].getBoundingClientRect().left;
            if(d > 30 || d < 10) restartScroll();
        });

        const onScroll = () => {
            let bannerBounding = banner.current.getBoundingClientRect();
            let onViewState = bannerBounding.bottom > bannerBounding.height * .4;
            if(!onView.current && onViewState && timeOut == null) timer(nextBanner); //console.log('mudou', onView.current, onViewState);
            onView.current = onViewState;
        };

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    function timer(callback, t){
        
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if(!onView.current || !running.current){timeOut = null;return;}
            callback();
        }, t || time);
    }

    function nextBanner(){
        if(!banner.current) return;

        //console.log('onView');

        let banners = banner.current.children;
        index.current = (banners.length <= index.current+1)?0:index.current + 1;
        
        let bannerRect = banners[index.current].getBoundingClientRect();
        let padding = (window.innerWidth - bannerRect.width) / 2;

        banner.current.scrollBy({left: bannerRect.left - padding, top: 0, behavior: "smooth",});

        timer(nextBanner, );
    }
    
    function restartScroll(){
        console.log('Restart');
        
        if(banner.current == undefined) return;
        let banners = [...banner.current.children];
        let modulo = (value) => {return Math.sqrt(Math.pow(value, 2))}
        let next = {
            index: 0,
            banner: banners[0],
            distance: 1000,
        }
        
        banners.map((item, index) => {
            let br = item.getBoundingClientRect().left;
            if(modulo(br) < next.distance){
                next.index = index;
                next.banner = item;
                next.distance = modulo(br);
            }
        })
        
        console.log(next.index);
        index.current = next.index;


        let bannerRect = next.banner.getBoundingClientRect();
        let padding = (window.innerWidth - bannerRect.width) / 2;
        banner.current.scrollBy({left: bannerRect.left - padding, top: 0, behavior: "smooth",});

        running.current = true;
        timer(nextBanner, 2 * time);
    }

    return(
        <>
        <div style={styles.bannerContainer} ref={banner}
            onTouchStart={() => running.current = false}
            //onTouchEnd={restartScroll}
            >
            {data.map((item, index) => {
                    return <Banner style={styles.banner} key={index} data={item}/>
            })}
        </div>
        </>
    )
}

function Banner(props){
    let styles = {
        imgs: {
            width: '100%',
            height: '100%',
            opacity: 1,
            borderRadius: 10,
        }
    }

    return(
        <div style={props.style}>
            <img style={styles.imgs} src={"./src/assets/" + props.data + ".jpg"} />
        </div>)
}

export default Banners


//<img style={styles.imgs} src="./src/assets/logo.jpg" />