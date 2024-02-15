import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import { db, auth } from '../components/Firebase'; // Assuming you have access to Firebase Authentication
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function Vzemi() {
  const [inputValues, setInputValues] = useState({});
  const [userName, setUserName] = useState('');
  const [kodaExists, setKodaExists] = useState(true);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName);
    }
  }, []);

  const handleInputChange = (id, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleButtonClick = async () => {
    try {
      const kodaValue = inputValues['koda'];
      // DB stuff
      const q = query(collection(db, 'items'), where('koda', '==', kodaValue));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setKodaExists(false);
        setTimeout(() => {
          setKodaExists(true);
        }, 3000);
        console.log('No matching document found');
        return;
      }
        const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        izposojeno: true,
        zadnjiIzposodil: userName, 
        zadnjicSpremenjeno: serverTimestamp() 
      });
  
      console.log('Document updated successfully');
      setAlertSent(true);
      setInputValues({ ...inputValues, koda: '' }); 
      setTimeout(() => {
        setAlertSent(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  

  return (
    <>
      <div className="container-md">
        <Header header="Vzemi opremo"/>
        <InputText id="koda" description="Koda" value={inputValues['koda']} onChange={handleInputChange} placeholder="SKR01"/>
        <ButtonSend text="Vzemi!" variant="primary" onClick={handleButtonClick}/>
        {alertSent && <div className="alert alert-warning" role="alert">Great success</div>}
        {!kodaExists && <div className="alert alert-warning" role="alert">Stvar s to kodo ne obstaja!</div>}


      </div>
    </>
  );
}
