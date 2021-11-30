import './App.scss';
import Home from './pages/Home/Home';
import preLoading from './pages/Home/PreLoading';
import React, {useState, useEffect} from 'react';

function App() {
const [isLoading, setIsLoading ] = useState(true);
useEffect(() => {
	
	setTimeout(() => {
		
		setIsLoading(false);
	
	},5000);
})
	
  return (
   <div className="App">

	  {isLoading && (
	  <div className="profile" align='center'style={{
        backgroundColor: 'blue',
        width: '100px',
        height: '100px'
      }}>
	  <h3>Elaf alzouib </h3>
	  </div>
	  )}
	  
	  
	  {!isLoading && <Home />}

	 // {isLoading==true?
  //<preLoading />:
// <Home />
 
 
</div>
  );
}
// <div className="App">
	//	<Home />
  // </div>
export default App;
