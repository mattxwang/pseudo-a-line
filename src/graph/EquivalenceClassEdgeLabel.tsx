import type { FC } from 'react'
import type { EdgeProps } from 'reactflow'
import { getBezierPath, EdgeLabelRenderer } from 'reactflow'
import EquivalenceClassCircles from '../ui/EquivalenceClassCircles'

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const seqs: number[] = data.seqs

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} />
      <EdgeLabelRenderer>
        <div style={{
          position: 'absolute',
          // TODO: fix this type with getBezierPath?
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          fontSize: 10
        }}>
          <EquivalenceClassCircles seqs={seqs}/>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge
