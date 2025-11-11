// DOM 요소 가져오기
const darkModeBtn = document.getElementById('dark-mode-btn');
const fontSizeBtn = document.getElementById('font-size-btn');
const loadDummyBtn = document.getElementById('load-dummy-btn');
const diaryForm = document.getElementById('diary-form');
const diaryList = document.getElementById('diary-list');
const diaryView = document.getElementById('diary-view');
const backBtn = document.getElementById('back-btn');

// 네비게이션 링크
const homeLink = document.getElementById('home-link');
const viewLink = document.getElementById('view-link');
const listLink = document.getElementById('list-link');

// 섹션
const homeSection = document.getElementById('home-section');
const viewSection = document.getElementById('view-section');
const listSection = document.getElementById('list-section');

// 폰트 크기 상태
let currentFontSize = 1; // 1 = 기본, 2 = 중간, 3 = 큰

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 다크모드 상태 불러오기
    loadDarkMode();
    
    // 폰트 크기 상태 불러오기
    loadFontSize();
    
    // 더미 데이터 초기화
    initializeDummyData();
    
    // 일기 목록 불러오기
    loadDiaryList();
    
    // 날짜 입력 필드에 오늘 날짜 설정
    const dateInput = document.getElementById('diary-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    // 이미지 미리보기 기능
    const imageInput = document.getElementById('diary-image');
    const imagePreview = document.getElementById('image-preview');
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="미리보기">`;
                imagePreview.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = '';
            imagePreview.classList.remove('has-image');
        }
    });
});

// 다크모드 기능
darkModeBtn.addEventListener('click', () => {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // localStorage에 저장
    localStorage.setItem('darkMode', isDarkMode);
    
    // 버튼 텍스트 변경
    darkModeBtn.textContent = isDarkMode ? '☀️ 라이트모드' : '🌙 다크모드';
});

// 다크모드 상태 불러오기
function loadDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️ 라이트모드';
    }
}

// 폰트 크기 조절 기능
fontSizeBtn.addEventListener('click', () => {
    currentFontSize = (currentFontSize % 3) + 1; // 1, 2, 3 순환
    
    let fontSize;
    let label;
    
    switch(currentFontSize) {
        case 1:
            fontSize = '16px';
            label = '🔤 기본';
            break;
        case 2:
            fontSize = '18px';
            label = '🔤 중간';
            break;
        case 3:
            fontSize = '20px';
            label = '🔤 큰';
            break;
    }
    
    document.documentElement.style.setProperty('--font-size-base', fontSize);
    fontSizeBtn.textContent = label;
    
    // localStorage에 저장
    localStorage.setItem('fontSize', currentFontSize);
});

// 더미 데이터 로드 버튼
if (loadDummyBtn) {
    loadDummyBtn.addEventListener('click', () => {
        forceLoadDummyData();
    });
}

// 폰트 크기 상태 불러오기
function loadFontSize() {
    const savedFontSize = parseInt(localStorage.getItem('fontSize')) || 1;
    currentFontSize = savedFontSize;
    
    let fontSize;
    let label;
    
    switch(currentFontSize) {
        case 1:
            fontSize = '16px';
            label = '🔤 기본';
            break;
        case 2:
            fontSize = '18px';
            label = '🔤 중간';
            break;
        case 3:
            fontSize = '20px';
            label = '🔤 큰';
            break;
    }
    
    document.documentElement.style.setProperty('--font-size-base', fontSize);
    fontSizeBtn.textContent = label;
}

// 더미 데이터 초기화
function initializeDummyData() {
    const existingDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    
    // 더미 데이터 ID (1-5)가 이미 있는지 확인
    const existingDummyIds = existingDiaries.map(d => d.id).filter(id => id >= 1 && id <= 5);
    
    // 더미 데이터가 이미 모두 있으면 추가하지 않음
    if (existingDummyIds.length === 5) {
        return;
    }
    
    // 파닥몬 더미 데이터 (5개의 파닥몬 이미지)
    // 실제 이미지 파일을 업로드하면 base64로 변환하여 image 필드에 저장됩니다
    const dummyDiaries = [
        {
            id: 1,
            title: "파닥몬의 결의",
            content: "파닥몬이 강한 의지를 보여주는 순간이었어요. 큰 파란 눈에 담긴 결의가 정말 인상적이었습니다. 어두운 배경 속에서도 파닥몬의 빛나는 모습이 잊혀지지 않아요.",
            date: "2024-01-10",
            image: "image.png", // 실제 이미지 파일을 업로드하면 base64로 변환됩니다
            createdAt: new Date('2024-01-10').toISOString()
        },
        {
            id: 2,
            title: "파닥몬의 감정 표현",
            content: "파닥몬이 화가 나거나 좌절한 모습을 보였어요. 머리 위에 증기 구름이 생기는 모습이 정말 귀여웠습니다. 다채로운 배경 속에서 파닥몬의 다양한 감정을 볼 수 있었어요.",
            date: "2024-01-15",
            image: "image2.png",
            createdAt: new Date('2024-01-15').toISOString()
        },
        {
            id: 3,
            title: "모래바람 속의 파닥몬",
            content: "모래바람이 부는 곳에서 파닥몬을 만났어요. 큰 날개 같은 귀가 바람에 펄럭이는 모습이 정말 멋졌습니다. 약간 슬픈 듯한 표정이지만 여전히 사랑스러운 파닥몬이에요.",
            date: "2024-01-20",
            image: "image3.png",
            createdAt: new Date('2024-01-20').toISOString()
        },
        {
            id: 4,
            title: "숲 속에서 외치는 파닥몬",
            content: "숲 속에서 파닥몬이 크게 외치는 모습을 봤어요! 입을 크게 벌리고 있는 모습이 정말 생동감 있었습니다. 자연 속에서 자유롭게 뛰어노는 파닥몬의 모습이 인상 깊었어요.",
            date: "2024-01-25",
            image: "image4.png",
            createdAt: new Date('2024-01-25').toISOString()
        },
        {
            id: 5,
            title: "파닥몬의 따뜻한 포옹",
            content: "파닥몬이 작은 생명체를 안고 있는 다정한 모습을 봤어요. 정말 따뜻하고 보호적인 분위기가 느껴졌습니다. 파닥몬의 상냥한 마음이 전해지는 순간이었어요.",
            date: "2024-02-01",
            image: "image5.png",
            createdAt: new Date('2024-02-01').toISOString()
        }
    ];
    
    // 기존 일기와 더미 데이터를 합치기 (더미 데이터는 항상 앞에)
    const allDiaries = [...dummyDiaries, ...existingDiaries.filter(d => d.id < 1 || d.id > 5)];
    
    localStorage.setItem('diaries', JSON.stringify(allDiaries));
}

// 더미 데이터 강제 로드
function forceLoadDummyData() {
    const existingDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    
    // 파닥몬 더미 데이터
    const dummyDiaries = [
        {
            id: 1,
            title: "파닥몬의 결의",
            content: "파닥몬이 강한 의지를 보여주는 순간이었어요. 큰 파란 눈에 담긴 결의가 정말 인상적이었습니다. 어두운 배경 속에서도 파닥몬의 빛나는 모습이 잊혀지지 않아요.",
            date: "2024-01-10",
            image: "image.png",
            createdAt: new Date('2024-01-10').toISOString()
        },
        {
            id: 2,
            title: "파닥몬의 감정 표현",
            content: "파닥몬이 화가 나거나 좌절한 모습을 보였어요. 머리 위에 증기 구름이 생기는 모습이 정말 귀여웠습니다. 다채로운 배경 속에서 파닥몬의 다양한 감정을 볼 수 있었어요.",
            date: "2024-01-15",
            image: "image2.png",
            createdAt: new Date('2024-01-15').toISOString()
        },
        {
            id: 3,
            title: "모래바람 속의 파닥몬",
            content: "모래바람이 부는 곳에서 파닥몬을 만났어요. 큰 날개 같은 귀가 바람에 펄럭이는 모습이 정말 멋졌습니다. 약간 슬픈 듯한 표정이지만 여전히 사랑스러운 파닥몬이에요.",
            date: "2024-01-20",
            image: "image3.png",
            createdAt: new Date('2024-01-20').toISOString()
        },
        {
            id: 4,
            title: "숲 속에서 외치는 파닥몬",
            content: "숲 속에서 파닥몬이 크게 외치는 모습을 봤어요! 입을 크게 벌리고 있는 모습이 정말 생동감 있었습니다. 자연 속에서 자유롭게 뛰어노는 파닥몬의 모습이 인상 깊었어요.",
            date: "2024-01-25",
            image: "image4.png",
            createdAt: new Date('2024-01-25').toISOString()
        },
        {
            id: 5,
            title: "파닥몬의 따뜻한 포옹",
            content: "파닥몬이 작은 생명체를 안고 있는 다정한 모습을 봤어요. 정말 따뜻하고 보호적인 분위기가 느껴졌습니다. 파닥몬의 상냥한 마음이 전해지는 순간이었어요.",
            date: "2024-02-01",
            image: "image5.png",
            createdAt: new Date('2024-02-01').toISOString()
        }
    ];
    
    // 기존 일기에서 더미 데이터 ID(1-5) 제거하고 새로 추가
    const otherDiaries = existingDiaries.filter(d => d.id < 1 || d.id > 5);
    const allDiaries = [...dummyDiaries, ...otherDiaries];
    
    localStorage.setItem('diaries', JSON.stringify(allDiaries));
    loadDiaryList();
    alert('더미 데이터가 로드되었습니다!');
}

// 이미지를 base64로 변환
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 일기 저장 기능
diaryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('diary-title').value;
    const content = document.getElementById('diary-content').value;
    const date = document.getElementById('diary-date').value;
    const imageInput = document.getElementById('diary-image');
    
    let imageBase64 = null;
    
    // 이미지가 있으면 base64로 변환
    if (imageInput.files && imageInput.files[0]) {
        try {
            imageBase64 = await imageToBase64(imageInput.files[0]);
        } catch (error) {
            console.error('이미지 변환 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
            return;
        }
    }
    
    // 일기 객체 생성
    const diary = {
        id: Date.now(), // 고유 ID로 타임스탬프 사용
        title: title,
        content: content,
        date: date,
        image: imageBase64,
        createdAt: new Date().toISOString()
    };
    
    // localStorage에서 기존 일기 목록 가져오기
    let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    
    // 새 일기 추가
    diaries.push(diary);
    
    // localStorage에 저장
    localStorage.setItem('diaries', JSON.stringify(diaries));
    
    // 폼 초기화
    diaryForm.reset();
    const dateInput = document.getElementById('diary-date');
    dateInput.value = new Date().toISOString().split('T')[0];
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = '';
    imagePreview.classList.remove('has-image');
    
    // 일기 목록 새로고침
    loadDiaryList();
    
    // 목록 섹션으로 이동
    showSection('list');
    
    // 알림
    alert('일기가 저장되었습니다!');
});

// 일기 목록 불러오기
function loadDiaryList() {
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    
    if (diaries.length === 0) {
        diaryList.innerHTML = '<p class="empty-message">저장된 일기가 없습니다.</p>';
        return;
    }
    
    // 날짜순으로 정렬 (최신순)
    diaries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    diaryList.innerHTML = diaries.map(diary => {
        const preview = diary.content.length > 100 
            ? diary.content.substring(0, 100) + '...' 
            : diary.content;
        
        const imageHtml = diary.image 
            ? `<img src="${diary.image}" alt="${escapeHtml(diary.title)}" class="diary-image">` 
            : '';
        
        return `
            <div class="diary-item" data-id="${diary.id}">
                ${imageHtml}
                <h3>${escapeHtml(diary.title)}</h3>
                <div class="diary-date">${formatDate(diary.date)}</div>
                <div class="diary-preview">${escapeHtml(preview)}</div>
            </div>
        `;
    }).join('');
    
    // 일기 항목 클릭 이벤트
    document.querySelectorAll('.diary-item').forEach(item => {
        item.addEventListener('click', () => {
            const diaryId = parseInt(item.getAttribute('data-id'));
            showDiaryDetail(diaryId);
        });
    });
}

// 일기 상세 보기
function showDiaryDetail(diaryId) {
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    const diary = diaries.find(d => d.id === diaryId);
    
    if (!diary) {
        diaryView.innerHTML = '<p class="empty-message">일기를 찾을 수 없습니다.</p>';
        return;
    }
    
    const imageHtml = diary.image 
        ? `<img src="${diary.image}" alt="${escapeHtml(diary.title)}" class="diary-image">` 
        : '';
    
    diaryView.innerHTML = `
        <div class="diary-detail">
            <h3>${escapeHtml(diary.title)}</h3>
            <div class="diary-date">${formatDate(diary.date)}</div>
            ${imageHtml}
            <div class="diary-content">${escapeHtml(diary.content)}</div>
        </div>
    `;
    
    // 보기 섹션으로 이동
    showSection('view');
}

// 섹션 전환
function showSection(sectionName) {
    // 모든 섹션 숨기기
    homeSection.classList.remove('active');
    viewSection.classList.remove('active');
    listSection.classList.remove('active');
    
    // 모든 네비게이션 링크 비활성화
    homeLink.classList.remove('active');
    viewLink.classList.remove('active');
    listLink.classList.remove('active');
    
    // 선택한 섹션 표시
    switch(sectionName) {
        case 'home':
            homeSection.classList.add('active');
            homeLink.classList.add('active');
            break;
        case 'view':
            viewSection.classList.add('active');
            viewLink.classList.add('active');
            break;
        case 'list':
            listSection.classList.add('active');
            listLink.classList.add('active');
            loadDiaryList();
            break;
    }
}

// 네비게이션 링크 이벤트
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

viewLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('view');
    // 보기 섹션으로 이동할 때 목록이 비어있으면 목록으로 리다이렉트
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    if (diaries.length === 0) {
        showSection('list');
        alert('저장된 일기가 없습니다. 먼저 일기를 작성해주세요.');
    }
});

listLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('list');
});

// 목록으로 돌아가기 버튼
backBtn.addEventListener('click', () => {
    showSection('list');
});

// 유틸리티 함수들
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

