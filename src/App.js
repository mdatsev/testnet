import './App.scss';
import Home from './pages/Home/Home';
import logo  from '../../assets/img/team/Monir.png';
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
{isLoading==true?
  <img src={logo}/>:
 <Home />
}   

</div>
  );
}
// <div className="App">
	//	<Home />
  // </div>
export default App;
