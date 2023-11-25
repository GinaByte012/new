import React from "react";
import { useState, useEffect } from "react";
import './AI.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작합니다.
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
}

function AI() {
  // 서버로부터 받아온 전체 versions 정보 state
  const [versionList, setVersionList] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  // 버전 선택 및 관리 state
  const [currentVersion, setCurrentVersion] = useState({});
  const [selectedVersion, setSelectedVersion] = useState({});

  // 파일 상태를 관리할 새로운 state 추가
  // const [uploadedTXT, setUploadedTXT] = useState([]);
  // const [uploadedJPG, setUploadedJPG] = useState([]);

  const [size, setSize] = useState('s');
  const [batch, setBatch] = useState('4');
  const [epochs, setEpochs] = useState(null);

  // const [classificationArray, setClassificationArray] = useState([]);
  // const [currentVersion, setCurrentVersion] = useState('trash_yolov5m_results3');
  // const [lastUpdateDate, setLastUpdateDate] = useState('2023-11-13');

  useEffect(() => {
    fetch(`http://ceprj.gachon.ac.kr:60001/aiManage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Who': 'Admin'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        setVersionList(data);
        // 받아온 버전 리스트에서 사용중인 버전을 currentVersion에 저장
        const usedVersion = data.find(item => item.isUsed === 'Y');
        if (usedVersion) {
          setCurrentVersion(usedVersion);
          setSelectedVersion(usedVersion);
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  useEffect(() => {
    console.log("***versionList updated: ", versionList);
  }, [versionList]);

  // 드롭다운이 변경될때마다 해당 버전의 성능지표를 띄울 수 있도록 하는 핸들링 함수
  const handleVersionSelectChange = (event) => {
    console.log("== in Handle Version Select Change Function");

    const selected = versionList.find(item => item.version === event.target.value);
    console.log("selected::  ", selected);
    console.log("versionList::  ", versionList);
    setSelectedVersion(selected || {}); // 선택된 버전의 데이터를 저장하거나, 선택이 없으면 빈 객체를 설정
  };

  // detect할 버전 변경
  const handleVersionChange = () => {
    // console.log("== in Handle Version Change Function");
    // console.log("selectedVersion :: ", selectedVersion);
    // console.log("selectedVersion.ver_num :: ", selectedVersion.ver_num);
    // console.log("selectedVersion.version :: ", selectedVersion.version);
    // setCurrentVersion(selectedVersion);

    const verName = selectedVersion.version;
    console.log("== (Handle Version Change) == verName :: ", verName);
    fetch(`http://ceprj.gachon.ac.kr:60001/aiManage/change`, { // 서버의 실제 URL로 대체하세요
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ version: verName })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('버전 변경 성공! ::', data);
        setCurrentVersion(selectedVersion);
      })
      .catch(error => {
        console.error('학습 요청 중 오류 발생:', error);
      });
  };


  const handleSizeChange = (event) => {
    setSize(event.target.value);
    console.log("Changed Size: ", event.target.value);
  };

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
    console.log("Changed Batch: ", event.target.value);
  };

  useEffect(() => {
    console.log("Updated Size:", size);
    console.log("Updated Batch:", batch);
  }, [size, batch]); // size와 batch 상태가 변경될 때마다 실행됩니다.

  const handleTraining = (event) => {
    event.preventDefault(); // 폼 제출 기본 이벤트 방지
    setIsTraining(true); // Set training status to true

    // const trainingData = {
    //   size: size,
    //   batch: batch,
    //   epochs: epochs
    // };
    // console.log("\n\n>>>>>>>>>>>>>>");
    // console.log(trainingData.size);
    // console.log(trainingData.batch);
    // console.log(trainingData.epochs);

    fetch(`http://ceprj.gachon.ac.kr:60001/aiManage/training`, { // 서버의 실제 URL로 대체하세요
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: size,
        batch: batch,
        epochs: epochs
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('학습 시작됨:', data);
        setIsTraining(false); // Set training status to false when training is done
        // 여기에 학습 시작에 대한 후속 조치를 추가하세요.
      })
      .catch(error => {
        console.error('학습 요청 중 오류 발생:', error);
        setIsTraining(false); // Reset training status in case of error
      });
  };

  // // 웹에 파일 업로드
  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const txtFiles = files.filter(file => file.type === 'text/plain');
  //   const jpgFiles = files.filter(file => file.type === 'image/jpeg');

  //   setUploadedTXT(txtFiles);
  //   setUploadedJPG(jpgFiles);
  // };

  // // 업로드한 파일들을 TrashDatasets에 추가
  // const uploadFiles = () => {
  //   const formData = new FormData();

  //   uploadedTXT.forEach(file => {
  //     formData.append('txtFiles', file, file.name);
  //   });

  //   uploadedJPG.forEach(file => {
  //     formData.append('jpgFiles', file, file.name);
  //   });

  //   fetch(`http://ceprj.gachon.ac.kr:60001/aiManage/upload`, {
  //     method: 'POST',
  //     body: formData // multipart/form-data 형식으로 서버에 전송
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('파일 업로드 중 문제가 발생했습니다.');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('파일 업로드 성공:', data);
  //       // 업로드 성공 후 처리 로직
  //     })
  //     .catch(error => {
  //       console.error('파일 업로드 실패:', error);
  //     });
  // };


  return (
    // <div>AI!!</div>
    <div>
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}> */}
      <div>
        <div>
          <h5>YOLO 현재 버전: {currentVersion.version}</h5>
          <h5>YOLO 모델 크기(model size): {currentVersion.size}</h5>
          <h5>학습 단위 크기(batch size): {currentVersion.batch}</h5>
          <h5>총 실행 횟수(epochs): {currentVersion.epochs}</h5>
          <h5>업데이트 날짜: {currentVersion.date ? formatDate(currentVersion.date) : '날짜 정보 없음'}</h5>
          <hr />
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="file" multiple onChange={handleFileChange} accept=".txt, .jpg, .jpeg" />
            <button onClick={uploadFiles}>업로드</button>
          </div> */}
          <form onSubmit={handleTraining}>

            <label htmlFor="model-size">모델 크기: </label>
            <select
              id="model-size"
              value={size}
              onChange={handleSizeChange}
            >
              <option value="s">s</option>
              <option value="m">m</option>
            </select>
            <label htmlFor="batch-size">    Batch size: </label>
            <select
              id="batch-size"
              value={batch}
              onChange={handleBatchChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32 </option>
              <option value="64">64</option>
            </select><br />
            <labels>Epochs: </labels>
            {/* <input type="text" id="epochs" value={epochs} style={{ width: '50px', height: '40px' }} onChange={(e) => setEpochs(e.target.value)} name="epochs" style={{ width: '50%' }} /> */}
            <input type="text" id="epochs" value={epochs} style={{ width: '70px', height: '40px' }} onChange={(e) => setEpochs(e.target.value)} name="epochs" />
            <button type="submit" disabled={isTraining}>
              {isTraining ? '훈련중...' : '학습하기'}
            </button>
          </form>
          <br /><hr /><br />
          <span>버전 선택:</span>
          <select value={selectedVersion.version || ''} onChange={handleVersionSelectChange}>
            <option value="">선택하세요</option>
            {versionList.map((item, index) => (
              <option key={index} value={item.version}>
                {item.version}
              </option>

            ))}
          </select>
          <button onClick={handleVersionChange}>사용하기</button>
          <div>
            {selectedVersion.version && (
              <p>
                <h6>모델 크기(model size): {selectedVersion.size}</h6>
                <h6>학습 단위 크기(batch size): {selectedVersion.batch}</h6>
                <h6>총 실행 횟수(epochs): {selectedVersion.epochs}</h6>
              </p>
            )}
          </div>
        </div>
        <br /><hr /><br />
        <div className="AI_Condition_Table">
          <div><h5>성능 지표</h5></div>
          <table>
            <tr>
              <tr colspan="2">
                <td>1. 데이터셋 분포 히스토그램 (Labels)</td>
              </tr>
              <tr>
                <td><img src={selectedVersion.labels} alt="img_labels" className="AI_images" /></td>
                <td>labels 설명</td>
              </tr>
            </tr>
            <tr></tr>
            <tr>
              <tr colspan="2">
                <td>2. 훈련 성능 평가 지표 (Results) </td>
              </tr>
              <tr>
                <td><img src={selectedVersion.results} alt="img_results" className="AI_images" /></td>
                <td>results 설명</td>
              </tr>
            </tr>
            <tr>
              <tr colspan="2">
                <td>3. 오차 행렬 (Confusion Matrix)</td>
              </tr>
              <tr>
                <td><img src={selectedVersion.confusion} alt="img_confusion" className="AI_images" /></td>
                <td>confusion matrix 설명</td>
              </tr>
            </tr>
          </table>

        </div>
      </div>

    </div>
  );
}

export default AI;