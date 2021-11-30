import './App.scss';
import logo from './assets/videos/Loading.gif'
import Home from './pages/Home/Home';
import preLoading from './pages/Home/PreLoading';
import React, {useState, useEffect} from 'react';

function App() {
const [isLoading, setIsLoading ] = useState(true);
useEffect(() => {
	
	setTimeout(() => {
		
		setIsLoading(false);
	
	},2500);
})
	
  return (
   <div className="App">

	  {isLoading && (
	  <div className="Loader">
	  <img style={{width : '40%',heigh :'250px', display: 'block' , margin-left: 'auto' , margin-right:'auto'  }} src={logo}/>
	 </div>
	  )}
	  
	  
	  {!isLoading && <Home />

	 // {isLoading==true?
  //<preLoading />:
// <Home />
 
	  }
</div>
  );
}
// <div className="App">
	//	<Home />
  // </div>
export default App;
