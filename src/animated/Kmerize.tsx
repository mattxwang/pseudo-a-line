import { useState } from 'react'

import Kmer from '../ui/Kmer'
import SequenceInputForm from '../sequence/SequenceInputForm'
import { getKmersOrdered } from '../util'

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
          return (
          <section className='border-2 p-3 rounded' key={sequence}>
            <h2 className='text-xl text-center'>{sequence}</h2>
            {kmers.map((kmer, i) => <><Kmer kmer={kmer} key={`${kmer}${i}`} />{' '}</>)}
          </section>
          )
        })
      }
  </>
}
