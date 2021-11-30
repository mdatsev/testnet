import animation from '../../assets/videos/Character-2.mp4';
  const Loading = () =>{
    return (
      <div align='center'>
      <animation
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
          </div>
    )
  }


export default Loading
