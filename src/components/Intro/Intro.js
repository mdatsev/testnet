import {useEffect} from 'react';

import './Intro.scss';

import intro_video from '../../assets/videos/web main page_1 (1).mp4';
import mobile_video from '../../assets/videos/phone first page.mp4';
import bottom from '../../assets/img/introBottom.svg';

import walletIntegration from './walletIntegration';

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

                <video autoPlay loop muted className="intro__video__mobile">
                    <source src={mobile_video} type="video/mp4"/>
                </video>
            </div>

            <div className="intro__mintAmountInput">
                <input type="number" min="1" defaultValue="1"></input>
            </div>

            <div className="intro__mintBtn" onClick={walletIntegration.mintButtonOnClick}>
                <button>MINT</button>
            </div>

            <div className="intro__bottom">
                <img alt="pic" src={bottom}></img>
            </div>

            <div class="nft-modal">
              <div class="nft-modal-overlay nft-js-modal-overlay"></div>
                <div class="nft-modal-container">
                <div class="nft-modal-header">
                    <div class="nft-modal-title">Complete checkout</div>
                    <div class="nft-modal-close nft-js-modal-close">&#10005;</div>
                </div>
                <div class="nft-modal-content">
                </div>
              </div>
            </div>

        </section>
    )
}

export default Intro;
