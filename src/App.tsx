import { useState } from 'react'

import SequenceInputForm from './sequence/SequenceInputForm'
import NodeGraph from './graph/NodeGraph'
import SequenceTable from './sequence/SequenceTable'
import { generateAnnotatedHops, generateIndexedHops, getEquivalenceClasses, getKeyedAnnotatedHops, getKmers, setUnion } from './util'
import type { ProcessedSequence } from './util'
import EquivalenceClassCircles from './ui/EquivalenceClassCircles'
import Aligner from './sequence/Aligner'

const DEFAULT_SEQUENCE = 'ACATGTCCAGTC'
const DEFAULT_MULTIPLE_SEQUENCES = ['ACGGACGTAAA', 'ACGGAGTAA', 'GGACGTAAA', 'GCTAAA']

function App (): JSX.Element {
  const [k, setK] = useState<number>(3)
  const [sequences, setSequences] = useState<string[]>([])

  function addSequences (seqs: string[]): void {
    setSequences(sequences.concat(seqs))
  }

  const processedSequences = sequences.map(sequence => {
    const { kmers, hopMap } = getKmers(sequence, k)
    const res: ProcessedSequence = {
      sequence,
      k,
      kmers,
      hopMap
    }
    return res
  })

  const indexedHops = generateIndexedHops(processedSequences)
  const annotatedHops = generateAnnotatedHops(indexedHops)
  const kmers = setUnion(...(processedSequences.map(processedSequence => processedSequence.kmers)))

  const eqvCls = getEquivalenceClasses(annotatedHops)
  const keyedAnnotatedHops = getKeyedAnnotatedHops(annotatedHops)

  const GetStarted = (): JSX.Element => (
    <section className='text-center'>
      start by adding a transcriptome, like{' '}
      <button className='underline' onClick={() => { addSequences([DEFAULT_SEQUENCE]) }}>{DEFAULT_SEQUENCE}</button>
      <br />
      or enter a series of transcriptomes separated by semicolons, like<br />
      <button className='underline' onClick={() => { addSequences(DEFAULT_MULTIPLE_SEQUENCES) }}>{DEFAULT_MULTIPLE_SEQUENCES.join('; ')}</button>
    </section>
  )

  const EquivalenceClasses = (): JSX.Element => <div className="mt-2 mb-4">
    {
      Array
        .from(eqvCls)
        .map(eq => JSON.parse(eq)) // TODO: this is fragile
        .map(seqs => <EquivalenceClassCircles key={String(seqs)} classes='!w-16 !h-16 text-xl font-bold' offset={24} seqs={seqs}/>)
    }
  </div>

  return (
    <>
      <section className='text-center'>
        <h1 className="text-5xl pb-2">pseudo-a-line, meant</h1>
        <SequenceInputForm k={k} setK={setK} addSequences={addSequences} />
      </section>
      {sequences.length === 0
        ? <GetStarted />
        : <>
        <div style={{ height: 500 }}>
          <NodeGraph annotatedHops={annotatedHops} kmers={kmers} key={`${sequences.toString()}${k}`} />
        </div>
        <section>
          <h2 className="text-xl">equivalence classes</h2>
          <EquivalenceClasses />
          <h2 className="text-xl mb-1.5">transcriptome library</h2>
          <SequenceTable processedSequences={processedSequences} k={k} />
        </section>
        <section>
          <h2 className="text-xl">pseudoalign a read(s)</h2>
          <Aligner k={k} keyedAnnotatedHops={keyedAnnotatedHops} />
        </section>
      </>}
    </>
  )
}

export default App
