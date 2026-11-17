# Economics for Finance Practice

A self-paced public course by Chiu Yu Ko, developed from FINA 6282 at The Chinese University of Hong Kong. [Open the course website](https://kochiuyu.github.io/economics-for-finance-practice/).

## First release

| Page | What a reader can do |
| --- | --- |
| [Adverse selection](https://kochiuyu.github.io/economics-for-finance-practice/chapters/adverse-selection.html) | Work out which sellers accept a price and when verification restores trade. |
| [Dealer-pricing lab](https://kochiuyu.github.io/economics-for-finance-practice/chapters/dealer-pricing.html) | Submit buy and sell orders, revise beliefs and quotes, and change the informed share. |
| [HKTVmall case guide and exercise](https://kochiuyu.github.io/economics-for-finance-practice/cases/hktvmall.html) | Compare eight procurement, price, and allocation decisions with fully disclosed illustrative data. |
| [Course record](https://kochiuyu.github.io/economics-for-finance-practice/original-course/index.html) | Trace the ten lectures, five assigned cases, and assessment weights. |

## Editorial plan

The [curriculum and publication plan](planning/course-plan.md) maps 29 subject chapters and two evidence workshops to the original lectures, readings, and new writing. The [source register](planning/source-register.md) records how the first release uses the teaching archive.

The next release completes the essentials route. Start with Chapter 1 on interpreting market prices, then build demand and elasticity, saving and project appraisal, risk and insurance, and two-state valuation. The publication plan lists the remaining essential chapters, cases, and completion criteria.

## Build and publish

Run `quarto render` from the repository root (first release built with Quarto 1.9.36). Open `docs/index.html` or run `python -m http.server --directory docs` for a local preview. Pages are written in Quarto Markdown. The shared template is in `layout/` and the standalone activities are in `assets/`. Edit source files, render again, and commit the updated sources and `docs/` together. GitHub Pages serves `main /docs`.

Before release, test the dealer’s first buy (next bid 0.50 and ask 0.90), the zero-information case (both quotes 0.50), and the shortage case (immediate supply, HK$50, priority first → 30 priority households and HK$800). Check navigation, keyboard controls, small screens, and print output.
