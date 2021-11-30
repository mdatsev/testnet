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
	
	  <img style={{width : '250px',heigh :'250px',alignSelf:'center'}} src={logo}/>
	
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
