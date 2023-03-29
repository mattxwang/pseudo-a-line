interface Props {
  s: string
  i: number
  len: number
}

export default function Highlighter ({ s, i, len }: Props): JSX.Element {
  const start = s.slice(0, i)
  const mid = s.slice(i, i + len)
  const end = s.slice(i + len)

  return <>{start}<span className="bg-blue-500 text-white">{mid}</span>{end}</>
}
