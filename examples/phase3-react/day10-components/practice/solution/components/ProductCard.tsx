// 문제 1: ProductCard 컴포넌트

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

function ProductCard({ name, price, imageUrl, description }: ProductCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '220px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
      />
      <div style={{ padding: '12px' }}>
        <h4 style={{ margin: '0 0 8px' }}>{name}</h4>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#666' }}>
          {description}
        </p>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#e74c3c', fontSize: '18px' }}>
          {price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
export type { ProductCardProps };
