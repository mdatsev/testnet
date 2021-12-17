import {useEffect} from 'react';

import './Intro.scss';

import intro_video from '../../assets/videos/web main page_1 (1).mp4';
import mobile_video from '../../assets/videos/Web-Phone.png';
import bottom from '../../assets/img/introBottom.svg';

import walletIntegration from '../walletIntegration';

export const Intro = () => {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        walletIntegration.initialize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        const scrollY = window.scrollY;

        document.getElementsByClassName('intro__video__web')[0].style.bottom = -scrollY / 3 + "px";
    }

    return (
        <section className="intro" id="mint">
            <div className="intro__video">
                <video autoPlay loop muted className="intro__video__web">
                    <source src={intro_video} type="video/mp4"/>
                </video>

                <div className="intro__video__mobile">
                     <img alt="pic" src={mobile_video}></img>
                </div>
            </div>

            <div className="intro__mintBtn" onClick={walletIntegration.mintButtonOnClick}>
                <button>MINT</button>
            </div>

            <div className="intro__bottom">
                <img alt="pic" src={bottom}></img>
            </div>

            <div className="nft-modal">
                <div className="nft-modal-overlay nft-js-modal-overlay"></div>
                <div className="nft-modal-container"></div>
            </div>

        </section>
    )
}

export default Intro;
