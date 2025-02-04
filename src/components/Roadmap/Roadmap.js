import { useEffect, useRef, useState } from 'react';

import './Roadmap.scss';

import video1 from '../../assets/videos/Roadmap/10.mp4';
import video2 from '../../assets/videos/Roadmap/25.mp4';
import video3 from '../../assets/videos/Roadmap/50.mp4';
import video4 from '../../assets/videos/Roadmap/75.mp4';
import video5 from '../../assets/videos/Roadmap/100.mp4';

import roadmap1 from '../../assets/img/roadmap/10.png';
import roadmap2 from '../../assets/img/roadmap/25.png';
import roadmap3 from '../../assets/img/roadmap/50.png';
import roadmap4 from '../../assets/img/roadmap/75_.png';
import roadmap5 from '../../assets/img/roadmap/100.png';

import Rocket from '../../assets/img/roadmap/Rocket0.5x.png';
import Base from '../../assets/img/roadmap/Base0.5x.png';

import photo1 from '../../assets/img/roadmap/Owl2.png';
import photo2 from '../../assets/img/roadmap/Cat2.png';
import photo3 from '../../assets/img/roadmap/Unicorn2.png';

import side1 from '../../assets/img/roadmap/Game.mp4';
import side2 from '../../assets/img/roadmap/Eth.mp4';
import side3 from '../../assets/img/roadmap/Brain.mp4';
import side4 from '../../assets/img/roadmap/vr man.mp4';
import side5 from '../../assets/img/roadmap/Compass.mp4';

export const Roadmap = () => {
    const videoWrapperRef = useRef(false);

    const videoRef1 = useRef(false);
    const videoRef2 = useRef(false);
    const videoRef3 = useRef(false);
    const videoRef4 = useRef(false);
    const videoRef5 = useRef(false);
    const videoRefArray = [videoRef1, videoRef2, videoRef3, videoRef4, videoRef5];
    const videoArray = [video1, video2, video3, video4, video5];

    const [currentOffset, setCurrentOffset] = useState(0);
    const [rocketActive, setRocketActive] = useState('');

    const positionInfo = [
        {
            topPercent: 0.175,
        },
        {
            topPercent: 0.31,
        },
        {
            topPercent: 0.45,
        },
        {
            topPercent: 0.595,
        },
        {
            topPercent: 0.70,
        }
    ];

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        const videoHeight = videoWrapperRef.current.clientHeight;

        const currentScrollY = window.scrollY;
        const videoScrollY = window.pageYOffset + videoWrapperRef.current.getBoundingClientRect().top;

        const offset = currentScrollY + window.innerHeight / 2 - videoScrollY;

        const maxOffset = videoHeight * (positionInfo[positionInfo.length - 1].topPercent + 0.05);

        if( offset > maxOffset && rocketActive === '' ) {
            setRocketActive('active');

            setTimeout(() => {
                setRocketActive('active toBottom');
            }, 1000);
        }

        setCurrentOffset( offset > maxOffset ? maxOffset : offset < currentOffset ? currentOffset : offset < 0 ? 0 : offset );

        const temp = [...positionInfo];

        temp.reverse().forEach((item, index) => {
            if( offset > item.topPercent * videoHeight ) {
                if( videoRefArray[ positionInfo.length - index - 1 ].current.currentTime === 0 )
                    videoRefArray[ positionInfo.length - index - 1 ].current.play();
            }
        });
    }

    return (
        <section className="roadmap" id="roadmap">
            <div className="roadmap__title">
                <span>phase 1</span>
            </div>

            <div className="roadmap__subtitle">
                <span>roadmap</span>
            </div>

            <div className="roadmap__video" ref={videoWrapperRef}>
                <div className="container">
                    {
                        videoArray.map((item, index) => (
                            <div className={`roadmap__video__item ${ index % 2 === 0 ? 'left' : 'right' } ${ index === 4 ? 'width100' : 'width50' }`} key={index}>
                                <video muted ref={videoRefArray[index]}>
                                    <source src={item} type="video/mp4"/>
                                </video>
                            </div>
                        ))
                    }
                </div>

                <div className="roadmap__video__timeline container">
                    <div className="roadmap__video__timeline__baseline">
                    </div>
                    {
                        positionInfo.map((item, index) => (
                            <div className="roadmap__video__timeline__circle" key={index} style={{ top: `${item.topPercent * 100}%` }}>
                            </div>
                        ))
                    }

                    <div className="roadmap__video__timeline__base">
                        <img alt="pic" src={Base}></img>
                    </div>

                    <div className={`roadmap__video__timeline__rocket ${rocketActive}`} style={{ top: currentOffset }}>
                        <img alt="pic" src={Rocket}></img>
                    </div>
                </div>
            </div>

            <div className="roadmap__pictures">
                <div className="roadmap__pictures__pic">
                    <img alt="pic" src={roadmap1}></img>
                </div>
                <div className="roadmap__pictures__pic">
                    <img alt="pic" src={roadmap2}></img>
                </div>
                <div className="roadmap__pictures__pic">
                    <img alt="pic" src={roadmap3}></img>
                </div>
                <div className="roadmap__pictures__pic">
                    <img alt="pic" src={roadmap4}></img>
                </div>
                <div className="roadmap__pictures__pic">
                    <img alt="pic" src={roadmap5}></img>
                </div>
            </div>

            <div className="roadmap__content container">
                <div className="roadmap__content__item">
                    <span>PHASE 2</span>
                    <p className="title">Game development</p>
                    <p>
                        -Start with game development Play to earn. <br/>
                        -All 4 characters are in one game. <br/>
                        -Multiple games, one place.
                    </p>
                    <div className="roadmap__content__item__sidePic right">
                        <video autoPlay loop muted width="330" height="330" alt="pic" src={side1}></video>
                    </div>
                </div>
                <div className="roadmap__content__item">
                    <span>Phase 3</span>
                    <p className="title">Releasing of buff- Cats, Myths, and Owls.</p>
                    <p>Every category will have its own traits. Having a Buff Doge is a privilege.<br/>You will be able to mint earlier and have an important voice to represent Doges inside and outside the community.<br/> All Buff Doge holders will be able to free mint two of each Buff category (6 free mints in total).</p>

                    <div className="roadmap__content__item__sidePic top phase3">
                        <video autoPlay loop muted width="330" height="330" alt="pic" src={side2}></video>
                    </div>

                    <div className="roadmap__content__item__photos">
                        <div>
                            <img alt="pic" src={photo1}></img>
                        </div>

                        <div>
                            <img alt="pic" src={photo2}></img>
                        </div>

                        <div>
                            <img alt="pic" src={photo3}></img>
                        </div>
                    </div>
                </div>
                <div className="roadmap__content__item">
                    <span>phase 4</span>
                    <p className="title">Building Buff Doge talent seeker organization</p>
                    <p>Help talented people to reach their dreams.<br/>50% of profits will be given away to community-voted charities.</p>

                    <div className="roadmap__content__item__sidePic right">
                        <video autoPlay loop muted width="330" height="330" alt="pic" src={side3}></video>
                    </div>
                </div>
                <div className="roadmap__content__item">
                    <span>phase 5</span>
                    <p className="title">Game release</p>
                    <p>Release Date: TBD…</p>

                    <div className="roadmap__content__item__sidePic">
                        <video autoPlay loop muted width="330" height="330" alt="pic" src={side4}></video>
                    </div>
                </div>
                <div className="roadmap__content__item">
                    <span>phase 6</span>
                    <p className="title">TBD...</p>
                    <p>Future steps will be decided together with our community</p>

                    <div className="roadmap__content__item__sidePic right">
                        <video autoPlay loop muted width="330" height="330" alt="pic" src={side5}></video>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Roadmap;
