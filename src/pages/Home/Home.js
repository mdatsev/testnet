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
import "react-loader-spinner/dist/loader/css/react-spinner-loadercss"
import Loader from "react-loader-spinner"
const Home = () => {
    return (


        <div align='center'>
        <Loader 
        type ="Puff"
        color="rgb(0,153,255)"
        height ={100}
        width ={100}
        timeout={3000}
        </div>
                

<div className="home" >

            
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

