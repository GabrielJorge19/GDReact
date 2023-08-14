import LineButtons from './components/LineButtons';
import Header from './components/Header';
import Banner from './components/Banner';
import HorizontalList from './components/HorizontalList';
import Decoration from './components/Decoration';



function App() {
    let style = {
        //backgroundColor: '#ccc',
        padding: 0,
        //height: '100%',
        //backgroundImage: 'linear-gradient(rgb(56,218,255) 25%, white 45%)',
        backgroundImage: 'linear-gradient(rgb(56,218,255) 150px, #eee 250px)',
        //height: '100vh',
    }

    
    return (
        <div style={style}>
            <Header />
            <Decoration />
            {/* <Banner />
            <LineButtons />
            <HorizontalList data={dados01} />
            <HorizontalList data={dados02} />
            <HorizontalList data={dados02} />
            <HorizontalList data={dados02} />
            <HorizontalList data={dados02} /> */}
        </div>
    )
}

export default App;







let dados01 = {
    title: 'Destaques',
    dataType: 'images',
    href: '',
    data: [{
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }]
}

let dados02 = {
    title: 'Destaques',
    dataType: 'images',
    href: '',
    data: [{
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }, {
        title: 'Marinheiro',
        src: './src/assets/1.jpg',
        href: '',
    }]
}