// Day 12 연습문제 정답 - 조건부 렌더링, 필터

import { useState } from 'react';

// ============================================
// 문제 1: 학생 성적표
// ============================================
interface Student {
  id: number;
  name: string;
  subject: string;
  score: number;
}

type FilterType = '전체' | '합격' | '불합격';

const students: Student[] = [
  { id: 1, name: '김철수', subject: '수학', score: 85 },
  { id: 2, name: '이영희', subject: '수학', score: 45 },
  { id: 3, name: '박민수', subject: '수학', score: 72 },
  { id: 4, name: '최지연', subject: '수학', score: 58 },
  { id: 5, name: '정우성', subject: '수학', score: 91 },
  { id: 6, name: '한소희', subject: '수학', score: 33 },
  { id: 7, name: '윤도현', subject: '수학', score: 67 },
  { id: 8, name: '서예진', subject: '수학', score: 78 },
];

function GradeReport() {
  const [filter, setFilter] = useState<FilterType>('전체');

  const filteredStudents = students.filter((student) => {
    if (filter === '합격') return student.score >= 60;
    if (filter === '불합격') return student.score < 60;
    return true;
  });

  const average =
    filteredStudents.length > 0
      ? (filteredStudents.reduce((sum, s) => sum + s.score, 0) / filteredStudents.length).toFixed(1)
      : '0';

  const filters: FilterType[] = ['전체', '합격', '불합격'];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 20px',
              margin: '0 4px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: filter === f ? '#2c3e50' : '#ecf0f1',
              color: filter === f ? 'white' : '#333',
              fontWeight: filter === f ? 'bold' : 'normal',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <p style={{ color: '#666' }}>
        {filter} 학생: {filteredStudents.length}명 | 평균 점수: {average}점
      </p>

      <div>
        {filteredStudents.map((student) => {
          const isPassed = student.score >= 60;
          return (
            <div
              key={student.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 16px',
                marginBottom: '4px',
                borderRadius: '4px',
                backgroundColor: isPassed ? '#d5f5e3' : '#fadbd8',
                maxWidth: '400px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{student.name}</span>
              <span>{student.subject}</span>
              <span>{student.score}점</span>
              <span
                style={{
                  color: isPassed ? '#27ae60' : '#e74c3c',
                  fontWeight: 'bold',
                }}
              >
                {isPassed ? '합격' : '불합격'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// 문제 2: 날씨 앱 UI
// ============================================
type Weather = '맑음' | '흐림' | '비' | '눈';

interface City {
  name: string;
  weather: Weather;
  temp: number;
  humidity: number;
  wind: number;
}

const cities: City[] = [
  { name: '서울', weather: '맑음', temp: 22, humidity: 45, wind: 3.2 },
  { name: '부산', weather: '흐림', temp: 19, humidity: 60, wind: 5.1 },
  { name: '제주', weather: '비', temp: 17, humidity: 80, wind: 7.3 },
  { name: '강릉', weather: '눈', temp: -2, humidity: 70, wind: 4.5 },
  { name: '대전', weather: '맑음', temp: 20, humidity: 50, wind: 2.8 },
];

const weatherEmoji: Record<Weather, string> = {
  맑음: '☀️',
  흐림: '☁️',
  비: '🌧️',
  눈: '❄️',
};

const weatherBg: Record<Weather, string> = {
  맑음: '#fff3cd',
  흐림: '#e2e3e5',
  비: '#cce5ff',
  눈: '#f0f8ff',
};

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city)}
            style={{
              padding: '10px 20px',
              border: '2px solid',
              borderColor: selectedCity?.name === city.name ? '#3498db' : '#ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedCity?.name === city.name ? '#3498db' : 'white',
              color: selectedCity?.name === city.name ? 'white' : '#333',
              fontWeight: selectedCity?.name === city.name ? 'bold' : 'normal',
            }}
          >
            {city.name}
          </button>
        ))}
      </div>

      {selectedCity ? (
        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: weatherBg[selectedCity.weather],
            maxWidth: '350px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '64px', margin: '0 0 8px' }}>
            {weatherEmoji[selectedCity.weather]}
          </p>
          <h3 style={{ margin: '0 0 4px' }}>{selectedCity.name}</h3>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px' }}>
            {selectedCity.weather}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '12px 0',
              borderTop: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <div>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
                {selectedCity.temp}°C
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>온도</p>
            </div>
            <div>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
                {selectedCity.humidity}%
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>습도</p>
            </div>
            <div>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
                {selectedCity.wind}m/s
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>풍속</p>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: '#999' }}>도시를 선택하면 날씨 정보를 확인할 수 있습니다.</p>
      )}
    </div>
  );
}

// ============================================
// 문제 3: 탭 컴포넌트
// ============================================
type TabType = '소개' | '경력' | '프로젝트';

function TabComponent() {
  const [activeTab, setActiveTab] = useState<TabType>('소개');

  const tabs: TabType[] = ['소개', '경력', '프로젝트'];

  const renderContent = () => {
    switch (activeTab) {
      case '소개':
        return (
          <div>
            <h3>안녕하세요!</h3>
            <p>저는 프론트엔드 개발자 홍길동입니다.</p>
            <p>사용자 경험을 중시하는 웹 개발에 관심이 많습니다.</p>
            <h4>관심 분야</h4>
            <ul>
              <li>React / TypeScript</li>
              <li>UI/UX 디자인</li>
              <li>웹 접근성</li>
              <li>성능 최적화</li>
            </ul>
          </div>
        );
      case '경력':
        return (
          <div>
            <h3>경력 사항</h3>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 4px' }}>ABC 테크 주식회사</h4>
              <p style={{ color: '#666', margin: '0 0 4px', fontSize: '14px' }}>
                2022.03 ~ 현재 | 프론트엔드 개발자
              </p>
              <p style={{ margin: 0 }}>React 기반 대시보드 개발</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 4px' }}>DEF 소프트 주식회사</h4>
              <p style={{ color: '#666', margin: '0 0 4px', fontSize: '14px' }}>
                2020.01 ~ 2022.02 | 주니어 개발자
              </p>
              <p style={{ margin: 0 }}>웹 서비스 유지보수 및 기능 개발</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px' }}>GHI 스타트업</h4>
              <p style={{ color: '#666', margin: '0 0 4px', fontSize: '14px' }}>
                2019.06 ~ 2019.12 | 인턴
              </p>
              <p style={{ margin: 0 }}>모바일 웹 페이지 구현</p>
            </div>
          </div>
        );
      case '프로젝트':
        return (
          <div>
            <h3>프로젝트</h3>
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
              }}
            >
              <h4 style={{ margin: '0 0 8px' }}>쇼핑몰 관리 대시보드</h4>
              <p style={{ margin: '0 0 8px', color: '#666' }}>
                실시간 매출 현황과 주문 관리 시스템
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ backgroundColor: '#e8f4fd', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>React</span>
                <span style={{ backgroundColor: '#e8f4fd', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>TypeScript</span>
                <span style={{ backgroundColor: '#e8f4fd', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>Chart.js</span>
              </div>
            </div>
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
              }}
            >
              <h4 style={{ margin: '0 0 8px' }}>날씨 알림 앱</h4>
              <p style={{ margin: '0 0 8px', color: '#666' }}>
                위치 기반 날씨 정보 및 알림 서비스
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ backgroundColor: '#e8f4fd', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>React</span>
                <span style={{ backgroundColor: '#e8f4fd', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>OpenWeather API</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #eee' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #3498db' : '3px solid transparent',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#3498db' : '#666',
              fontSize: '16px',
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px 0' }}>{renderContent()}</div>
    </div>
  );
}

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 12 연습문제 정답</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 학생 성적표</h2>
        <GradeReport />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 날씨 앱 UI</h2>
        <WeatherApp />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 탭 컴포넌트</h2>
        <TabComponent />
      </section>
    </div>
  );
}

export default App;
