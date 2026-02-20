// 문제 3: FamilyList 컴포넌트

import FamilyMember from './FamilyMember';

interface FamilyMemberData {
  id: number;
  name: string;
  relation: string;
  age: number;
  message: string;
}

interface FamilyListProps {
  members: FamilyMemberData[];
}

function FamilyList({ members }: FamilyListProps) {
  return (
    <div>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        우리 가족 <strong>{members.length}명</strong>을 소개합니다!
      </p>
      {members.map((member) => (
        <FamilyMember
          key={member.id}
          name={member.name}
          relation={member.relation}
          age={member.age}
          message={member.message}
        />
      ))}
    </div>
  );
}

export default FamilyList;
