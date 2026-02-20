// ============================================
// 연습문제 3 풀이: StatsChart (클라이언트 컴포넌트)
// ============================================

// 클라이언트 컴포넌트인 이유:
// 호버(onMouseEnter/onMouseLeave) 인터랙션이 필요하므로
// 서버에서 계산된 데이터를 props로 전달받아 표시만 합니다.

"use client";

import { useState } from "react";

interface SalesData {
  month: string;
  amount: number;
}

interface StatsChartProps {
  data: SalesData[];
  maxAmount: number;
}

export default function StatsChart({ data, maxAmount }: StatsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.map((item, index) => {
        const widthPercent = (item.amount / maxAmount) * 100;
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={item.month}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              style={{
                width: "40px",
                textAlign: "right",
                fontSize: "14px",
                fontWeight: isHovered ? "bold" : "normal",
              }}
            >
              {item.month}
            </span>

            <div
              style={{
                flex: 1,
                height: "32px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${widthPercent}%`,
                  height: "100%",
                  backgroundColor: isHovered ? "#0070f3" : "#60a5fa",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                }}
              >
                {isHovered && (
                  <span
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.amount}만원
                  </span>
                )}
              </div>
            </div>

            <span
              style={{
                width: "60px",
                fontSize: "14px",
                color: isHovered ? "#0070f3" : "#999",
              }}
            >
              {item.amount}만원
            </span>
          </div>
        );
      })}
    </div>
  );
}
