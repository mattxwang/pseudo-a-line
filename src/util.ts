export type HopMap = { [kmer: string] : Set<string>; };

export type ProcessedSequence = {
  sequence: string,
  k: number,
  kmers: Set<string>,
  hopMap: HopMap,
}

export type IndexedHop = {
  source: string,
  target: string,
  i: number,
}

export type AnnotatedHop = {
  source: string,
  target: string,
  seqs: number[],
}

/**
 * flatten all hops into singular list with sequence index
 * @param sequences pre-processed sequences (from getKmers)
 * @returns list of "Indexed Hops", which have a source/target kmer and the sequence index
 */
export function generateIndexedHops(sequences: ProcessedSequence[]): IndexedHop[] {
  return sequences.map(({hopMap}, i) => {
    return Object.keys(hopMap).map(source => {
      return Array.from(hopMap[source]).map(target => {
        return {
          source,
          target,
          i,
        }
      })
    }).flat()
  }).flat()
}

/**
 * annotate hops with equivalence classes; combine identical source-target edges
 * @param hops indexed hops, i.e. output of generateIndexedHops
 * @returns list of annotated hops, where each hop is unique and contains all relevant sequences
 */
export function generateAnnotatedHops(hops: IndexedHop[]): AnnotatedHop[] {
  const res = {} as {[idx: string]: AnnotatedHop};
  for (const hop of hops) {
    const { source, target, i } = hop;
    const idx = `${source}-${target}`;

    if (!(idx in res)) {
      res[idx] = {
        source,
        target,
        seqs: [],
      }
    }

    res[idx].seqs.push(i);
  }
  return Object.values(res);
}

/**
 * take in a sequence and k, return a set of all kmers
 * and a HopMap that describes all 1-transitions
 * @param {string} sequence input sequence; length should be >= k
 * @param {number} k
 */
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
