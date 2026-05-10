// Creativity Support - Smooth Experience
console.log('Creativity Support - Portfolio');

/* ============================================
   SmoothScroll.js 라이브러리 설정
   ============================================
   
   이 라이브러리는 기본 브라우저 스크롤을 부드럽고 자연스러운 
   애니메이션 스크롤로 변경합니다.
   
   CDN: https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.9/SmoothScroll.min.js
   
   ============================================ */

SmoothScroll({
    // animationTime: 스크롤 애니메이션의 지속 시간 (밀리초)
    // 값이 클수록 더 느리고 부드럽게 스크롤
    // 권장: 400-1200 (기본값: 400)
    animationTime: 1600,
    
    // stepSize: 한 번의 스크롤로 이동하는 픽셀 크기
    // 값이 클수록 스크롤이 빠르게 이동
    // 권장: 50-120 (기본값: 100)
    stepSize: 65,
    
    // accelerationDelta: 스크롤 가속도 변화량
    // 연속으로 스크롤할 때 속도가 증가하는 정도
    // 값이 클수록 빠르게 가속
    // 권장: 20-50 (기본값: 50)
    accelerationDelta: 30,
    
    // accelerationMax: 최대 가속도 배율
    // 연속 스크롤 시 최대 몇 배까지 빨라질지 설정
    // 권장: 1-3 (기본값: 3)
    accelerationMax: 2,
    
    // keyboardSupport: 키보드 화살표 키로 스크롤 가능 여부
    // true = 화살표 키 사용 가능, false = 비활성화
    keyboardSupport: true,
    
    // arrowScroll: 화살표 키 한 번에 스크롤되는 픽셀
    // 권장: 30-100 (기본값: 50)
    arrowScroll: 50,
    
    // pulseAlgorithm: 맥박 알고리즘 활성화
    // 스크롤 휠의 물리적 움직임을 더 자연스럽게 시뮬레이션
    // true = 자연스러운 감속, false = 선형 감속
    pulseAlgorithm: true,
    
    // pulseScale: 맥박 효과의 강도
    // 값이 클수록 더 뚜렷한 감속 효과
    // 권장: 2-8 (기본값: 4)
    pulseScale: 4,
    
    // pulseNormalize: 맥박 정규화 값
    // 다양한 입력 장치 간의 스크롤 속도 균일화
    // 권장: 1 (기본값: 1)
    pulseNormalize: 1,
    
    // touchpadSupport: 트랙패드/터치패드 지원
    // MacBook 트랙패드 등에서도 부드러운 스크롤 적용
    touchpadSupport: true
});

/* ============================================
   커스터마이징 팁:
   ============================================
   
   1. 더 빠른 스크롤을 원한다면:
      - stepSize를 90-120으로 증가
      - animationTime을 400-600으로 감소
   
   2. 더 부드럽고 느린 스크롤을 원한다면:
      - stepSize를 50-70으로 감소
      - animationTime을 1000-1500으로 증가
   
   3. 더 자연스러운 감속 효과를 원한다면:
      - pulseAlgorithm을 true로 유지
      - pulseScale을 6-8로 증가
   
   4. 스크롤 가속을 없애려면:
      - accelerationMax를 1로 설정
      - accelerationDelta를 0으로 설정
   
   ============================================ */

// Animation elements detection
function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.pageYOffset;
    const windowBottomPosition = windowTopPosition + windowHeight;
    
    const animationElements = document.querySelectorAll('.work-item, .content-center, .section-title, .gallery-item, .gallery-title');
    
    animationElements.forEach(element => {
        const elementHeight = element.offsetHeight;
        const elementTopPosition = element.offsetTop;
        const elementBottomPosition = elementTopPosition + elementHeight;
        
        // Check if element is within viewport
        if ((elementBottomPosition >= windowTopPosition) &&
            (elementTopPosition <= windowBottomPosition)) {
            element.classList.add('in-view');
        }
    });
}

/* ============================================
   Hero Section Parallax Effect
   ============================================
   
   Hero 섹션의 배경이 느리게 스크롤되다가
   About 섹션으로 넘어갈 때 빠르게 올라가는 효과
   
   ============================================ */

function heroParallaxEffect() {
    const heroSection = document.getElementById('hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (!heroSection || !heroBackground) return;
    
    const scrollPosition = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    const heroBottom = heroSection.offsetTop + heroHeight;
    const initialOffset = 0; // 초기 오프셋 없음
    
    // Hero 섹션 내에 있을 때
    if (scrollPosition < heroHeight) {
        // 50% 속도로 패럴랙스 효과 (느리게 스크롤)
        const parallaxValue = initialOffset + scrollPosition * 0.5;
        heroBackground.style.transform = `translateY(${parallaxValue}px)`;
    } 
    // Hero 섹션을 벗어났을 때
    else {
        // 빠르게 올라가는 효과
        const fastScrollValue = initialOffset + heroHeight * 0.5 + (scrollPosition - heroHeight) * 1.5;
        heroBackground.style.transform = `translateY(${fastScrollValue}px)`;
    }
}

/* ============================================
   IF 로고 Fade Out - Showcase Section
   ============================================
   
   Hero section에서는 보이고, About section을 지나
   Showcase section에 가까워지면 점차 사라집니다.
   
   ============================================ */

// Hero Overlay 제거 및 스크롤 제어
let overlayCleared = false;
let isScrollLocked = false;

function handleHeroOverlayScroll(e) {
    const heroSection = document.getElementById('hero');
    const scrollPosition = window.pageYOffset;
    
    // Hero 섹션에 있고, overlay가 아직 제거되지 않았을 때
    if (scrollPosition === 0 && !overlayCleared) {
        // 첫 스크롤 시도 감지
        if (!isScrollLocked) {
            isScrollLocked = true;
            e.preventDefault();
            
            // Overlay 제거
            heroSection.classList.add('overlay-clear');
            overlayCleared = true;
            
            // 잠시 후 스크롤 잠금 해제
            setTimeout(() => {
                isScrollLocked = false;
            }, 600); // transition 시간과 동일
        }
    }
}

function ifLogoFadeEffect() {
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const gallerySection = document.getElementById('gallery');
    const exhibitionSection = document.getElementById('exhibition');
    const contactSection = document.getElementById('contact');
    const ifLogo = document.querySelector('.hero-if-logo');
    
    if (!heroSection || !aboutSection || !gallerySection || !exhibitionSection || !contactSection || !ifLogo) return;
    
    const scrollPosition = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    const aboutTop = aboutSection.offsetTop;
    const aboutHeight = aboutSection.offsetHeight;
    const aboutBottom = aboutTop + aboutHeight;
    const galleryTop = gallerySection.offsetTop;
    const exhibitionTop = exhibitionSection.offsetTop;
    const exhibitionHeight = exhibitionSection.offsetHeight;
    const contactTop = contactSection.offsetTop;
    const contactHeight = contactSection.offsetHeight;
    
    // Hero 섹션에서는 완전히 보임
    if (scrollPosition < heroHeight) {
        ifLogo.style.opacity = '1.0';
    }
    // About 섹션 중간까지만 보임 (60% 지점까지)
    else if (scrollPosition < aboutTop + aboutHeight * 0.1) {
        ifLogo.style.opacity = '1.0';
    }
    // About 섹션 중후반에서 빠르게 사라짐 (60%~75%에서 빠른 fade out)
    else if (scrollPosition < aboutTop + aboutHeight * 0.25) {
        const fadeStart = aboutTop + aboutHeight * 0.6;
        const fadeDistance = aboutHeight * 0.15;
        const fadeProgress = (scrollPosition - fadeStart) / fadeDistance;
        const opacity = 1.0 * (1 - fadeProgress);
        ifLogo.style.opacity = Math.max(0, opacity).toString();
    }
    // Exhibition 섹션 마지막 15% 전까지: 숨김
    else if (scrollPosition < exhibitionTop + exhibitionHeight * 0.85) {
        ifLogo.style.opacity = '0';
    }
    // Exhibition 섹션 마지막 15%에서 빠르게 fade in (앞부분 fade out과 동일한 속도)
    else if (scrollPosition < exhibitionTop + exhibitionHeight) {
        const fadeStart = exhibitionTop + exhibitionHeight * 0.5;
        const fadeDistance = exhibitionHeight * 0.5;
        const fadeProgress = (scrollPosition - fadeStart) / fadeDistance;
        const opacity = 1.0 * fadeProgress;
        ifLogo.style.opacity = Math.max(0, opacity).toString();
    }
    // Contact 섹션 내부: 완전히 보임
    else {
        ifLogo.style.opacity = '1.0';
    }
}

/* ============================================
   커스텀 마우스 커서
   ============================================
   
   기본 마우스 커서를 숨기고 커스텀 디자인의 
   원형 커서로 대체합니다.
   
   - 기본: 20px 원형 테두리
   - Hover: 40px 원형으로 확대
   - Click: 0.8배로 축소 애니메이션
   - mix-blend-mode: 배경에 따라 색상 반전
   
   ============================================ */

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// 마우스 움직임에 따라 커서 위치 업데이트
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover 효과: 클릭 가능한 요소에 마우스 올릴 때 커서 확대
const clickableElements = document.querySelectorAll('a, button, .work-item, .placeholder-image');
clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Click 효과: 클릭 시 커서 축소/복원
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

/* ============================================
   커스텀 커서 수정 방법:
   ============================================
   
   CSS 스타일 변경 (아래 DOMContentLoaded 참고):
   
   1. 커서 크기 변경:
      width, height 값 조정 (현재: 20px)
   
   2. 커서 색상 변경:
      border: 2px solid #색상코드;
   
   3. Hover 크기 변경:
      .cursor.hover의 width, height 조정 (현재: 40px)
   
   4. 애니메이션 속도 변경:
      transition의 0.15s 값 조정
   
   5. mix-blend-mode 제거:
      mix-blend-mode: difference; 라인 삭제
   
   ============================================ */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add custom cursor CSS
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #f5f5f7;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                        width 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                        height 0.15s cubic-bezier(0.16, 1, 0.3, 1);
            mix-blend-mode: difference;
        }
        
        .cursor.hover {
            width: 40px;
            height: 40px;
            background: rgba(245, 245, 247, 0.1);
        }
        
        .work-item, .content-center, .section-title, .gallery-item, .gallery-title {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .work-item.in-view, .content-center.in-view, .section-title.in-view, 
        .gallery-item.in-view, .gallery-title.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        * {
            cursor: none !important;
        }
        
        /* 모달 내부는 기본 커서 사용 */
        #workModal,
        #workModal * {
            cursor: auto !important;
        }
        
        /* 캐러셀 컨테이너는 grab 커서 사용 */
        #workModal .carousel-container {
            cursor: grab !important;
        }
        
        #workModal .carousel-container:active {
            cursor: grabbing !important;
        }
        
        #workModal a,
        #workModal button,
        #workModal .modal-close {
            cursor: pointer !important;
        }
    `;
    document.head.appendChild(style);
    
    // Check animations on scroll and resize
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    checkIfInView(); // Initial check
    
    // Hero Parallax Effect
    window.addEventListener('scroll', heroParallaxEffect);
    
    // IF Logo Fade Effect
    window.addEventListener('scroll', ifLogoFadeEffect);
    ifLogoFadeEffect(); // Initial check
    
    // Hero Overlay Scroll Control
    window.addEventListener('wheel', handleHeroOverlayScroll, { passive: false });
    window.addEventListener('touchmove', handleHeroOverlayScroll, { passive: false });
    
    // Horizontal Gallery Scroll with Mouse Drag
    setupHorizontalGalleryScroll();
});

/* ============================================
   Modal 기능
   ============================================
   
   Featured Works 항목을 클릭하면 상세 정보를 
   오버레이 모달로 표시합니다.
   
   ============================================ */

// Work 데이터 - 각 프로젝트당 여러 이미지를 추가할 수 있습니다
const worksData = {
    1: {
        images: [
            "src/wh/thumb-1.png",
            "src/wh/thumb-2.png",
            "src/wh/thumb-3.png",
            "src/wh/thumb-4.png"
        ]
    },
    2: {
        images: [
            "src/wh/story-1.png",
            "src/wh/story-2.png",
            "src/wh/story-3.png",
            "src/wh/story-4.png",
            "src/wh/story-5.png",
            "src/wh/story-6.png",
            "src/wh/story-7.png",
            "src/wh/story-8.png"
        ]
    },
    3: {
        images: [
            "src/wh/obj-1.png",
            "src/wh/obj-2.png",
            "src/wh/obj-3.png",
            "src/wh/obj-4.png",
            "src/wh/obj-6.png"
        ]
    },
    4: {
        images: [
            "src/wh/chat-1.jpeg",
            "src/wh/chat-2.jpeg",
            "src/wh/chat-3.jpeg",
            "src/wh/chat-4.jpeg"
        ]
    },
    5: {
        images: [
            "Image 1",
            "Image 2",
            "Image 3",
            "Image 4",
            "Image 5"
        ]
    },
    6: {
        images: [
            "Image 1",
            "Image 2",
            "Image 3"
        ]
    }
};

let currentSlideIndex = 0;
let currentWorkImages = [];
let randomStartIndices = {}; // 각 work의 랜덤 시작 인덱스 저장

// 모달 열기
function openModal(workId) {
    const modal = document.getElementById('workModal');
    const work = worksData[workId];
    
    if (!work) {
        console.error('Work not found:', workId);
        return;
    }
    
    // 랜덤 시작 인덱스가 없으면 생성 (페이지 로드 시 한 번만)
    if (randomStartIndices[workId] === undefined) {
        randomStartIndices[workId] = Math.floor(Math.random() * work.images.length);
    }
    
    const startIndex = randomStartIndices[workId];
    
    // 이미지 배열을 랜덤 시작점부터 순환하도록 재배열
    const reorderedImages = [
        ...work.images.slice(startIndex),
        ...work.images.slice(0, startIndex)
    ];
    
    currentWorkImages = reorderedImages;
    currentSlideIndex = 0;
    
    // 캐러셀 업데이트
    updateCarousel();
    
    // 모달 표시
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        // 모달이 표시된 후 마우스/터치 스와이프 이벤트 설정
        setupSwipeEvents();
    }, 10);
    
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
}

// 캐러셀 업데이트
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    // 슬라이드 생성
    track.innerHTML = currentWorkImages.map((imageSrc, index) => {
        // 이미지 경로인지 확인 (src/로 시작하는지)
        const isImage = imageSrc.startsWith('src/');
        
        return `
            <div class="carousel-slide ${index === currentSlideIndex ? 'active' : ''}">
                ${isImage ? 
                    `<img src="${imageSrc}" alt="Project image ${index + 1}">` : 
                    `<div class="placeholder-image"><span>${imageSrc}</span></div>`
                }
            </div>
        `;
    }).join('');
    
    // 점 인디케이터 생성
    dotsContainer.innerHTML = currentWorkImages.map((_, index) => `
        <div class="carousel-dot ${index === currentSlideIndex ? 'active' : ''}" onclick="goToSlide(${index})"></div>
    `).join('');
}

// 슬라이드 변경
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // 순환 처리
    if (currentSlideIndex < 0) {
        currentSlideIndex = currentWorkImages.length - 1;
    } else if (currentSlideIndex >= currentWorkImages.length) {
        currentSlideIndex = 0;
    }
    
    updateCarousel();
}

// 특정 슬라이드로 이동
function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('workModal');
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // body 스크롤 복원
    document.body.style.overflow = '';
    
    // 스와이프 리스너 플래그 리셋
    swipeListenersAdded = false;
}

// 키보드 이벤트 처리 (ESC로 모달 닫기, 화살표로 슬라이드 이동)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('workModal');
    
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// 마우스 드래그 & 터치 스와이프 기능
let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;
let isDragging = false;
let swipeListenersAdded = false;

function setupSwipeEvents() {
    const container = document.querySelector('.carousel-container');
    
    if (!container) return;
    
    // 이미 이벤트가 추가되었다면 리턴
    if (swipeListenersAdded) return;
    
    // 시작 위치 저장 (마우스 또는 터치)
    const handleStart = (e) => {
        isDragging = true;
        if (e.type === 'mousedown') {
            startX = e.clientX;
            startY = e.clientY;
        } else if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    };
    
    // 이동 중 (마우스 또는 터치)
    const handleMove = (e) => {
        if (!isDragging) return;
        
        let currentX, currentY;
        if (e.type === 'mousemove') {
            currentX = e.clientX;
            currentY = e.clientY;
        } else if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }
        
        const diffX = Math.abs(startX - currentX);
        const diffY = Math.abs(startY - currentY);
        
        // 가로 드래그가 세로보다 크면 드래그로 간주
        if (diffX > diffY && diffX > 10) {
            // 스크롤 방지
            if (e.cancelable) {
                e.preventDefault();
            }
        }
    };
    
    // 종료 (마우스 또는 터치)
    const handleEnd = (e) => {
        if (!isDragging) return;
        
        if (e.type === 'mouseup') {
            endX = e.clientX;
        } else if (e.type === 'touchend') {
            endX = e.changedTouches[0].clientX;
        }
        
        const diffX = startX - endX;
        
        // 최소 50픽셀 이상 드래그/스와이프
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // 왼쪽으로 드래그 -> 다음 슬라이드
                changeSlide(1);
            } else {
                // 오른쪽으로 드래그 -> 이전 슬라이드
                changeSlide(-1);
            }
        }
        
        // 초기화
        isDragging = false;
        startX = 0;
        endX = 0;
    };
    
    // 마우스 이벤트
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    // 터치 이벤트
    container.addEventListener('touchstart', handleStart, { passive: true });
    container.addEventListener('touchmove', handleMove, { passive: false });
    container.addEventListener('touchend', handleEnd, { passive: true });
    
    swipeListenersAdded = true;
}

// 모달 외부 클릭시 닫기는 이미 HTML의 onclick="closeModal()"로 처리됨

/* ============================================
   Horizontal Gallery Scroll with Drag
   ============================================ */

function setupHorizontalGalleryScroll() {
    const gallery = document.querySelector('.gallery-scroll');
    
    if (!gallery) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        gallery.style.cursor = 'grabbing';
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });
    
    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mouseup', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 3; // 스크롤 속도를 빠르게 (3배)
        gallery.scrollLeft = scrollLeft - walk;
    });
    
    // 터치 스크롤은 자동으로 지원됨
}

/* ============================================
   Timeline Item Click Handler
   ============================================ */

function setupTimelineClickHandlers() {
    const clickableItems = document.querySelectorAll('.timeline-content.timeline-clickable');
    
    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            
            if (type === 'link') {
                const url = this.dataset.url;
                window.open(url, '_blank', 'noopener,noreferrer');
            } else if (type === 'image') {
                const imageSrc = this.dataset.image;
                openTimelineImageModal(imageSrc);
            }
        });
    });
}

/* ============================================
   Timeline Image Modal Functions
   ============================================ */

function openTimelineImageModal(imageSrc) {
    const modal = document.getElementById('timelineImageModal');
    const modalImage = document.getElementById('timelineModalImage');
    const modalContent = modal.querySelector('.timeline-modal-content');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking on the image or modal content
    const closeOnClick = function(e) {
        closeTimelineImageModal();
        modalContent.removeEventListener('click', closeOnClick);
    };
    
    // Use setTimeout to prevent immediate closing from the timeline item click
    setTimeout(() => {
        modalContent.addEventListener('click', closeOnClick);
    }, 100);
}

function closeTimelineImageModal() {
    const modal = document.getElementById('timelineImageModal');
    
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const timelineModal = document.getElementById('timelineImageModal');
        if (timelineModal.classList.contains('active')) {
            closeTimelineImageModal();
        }
    }
});

/* ============================================
   Initialize Work Thumbnails with Random Images
   ============================================ */

function initializeWorkThumbnails() {
    // Work 1부터 4까지 각각의 썸네일 초기화
    for (let workId = 1; workId <= 4; workId++) {
        const work = worksData[workId];
        if (!work) continue;
        
        // 랜덤 인덱스 생성 및 저장
        if (randomStartIndices[workId] === undefined) {
            randomStartIndices[workId] = Math.floor(Math.random() * work.images.length);
        }
        
        // 썸네일 이미지 업데이트
        const thumbElement = document.getElementById(`work-thumb-${workId}`);
        if (thumbElement) {
            thumbElement.src = work.images[randomStartIndices[workId]];
        }
    }
}

/* ============================================
   Interactive Shadow Effect on Features
   ============================================ */

function setupInteractiveShadow() {
    const workMediaElements = document.querySelectorAll('.work-media');
    
    workMediaElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // 박스 내 마우스 x 위치
            const y = e.clientY - rect.top;  // 박스 내 마우스 y 위치
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 마우스 위치에 따라 그림자 오프셋 계산 (같은 방향)
            const shadowX = (x - centerX) / 10; // 마우스와 같은 방향
            const shadowY = (y - centerY) / 10;
            
            // 그림자 블러와 스프레드
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const intensity = (distance / maxDistance) * 0.12 + 0.1; // 0.1 ~ 0.35 (적당하게)
            
            element.style.boxShadow = `
                ${shadowX}px ${shadowY}px ${25 + distance / 12}px rgba(229, 130, 69, ${intensity}),
                0 4px 20px rgba(0, 0, 0, 0.2)
            `;
        });
        
        element.addEventListener('mouseleave', function() {
            // 마우스가 벗어나면 원래 그림자로 복귀
            element.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        });
    });
}

/* ============================================
   Mobile Menu Toggle
   ============================================ */

function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu on button click
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('open');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('open');
        }
    });
    
    // Close menu on scroll
    window.addEventListener('scroll', function() {
        navMenu.classList.remove('open');
    });
}

// Initialize timeline click handlers and work thumbnails when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupTimelineClickHandlers();
    initializeWorkThumbnails();
    setupInteractiveShadow();
    setupMobileMenu();
    setupContactForm();
});

/* ============================================
   Contact Form Handler
   ============================================ */

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const formData = new FormData(form);
        
        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.style.display = 'none';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! Something went wrong. Please try again or email me directly.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}
