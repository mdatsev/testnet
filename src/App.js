import './App.scss';
import Home from './pages/Home/Home';
import preLoading from './pages/Home/PreLoading';
import React, {useState, useEffect} from 'react';
import logo  from '../../assets/img/team/Monir.png';

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
	  <div className="profile" align='center'style={{backgroundColor: 'blue', width: '100px', height: '100px'}}>
	  <img src={logo} />
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
