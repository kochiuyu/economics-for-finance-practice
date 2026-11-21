# Economics for Finance Practice

A self-paced public course by Chiu Yu Ko, developed from FINA 6282 at The Chinese University of Hong Kong. [Open the course website](https://kochiuyu.github.io/economics-for-finance-practice/).

## Public course edition

The course assigns five seminars and 33 applications spanning all 29 chapters from [our Micro Cases collection](https://kochiuyu.github.io/micro-cases/index.html). See the [case teaching guide](cases/micro-cases.qmd). Develop future case readings in the Micro Cases repository and link to their published pages.

The curriculum includes 29 chapters, two evidence workshops and the Shenzhen evidence memo.

## Build and publish

Run `quarto render` from the repository root (first release built with Quarto 1.9.36). Open `docs/index.html` or run `python -m http.server --directory docs` for a local preview. Pages are written in Quarto Markdown. The shared template is in `layout/` and the standalone activities are in `assets/`. Edit source files, render again, and commit the updated sources and `docs/` together. GitHub Pages serves `main /docs`.

Before release, test the dealer’s first buy (next bid 0.50 and ask 0.90), the zero-information case (both quotes 0.50). Check navigation, keyboard controls, small screens, and print output.
