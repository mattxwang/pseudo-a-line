# pseudo-a-line

Hey! This repository is a proof-of-concept for teaching **pseudoalignment** (in genomics) using digital interactive tools. Here, "pseudoalignment" is really an implementation of kallisto, an algorithm that debuted in ["Bray, N., Pimentel, H., Melsted, P. et al. Near-optimal probabilistic RNA-seq quantification. Nat Biotechnol 34, 525–527 (2016)."](https://doi.org/10.1038/nbt.3519)

Right now, the main attraction is the [kitchen sink tool](https://pseudoalignment.netlify.app/tool/). It automates a handful of functions used in pseudoalignment, including:

- getting the kmers for any transcriptome/read
- generating the corresponding de Bruijn graph for a set of input transcriptomes
- pseudoaligning the forward and reverse strand for an input read(s) to a known transcriptome library
- interactivity :)

This is maybe 1% of this tool's potential. There's quite a bit more to do, including:

- short-term:
  - compare and contrast error methods (skipping kmer length versus nothing)
  - compare and contrast compression
  - sketch out potential animation framework (likely, [anime.js](https://animejs.com/))
- medium-term:
  - animating each step of the pseudoalignment process in great detail
  - compare and contrast hyperparameters (ie picking `k`)
  - random generation of transcriptomes, reads, errors, etc. (generative model?)
  - generate shareable link / save parameters in URL
- long-term / moonshot:
  - operate on real data (GFA?)
  - compare to "normal" alignment
  - eventually, actually use this as a teaching tool :)

## Development

### Getting Started

At its core, this works like most typical frontend node projects. This was developed on v18 (LTS), though I can't imagine it breaking in future versions.

After installing [node](https://nodejs.org/), using `npm` (or your favourite JS package manager):

```
$ git clone https://github.com/mattxwang/pseudo-a-line.git
$ cd pseudo-a-line
$ npm install
$ npm run dev
```

This will spin up an [Astro](https://astro.build/) dev server locally (likely, [http://localhost:3000](http://localhost:3000)). HMR is on, so as soon as you make an edit, you should see it live!

### Stack / Why ___

This project written in [Typescript](https://www.typescriptlang.org/) and uses [React](https://react.dev) on [Astro](https://astro.build/). It uses [reactflow](https://reactflow.dev/) to render the interactive graphs. Everything is styled with [Tailwind](https://tailwindcss.com/) (i.e. there's no other CSS framework). I rely heavily on [ESLint](https://eslint.org/).

Why this stack? I don't have a great answer, other than I'm very familiar with React + Typescript and wanted to learn some smaller things (Astro, Tailwind) without getting in the way of being productive. I'll point out that this doesn't need to be SSR'd, so I'm already venturing into the territory of overkill!

You don't really need to know how Astro works to develop on most of this app (really, I'm just using it as a file-based router + isolating some static components), though that might change in the future. The vast majority of the app is either React components or the actual pseudoalignment code (lives in `util.ts` for now).

## Licensing and Acknowledgements

This repository is MIT-licensed! Generally, that means that you're free to use this code however you'd like (as long as you maintain the copyright notice and license). I'd love to hear from you if you have used this in any capacity!

This project uses quite a bit of open-source software from the JS community. You can see the complete and updated list in `package.json`.

The idea for this project came from [UCLA's CS CM121/221](https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=23W&subj_area_cd=COM%20SCI&crs_catlg_no=0121%20%20CM&class_id=187426200&class_no=%20001%20%20), an introductory course on bioinformatics. It was taught by [Harold Pimentel](https://pimentellab.com/authors/harold_pimentel/), who greenlit this idea and provided advice on content; I'd also like to thank [ALbert Xue](https://pimentellab.com/authors/albert_xue/), a PhD student in Pimentel's lab who was my TA (and, in some ways, motivated this idea)!
