import animation from '../../assets/img/team/Monir.png';
import side1 from '../../assets/img/roadmap/Game.mp4';
  const Loading = () =>{
    return (
      <video autoPlay loop muted width="330" height="330" alt="pic" src={side1}>
      
         <animation
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
      </video>
   

    )
  }


export default Loading
