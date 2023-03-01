import { useState } from 'react'

type Props = {
  k: number;
  setK: (k: number) => void;
  addSequence: (seq: string) => void;
}


export default function InputForm({k, setK, addSequence}: Props) {
  const [sequence, setSequence] = useState<string>('');

  function onKChange(e: React.ChangeEvent<HTMLInputElement>) {
    setK(Number(e.target.value));
  }

  function onSequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSequence(e.target.value);
  }

  function onSubmit(){
    const stripped = sequence.replace(/\W/g, '');
    addSequence(stripped);
    setSequence('');
  }

  return (
    <div className="m-2">
      <input className="input m-2" value={k} type="number" onChange={onKChange} />
      <button className="btn btn-blue" onClick={onSubmit}>change k</button>
      <br />
      <input className="input m-2" value={sequence} onChange={onSequenceChange} />
      <button className="btn btn-blue" onClick={onSubmit}>add sequence</button>
    </div>
  )
}
