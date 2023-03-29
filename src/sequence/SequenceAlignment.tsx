import EquivalenceClassCircles from '../ui/EquivalenceClassCircles'
import Kmer from '../ui/Kmer'
import type { KeyedAnnotatedHops } from '../util'
import { complement, getOrderedKmers, setIntersection, reverse } from '../util'

interface Props {
  k: number
  keyedAnnotatedHops: KeyedAnnotatedHops
  sequence: string
  reversed?: boolean
}

export default function SequenceAlignment ({ k, keyedAnnotatedHops, reversed, sequence }: Props): JSX.Element {
  const isReversed = (reversed ?? false)
  const searchSequence = isReversed ? complement(reverse(sequence)) : sequence
  const sequenceKmers = getOrderedKmers(searchSequence, k)
  const hopPairs = []

  for (let i = 0; i < sequenceKmers.length - 1; i++) {
    hopPairs.push(getEqvClassPairs(sequenceKmers[i], sequenceKmers[i + 1], keyedAnnotatedHops))
  }

  const totalAlignment = Array.from(setIntersection(
    ...(hopPairs.map(({ seqs }) => {
      return new Set<number>(seqs)
    })))
  )

  return <div className="border-2 border-gray-200 rounded py-1.5 px-2.5 my-1.5">
    <h3 className="text-lg mb-1.5 flex justify-between">
      <span>
        {searchSequence} {'-> '} <EquivalenceClassCircles seqs={totalAlignment.map(n => Number(n)).flat()}/>
      </span>
      <span>{isReversed ? 'rev + compl' : 'forward'}</span>
    </h3>
    <hr />
    <ol>
      {
        hopPairs.map(({ sourceKmer, targetKmer, seqs }) => {
          return <li className="my-3" key={`${sourceKmer}-${targetKmer}`}>
            <Kmer kmer={sourceKmer}/> {'->'} <Kmer kmer={targetKmer} /> {'-> '}
            <EquivalenceClassCircles seqs={seqs} />
          </li>
        })
      }
    </ol>
  </div>
}

function getEqvClassPairs (sourceKmer: string, targetKmer: string, keyedAnnotatedHops: KeyedAnnotatedHops): { sourceKmer: string, targetKmer: string, seqs: number[] } {
  if (!(sourceKmer in keyedAnnotatedHops)) {
    return { sourceKmer, targetKmer, seqs: [] }
  }
  for (const obj of keyedAnnotatedHops[sourceKmer]) {
    if (obj.target === targetKmer) {
      return { sourceKmer, targetKmer, seqs: obj.seqs }
    }
  }

  return { sourceKmer, targetKmer, seqs: [] }
}
