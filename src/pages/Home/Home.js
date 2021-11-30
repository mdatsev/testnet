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


          <div class="elaf"  style={{
        backgroundColor: 'blue', zIndex: '20' }} >
        
                 </div>

<div className="home" style={{ zIndex: '1' }} >

            
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
      
    )
}


export default Home;

