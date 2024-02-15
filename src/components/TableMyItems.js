import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import ButtonSend from './ButtonSend';

export default function TableMyItems({ data, fetchItemsByCurrentUser, userName }) {
  const [sortField, setSortField] = useState('koda');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleReturn = async (koda) => {
    try {      
      // Query Firestore to find the document with the matching "koda" value
      const q = query(collection(db, 'items'), where('koda', '==', koda));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('No matching document found');
        return;
      }
  
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { izposojeno: false });
      
      // Update the table after successful return
      fetchItemsByCurrentUser(userName);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  const sortedData = data.sort((a, b) => {
    const compareValue = sortOrder === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => handleSort('koda')}>
            Koda {sortField === 'koda' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('opis')}>
            Opis {sortField === 'opis' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('kategorija')}>
            Kategorija {sortField === 'kategorija' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th>
            
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.koda}</td>
            <td>{item.opis}</td>
            <td>{item.kategorija}</td>
            <td>
              <ButtonSend onClick={() => handleReturn(item.koda)} text="Sem vrnil" variant="danger"></ButtonSend>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
