import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import type { ProcessedSequence } from './App';
import { setUnion } from './util';

type Props = {
  processedSequences: ProcessedSequence[],
}

function kmerToNode(kmer: string, i: number) {
  return ({ id: kmer, position: { x: i * 100, y: i * 50 }, data: { label: kmer } });
}

function generateEdges(kmers: string[], hopMaps: {[kmer: string]: Set<string>}[]): {id: string, source: string, target: string}[] {
  return (kmers.map(kmer => {
    const targets = setUnion(...(hopMaps.map(hopMap => hopMap[kmer])));
    return Array.from(targets).map(target => {
      return ({
        id: `${kmer}-${target}`,
        source: kmer,
        target
      })
    })
  })).flat();
}


export default function NodeGraph({processedSequences}: Props) {
  const kmers = setUnion(...(processedSequences.map(processedSequence => processedSequence.kmers)));
  const kmerNodes = Array.from(kmers).map(kmerToNode);
  const hopMaps = processedSequences.map(processedSequence => processedSequence.hopMap);
  const hopEdges = generateEdges(Array.from(kmers), hopMaps);
  const [nodes,, onNodesChange] = useNodesState(kmerNodes);
  const [edges,, onEdgesChange] = useEdgesState(hopEdges);
  return (
  <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <Controls />
    <Background />
  </ReactFlow>
  );
}
