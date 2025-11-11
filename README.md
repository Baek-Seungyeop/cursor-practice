# 파닥몬의 사진첩 📸

파닥몬과의 추억을 기록하는 일기 웹사이트입니다.

## 기능

- ✍️ 일기 작성 및 저장
- 📋 저장된 일기 목록 보기
- 👁️ 일기 상세 보기
- 🌙 다크모드 지원
- 🔤 폰트 크기 조절
- 💾 localStorage를 이용한 데이터 저장 (브라우저 새로고침 후에도 유지)

## 파일 구조

```
.
├── 1.html      # HTML 파일
├── 2.css       # CSS 스타일 파일
├── 3.js        # JavaScript 기능 파일
└── README.md   # 이 파일
```

## 사용 방법

1. `1.html` 파일을 브라우저에서 열기
2. "홈" 메뉴에서 일기 작성
3. "목록" 메뉴에서 저장된 일기 확인
4. "보기" 메뉴에서 선택한 일기 상세 보기

## GitHub에 업로드하기

1. GitHub에 새 저장소 생성
2. 다음 명령어 실행:

```bash
git init
git add 1.html 2.css 3.js README.md
git commit -m "파닥몬의 사진첩 웹사이트 추가"
git branch -M main
git remote add origin [여기에_저장소_URL]
git push -u origin main
```

## Netlify 배포하기

1. [Netlify](https://www.netlify.com)에 로그인
2. "Add new site" → "Import an existing project" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: (비워두기)
   - Publish directory: `/` (또는 비워두기)
5. "Deploy site" 클릭

또는 Netlify CLI 사용:

```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

## 조작법

- **홈**: 새 일기 작성
- **보기**: 선택한 일기 상세 보기
- **목록**: 저장된 모든 일기 목록 보기
- **다크모드 버튼**: 밝은 모드 ↔ 어두운 모드 전환
- **폰트 크기 버튼**: 기본 → 중간 → 큰 → 기본 (순환)

## 기술 스택

- HTML5
- CSS3 (CSS Variables 사용)
- JavaScript (Vanilla JS)
- localStorage API

