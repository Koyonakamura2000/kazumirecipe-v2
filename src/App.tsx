import { useState } from 'react';
import './App.css';
import Recipes from './Recipes';
import NavigationBar from './NavigationBar';
import AdminView from './AdminView';

function App() {
  const [admin, setAdmin] = useState<boolean>(false);
  console.log(admin);

  return (
    <div className="App">
      <NavigationBar setAdmin={setAdmin}/>
      {admin ? <AdminView /> : <Recipes />}
    </div>
  );
}

export default App;
