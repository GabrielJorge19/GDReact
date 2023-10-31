import { useRef, useState, useEffect } from 'react';

function Banners({ images }) {
    let width = window.innerWidth;
    let bannerIndicatorWidth = 3 + images.length * 1000 / width;

    let styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        bannerContainer: {
            width: '100%',
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
        },
        bannerIndicator: {
            display: 'none',
            position: "absolute",
            bottom: '10%',
            left: `${50 - bannerIndicatorWidth / 2}%`,
            width: bannerIndicatorWidth+ "%",
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        indicatorButton: {
            width: width / 100,
            height: width / 100,
            borderRadius: width / 100,
            border: '2px solid rgba(255, 255, 255, 0.6)',
        },
        banner: {
            display: "inline-block",
            width: "100vw",
            height: "23vw",
            marginRight: 10,
            overflow: "hidden",
        },
        bannerPadding: {
            display: 'flex',
            justifyContent: "center",
            width: "100%",
            height: "100%",
        },
    }

    if (width > 500) {
        styles.bannerContainer = { ...styles.bannerContainer, overflowX: 'hidden', paddingLeft: '0%' }
        styles.bannerIndicator = { ...styles.bannerIndicator, display: 'flex', bottom: '5%' }
    }

    let time = 2000;
    let timeOut = null;

    const index = useRef(0);
    const banner = useRef(null);
    const onView = useRef(true);
    const running = useRef(true);
    const bannerIndicators = useRef(null);

    // useEffect(() => {
    //     timer(nextBanner);

    //     if (banner.current) banner.current.addEventListener('scrollend', () => {
    //         let d = banner.current.children[index.current].getBoundingClientRect().left;
    //         if (d > 1 || d < -1) restartScroll();
    //     });

    //     const onScroll = () => {
    //         let bannerBounding = banner.current.getBoundingClientRect();
    //         let onViewState = bannerBounding.bottom > bannerBounding.height * .4;
    //         if (!onView.current && onViewState && timeOut == null) timer(nextBanner);
    //         onView.current = onViewState;
    //     };

    //     window.removeEventListener('scroll', onScroll);
    //     window.addEventListener('scroll', onScroll, { passive: true });
    //     return () => window.removeEventListener('scroll', onScroll);
    // }, []);

    function timer(callback, t) {

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if (!onView.current || !running.current) { timeOut = null; return; }
            callback();
        }, t || time);
    }

    function nextBanner(goToIndex) {
        if (!banner.current) return;

        bannerIndicators.current.children[index.current].style.backgroundColor = '#ffffff00';

        let banners = banner.current.children;

        if(goToIndex != undefined) index.current = goToIndex;
        else index.current = (banners.length <= index.current + 1) ? 0 : index.current + 1;

        bannerIndicators.current.children[index.current].style.backgroundColor = 'white';

        let bannerRect = banners[index.current].getBoundingClientRect();
        let padding = (window.innerWidth - bannerRect.width) / 2;

        banner.current.scrollBy({ left: bannerRect.left - padding, top: 0, behavior: "smooth", });

        timer(nextBanner,);
    }

    function restartScroll() {
        if (banner.current == undefined) return;
        let banners = [...banner.current.children];
        let modulo = (value) => { return Math.sqrt(Math.pow(value, 2)) }
        let next = {
            index: 0,
            banner: banners[0],
            distance: 1000,
        }

        banners.map((item, index) => {
            let br = item.getBoundingClientRect().left;
            if (modulo(br) < next.distance) {
                next.index = index;
                next.banner = item;
                next.distance = modulo(br);
            }
        })
        index.current = next.index;


        let bannerRect = next.banner.getBoundingClientRect();
        let padding = (window.innerWidth - bannerRect.width) / 2;
        banner.current.scrollBy({ left: bannerRect.left - padding, top: 0, behavior: "smooth", });

        running.current = true;
        timer(nextBanner, 2 * time);
    }

    return (<div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={styles.bannerContainer} ref={banner}
            onTouchStart={() => running.current = false}>

            {images.map((item, index) => {
                return <div style={styles.banner} key={index}>
                    <div style={styles.bannerPadding}>
                        <img style={{ height: '100%'}} src={item} />
                    </div>
                </div>
            })}
        </div>
        <div style={styles.bannerIndicator} ref={bannerIndicators}>
            {images.map((item, index) => {
                return <div style={styles.indicatorButton} key={index}
                    onClick={() => nextBanner(index)}
                >
                </div>
            })}
        </div>
    </div>
    )
}

export default Banners;