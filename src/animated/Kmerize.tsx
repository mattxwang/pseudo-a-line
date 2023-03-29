import { useState } from 'react'

import Highlighter from '../ui/Highlighter'
import Kmer from '../ui/Kmer'
import SequenceInputForm from '../sequence/SequenceInputForm'
import { getKmersOrdered } from '../util'

interface Props {
  sequence: string
  kmers: string[]
  k: number
}

function Stepper ({ sequence, kmers, k }: Props): JSX.Element {
  const [i, setI] = useState(0)

  return (
    <section className='border-2 p-3 rounded'>
      <h2 className='text-xl text-center'><Highlighter s={sequence} len={k} i={i}/></h2>
      {kmers.map((kmer, i) => <><Kmer kmer={kmer} key={`${kmer}${i}`} />{' '}</>)}
      {i < sequence.length - k && <button onClick={() => { setI(i + 1) }}>next</button>}
    </section>
  )
}

export default function Kmerize (): JSX.Element {
  const [k, setK] = useState<number>(3)
  const [sequences, setSequences] = useState<string[]>(['ACGGACGTAAA'])

  function addSequences (seqs: string[]): void {
    setSequences(sequences.concat(seqs))
  }

  return <>
    <section className="text-center">
      <h1 className='text-4xl'>kmerize</h1>
      <SequenceInputForm k={k} setK={setK} addSequences={addSequences} />
    </section>
    {
        sequences.map(sequence => {
          const kmers = getKmersOrdered(sequence, k)
          return <Stepper sequence={sequence} kmers={kmers} k={k} key={sequence} />
        })
      }
  </>
}
