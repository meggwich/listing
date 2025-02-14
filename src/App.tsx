import './App.css';
import Listing, { ListingType } from './Listing'; // Импортируем тип
import jsonData from './etcy.json';

function App() {
  return <Listing items={jsonData as ListingType} />;
}

export default App;
