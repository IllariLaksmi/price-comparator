import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { useState } from 'react';
import { collection, getDocs } from "@firebase/firestore";
import Table from '../components/Table/Index';

export const ComparingPage =  ({dbUrl}) => {

 const [count, setCount] = useState(0);
 
 const getStores = async () => {
    const querySnapshot = await getDocs(collection(dbUrl, "stores"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
 }

getStores()

return <>
   

    <Table/>
  </>
}