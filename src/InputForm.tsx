import { useState } from 'react'

type Props = {
  k: number;
  setK: (k: number) => void;
  addSequences: (seq: string[]) => void;
}


export default function InputForm({k, setK, addSequences}: Props) {
  const [sequence, setSequence] = useState<string>('');

  function onKChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (val < 1) {
      return;
    }
    setK(val);
  }

  function onSequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSequence(e.target.value);
  }

  function onSubmit(){
    const parsed = sequence
      .split(';')
      .map(seq => seq.replace(/\W/g, ''))
    addSequences(parsed);
    setSequence('');
  }

  return (
    <div className="my-2">
      <input className="input m-2" value={k} type="number" onChange={onKChange} />
      <button className="btn btn-blue mr-4" onClick={onSubmit}>set k</button>
      <input className="input m-2" value={sequence} onChange={onSequenceChange} />
      <button className="btn btn-blue" onClick={onSubmit}>add sequence</button>
    </div>
  )
}
