import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { auth } from './components/Firebase';
import NavigationBar from './components/Navbar';
import Routing from './components/Routing';
import { SignIn } from './pages/SignIn';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        {user ? <Routing /> : <SignIn />}
        {/* <SignIn/> */}
      </Router>
    </div>
  );
}

export default App;
