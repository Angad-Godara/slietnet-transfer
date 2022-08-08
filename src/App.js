import './App.css';
import { useState } from 'react'
import axios from 'axios';

function App() {
  const server = process.env.REACT_APP_SERVER;

  const [file, setfile] = useState(null)
  const [upload, setupload] = useState(false)

  const onFileChange = (e) => {
    // console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  }

  const uploadit = (e) => {
    e.preventDefault();
    setupload(true);
    // console.log("Uploading >>> ", file);
    const formData = new FormData();
    formData.append(
      'file',
      file)
    // console.log(formData);
    axios.post(`${server}`, formData).then(response =>
      setupload(false)
    )
  }

  return (
    <div className="App">
      <>
        <input type='file' name='myfile' onChange={onFileChange} />
        <button disabled={upload} onClick={uploadit}>Upload</button>
      </>
    </div>
  );
}

export default App;
