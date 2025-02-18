import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data', error))
  }, [])

  return (
    <div className="App">
      <h1>Customer Engagement Dashboard</h1>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App
