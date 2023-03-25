export default function Kmer ({ kmer }: { kmer: string }): JSX.Element {
  return <span className="border-2 border-blue-500 rounded-lg p-1 my-1 uppercase text-center inline-block" style={{ minWidth: `${kmer.length + 0.25}em` }}>{kmer}</span>
}
