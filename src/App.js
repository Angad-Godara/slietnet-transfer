import './App.css';
import { useState } from 'react'
import axios from 'axios';

function App() {

  const [file, setfile] = useState(null)

  const onFileChange = (e) => {
    // console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  }

  const uploadit = () => {
    console.log("Uploading >>> ", file);
    const formData = new FormData();
    formData.append(
      'file',
      file)
    console.log(formData);
    axios.post('http://localhost:5000/upload', formData).then(response => console.log(response));
  }

  return (
    <div className="App">
      <>
        <input type='file' name='myfile' onChange={onFileChange} />
        <button onClick={uploadit}>Upload</button>
      </>
    </div>
  );
}

export default App;
