import React, { useState } from 'react';
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import { db } from '../components/Firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export default function Pokvarjeno() {
  const [inputValues, setInputValues] = useState({});
  const [kodaExists, setKodaExists] = useState(true);
  const [alertSentGood, setAlertSentGood] = useState(false);
  const [alertSentBad, setAlertSentBad] = useState(false);



  const handleInputChange = (id, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleButtonClickPokvarjeno = async () => {
    try {
      const kodaValue = inputValues['koda'];
      
      const q = query(collection(db, 'items'), where('koda', '==', kodaValue));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setKodaExists(false);
        console.log('No matching document found');
        return;
      }

      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        pokvarjeno: true
      });

      console.log('Document updated successfully');
      setAlertSentBad(true);
      setInputValues({ ...inputValues, koda: '' }); 
      setTimeout(() => {
        setAlertSentBad(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const handleButtonClickPopravljeno = async () => {
    try {
      const kodaValue = inputValues['koda'];
      
      const q = query(collection(db, 'items'), where('koda', '==', kodaValue));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setKodaExists(false);
        console.log('No matching document found');
        return;
      }

      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        pokvarjeno: false
      });

      console.log('Document updated successfully');
      setAlertSentGood(true);
      setInputValues({ ...inputValues, koda: '' }); 
      setTimeout(() => {
        setAlertSentGood(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <>
      <div className="container-md">
        <Header header="Pokvaril/popravil sem"/>
        <InputText id="koda" description="Koda" value={inputValues['koda']} onChange={handleInputChange} placeholder="SKR01"/>
        <ButtonSend text="Zanič je!" variant="danger" onClick={handleButtonClickPokvarjeno}/>
        <ButtonSend text="Popravljeno!" variant="success" onClick={handleButtonClickPopravljeno}/>
        {alertSentGood && <div className="alert alert-warning" role="alert">Great success</div>}
        {alertSentBad && <div className="alert alert-warning" role="alert">Great not success</div>}
        {!kodaExists && <div className="alert alert-warning" role="alert">Stvar s to kodo ne obstaja!</div>}

      </div>
    </>
  );
}
