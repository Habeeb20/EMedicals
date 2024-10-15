import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Signup from './pages/Hospital/Doctors/signup'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/doctors/signup" element={<Signup />} />
    </Routes>
   </Router>
  )
}

export default App
