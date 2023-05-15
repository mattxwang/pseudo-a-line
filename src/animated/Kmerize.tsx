import { useState } from 'react'

import Highlighter from '../ui/Highlighter'
import Kmer from '../ui/Kmer'
import SequenceInputForm from '../sequence/SequenceInputForm'
import { getKmers, getKmersOrdered } from '../util'

interface Props {
  sequence: string
  kmers: string[]
  k: number
}

function Stepper ({ sequence, kmers, k }: Props): JSX.Element {
  const [i, setI] = useState(0)

  const currentSequence = sequence.slice(0, i + k)

  const currentKmer = sequence.slice(i + k - 3, i + k)
  const currentKmers = getKmers(currentSequence, k).kmers

  return (
    <section className='border-2 p-3 rounded'>
      <h2 className='text-xl text-center'><Highlighter s={sequence} len={k} i={i}/></h2>
      {i < sequence.length - k && <button onClick={() => { setI(i + 1) }}>next</button>}
      <table className='text-left border-spacing-8 overflow-x-auto block max-w-fit'>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className='px-6 py-3'>#</th>
            <th className='px-6 py-3'>sequence</th>
            <th className='px-6 py-3'>distinct {k}-mers</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b dark:border-gray-700'>
            <td className='px-6 py-3'>1</td>
            <td className='px-6 py-3'>{currentSequence}</td>
            <td className='px-6 py-3'>
              <ul>
                {Array.from(currentKmers).map(key => <span key={key}><Kmer kmer={key} filled={key === currentKmer}/>{' '}</span>)}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
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
