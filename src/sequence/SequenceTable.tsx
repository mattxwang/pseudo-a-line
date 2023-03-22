import Kmer from '../ui/Kmer'
import type { ProcessedSequence } from '../util'

interface Props {
  k: number
  processedSequences: ProcessedSequence[]
}

export default function SequenceTable ({ k, processedSequences }: Props): JSX.Element {
  return (
    <table className='text-left border-spacing-8 overflow-x-auto block max-w-fit'>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className='px-6 py-3'>#</th>
          <th className='px-6 py-3'>sequence</th>
          <th className='px-6 py-3'>distinct {k}-mers</th>
        </tr>
      </thead>
      <tbody>
        {processedSequences.map((processedSequence, i) =>
          <tr className='border-b dark:border-gray-700' key={`${processedSequence.sequence}${i}`}>
            <td className='px-6 py-3'>{i + 1}</td>
            <td className='px-6 py-3'>{processedSequence.sequence}</td>
            <td className='px-6 py-3'>
              <ul>
                {Array.from(processedSequence.kmers).map(key => <span key={key}><Kmer kmer={key} />{' '}</span>)}
              </ul>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
