// 문제 3: FamilyMember 컴포넌트

interface FamilyMemberProps {
  name: string;
  relation: string;
  age: number;
  message: string;
}

function FamilyMember({ name, relation, age, message }: FamilyMemberProps) {
  const getBackgroundColor = (relation: string): string => {
    switch (relation) {
      case '아버지':
      case '어머니':
        return '#d5e8f0';
      case '형':
      case '누나':
      case '오빠':
      case '언니':
      case '동생':
        return '#d5f0d5';
      case '할아버지':
      case '할머니':
        return '#f0e8d5';
      default:
        return '#f0f0f0';
    }
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(relation),
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        maxWidth: '350px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>{name}</h4>
        <span
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        >
          {relation}
        </span>
      </div>
      <p style={{ margin: '8px 0 4px', fontSize: '14px', color: '#666' }}>
        나이: {age}세
      </p>
      <p style={{ margin: 0, fontStyle: 'italic', color: '#444' }}>
        "{message}"
      </p>
    </div>
  );
}

export default FamilyMember;
export type { FamilyMemberProps };
