import type { ProcessedSequence } from './util';

type Props = {
  k: number,
  processedSequences: ProcessedSequence[],
}

export default function SequenceTable({k, processedSequences}: Props){
  return (
    <table className='text-left border-spacing-8 overflow-x-auto block max-w-fit'>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className='px-6 py-3'>#</th>
          <th className='px-6 py-3'>sequence</th>
          <th className='px-6 py-3'>{k}-mers</th>
        </tr>
      </thead>
      <tbody>
        {processedSequences.map((processedSequence, i) =>
          <tr className='border-b dark:border-gray-700' key={processedSequence.sequence}>
            <td className='px-6 py-3'>{i + 1}</td>
            <td className='px-6 py-3'>{processedSequence.sequence}</td>
            <td className='px-6 py-3'>
              <ul>
                {Array.from(processedSequence.kmers).map(key =>
                  <li className="inline border-2 border-blue-500 rounded-lg p-1.5 m-1.5" key={key}>{key}</li>)
                }
              </ul>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
