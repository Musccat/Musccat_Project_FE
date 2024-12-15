# Musccat_Project_FE
24-1 이화여자대학교 캡스톤디자인과창업프로젝트 스타트 06팀 머스캣 FE

<br>

## 📍 프로젝트명: SCHOLLI

<img src="https://github.com/judymoody59/Musccat_Example/assets/108432112/b8bf2704-748e-4b22-9140-5c4692dd2db9" width="250" height="250" />
<br>


## 👩‍💻 팀원
<table>
    <tr>
        <!-- 첫 번째 팀원: 채민주 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/judymoody59" alt="Avatar" width="100px"/>
            <br/>
            <tr>
                <td align="center">
                    <a href="https://github.com/judymoody59">채민주</a>
                </td>
            </tr>
        </td>
        <!-- 두 번째 팀원 추가 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/hayong39" alt="Avatar" 
width="100px"/>
            <br/>
            <tr>
                <td align="center">
                    <a href="https://github.com/new-member">변하영</a>
                </td>
            </tr>
        </td>
    </tr>
    <tr>
        <!-- 첫 번째 팀원의 GitHub Stats -->
        <td align="center" width="50%">
            <img src="https://github-readme-stats.vercel.app/api?username=judymoody59&show_icons=true&theme=transparent" alt="Minju's GitHub stats"/>
        </td>
        <!-- 두 번째 팀원의 GitHub Stats -->
        <td align="center" width="50%">
            <img src="https://github-readme-stats.vercel.app/api?username=hayong39&show_icons=true&theme=transparent" alt="New Member's GitHub stats"/>
        </td>
    </tr>
</table>
<br/>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"> 

<br/>

## 📂 프로젝트 아키텍처

```
src/
├── component/                           # 프로젝트 주요 컴포넌트 폴더
│   ├── contexts/                
│   │   └── AuthContext.jsx              # Context API 관련 코드
│   ├── data/                   
│   ├── list/                    
│   └── page/                            # 페이지 단위 컴포넌트
│       ├── AddScholar.jsx               # 장학금 등록 페이지
│       ├── BenefitInfo.jsx              # 수혜 정보 조회 페이지
│       ├── BeneInfoRegister.jsx         # 수혜 정보 등록 페이지
│       ├── EntireScholar.jsx            # 전체 장학금 목록 페이지
│       ├── Login.jsx                    # 로그인 페이지
│       ├── MainPage.jsx                 # 메인 페이지
│       ├── MemInfo.jsx                  # 프로필 관리 페이지
│       ├── MyInterest.jsx               # 관심목록 페이지
│       ├── MyPage.jsx                   # 마이페이지
│       ├── Notice.jsx                   # 공고 상세 페이지
│       ├── Points.jsx                   # 구독 페이지
│       ├── ProtectedPage.js             # 인증이 필요한 페이지를 보호하는 컴포넌트
│       ├── RecomScholar.jsx             # 추천 장학금 목록 페이지
│       ├── RecomScholarDate.jsx         # 추천 장학금 기간 설정 페이지
│       └── Register.jsx                 # 회원가입 페이지
├── ui/                                  # UI 컴포넌트 및 스타일링
    ├── NavBar.jsx                       # 로그인 전 네비게이션 바 컴포넌트
│   └── NavBarB.jsx                      # 로그인 후 네비게이션 바 컴포넌트
```
<br/>

## ⚙️ 개발환경 설정

#### 프론트엔드 실행 터미널

create-react-app(CRA)를 사용하기 위해선 Node.js 와 npm 설치가 되어있어야 한다.

- npm(node package manager) v6. 14.0 이상
- Node.js (JavaScript runtime) 14.0.0 이상

설치가 모두 완료되었다면 npx 명령어를 통해 CRA 프로젝트를 생성하여 실행할 수 있다.
```
npx create-react-app <프로젝트 이름>         // React 웹 애플리케이션 프로그램 생성
npm start                                // 애플리케이션 실행
```

#### 라이브러리 설치 및 설정
```
npm install react-router-dom            // useNavigate를 사용하기 위해 React Router 설치
npm install axios                       // API 호출을 위해 사용
npm install jwt-decode                  // JWT 토큰을 디코딩하기 위해 사용
npm install dotenv                      // process.env.REACT_APP_API_URL와 같은 환경 변수를 사용하기 위해 설치
```

#### 추가적인 UI 및 기능 라이브러리 설치
```
npm install styled-components           // 컴포넌트 스타일링을 위해 사용
npm install react-select                // 드롭다운 선택 기능을 위해 사용
npm install react-calendar              // 달력 UI를 위한 라이브러리
```

