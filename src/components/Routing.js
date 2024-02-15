import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Vzemi from '../pages/Vzemi';
import NoPage from '../pages/NoPage';
import Vrni from '../pages/Vrni';
import Pregled from '../pages/Pregled';
import Dodaj from '../pages/Dodaj';
import Izbrisi from '../pages/Izbrisi';
import Pokvarjeno from '../pages/Pokvarjeno';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Vzemi />} />
      <Route path="/vzemi" element={<Vzemi />} />
      <Route path="/vrni" element={<Vrni />} />
      <Route path="/pregled" element={<Pregled />} />
      <Route path="/dodaj" element={<Dodaj />} />
      <Route path="/izbrisi" element={<Izbrisi />} />
      <Route path="/pokvarjeno" element={<Pokvarjeno />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default Routing;
