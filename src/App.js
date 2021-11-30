import './App.scss';
import Home from './pages/Home/Home';

function App() {
[isLoading, setIsLoading ] = useState(true);
useEffect(() => {
	
	setTimeout(() => {
		
		setIsLoading(false);
	
	},2500);
})
  return (
   <div>
{isLoading==true?
 <PreLoading />:
 <Home />
	   
	   
</div>
  );
}
// <div className="App">
	//	<Home />
  // </div>
export default App;
