import { getSequenceColor } from '../util'

interface Props {
  seqs: number[]
  classes?: string
  offset?: number
}

export default function EquivalenceClassCircles ({ classes, offset, seqs }: Props): JSX.Element {
  if (seqs.length === 0) {
    return <span className={`seq-circle ${classes ?? ''} bg-black`} >0</span>
  }

  const spacing = offset ?? 8
  return <span className={`seq-circle ${classes ?? ''}`} style={{
    backgroundColor: getSequenceColor(seqs[0]),
    boxShadow: seqs
      .slice(1)
      .map((seq, i) => `${(i + 1) * spacing}px 0 0 0 ${getSequenceColor(seq)}`)
      .join(', '),
    marginRight: `${seqs.length * spacing}px`
  }}>
    {`${seqs.map(seq => seq + 1).join(',')}`}
  </span>
}
