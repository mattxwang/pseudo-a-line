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
    const stripped = sequence.replace(/\W/g, '');
    n.push(stripped);
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
    <>
      <section className='text-center'>
        <h1>pseudo-a-line, meant</h1>
        <div className="m-2">
          <input className="input m-2" value={k} type="number" onChange={onKChange} />
          <button className="btn btn-blue" onClick={onSubmit}>change k</button>
          <br />
          <input className="input m-2" value={sequence} onChange={onSequenceChange} />
          <button className="btn btn-blue" onClick={onSubmit}>add sequence</button>
        </div>
      </section>
      {sequences.length === 0 ? <section className='text-center'>add a sequence, like ACATGTCCAGTC</section> : <>
        <div style={{ height: 500 }}>
          <NodeGraph processedSequences={processedSequences} key={sequences.toString() + k} />
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
