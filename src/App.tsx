import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/hello').then(response => setHello(response.data))
  }, [])

  return <div>프론트엔드 1석 4조 {hello}</div>
}

export default App
