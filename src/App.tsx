import { useState } from 'react'
import './App.css'

function getKmers(sequence: string, k: number): Set<string> {
  if (sequence.length < k) {
    throw new Error(`k: ${k} is larger than the length of the sequence (${sequence.length})`);
  }

  const res = new Set<string>();

  for (let i = 0; i < (sequence.length - k) + 1; i++) {
    res.add(sequence.substring(i, i + k));
  }
  return res;
}

type SequenceProps = {
  sequence: string,
  k: number,
  kmers: Set<string>,
}

function Sequence({sequence, k, kmers}: SequenceProps) {
  return (
    <div>
      {sequence} {k}-mers:
      <ul>
        {Array.from(kmers).map(key => <li key={key}>{key}</li>)}
      </ul>
    </div>
  )
}

function App() {
  const FIXED_K = 3;
  const [sequence, setSequence] = useState<string>('');
  const [sequences, setSequences] = useState<string[]>([]);

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
    return ({
      sequence: sequence,
      k: FIXED_K,
      kmers: getKmers(sequence, FIXED_K),
    } as SequenceProps)
  })

  return (
    <div className="App">
      <h1>pseudo-a-line, meant</h1>
      <div className="card">
        <input className="input mx-2" value={sequence} onChange={onSequenceChange} />
        <button className="btn btn-blue" onClick={onSubmit}>Add Sequence</button>
      </div>
      {processedSequences.map(processedSequence => <Sequence key={processedSequence.sequence} {...processedSequence} />)}
    </div>
  )
}

export default App
