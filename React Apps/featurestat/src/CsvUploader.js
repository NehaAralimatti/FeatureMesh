// CsvUploader.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignalRService from './SignalRService';
import { Link } from "react-router-dom";
import './CSVFileUploader.css'; 
import 'bootstrap/dist/css/bootstrap.css';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [batchId, setBatchId] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    SignalRService.connection.on('ReceiveProgress', (receivedProgress) => {
      setProgress(parseInt(receivedProgress));
    });

    return () => {
      SignalRService.connection.off('ReceiveProgress');
    };
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post('http://localhost:5147/CSV/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTimeout(() => {
        console.log('File uploaded successfully:', response.data);
        setBatchId(batchId + 1);
        setUploadedData([
          ...uploadedData,
          {
            batchId,
            content: response.data.map((entity) => `${entity.entityName} - ${entity.description}- ${entity.featureName}- ${entity.featureDataType}- ${entity.featureValue}`).join('\n'),
          },
        ]);
        setErrorMessage(null);
      }, 100);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Missing data or error during upload');
    }
  };

  const handleViewClick = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Feature Marketplace</a>


          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            {/* <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            <div className='col-md-4 offset-1'>
              {/* <div className='input-group'>
                <button type='button' className='btn btn-info'>Search</button>
                <input type='text' className='form-control'></input>
              </div> */}
            </div>
            {/* <ul class="navbar-nav offset-1"> */}
              {/* <li class="nav-item">
                <Link class="nav-link active"
                  aria-current="page" to="searchuser">Custom Search</Link>
              </li> */}
              {/* <li class="nav-item"> */}
                {/* <Link class="nav-link active"
                  aria-current="page" to="newfeature">Add Feature</Link>
              </li> */}
              {/* <li class="nav-item"> */}
                {/* <Link class="nav-link active"
                  aria-current="page" to="featurehome">Upload Feature</Link>
              </li> */}
              {/* <li class="nav-item"> */}
                {/* <Link class="nav-link active"
                  aria-current="page" to="featurehome">Favourites</Link> */}
              {/* </li> */}
              {/* <li class="nav-item"> */}
                {/* <Link class="nav-link active"
                  aria-current="page" to="featurehome">My Features</Link> */}
              {/* </li> */}
            {/* </ul> */}

          </div>
        </div>
      </nav>
      <br></br>
      <div class="main" className="container">
        <div className="upload-section">
          <div className="grids">
            <h1>Upload your CSV files</h1>
            <div className='grid-group'>
  <div className='file-upload-container'>
    <input type="file" onChange={handleFileChange} accept='.csv' />
    <br></br>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '30%', backgroundColor: '#e0e0e0', borderRadius: '5px', alignContent: 'center' }}>
        <div
          style={{
            alignItems: 'end',
            width: `${progress}%`,
            height: '20px',
            backgroundColor: '#2577a9',
            borderRadius: '5px',
          }}
        />
      </div>
      <p style={{ marginLeft: '10px', fontSize: '17px' }}>{progress}%</p>
    </div>
  </div>
</div>
          </div>
          <br></br>
          <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <div>
          <br></br>
          <center>
            <h4>STATISTICS</h4>
            <table className='table table-bordered table-hover m-3 variant=dark' style={{ maxWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Batch Id</th>
                  <th style={{ textAlign: 'center' }}>View</th>
                </tr>
              </thead>
              <tbody>
                {uploadedData.map((data, index) => (
                  <tr key={index + 1}>
                    <td style={{ textAlign: 'center' }}>{data.batchId}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn btn-primary" onClick={() => handleViewClick(data)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
        
        {selectedEntity && (
          <div>
            <center>
              <h4>VIEW</h4>
              <table className='table table-bordered table-hover m-3' style={{ maxWidth: '800px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Batch Id</th>
                    <th style={{ textAlign: 'center' }}>EntityName-Description-FeatureName-FeatureDataType-FeatureValue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{selectedEntity.batchId}</td>
                    <td style={{ textAlign: 'center' }}>
                      {selectedEntity.content.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </div>
        )}
      </div>
    </>
  );
};

export default CsvUploader;