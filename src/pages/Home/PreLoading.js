import animation from '../../assets/videos/loading (1).webm';
  const Loading = () =>{
    return (
      <div align='center'>
      <animation
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
          </div>
    )
  }


export default Loading
