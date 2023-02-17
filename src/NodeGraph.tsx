import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import type { Edge, Node } from 'reactflow';

import 'reactflow/dist/style.css';
import type { ProcessedSequence } from './App';
import { setUnion } from './util';

function kmerToNode(kmer: string, i: number): Node<{label: string}> {
  return ({ id: kmer, position: { x: i * 100, y: i * 50 }, data: { label: kmer } });
}

type IndexedHop = {
  source: string,
  target: string,
  i: number,
}

type AnnotatedHop = {
  source: string,
  target: string,
  seqs: number[],
}

function generateIndexedHops(sequences: ProcessedSequence[]): IndexedHop[] {
  return sequences.map(({hopMap}, i) => {
    return Object.keys(hopMap).map(source => {
      return Array.from(hopMap[source]).map(target => {
        return {
          source,
          target,
          i,
        }
      })
    }).flat()
  }).flat()
}

// implict assumption: no '-' in string
function generateAnnotatedHops(hops: IndexedHop[]): AnnotatedHop[] {
  const res = {} as {[idx: string]: AnnotatedHop};
  for (const hop of hops) {
    const { source, target, i } = hop;
    const idx = `${source}-${target}`;

    if (!(idx in res)) {
      res[idx] = {
        source,
        target,
        seqs: [],
      }
    }

    res[idx].seqs.push(i);
  }
  return Object.values(res);
}

function generateEdges(sequences: ProcessedSequence[]) : Edge<string>[] {
  const indexedHops = generateIndexedHops(sequences);
  const annotatedHops = generateAnnotatedHops(indexedHops);
  return annotatedHops.map(({source, target, seqs}) => {
    return ({
      id: `${source}-${target}`,
      label: seqs.join('|'),
      source,
      target,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        height: 10,
        width: 10,
      },
      style: {
        strokeWidth: 2,
      },
    });
  })
}

type Props = {
  processedSequences: ProcessedSequence[],
}

export default function NodeGraph({processedSequences}: Props) {
  const kmers = setUnion(...(processedSequences.map(processedSequence => processedSequence.kmers)));
  const kmerNodes = Array.from(kmers).map(kmerToNode);
  const hopEdges = generateEdges(processedSequences);
  const [nodes,, onNodesChange] = useNodesState(kmerNodes);
  const [edges,, onEdgesChange] = useEdgesState(hopEdges);
  return (
  <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      // note: if we ever make money from this, we should remove this;
      // see: https://reactflow.dev/docs/guides/remove-attribution/
      proOptions={{hideAttribution: true}}
    >
      <Controls />
    <Background />
  </ReactFlow>
  );
}
