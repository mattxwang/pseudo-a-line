export default function Kmer ({ kmer, filled }: { kmer: string, filled?: boolean }): JSX.Element {
  return <span className={`border-2 ${(filled ?? false) ? 'bg-blue-500 text-white' : ''} border-blue-500 rounded-lg p-1 my-1 uppercase text-center inline-block`} style={{ minWidth: `${kmer.length + 0.25}em` }}>{kmer}</span>
}
