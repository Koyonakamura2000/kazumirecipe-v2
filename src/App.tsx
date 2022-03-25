import { useState } from 'react';
import './App.css';
import Recipes from './Recipes';
import NavigationBar from './NavigationBar';
import AdminView from './AdminView';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1pXc7NlpHarU_WgqZEjYfmpcz8VCmK0k",
  authDomain: "kazumirecipe.firebaseapp.com",
  databaseURL: "https://kazumirecipe-default-rtdb.firebaseio.com",
  projectId: "kazumirecipe",
  storageBucket: "kazumirecipe.appspot.com",
  messagingSenderId: "685853622555",
  appId: "1:685853622555:web:bb29ba86b241d7f5f953be",
  measurementId: "G-NQQYR146JZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  const [admin, setAdmin] = useState<boolean>(false);

  return (
    <div className="App">
      <NavigationBar setAdmin={setAdmin} />
      {admin ? <AdminView /> : <Recipes />}
    </div>
  );
}

export default App;
