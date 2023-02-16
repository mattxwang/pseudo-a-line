import { useState } from 'react'
import './App.css'

function getKmers(sequence: string, k: number): Set<string> {
  const res = new Set<string>();

  if (sequence.length < k) {
    return res;
  }

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
    <tr>
      <td>{sequence}</td>
      <td>
        <ul className='inline'>
          {Array.from(kmers).map(key => <li className="inline border-2 border-blue-500 rounded-lg p-1.5 m-1.5" key={key}>{key}</li>)}
        </ul>
      </td>
    </tr>
  )
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
    return ({
      sequence: sequence,
      k: k,
      kmers: getKmers(sequence, k),
    } as SequenceProps)
  })

  return (
    <div className="App">
      <h1>pseudo-a-line, meant</h1>
      <div className="card">
        <input className="input mx-2" value={k} type="number" onChange={onKChange} />
        <button className="btn btn-blue" onClick={onSubmit}>Set K</button>
        <input className="input mx-2" value={sequence} onChange={onSequenceChange} />
        <button className="btn btn-blue" onClick={onSubmit}>Add Sequence</button>
      </div>
      <table className='text-left'>
        <thead>
          <tr>
            <th>sequence</th>
            <th>{k}-mers</th>
          </tr>
        </thead>
        <tbody>
          {processedSequences.map(processedSequence => <Sequence key={processedSequence.sequence} {...processedSequence} />)}
        </tbody>
      </table>
    </div>
  )
}

export default App
