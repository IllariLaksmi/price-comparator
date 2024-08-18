import "./App.css";
import "primeflex/primeflex.css";

import "primeicons/primeicons.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-dark-teal/theme.css"; //theme
import { PrimeReactProvider } from "primereact/api";
import { ComparingPage } from "./pages/Comparing";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Inserter from "./pages/Inserter";

const firebaseConfig = {
  apiKey: "AIzaSyA_MaHjwqlQTEjk9cvCsx27uUarfFLilt4",
  authDomain: "price-comparator-bc37a.firebaseapp.com",
  projectId: "price-comparator-bc37a",
  storageBucket: "price-comparator-bc37a.appspot.com",
  messagingSenderId: "259969235355",
  appId: "1:259969235355:web:e233630deeae0b0f84093e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App() {
  return (
    <PrimeReactProvider>
      <ComparingPage dbUrl={db} />
      <div className="flex">
        <Inserter db={db} collection_name={"products"} />
        <Inserter db={db} collection_name={"categories"} />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
