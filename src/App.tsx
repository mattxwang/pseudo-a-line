import { useState } from 'react'
import './App.css'

import InputForm from './InputForm';
import NodeGraph from './NodeGraph';
import SequenceTable from './SequenceTable';
import { generateAnnotatedHops, generateIndexedHops, getKmers, setUnion } from './util';
import type { ProcessedSequence } from './util';

const DEFAULT_SEQUENCE = "ACATGTCCAGTC";

function App() {
  const [k, setK] = useState<number>(3);
  const [sequences, setSequences] = useState<string[]>([]);

  function addSequence(sequence: string) {
    const n = [...sequences];
    n.push(sequence);
    setSequences(n);
  }

  const processedSequences = sequences.map(sequence => {
    const {kmers, hopMap} = getKmers(sequence, k);
    return ({
      sequence,
      k,
      kmers,
      hopMap,
    } as ProcessedSequence)
  });

  const indexedHops = generateIndexedHops(processedSequences);
  const annotatedHops = generateAnnotatedHops(indexedHops);
  const kmers = setUnion(...(processedSequences.map(processedSequence => processedSequence.kmers)));

  return (
    <>
      <section className='text-center'>
        <h1>pseudo-a-line, meant</h1>
        <InputForm k={k} setK={setK} addSequence={addSequence} />
      </section>
      {sequences.length === 0 ?
        <section className='text-center'>start by adding a sequence, like{' '}
          <button onClick={() => addSequence(DEFAULT_SEQUENCE)}>{DEFAULT_SEQUENCE}</button>
        </section> : <>
        <div style={{ height: 500 }}>
          <NodeGraph annotatedHops={annotatedHops} kmers={kmers} key={sequences.toString() + k} />
        </div>
        <section>
          <SequenceTable processedSequences={processedSequences} k={k} />
        </section>
      </>}
      <hr />
      <section>
        <footer>on <a href="https://github.com/mattxwang/pseudo-a-line">github</a>; made by <a href="https://matthewwang.me/">matt</a> with <a href="https://reactjs.org/">react</a> + <a href="https://vitejs.dev/">vite</a>, <a href="https://tailwindcss.com/">tailwind</a>, <a href="https://reactflow.dev/">react flow</a></footer>
      </section>
    </>
  )
}

export default App
