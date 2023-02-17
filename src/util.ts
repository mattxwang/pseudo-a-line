export type HopMap = { [kmer: string] : Set<string>; };

export function getKmers(sequence: string, k: number): { kmers: Set<string>, hopMap: HopMap} {
  if (sequence.length < k) {
    return ({
      kmers: new Set<string>(),
      hopMap: {}
    })
  }

  const hopMap : HopMap = {};

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
  // TODO: this is inefficient
  return new Set(Array.from(sets).map(set => Array.from(set)).flat());
}
