import React, { useState, useCallback, useEffect } from 'react';
import './Mom.css';
import axios from 'axios';
import Typewriter from 'typewriter-effect';

const Mom = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [minutesOfMeetingPath, setMinutesOfMeetingPath] = useState(null);
  const [summaryPath, setSummaryPath] = useState(null);

  const onChange = useCallback((event) => {
    const file = event.target.files[0];
      setAudioFile(file);
      console.log('File selected:', file);
  }, []);

  useEffect(() => {
    if (audioFile) {
      processAudio();
    }
  }, [audioFile]);

  const processAudio = async () => {
    if (!audioFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', audioFile);

    // Debugging FormData
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post('http://localhost:8000/process/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); 
      setMinutesOfMeetingPath(response.data.minutes_of_meeting_path);
      setSummaryPath(response.data.summary_path);
    } catch (error) {
      console.error('Error processing audio:', error); 
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (path) => {
    const link = document.createElement('a');
    link.href = `http://localhost:8000/download?path=${encodeURIComponent(path)}`;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
    <div className="container" id="get">
      <div className="card">
        <h3>Upload Files</h3>
        <div className="drop_box">
          <header>
            <h4>Select File here</h4>
          </header>
          <p>Files Supported: mp3, mp4, m4a, wav</p>
          <input type="file" onChange={onChange} accept=".mp3,.mp4,.m4a,.wav" id="fileID" />
        </div>
      </div>
      <div className='load'>
    {isLoading && <div className="loading"><Typewriter
            options={{
              strings: ['Generating..'],
              autoStart: true,
              loop: true,
            }}
          /></div>}
      {minutesOfMeetingPath && summaryPath && (
        <div className='button-class'>
          <div><button className="download-buttons" onClick={() => downloadFile(minutesOfMeetingPath)}>Download Minutes of Meeting</button></div>
          <div><button className="download-buttons" onClick={() => downloadFile(summaryPath)}>Download Summary</button></div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Mom;

