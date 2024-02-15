import React from 'react';
import Table from 'react-bootstrap/Table';

export default function TableBorrowed({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Opis</th>
          <th>Koda</th>
          <th>Vzel</th> {/* Add column for zadnjiIzposodil */}
          <th>Vzeto</th> {/* Add column for zadnjicSpremenjeno */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.opis}</td>
            <td>{item.koda}</td>
            <td>{item.zadnjiIzposodil}</td>
            <td>{item.zadnjicSpremenjeno?.toDate().toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

