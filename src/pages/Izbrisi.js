import React, { useState } from 'react';
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import { db } from '../components/Firebase';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export default function Izbrisi() {
  const [inputValues, setInputValues] = useState({});
  const [kodaExists, setKodaExists] = useState(true);
  const [alertSent, setAlertSent] = useState(false);



  const handleInputChange = (id, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleButtonClick = async () => {
    try {
      const kodaValue = inputValues['kodaVrni'];
      
      const q = query(collection(db, 'items'), where('koda', '==', kodaValue));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setKodaExists(false);
        console.log('No matching document found');
        return;
      }

      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef)
      console.log('Document deleted successfully');
      setAlertSent(true);
      setInputValues({ ...inputValues, koda: '' }); 
      setTimeout(() => {
        setAlertSent(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <>
      <div className="container-md">
        <Header header="Izbriši"/>
        <InputText id="kodaVrni" description="Koda" value={inputValues['kodaVrni']} onChange={handleInputChange} placeholder="SKR01"/>
        <ButtonSend text="Izbriši!" variant="primary" onClick={handleButtonClick}/>
        {alertSent && <div className="alert alert-warning" role="alert">RIP in pieces</div>}
        {!kodaExists && <div className="alert alert-warning" role="alert">Stvar s to kodo ne obstaja!</div>}


      </div>
    </>
  );
}
