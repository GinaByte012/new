import React from "react";
import { DataGrid } from "@mui/x-data-grid";
//import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Feedback() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { user_num } = useParams();

  const serverURL = `http://ceprj.gachon.ac.kr:60001/aiFeedback`;
  // const [data, setData] = useState(tableData);

  // const handleDelete = (id) => {
  //     setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "번호", width: 70 },
    { field: "types_count", headerName: "종류", width: 150 },
    { field: "img", headerName: "사진", width: 200 },
  ];


  useEffect(() => {
    fetch(serverURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, []
  )
  console.log(tableData)

  return (
    <div>
      <div className="userlist">
        <h2>유저 피드백 페이지</h2>
      </div>
      <DataGrid
        rows={tableData}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      <button className="post-view-go-list-btn" onClick={() => navigate(`/users/${user_num}`)}>유저 정보로 돌아가기</button>
    </div>
  );
}

export default Feedback;



// =======================================================================
// ---------------------------- AI original ------------------------------
// ----------------- becaeuse of Classification's Data -------------------
// =======================================================================

// import React from "react";
// import { useState, useEffect } from "react";
// import './AI.css';

// import img_result from './trash_yolov5m_results3/results.png';
// import img_confusion_matrix from './trash_yolov5m_results3/confusion_matrix.png';
// import img_F1_curve from './trash_yolov5m_results3/F1_curve.png';

// function AI() {
//   // const [classificationArray, setClassificationArray] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState('trash_yolov5m_results3');
//   const [lastUpdateDate, setLastUpdateDate] = useState('2023-11-13');

//   const [sums, setSums] = useState({
//     class_num: 0,
//     types_count: 0,
//     Cardboard: 0,
//     Plastic_Etc: 0,
//     Vinyl: 0,
//     Styrofoam: 0,
//     Glass: 0,
//     Beverage_Can: 0,
//     Canned: 0,
//     Metal: 0,
//     Paperboard: 0,
//     Paper_Cup: 0,
//     Newspaper: 0,
//     Booklets: 0,
//     Carton: 0,
//     Paper_Etc: 0,
//     Plastic_Container: 0,
//     ClearPET: 0,
//     ColoredPET: 0,
//     Packaging_Plastic: 0
//   });


//   useEffect(() => {
//     fetch(`http://ceprj.gachon.ac.kr:60001/aiManage`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Who': 'Admin'
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('네트워크 응답이 올바르지 않습니다');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSums(data);


//       })
//       .catch(error => {
//         console.error('데이터를 가져오는 중 오류 발생:', error);
//       });
//   }, []);

//   const rows = Object.entries(sums);

//   const updateHandler = () => {
//     console.log("You press update button!");
//     // const now = new Date();
//     // setLastUpdateDate(now.toLocaleString());
//   }

//   return (
//     <div>
//       {/* <h4 style={{ f/h4> */}
//       <h4 >AI 버전 관리</h4>
//       <br />
//       <h5>현재 버전: {currentVersion}</h5>

//       <div>
//         {/* <h5 style={{ display: 'inline-block', marginRight: '10px' }}>최신 업데이트 날짜: {lastUpdateDate}</h5> */}
//         <h5>최신 업데이트 날짜: {lastUpdateDate}</h5>
//         <button onClick={updateHandler}>업데이트 하기</button>
//       </div>
//       <br />
//       <div><h5>성능 지표</h5></div>
//       <table>
//         <tbody>
//           <tr>
//             <td className="table_title">
//               <h6>{currentVersion} - result</h6>
//             </td>
//             <td className="table_title">
//               <h6>{currentVersion} - confusion_matrix</h6>
//             </td>
//           </tr>
//           <tr >
//             <td>
//               <img src={img_result} alt="result" className="AI_images" />
//             </td>
//             <td>
//               <img src={img_confusion_matrix} alt="confusion_matrix" className="AI_images" />
//             </td>
//           </tr>
//           <tr>
//             <td className="table_title">
//               <h6 className="table_title">{currentVersion} - F1_curve</h6>
//             </td>
//             <td></td>
//           </tr>
//           <tr>
//             <td>
//               <img src={img_F1_curve} alt="F1_curve" className="AI_images" />
//             </td>
//           </tr>
//         </tbody>

//       </table>
//       <br />
//       <br />
//       <div><h4>전체 분리배출 기록</h4></div>
//       <div>
//         <table>

//           <thead>
//             <tr className="table_title">
//               <th>name</th>
//               <th>contents</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map(([name, value]) => (
//               <tr key={name}>
//                 <td>{name}</td>
//                 <td>{value}</td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div >
//   )
// }

// export default AI;

