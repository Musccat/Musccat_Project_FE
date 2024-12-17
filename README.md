# Musccat_Project_FE
24-1 이화여자대학교 캡스톤디자인과창업프로젝트 스타트 06팀 머스캣 FE

<br>

## 📍 프로젝트명: SCHOLLI

<img src="https://github.com/judymoody59/Musccat_Example/assets/108432112/b8bf2704-748e-4b22-9140-5c4692dd2db9" width="250" height="250" />
<br>


## 👩‍💻 팀원
<table>
    <tr>
        <!-- 첫 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/judymoody59" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/judymoody59">채민주</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=judymoody59&show_icons=true&theme=transparent" alt="Minju's GitHub stats" width="350px"/>
        </td>
        <!-- 두 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/hayong39" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/hayong39">변하영</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=hayong39&show_icons=true&theme=transparent" alt="Hayeong's GitHub stats" width="350px"/>
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

#### 0. 프로젝트 생성 (프로젝트 클론 시에는 하지 않으셔도 됩니다.)
create-react-app(CRA)를 사용하기 위해선 Node.js 와 npm 설치가 되어있어야 합니다.

- npm(node package manager) v6. 14.0 이상
- Node.js (JavaScript runtime) 14.0.0 이상

설치가 모두 완료되었다면 npx 명령어를 통해 CRA 프로젝트를 생성하여 실행할 수 있습니다.
```
npx create-react-app <프로젝트 이름>         // React 웹 애플리케이션 프로그램 생성
npm start                                // 애플리케이션 실행
```


#### 1. 프론트엔드 프로젝트 클론

깃 클론을 진행하기 위해선 컴퓨터에 Git이 설치되어 있어야 합니다.


명령 프롬프트 창에 아래 명령어를 입력하여 프로젝트를 클론합니다.

```
git clone https://github.com/Musccat/Musccat_Project_FE.git
```

클론이 완료되었다면 해당 프로젝트 경로로 이동합니다.

```
cd Musccat_Project_FE
```

클론한 프로젝트는 React 프론트엔드 프레임워크를 사용하므로 의존성을 설치해야 합니다.

```
npm install
```

의존성 설치 완료 후 npm 명령어를 이용해서 프로젝트를 실행합니다.
```
npm start
```

#### 2. 라이브러리 설치 및 설정
프로젝트에서 사용하는 라이브러리를 사용하기 위해선 아래 라이브러리들을 설치해야 합니다.
아래 명령어들을 명령 프롬프트에 입력합니다.
```
npm install react-router-dom            // useNavigate를 사용하기 위해 React Router 설치
npm install axios                       // API 호출을 위해 사용
npm install jwt-decode                  // JWT 토큰을 디코딩하기 위해 사용
npm install dotenv                      // process.env.REACT_APP_API_URL와 같은 환경 변수를 사용하기 위해 설치
```

#### 3. 추가적인 UI 및 기능 라이브러리 설치
추가적인 UI 및 기능을 위한 라이브러리 또한 설치합니다.
```
npm install styled-components           // 컴포넌트 스타일링을 위해 사용
npm install react-select                // 드롭다운 선택 기능을 위해 사용
npm install react-calendar              // 달력 UI를 위한 라이브러리
```

#### 4. 환경변수 설정
   <br>**4.1 .env 파일 생성**
   <br>    root 폴더 (Musccat_Project_FE/musccat-project-fe)에 해당 파일(.env) 생성 
   <br><br> **4.2 .env 파일 내용 작성**
   <br>    아래 형식에 맞춰 키 값을 작성합니다.
   <br> 파일 키는 메일로 교수님께 보내드렸습니다. 
   ```
    REACT_APP_API_URL=""
    REACT_APP_API_KEY=""
    REACT_APP_IMP_KEY=""
   ```
<br/>

## 🗄️ 소스코드 설명

- src/contexts/AuthContext.js
<br/>
React Context API를 이용해 인증 상태와 사용자 데이터를 관리합니다.

- 

