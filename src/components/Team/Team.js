import './Team.scss';

import teamLogo from '../../assets/videos/Logo.mp4';
import team1 from '../../assets/img/team/Dagmus.png';
import team2 from '../../assets/img/team/Samer.png';
import team3 from '../../assets/img/team/Rashid.png';
import team4 from '../../assets/img/team/Alpha.png';
import team5 from '../../assets/img/team/Naji.png';
import team6 from '../../assets/img/team/Monir.png';

import birdIcon from '../../assets/img/icons/bird.svg';
import birdBlue from '../../assets/img/icons/bird_blue.svg';

export const Team = () => {
    const info = [
        {
            image: team1,
            name: 'dagmus',
            role: 'art director',
            link: 'https://twitter.com/BuffDagmus'
        },
        {
            image: team2,
            name: 'samer',
            role: 'community manager',
            link: 'https://twitter.com/BuffSamer'
        },
        {
            image: team3,
            name: 'rashid',
            role: 'marketing expert',
            link: 'https://twitter.com/RashidBuff'
        },
        {
            image: team4,
            name: 'alpha',
            role: 'designer',
            link: 'https://twitter.com/1Alpha00'
        },
        {
            image: team5,
            name: 'naji',
            role: 'designer',
            link: 'https://twitter.com/BuffNaji'
        },
        {
            image: team6,
            name: 'monir',
            role: 'designer',
            link: 'https://twitter.com/BuffMonir'
        },
    ];

    return (
        <section className="team" id="team">
            <div className="team__title">
                <div className="team__title__anim">
                    <video autoPlay loop muted width="130" src={teamLogo} alt="pic"></video>
                </div>

                <div className="team__title__text">
                    <span>team</span>
                </div>
            </div>

            <div className="team__members container">
                {
                    info.map((item, index) => (
                        <div className="team__members__item" key={index}>
                            <div className="team__members__item__pic">
                                <img alt="pic" src={item.image}></img>
                            </div>

                            <div className="team__members__item__desc">
                                <div className="team__members__item__desc__name">
                                    {item.name}
                                </div>
                                <div className="team__members__item__desc__role">
                                    {item.role}
                                </div>
                                <div className="team__members__item__desc__link">
                                    <a href={item.link} target="_blank">
                                        <img className="white" alt="pic" src={birdIcon}></img>
                                        <img className="blue" alt="pic" src={birdBlue}></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Team;
