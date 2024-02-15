import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import { db } from '../components/Firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth } from '../components/Firebase';
import TableMyItems from '../components/TableMyItems';

export default function Vrni() {
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
      await updateDoc(docRef, { izposojeno: false });
      setAlertSent(true);
      setInputValues({ ...inputValues, kodaVrni: '' }); 
      setTimeout(() => {
        setAlertSent(false);
      }, 3000);
  
      fetchItemsByCurrentUser(userName);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  

  const [itemsByCurrentUser, setItemsByCurrentUser] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName);
    }
  }, []);
  const fetchItemsByCurrentUser = async (userName) => {
    try {
      const q = query(collection(db, 'items'), 
                     where('zadnjiIzposodil', '==', userName),
                     where('izposojeno', '==', true));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => doc.data());
      setItemsByCurrentUser(items);
    } catch (error) {
      console.error('Error fetching items by current user:', error);
      setItemsByCurrentUser([]);
    }
  };

  useEffect(() => {  
    fetchItemsByCurrentUser(userName);
  }, [userName]); 
  
  

  return (
    <>
      <div className="container-md">
        <Header header="Vrni opremo"/>
        <InputText id="kodaVrni" description="Koda" value={inputValues['kodaVrni']} onChange={handleInputChange} placeholder="SKR01"/>
        <ButtonSend text="Vrni!" variant="primary" onClick={handleButtonClick}/>
        {alertSent && <div className="alert alert-warning" role="alert">Hvala, prijatelj</div>}
        {!kodaExists && <div className="alert alert-warning" role="alert">Stvar s to kodo ne obstaja!</div>}
        <Header header="Moje izposojene stvari"/>
        <TableMyItems data={itemsByCurrentUser} fetchItemsByCurrentUser={fetchItemsByCurrentUser} userName={userName}/>


      </div>
    </>
  );
}
