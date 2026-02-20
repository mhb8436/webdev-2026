// 할일 목록 전용 로딩 UI
// /todos 페이지가 로딩 중일 때 표시됩니다
// 스켈레톤 UI로 실제 콘텐츠의 형태를 미리 보여줍니다

export default function TodosLoading() {
  return (
    <div className="todo-app">
      <h1 style={{ marginBottom: '1.5rem' }}>할일 목록</h1>
      {/* 스켈레톤 UI - 할일 항목이 로딩 중임을 시각적으로 표시 */}
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton-item" />
        ))}
      </div>
      <p className="loading-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
        할일 목록을 불러오는 중...
      </p>
    </div>
  );
}
