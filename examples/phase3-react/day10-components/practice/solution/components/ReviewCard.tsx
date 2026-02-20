// 문제 2: ReviewCard 컴포넌트

import Rating from './Rating';

interface ReviewCardProps {
  author: string;
  content: string;
  score: number;
}

function ReviewCard({ author, content, score }: ReviewCardProps) {
  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        maxWidth: '400px',
      }}
    >
      <Rating score={score} />
      <p style={{ fontWeight: 'bold', margin: '8px 0 4px' }}>{author}</p>
      <p style={{ color: '#555', margin: 0, fontStyle: 'italic' }}>
        "{content}"
      </p>
    </div>
  );
}

export default ReviewCard;
