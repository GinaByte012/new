const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const { createSecretKey } = require('crypto');
const verifyEmail = require('./verifyEmail');
const saltRounds = 10;  // 해싱에 사용. 보안을 높여주기 위해서? 비교를 위해서...


app.use(express.json());
// app.use(express.static(path.join(__dirname, '/../view/web/build', 'utf8')));
app.use(bodyParser.urlencoded({ extended: false }));


module.exports = {
  // GET 'first page' (초기 화면)
  firstPage: function (req, res) {
    console.log('[GET] FirstPage for Admin   in adminAccount.js');
    res.sendFile(path.join(__dirname, '/../view/web/build/index.html'));
  },
  // GET 'login page' (로그인 화면)
  loginPage: function (req, res) {
    console.log('[GET] LoginPage for Admin   in adminAccount.js');
    // res.sendFile(path.join(__dirname, '/../view/web/build/index.html'));
  },
  // POST 'Login' (로그인 처리)
  login: function (req, res) {
    console.log('[POST] Login for Admin   in adminAccount.js');
    const { id, passwd } = req.body;
    console.log("id & password from admin: ", id, passwd);
    const inputId = id;
    const inputPasswd = passwd;

    // Select db query to check requested id & password
    db.query(`SELECT id, passwd FROM admin WHERE id = ?`,
      [inputId], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your id and passwd HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Login  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')


        // Wrong id (존재하지 않는 ID)
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(401).json('Fail: Login  ::  Wrong ID');
        }

        // Corect id  (존재하는 ID)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. you are an admin!')

          console.log("result: ", result);
          // Compare to real password
          const checkResult = bcrypt.compare(inputPasswd, result[0].passwd);

          // Wrong Password  ==> Login Fail   (비밀번호 미일치. 로그인 실패)
          if (!checkResult) {
            console.error('비밀번호 비교 오류:', error);
            res.status(401).json('Fail: Login  ::  Wrong Password');
          }

          // Correct Password  ==> Login Success   (비밀번호 일치. 로그인 성공)
          // Save a session
          else {
            console.log('로그인이 성공!')
            // 세션 저장
            req.session.is_logined = true;
            req.session.login_id = result[0].id;
            req.session.is_admin = true;
            // 사용자 이름 저장
            const adminData = {
              name: result[0].name
            };
            // JSON 응답을 보냅니다.
            res.status(200).json("success");
            // res.redirect('/main');


            // 메인 화면으로 redirect
            // ERROR!! ==> res.json 이후 또 res.redirect 불가능! 둘 중 하나만 해야함
            // ===> 서버: 정보 전달, 클라이언트: redirect 하면 문제 없음!
            // res.redirect('/main');
          }
        }
      })
  },
  // POST 'Logout' (로그아웃 요청 처리)
  logout: function (req, res) {
    console.log('[POST] Logout for Admin   in adminAccount.js');

    console.log("req.session.is_logined: ", req.session.is_logined);
    console.log("req.session.login_id: ", req.session.login_id);
    console.log(" req.session.is_admin: ", req.session.is_admin);

    // 로그아웃 요청이 들어오면, 세션 삭제 후 로그인 페이지로 redirect
    req.session.destroy(function (error) {
      console.log("\n\n\n<Trying to destroy the session>")
      if (error) {
        console.log("this is ERROR PAGE for destroy the session");
        console.log(error);
      }
      else {
        console.log("NO ERROR in destroying the session");
        res.status(200).json('Success: Logout');
      }
    })
  },

  // GET 'Main page' (메인 화면)
  mainPage: function (req, res) {
    console.log('[GET] MainPage for Admin   in adminAccount.js');
    const requestId = req.session.login_id

    db.query(`SELECT isUsed, isAuth FROM admin WHERE id=adminId`, [requestId], function (error, result) {
      if (error) {
        console.log('ERROR: in Using DB');
        res.status(500).json('CANNOT USE DB');
      }

      if (result[0] === undefined) {
        console.log("There's no information like that");
        res.status(404).json("There's no information");
      }

      else {
        if (isUsed === "N") {
          console.log("You are not an ADMIN anymore");
          res.status(404).json("You are not an ADMIN anymore");
        }
        else {
          if (isAuth === "Y") {
            console.log("Hello, Super Admin!!!");
            res.status(200).json(result[0].isAuth);
          }
          else {
            console.log("Hello, admin!");
            res.status(200).json(result[0].isAuth);
          }
        }
      }
    })
  },

  // GET 'Id & Passwd Page'  (아이디/비밀번호 찾기 화면)
  idPwPage: function (req, res) {
    console.log('[GET] idPwPage for Admin   in adminAccount.js');
    res.status(200).json('Success: Find ID & PASSWORD Page');
  },
  // POST 'Verify Email'  (이메일 인증 요청 처리)
  verify: async function (req, res) {
    console.log("======================================================");
    console.log("======================================================");
    console.log("[POST]   Verify Email   --  in adminAccount.js")
    const inputEmail = req.body.email;
    console.log("inputEmail from admin: ", inputEmail);

    // 이메일 인증
    db.query(`SELECT email FROM admin WHERE email = ?`,
      [inputEmail], async function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your email HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Sending Verification Email  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result[0]: ", result[0]);
        console.log("result[0].email: ", result[0].email);

        // Wrong information (name/email) (회원정보 일치 실패. 이메일이 일치하는 정보 없음.)
        // 회원가입은 일치 여부 확인 필요 없음!
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(404).json('Fail: Find email  ::  Wrong Email');
        }

        // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이메일)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')
          try {
            // VerifyEmail 함수 호출을 기다려서 반환 값을 answerCode에 할당
            const answerCode = await verifyEmail.VerifyEmail(result[0]);
            console.log("answerCode  ---  (in adminAccount.js): ", answerCode);

            // 인증 이메일 전송 실패
            if (answerCode === undefined) {
              console.log("에러 발생!!");
              res.status(500).json("Fail: Send Verification Email  ::  Somethig wrong.");
            }
            // 인증 이메일 전송 성공
            else {
              console.log("이메일 전송 성공!");
              console.log("Answer Code: ", answerCode);
              res.status(200).json({ code: answerCode });   // 성공 여부와 정답 코드를 클라이언트에게 전달
            }
          } catch (error) {
            console.error('VerifyEmail 함수 호출 중 에러 발생:', error);
            res.status(500).json("Fail: Send Verification Email  ::  Something went wrong.");
          }
          // // 이메일 인증 함수 실행 --> 인증 코드 
          // const answerCode = verifyEmail.VerifyEmail(result[0]);
          // console.log("answerCode  ---  (in adminAccount.js): ", answerCode);

          // // 인증 이메일 전송 실패
          // if (answerCode === undefined) {
          //   console.log("에러 발생!! ");
          //   res.status(500).json("Fail: Send Verification Email  ::  Somethig wrong.")
          // }
          // // 인증 이메일 전송 성공
          // else {
          //   console.log("이메일 전송 성공!");
          //   console.log("Answer Code: ", answerCode);
          //   res.status(200).json({ code: answerCode });   // 성공 여부와 정답 코드를 클라이언트에게 전달
          // }
        }
      })
  },

  // POST 'Find Id'  (아이디 찾기 요청 처리)
  id: function (req, res) {
    console.log('[POST] ID for Admin   in adminAccount.js');
    // 이름 & 이메일 입력
    const { name, email } = req.body;
    const inputName = name;
    const inputEmail = email;

    db.query(`SELECT name, id, email FROM admin WHERE name = ? AND email = ?`,
      [inputName, inputEmail], function (error, result) {
        console.log('\n\n(in db.query)  [after SELECT] --------  (i got your name & email HAHA!)')
        // error 
        if (error) {
          console.error('DB 오류:', error);
          res.status(500).json('Fail: Find ID  ::  <Server Error> DB');
        }
        console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

        // DB에서 받아온 정보 출력
        console.log("result: ", result[0]);

        // Wrong information (name/email) (회원정보 일치 실패. 이름, 이메일이 일치하는 정보 없음.)
        if (result[0] === undefined) {
          console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
          res.status(404).json('Fail: Find ID  ::  Wrong Information');
        }

        // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이름, 이메일)
        else {
          console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

          const yourId = result[0].id;
          res.status(200).json(yourId);
        }
      });
  },
  // // POST 'Find Password'   (비밀번호 찾기 요청 처리)
  // pw: function (req, res) {
  //   console.log('[POST] PW for Admin   in adminAccount.js');

  //   // 입력된 이름 & 아이디 & 이메일 저장
  //   const { name, id, email } = req.body;
  //   const inputName = name;
  //   const inputId = id;
  //   const inputEmail = email;

  //   db.query(`SELECT name, id, passwd, email FROM admin WHERE name = ? AND id = ? AND email = ?`,
  //     [inputName, inputId, inputEmail], function (error, result) {
  //       console.log('\n\n(in db.query)  [after SELECT] --------  (i got your name & email HAHA!)')
  //       // error 
  //       if (error) {
  //         console.error('DB 오류:', error);
  //         res.status(500).json('Fail: Find PASSWD  ::  <Server Error> DB');
  //       }
  //       console.log('(in db.query)  [after if] ------> 1. passed 1st error test')

  //       // DB에서 받아온 정보 출력
  //       console.log("result: ", result[0]);

  //       // Wrong information (name/email) (회원정보 일치 실패. 이름, 이메일이 일치하는 정보 없음.)
  //       if (result[0] === undefined) {
  //         console.log('(in db.query)  [in 2nd if] ------> 2-1. you have to sign up!')
  //         res.status(404).json('Fail: Find PASSWD  ::  Wrong Information');
  //       }

  //       // Correct information (name/email)  (회원정보 일치 성공. 존재하는 이름, 이메일)
  //       else {
  //         console.log('(in db.query)  [in else] ------> 2-2. I will send you an email.')

  //         // 비밀번호 재설정 화면으로 redirect
  //         res.redirect('/newPasswdPage');
  //       }
  //     });
  // },
  // GET 'New Password page'    (새 비밀번호 설정 화면)
  newPasswdPage: function (req, res) {
    console.log('[GET] New Password Page for Admin   in adminAccount.js');
    res.status(200).json('Success: New Password Page');
  },
  // PATCH 'New Password'      (새 비밀번호 설정 요청)
  newPasswd: function (req, res) {
    console.log('\n\n\n[PATCH] New Password for Admin   in adminAccount.js');
    const newPw = req.body.newPw;
    const adminId = req.session.login_id;
    console.log('req.body: ', req.body);
    console.log('newPw: ', newPw);
    console.log('adminId: ', adminId);

    // <수정  ...? 현재도 미완료...? idk...>
    // 비밀번호 해싱 
    // 해싱한 비밀번호 DB에 저장
    bcrypt.hash(newPw, saltRounds, (hashErr, hashedPasswd) => {
      if (hashErr) {
        console.error('비밀번호 암호화 중 오류 발생: ', hashErr);
        return res.status(500).json({ error: 'fail: hashing error' });
      }

      console.log("hashedPasswd: ", hashedPasswd);

      // DB 정보 수정! 
      db.query(`UPDATE admin SET passwd = ? WHERE id = ?`,
        [hashedPasswd, adminId], function (error, result) {
          console.log('\n\n(in db.query)  [after SELECT] --------  (i got your newPw HAHA!)')
          // error 
          if (error) {
            console.error('DB 오류:', error);
            res.status(500).json('Fail: Create New PASSWORD  ::  <Server Error> DB - while update');
          }
          // 재설정 성공! 
          else {
            console.log('(in db.query)  [in else] ------> 2-2. Success: Save New PASSWORD ')
            res.status(200).json(adminId);
          }
        });
    })
  },

  // GET 'My Information'   (내 정보 관리 화면)
  myInfoPage: function (req, res) {
    console.log("[GET]  Admin's Information Page  in adminAccount.js");

    // 요청해온 세션 아이디 확인
    const requestId = req.session.login_id

    // db에서 해당 아이디 관리자의 정보 추출
    //      -> 사번, 이름, 아이디, 비번, 생일, 이메일, 부서
    db.query(`SELECT admin_num, name, id, passwd, birth, email, department FROM admin WHERE id = ?`,
      [requestId], function (error, result) {
        // error 발생
        if (error) {
          console.log('DB 오류: '.error);
          res.status(500).json('Fail: GET My Information  ::  Admin - DB');
        }

        // DB에 저장된 정보가 없음
        if (result[0] === undefined) {
          console.log("i got no information from admin table");
          res.status(404).json("I got nothing from admin table");
        }
        // DB에서 정상적으로 정보 받아옴
        else {
          console.log(result[0]);
          res.send(result[0]);    // 관리자 개인정보 전달
        }
      })
  },

  // GET 'Check Current Password'  (현재 비밀번호 확인 화면 요청)
  passwdAuthPage: function (req, res) {
    console.log("[GET]  Admin's Check Current Password Page  in adminAccount.js");
    res.status(200).json('Success: Check Password Page');
  },
  // POST 'Check Current Password'  (현재 비밀번호 확인 요청)
  passwdAuth: function (req, res) {
    console.log("[GET]  Admin's Check Current Password  in adminAccount.js");
    // body에 있는 비번 저장
    const inputPasswd = req.body.passwd;
    // 세션 id 확인
    const requestId = req.session.login_id;

    console.log(">>> inputPasswd: ", inputPasswd);
    console.log(">>> requestId: ", requestId);

    // 세션 id와 일치하는 정보 db에서 select
    db.query(`SELECT passwd FROM admin WHERE id = ?`,
      [requestId], function (error, result) {
        // error 발생
        if (error) {
          console.log('DB 오류: '.error);
          res.status(500).json("Fail: POST Admin's Check Current Password  ::  DB error");
        }

        // DB에 저장된 정보가 없음
        if (result[0] === undefined) {
          console.log("i got no information from admin table");
          res.status(404).json("I got nothing from admin table");
        }
        // DB에서 정상적으로 정보 받아옴
        else {
          // 비밀번호 일치
          console.log(">>> result[0].passwd: ", result[0].passwd)
          const checkResult = bcrypt.compare(inputPasswd, result[0].passwd);

          if (!checkResult) {
            console.log("Fail... Client put a wrong password.");
            res.status(404).json("Fail: Wrong Password. Try again!");
          }
          else {
            console.log("Success!! Correct Password!");
            res.status(200).json("Success: Correct Password");
          }

        }
      })
    // db에 저장된 사용자의 비밀번호 확인
    // if) 일치 --> 성공 send
    // else) 불일치 --> 실패 send
  }
}



