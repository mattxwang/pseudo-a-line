import { getSequenceColor } from "./util";

type Props = {
  seqs: number[],
  classes?: string,
  offset?: number,
}

export default function EquivalenceClassCircles({classes, offset, seqs}: Props) {
  if (seqs.length === 0) {
    return <>{'none :('}</>
  }

  const spacing = offset ?? 8;
  return <span className={`seq-circle ${classes}`} style={{
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
