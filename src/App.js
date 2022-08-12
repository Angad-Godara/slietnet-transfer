import './App.css';
import { useState } from 'react'
import axios from 'axios';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const server = process.env.REACT_APP_SERVER;

  const [file, setfile] = useState(null)
  const [upload, setupload] = useState(false)
  const [progress, setProgress] = useState(0)

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
    axios.post(`${server}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      },
    }).then(response =>
      setupload(false)
    )
  }

  return (
    <div className="App">
      <div className="uploader">
        <input type='file' name='myfile' onChange={onFileChange} />
        <button disabled={upload} onClick={uploadit}>Upload</button>
      </div>
      <Row>
        <Col>
          <ProgressBar animated style={{ margin: '20px' }} now={progress} label={`${progress}%`} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
