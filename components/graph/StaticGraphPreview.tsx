export default function StaticGraphPreview() {
  const nodes = [
    { label: 'CORE', x: 50, y: 50, core: true },
    { label: 'IDENTITY', x: 30, y: 18 },
    { label: 'GROWTH', x: 70, y: 18 },
    { label: 'PRESENCE', x: 50, y: 85 },
    { label: 'OPS', x: 15, y: 60 },
    { label: 'INTEL', x: 85, y: 60 },
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Static preview of Algorythm Labs' relational system architecture"
    >
      {nodes.slice(1).map((node) => (
        <line
          key={node.label}
          x1={50}
          y1={50}
          x2={node.x}
          y2={node.y}
          stroke="var(--border)"
          strokeWidth={0.25}
        />
      ))}
      {nodes.map((node) => (
        <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
          <circle
            r={node.core ? 4 : 2.4}
            fill={node.core ? 'var(--fg)' : 'var(--bg)'}
            stroke="var(--fg)"
            strokeWidth={0.4}
          />
          <text
            y={node.core ? 0 : -5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={node.core ? 2.4 : 2.4}
            fontFamily="monospace"
            fill="var(--fg)"
            className="uppercase tracking-wide"
          >
            {node.core ? '' : node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}