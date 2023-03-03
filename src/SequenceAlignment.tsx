import { getOrderedKmers, KeyedAnnotatedHops } from "./util";

type Props = {
  k: number,
  keyedAnnotatedHops: KeyedAnnotatedHops,
  sequence: string,
}

export default function SequenceAlignment({k, keyedAnnotatedHops, sequence}: Props) {
  const sequenceKmers = getOrderedKmers(sequence, k)
  const hopPairs = [];

  for (let i = 0; i < sequenceKmers.length - 1; i ++) {
    hopPairs.push(getEqvClassPairs(sequenceKmers[i], sequenceKmers[i+1], keyedAnnotatedHops))
  }

  return <>
    <h2>sequence: {sequence}</h2>
    <p>overall alignment: (coming soon)</p>
    <ol>
      {
        hopPairs.map(({sourceKmer, targetKmer, seqs}) => {
          return <li key={`${sourceKmer}-${targetKmer}`}>
            {sourceKmer}-{targetKmer}: {seqs.map(seq => seq + 1).join(',')}
          </li>
        })
      }
    </ol>
  </>
}

function getEqvClassPairs(sourceKmer: string, targetKmer: string, keyedAnnotatedHops: KeyedAnnotatedHops) {
  if (!(sourceKmer in keyedAnnotatedHops)) {
    return {sourceKmer, targetKmer, seqs: []}
  }
  for (let obj of keyedAnnotatedHops[sourceKmer]) {
    if (obj.target === targetKmer) {
      return {sourceKmer, targetKmer, seqs: obj.seqs}
    }
  }

  return {sourceKmer, targetKmer, seqs: []}
}
