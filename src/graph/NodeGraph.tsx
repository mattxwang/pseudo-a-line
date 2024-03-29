import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState
} from 'reactflow'

import type { Edge, Node } from 'reactflow'

import 'reactflow/dist/style.css'
import type { AnnotatedHop } from '../util'
import { edgeTypes } from '../util'

function kmerToNode (kmer: string, i: number): Node<{ label: string }> {
  return ({
    id: kmer,
    position: { x: i * 100, y: (i % 4) * 25 + i * 10 },
    data: { label: kmer },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  })
}

function annotatedHopToEdge (source: string, target: string, seqs: number[]): Edge<{ seqs: number[] }> {
  return ({
    id: `${source}-${target}`,
    source,
    target,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 10,
      width: 10
    },
    style: {
      strokeWidth: 2
    },
    data: {
      seqs
    },
    type: 'custom'
  })
}

interface Props {
  annotatedHops: AnnotatedHop[]
  kmers: Set<string>
}

export default function NodeGraph ({ annotatedHops, kmers }: Props): JSX.Element {
  const kmerNodes = Array.from(kmers).map(kmerToNode)
  const hopEdges = annotatedHops.map(({ source, target, seqs }) => annotatedHopToEdge(source, target, seqs))
  const [nodes,, onNodesChange] = useNodesState(kmerNodes)
  const [edges,, onEdgesChange] = useEdgesState(hopEdges)
  return (
  <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      fitView
      // note: if we ever make money from this, we should remove this;
      // see: https://reactflow.dev/docs/guides/remove-attribution/
      proOptions={{ hideAttribution: true }}
    >
      <Controls />
    <Background />
  </ReactFlow>
  )
}
