import type { EdgeTypes } from 'reactflow'
import EquivalenceClassEdgeLabel from './graph/EquivalenceClassEdgeLabel'

export type HopMap = Record<string, Set<string>>

export interface ProcessedSequence {
  sequence: string
  k: number
  kmers: Set<string>
  hopMap: HopMap
}

export interface IndexedHop {
  source: string
  target: string
  i: number
}

export interface AnnotatedHop {
  source: string
  target: string
  seqs: number[]
}

export type KeyedAnnotatedHops = Record<string, Array<{
  target: string
  seqs: number[]
}>>

export const edgeTypes: EdgeTypes = {
  custom: EquivalenceClassEdgeLabel
}

const SEQUENCE_COLORS = [
  '#05A3FF',
  '#EF60A7',
  '#FAB900',
  '#61D738'
]

/**
 * flatten all hops into singular list with sequence index
 * @param sequences pre-processed sequences (from getKmers)
 * @returns list of "Indexed Hops", which have a source/target kmer and the sequence index
 */
export function generateIndexedHops (sequences: ProcessedSequence[]): IndexedHop[] {
  return sequences.map(({ hopMap }, i) => {
    return Object.keys(hopMap).map(source => {
      return Array.from(hopMap[source]).map(target => {
        return {
          source,
          target,
          i
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
export function generateAnnotatedHops (hops: IndexedHop[]): AnnotatedHop[] {
  const res: Record<string, AnnotatedHop> = {}
  for (const hop of hops) {
    const { source, target, i } = hop
    const idx = `${source}-${target}`

    if (!(idx in res)) {
      res[idx] = {
        source,
        target,
        seqs: []
      }
    }

    res[idx].seqs.push(i)
  }
  return Object.values(res)
}

/**
 * finds unique equivalence classes and (within reason) assigns them a unique color
 * for now: rather brittle (relies on JSON.stringify to uniquify eq classes)
 * @param hops
 * @returns
 */
export function getEquivalenceClasses (hops: AnnotatedHop[]): Set<string> {
  return new Set<string>(hops.map(hop => JSON.stringify(hop.seqs))) // TODO: this is fragile
}

/**
 * take in a sequence and k, return a set of all kmers
 * and a HopMap that describes all 1-transitions
 * @param {string} sequence input sequence; length should be >= k
 * @param {number} k
 */
export function getKmers (sequence: string, k: number): { kmers: Set<string>, hopMap: HopMap } {
  if (sequence.length < k) {
    return ({
      kmers: new Set<string>(),
      hopMap: {}
    })
  }

  const hopMap: HopMap = {}

  let current = sequence.substring(0, k)
  for (let i = 1; i < (sequence.length - k) + 2; i++) {
    const next = sequence.substring(i, i + k)

    if (!(current in hopMap)) {
      hopMap[current] = new Set<string>()
    }

    if (i !== (sequence.length - k) + 1) {
      hopMap[current].add(next)
    }

    current = next
  }

  return {
    kmers: new Set(Object.keys(hopMap)),
    hopMap
  }
}

/**
 * take in a sequence and k, returns kmers in the order that they're discovered
 * @param {string} sequence input sequence; length should be >= k
 * @param {number} k
 * @returns array of kmers
 */
export function getKmersOrdered (sequence: string, k: number): string[] {
  if (sequence.length < k) return []

  const res = []

  let current = sequence.substring(0, k)
  for (let i = 1; i < (sequence.length - k) + 2; i++) {
    res.push(current)
    current = sequence.substring(i, i + k)
  }

  return res
}

export function getKeyedAnnotatedHops (hops: AnnotatedHop[]): KeyedAnnotatedHops {
  const res: KeyedAnnotatedHops = {}
  for (const hop of hops) {
    const { source, target, seqs } = hop
    if (!(source in res)) {
      res[source] = []
    }
    res[source].push({ target, seqs })
  }
  return res
}

export function getOrderedKmers (sequence: string, k: number): string[] {
  const kmers = []
  let current = sequence.substring(0, k)
  for (let i = 1; i < (sequence.length - k) + 2; i++) {
    kmers.push(current)
    const next = sequence.substring(i, i + k)
    current = next
  }

  return kmers
}

export function getSequenceColor (i: number): string {
  const l = SEQUENCE_COLORS.length
  return SEQUENCE_COLORS[i % l]
}

export function setIntersection<T> (...sets: Array<Set<T>>): Set<T> {
  if (sets.length === 0) { return new Set() }
  if (sets.length === 1) { return sets[0] }

  // TODO: this is inefficient
  return Array.from(sets).reduce((accum, curr) => {
    return new Set<T>(Array.from(accum.values()).filter(entry => curr.has(entry)))
  }, sets[0])
}

export function setUnion<T> (...sets: Array<Set<T>>): Set<T> {
  // TODO: this is inefficient
  return new Set(Array.from(sets).map(set => Array.from(set)).flat())
}

/**
 * reverses a string; from https://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/
 * @param s
 * @returns
 */
export const reverse = (s: string): string => {
  let o = ''
  for (let i = s.length - 1; i >= 0; o += s[i--]) { /* empty */ }
  return o
}

// TODO: encode the A/C/T/G thing in types
/**
 * complements a string, returning in uppercase
 * non-ACTG elements are skipped
 * @param s string to complement
 */
export const complement = (s: string): string => {
  return s.toUpperCase().split('').map(c => {
    switch (c) {
      case 'A': return 'T'
      case 'T': return 'A'
      case 'C': return 'G'
      case 'G': return 'C'
      default: return ''
    }
  }).join('')
}
