export function getKmers(sequence: string, k: number): { kmers: Set<string>, hopMap: { [kmer: string] : Set<string>; }} {
  if (sequence.length < k) {
    return ({
      kmers: new Set<string>(),
      hopMap: {}
    })
  }

  const hopMap : { [kmer: string] : Set<string>; } = {};

  let current = sequence.substring(0, k);
  for (let i = 1; i < (sequence.length - k) + 2; i++) {
    let next = sequence.substring(i, i + k);

    if (!(current in hopMap)) {
      hopMap[current] = new Set<string>();
    }

    if (i !== (sequence.length - k) + 1){
      hopMap[current].add(next);
    }

    current = next;
  }

  return {
    kmers: new Set(Object.keys(hopMap)),
    hopMap
  }
}

export function setUnion<T>(...sets: Set<T>[]): Set<T> {
  return new Set(...sets);
}
