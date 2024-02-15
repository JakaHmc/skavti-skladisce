import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import { db } from '../components/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TableBorrowed from '../components/TableBorrowed';
import TableAvailable from '../components/TableAvailable';

export default function Pregled() {
  const [itemsIzposojenoTrue, setItemsIzposojenoTrue] = useState([]);
  const [itemsIzposojenoFalse, setItemsIzposojenoFalse] = useState([]);

  useEffect(() => {
    const fetchItemsIzposojenoTrue = async () => {
      try {
        const q = query(collection(db, 'items'), where('izposojeno', '==', true));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => doc.data());
        setItemsIzposojenoTrue(items);
      } catch (error) {
        console.error('Error fetching items with izposojeno: true:', error);
      }
    };

    const fetchItemsIzposojenoFalse = async () => {
      try {
        const q = query(collection(db, 'items'), where('izposojeno', '==', false));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => doc.data());
        setItemsIzposojenoFalse(items);
      } catch (error) {
        console.error('Error fetching items with izposojeno: false:', error);
      }
    };

    fetchItemsIzposojenoTrue();
    fetchItemsIzposojenoFalse();
  }, []); 

  return (
    <>
      <div className="container-md">
        <Header header="Izposojeno"/>
        <TableBorrowed data={itemsIzposojenoTrue} />
        
        <Header header="Na svojem mestu"/>
        <TableAvailable data={itemsIzposojenoFalse} />
      </div>
    </>
  );
}
