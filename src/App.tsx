import { useState } from 'react'
import './App.css'

import NodeGraph from './NodeGraph';
import SequenceTable from './SequenceTable';
import { getKmers } from './util';
import type { HopMap } from './util';

export type ProcessedSequence = {
  sequence: string,
  k: number,
  kmers: Set<string>,
  hopMap: HopMap,
}

function App() {
  const [k, setK] = useState<number>(3);
  const [sequence, setSequence] = useState<string>('');
  const [sequences, setSequences] = useState<string[]>([]);

  function onKChange(e: React.ChangeEvent<HTMLInputElement>) {
    setK(Number(e.target.value));
  }

  function onSequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSequence(e.target.value);
  }

  function onSubmit(){
    const n = [...sequences];
    n.push(sequence);
    setSequences(n);
    setSequence('');
  }

  const processedSequences = sequences.map(sequence => {
    const {kmers, hopMap} = getKmers(sequence, k);
    return ({
      sequence,
      k,
      kmers,
      hopMap,
    } as ProcessedSequence)
  })

  return (
    <div className="App">
      <section className='text-center'>
        <h1>pseudo-a-line, meant</h1>
        <div className="card">
          <input className="input mx-2" value={k} type="number" onChange={onKChange} />
          <button className="btn btn-blue" onClick={onSubmit}>Set K</button>
          <input className="input mx-2" value={sequence} onChange={onSequenceChange} />
          <button className="btn btn-blue" onClick={onSubmit}>Add Sequence</button>
        </div>
      </section>
      {sequences.length > 0 && <>
        <div style={{ height: 500 }}>
          <NodeGraph processedSequences={processedSequences} key={sequences.toString() + k} />
        </div>
        <section>
          <SequenceTable processedSequences={processedSequences} k={k} />
        </section>
      </>}
    </div>
  )
}

export default App
