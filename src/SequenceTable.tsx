import type { ProcessedSequence } from './App';

type Props = {
  k: number,
  processedSequences: ProcessedSequence[],
}

export default function SequenceTable({k, processedSequences}: Props){
  return (
    <table className='border-spacing-8'>
      <thead>
        <tr>
          <th>#</th>
          <th>sequence</th>
          <th>{k}-mers</th>
        </tr>
      </thead>
      <tbody>
        {processedSequences.map((processedSequence, i) =>
          <tr key={processedSequence.sequence}>
            <td>{i}</td>
            <td>{processedSequence.sequence}</td>
            <td className='p-2.5'>
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
