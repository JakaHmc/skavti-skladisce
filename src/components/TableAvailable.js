import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

export default function TableAvailable({ data }) {
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

  const sortedData = data.sort((a, b) => {
    const compareValue = sortOrder === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => handleSort('opis')}>
            Opis {sortField === 'opis' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('koda')}>
            Koda {sortField === 'koda' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('kategorija')}>
            Kategorija {sortField === 'kategorija' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('pokvarjeno')}>
            Stanje {sortField === 'pokvarjeno' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.opis}</td>
            <td>{item.koda}</td>
            <td>{item.kategorija}</td>
            <td>{item.pokvarjeno ? 'Pokvarjeno' : 'Brezhibno'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
