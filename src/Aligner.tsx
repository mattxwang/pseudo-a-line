import { useState } from "react"
import SequenceAlignment from "./SequenceAlignment"
import type { KeyedAnnotatedHops } from "./util"

type Props = {
  k: number,
  keyedAnnotatedHops: KeyedAnnotatedHops,
}

export default function Aligner({k, keyedAnnotatedHops}: Props) {
  const [inputSequence, setInputSequence] = useState<string>('');
  const [sequences, setSequences] = useState<string[]>([]);

  function onSubmit(){
    const parsed = inputSequence
      .split(';')
      .map(seq => seq.replace(/\W/g, ''))
    console.log(parsed)
    setSequences(parsed);
    setInputSequence('');
  }

  const Form = () => <>
    <input className="input m-2" value={inputSequence} onChange={(e) => setInputSequence(e.target.value)} />
    <button className="btn btn-blue" onClick={onSubmit}>pseudoalign sequence</button>
  </>

  if (sequences.length === 0) { return <Form /> }

  return (
    <>
      <Form />
      {
        sequences.map(sequence => <SequenceAlignment k={k} keyedAnnotatedHops={keyedAnnotatedHops} sequence={sequence} key={sequence} />)
      }
    </>
  )
}
