import './Home.scss';
import './HomeStyle.css'
import NavBar from '../../components/NavBar/NavBar';
import Intro from '../../components/Intro/Intro';
import Slider from '../../components/Slider/Slider';
import Galaxy from '../../components/Galaxy/Galaxy';
import Vision from '../../components/Vision/Vision';
import Roadmap from '../../components/Roadmap/Roadmap';
import Team from '../../components/Team/Team';
import FaqComponent from '../../components/Faq/Faq';
import Footer from '../../components/Footer/Footer';

export const Home = () => {
    return (


  
<div className="home" style={{zIndex: '11' }}>

              
        <div class="elaf"  style={{
        backgroundColor: 'blue',
        width: '100px',
        height: '100px', zIndex: '222222220' }} >
        
        <h1>A Blue HA Blue HeadingA Blue HeadingA 
        Blue 
        HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue HeadingA Blue Heading</h1>
      


            
            
            <NavBar />
            <Intro />
            <Slider />
            <Galaxy />
            <Vision />
            <Roadmap />
            <Team />
            <FaqComponent />
            <Footer />
            
            </div>
        </div>
        
      
    )
}

export default Home;
