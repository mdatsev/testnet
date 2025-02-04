import { Link } from 'react-scroll'

import './Footer.scss';
import bannerBack from '../../assets/img/Bot Banner0.75x.png';
import bannerBot from '../../assets/img/bot character0.5x.png';

import logoIcon from '../../assets/img/icons/logo.svg';
import twitterIcon from '../../assets/img/icons/twitter.svg';
import discordIcon from '../../assets/img/icons/discord.svg';
import openseaIcon from '../../assets/img/icons/openseaGrey.svg';
import instagramIcon from '../../assets/img/icons/instagram.svg';

import pdf from '../../assets/Buff_Paper.pdf';

export const Footer = () => {
    return (
        <section className="footer">
            <div className="footer__banner">
                <div className="footer__banner__back">
                    <img src={bannerBack} alt="pic"></img>
                </div>

                <div className="footer__banner__wrapper">
                    <div className="footer__banner__bot">
                        <img src={bannerBot} alt="pic"></img>
                    </div>
                
                    <div className="footer__banner__content">
                        <div className="footer__banner__content__title">
                            join buffdoge community
                        </div>

                        <div className="footer__banner__content__desc">
                            <p>
                                to stay up to date for latest <br/> news, giveaways and more...
                            </p>
                        </div>

                        <div className="footer__banner__content__join">
                            <a href="https://discord.gg/sVtpaCy7S2" target="_blank"><button>Join discord</button></a>
                        </div>
                    </div>
                </div>
            </div>


                <div className="container">
                    <div className="footer__content__copyright">
                        ©2021 BuffDoge. All rights reserved.
                    </div>

                    <div className="footer__content__menu">
                        <div className="footer__content__menu__home">
                            <Link
                                smooth={true} 
                                duration={500} 
                                spy={true} 
                                to="mint"
                            >
                                home
                            </Link>
                        </div>

                        <a href="https://www.instagram.com/buffdogenft/" target="_blank">
                            <span></span>
                            <img alt="img" src={instagramIcon}></img>
                        </a>
                        <a href="https://twitter.com/BuffdogeNFTs" target="_blank">
                            <span></span>
                            <img alt="img" src={twitterIcon}></img>
                        </a>
                        <a href="https://discord.gg/sVtpaCy7S2" target="_blank">
                            <span></span>
                            <img alt="img" src={discordIcon}></img>
                        </a>
                        <a href="#javascript;" className="noAnimation">
                            <span></span>
                            <img alt="img" src={openseaIcon}></img>
                        </a>

                        <div className="footer__content__menu__logo">
                            <img alt="img" src={logoIcon}></img>  
                        </div>
                    </div>
                </div>

                <div className="footer__content__paper">
                    <a href={pdf} target="_blank">BUFF PAPER</a>
                </div>
            
        </section>
    )
}

export default Footer;
