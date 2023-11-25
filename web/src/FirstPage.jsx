import React from 'react';
import { Link } from 'react-router-dom';
import "./All.css";
import DownloadIcon from '@mui/icons-material/Download';

function FirstPage() {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between', // 좌측 끝과 우측 끝에 정렬
      alignItems: 'center', // 세로 중앙 정렬
      margin: '0',
      color: 'black',
      padding: '1em',
      top: 0,
      width: '100%',
      position: 'fixed',
      // boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#ADE6FA',
      color: 'white',
      padding: '7px 15px',
      fontSize: '1em',
      textDecoration: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    logo: {
      width: '100px',
      marginBottom: '2rem',
    },
    bodySection: {
      textAlign: 'center',
      padding: '2rem',
    },
    otherImage: {
      width: '50%', // 다른 이미지 넣을 것
    },
  };

  // const header = document.createElement('header');

  return (
    <div>
      {/* Header */}
      <div className='headercontainer'>
        <header style={styles.header}>
          <img src={"logo_2.png"} alt="로고" style={styles.logo} />
          <Link to="/login">
            <button style={styles.button}>관리자 로그인</button>
          </Link>
        </header>
      </div>

      {/* Body Section */}
      <section style={styles.bodySection}>
        <div className='bodycontainer'>
          <div className='bodycontainer1'>
            <h2>인공지능을 이용한 쓰레기 분류 및 분리배출 도움 서비스</h2>
            <p>쉽고 편한 분리배출, 10분이면 충분합니다.</p>
            <button style={styles.button}>어플리케이션 다운받기<DownloadIcon /></button>
            <p>클릭 한 번으로 '10분'의 서비스를 이용해보세요.</p>
          </div>
          <div className='bodycontainer2'>
            <img src={"./other_image.png"} alt="something else" style={styles.otherImage} />
          </div>
        </div>
      </section>
    </div>
  );
}
export default FirstPage;
