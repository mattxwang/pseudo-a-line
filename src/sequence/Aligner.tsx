import { useState } from 'react'
import SequenceAlignment from './SequenceAlignment'
import type { KeyedAnnotatedHops } from '../util'

const DEFAULT_SEQUENCES = ['GGACGT', 'AAATGC']

interface Props {
  k: number
  keyedAnnotatedHops: KeyedAnnotatedHops
}

export default function Aligner ({ k, keyedAnnotatedHops }: Props): JSX.Element {
  const [inputSequence, setInputSequence] = useState<string>('')
  const [sequences, setSequences] = useState<string[]>([])

  function onSubmit (): void {
    const parsed = inputSequence
      .split(';')
      .map(seq => seq.replace(/\W/g, '').toUpperCase())
    setSequences(parsed)
    setInputSequence('')
  }

  return (
    <>
      <input className="input m-2" value={inputSequence} onChange={(e) => { setInputSequence(e.target.value) }} />
      <button className="btn btn-blue" onClick={onSubmit}>pseudoalign read</button>
      {
        sequences.length === 0
          ? <p>not sure? why not try <button className="underline" onClick={() => { setSequences(DEFAULT_SEQUENCES) }}>{DEFAULT_SEQUENCES.join('; ')}</button></p>
          : <div className='grid grid-cols-2 gap-4 py-4'>
              {
                sequences.map(sequence => {
                  return <>
                    <SequenceAlignment k={k} keyedAnnotatedHops={keyedAnnotatedHops} sequence={sequence} key={sequence} />
                    <SequenceAlignment k={k} keyedAnnotatedHops={keyedAnnotatedHops} sequence={sequence} key={sequence} reversed/>
                  </>
                })
              }
            </div>

      }
    </>
  )
}
