// 문제 2: Rating 컴포넌트

interface RatingProps {
  score: number;
}

function Rating({ score }: RatingProps) {
  const maxScore = 5;

  return (
    <span style={{ color: '#f1c40f', fontSize: '20px' }}>
      {Array(maxScore)
        .fill(null)
        .map((_, index) => (
          <span key={index}>{index < score ? '★' : '☆'}</span>
        ))}
      <span style={{ color: '#999', fontSize: '14px', marginLeft: '8px' }}>
        ({score}/{maxScore})
      </span>
    </span>
  );
}

export default Rating;
