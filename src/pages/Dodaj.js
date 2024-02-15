import React, { useState } from 'react';
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import InputDropdown from '../components/InputDropdown';
import { db } from '../components/Firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default function Dodaj() {
  const [inputValues, setInputValues] = useState({
    opis: '',
    koda: '',
    kolicina: '',
    kategorija: '',
    pokvarjeno: false, 
    izposojeno: false, 
    zadnjiIzposodil: '',
    zadnjicSpremenjeno: '',
  });

  const [kodaExists, setKodaExists] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleInputChange = (id, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleButtonClick = async () => {
    const kodaRegex = /^[A-Za-z]{3}\d{2}$/;
  
    if (!kodaRegex.test(inputValues['koda'])) {
      console.log("Koda format is invalid. Please enter three letters followed by two numbers.");
      return; 
    }

    const existingItemsQuery = query(collection(db, 'items'), where('koda', '==', inputValues['koda']));
    const existingItemsSnapshot = await getDocs(existingItemsQuery);

    if (!existingItemsSnapshot.empty) {
      setKodaExists(true);
      return; 
    }
  
    try {
      console.log("Input Values:", inputValues);
      const docRef = await addDoc(collection(db, 'items'), inputValues);
      console.log("Document written with ID: ", docRef.id);
      setKodaExists(false); 
      setAlertSent(true);
      setInputValues({ ...inputValues, koda: '' , opis: '', kolicina: '', kategorija: ''}); // Clear only the 'koda' property
      setTimeout(() => {
        setAlertSent(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="container-md">
        <Header header="Dodaj nov kos opreme"/>
        {kodaExists && <div className="alert alert-warning" role="alert">Stvar z isto kodo že obstaja!</div>}
        <InputText id="opis" description="Opis" value={inputValues['opis']} onChange={handleInputChange} placeholder="Sekira mala"/>
        <InputText id="koda" description="Koda" value={inputValues['koda']} onChange={handleInputChange} placeholder="SKR01"/>
        <InputText id="kolicina" description="Količina" value={inputValues['kolicina']} onChange={handleInputChange} placeholder="1"/>
        <InputDropdown id="kategorija" description="Kategorija" value={inputValues['kategorija']} onChange={handleInputChange}/>
        <ButtonSend text="Dodaj!" variant="primary" onClick={handleButtonClick}/>
        {alertSent && <div className="alert alert-warning" role="alert">Welkom</div>}

      </div>
    </>
  );
}
