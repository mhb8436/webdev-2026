// ============================================
// Day 05 연습 문제 풀이 - DOM, 이벤트
// ============================================

// --------------------------------------------
// 문제 1: 간단한 카운터
// --------------------------------------------
(function () {
    let count = 0;
    const display = document.getElementById('counter-display');
    const btnIncrease = document.getElementById('btn-increase');
    const btnDecrease = document.getElementById('btn-decrease');
    const btnReset = document.getElementById('btn-reset');

    function updateDisplay() {
        display.textContent = count;
    }

    btnIncrease.addEventListener('click', function () {
        count++;
        updateDisplay();
    });

    btnDecrease.addEventListener('click', function () {
        if (count > 0) {
            count--;
        }
        updateDisplay();
    });

    btnReset.addEventListener('click', function () {
        count = 0;
        updateDisplay();
    });
})();

// --------------------------------------------
// 문제 2: 실시간 글자수 세기
// --------------------------------------------
(function () {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');

    textInput.addEventListener('input', function () {
        const text = textInput.value;

        // 글자수 계산
        const chars = text.length;
        charCount.textContent = chars;

        // 단어수 계산 (공백으로 구분, 빈 문자열 필터링)
        const trimmed = text.trim();
        let words = 0;
        if (trimmed.length > 0) {
            words = trimmed.split(/\s+/).length;
        }
        wordCount.textContent = words;

        // 100자 이상 경고
        if (chars >= 100) {
            charCount.classList.add('warning');
        } else {
            charCount.classList.remove('warning');
        }
    });
})();

// --------------------------------------------
// 문제 3: 랜덤 색상 생성기
// --------------------------------------------
(function () {
    const btnRandomColor = document.getElementById('btn-random-color');
    const currentColorDisplay = document.getElementById('current-color');
    const colorHistory = document.getElementById('color-history');
    const colorSection = document.getElementById('color-section');

    const history = [];

    function getRandomColor() {
        const hex = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return '#' + hex;
    }

    function updateHistory(color) {
        // 히스토리에 추가 (앞쪽에)
        history.unshift(color);

        // 최대 5개까지만 유지
        if (history.length > 5) {
            history.pop();
        }

        // 히스토리 UI 업데이트
        colorHistory.innerHTML = '';
        for (let i = 0; i < history.length; i++) {
            const item = document.createElement('div');
            item.className = 'color-item';
            item.style.backgroundColor = history[i];
            item.textContent = history[i];
            colorHistory.appendChild(item);
        }
    }

    btnRandomColor.addEventListener('click', function () {
        const newColor = getRandomColor();

        // 배경색 변경
        colorSection.style.backgroundColor = newColor;

        // 현재 색상 표시
        currentColorDisplay.textContent = '현재 색상: ' + newColor;
        currentColorDisplay.style.color = newColor;

        // 히스토리 업데이트
        updateHistory(newColor);
    });
})();

// --------------------------------------------
// 문제 4: 간단한 퀴즈 앱
// --------------------------------------------
(function () {
    const quizData = [
        {
            question: 'Q1. JavaScript에서 변수를 선언할 때 사용하지 않는 키워드는?',
            options: ['let', 'const', 'var', 'int'],
            answer: 3,
        },
        {
            question: 'Q2. 배열의 길이를 구하는 속성은?',
            options: ['size', 'length', 'count', 'total'],
            answer: 1,
        },
        {
            question: 'Q3. HTML 요소를 ID로 선택하는 메서드는?',
            options: [
                'document.querySelector()',
                'document.getElementByClass()',
                'document.getElementById()',
                'document.selectElement()',
            ],
            answer: 2,
        },
    ];

    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');

    let score = 0;
    let answeredCount = 0;
    const totalQuestions = quizData.length;

    // 퀴즈 문제 생성
    function renderQuiz() {
        quizContainer.innerHTML = '';

        for (let i = 0; i < quizData.length; i++) {
            const quiz = quizData[i];

            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.id = 'question-' + i;

            const title = document.createElement('h3');
            title.textContent = quiz.question;
            questionDiv.appendChild(title);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            for (let j = 0; j < quiz.options.length; j++) {
                const option = document.createElement('div');
                option.className = 'quiz-option';
                option.textContent = quiz.options[j];
                option.setAttribute('data-question', i);
                option.setAttribute('data-option', j);

                option.addEventListener('click', handleAnswer);
                optionsDiv.appendChild(option);
            }

            questionDiv.appendChild(optionsDiv);
            quizContainer.appendChild(questionDiv);
        }
    }

    function handleAnswer(event) {
        const questionIndex = parseInt(
            event.target.getAttribute('data-question')
        );
        const optionIndex = parseInt(
            event.target.getAttribute('data-option')
        );
        const correctAnswer = quizData[questionIndex].answer;

        // 해당 문제의 모든 옵션 비활성화
        const questionDiv = document.getElementById(
            'question-' + questionIndex
        );
        const allOptions = questionDiv.querySelectorAll('.quiz-option');
        for (let i = 0; i < allOptions.length; i++) {
            allOptions[i].classList.add('disabled');
            allOptions[i].removeEventListener('click', handleAnswer);
        }

        // 정답/오답 표시
        if (optionIndex === correctAnswer) {
            event.target.classList.add('correct');
            score++;
        } else {
            event.target.classList.add('wrong');
            // 정답도 표시
            allOptions[correctAnswer].classList.add('correct');
        }

        answeredCount++;

        // 모든 문제를 풀었으면 결과 표시
        if (answeredCount === totalQuestions) {
            showResult();
        }
    }

    function showResult() {
        quizResult.style.display = 'block';
        quizResult.textContent =
            '총 점수: ' + score + '/' + totalQuestions + '점';

        if (score === totalQuestions) {
            quizResult.style.backgroundColor = '#27ae60';
            quizResult.style.color = 'white';
            quizResult.textContent += ' - 만점입니다!';
        } else if (score >= totalQuestions / 2) {
            quizResult.style.backgroundColor = '#f39c12';
            quizResult.style.color = 'white';
            quizResult.textContent += ' - 잘했습니다!';
        } else {
            quizResult.style.backgroundColor = '#e74c3c';
            quizResult.style.color = 'white';
            quizResult.textContent += ' - 다시 도전해보세요!';
        }
    }

    // 초기 렌더링
    renderQuiz();
})();
