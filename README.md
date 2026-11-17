# Economics for Finance Practice

A self-paced public course by Chiu Yu Ko, developed from FINA 6282 at The Chinese University of Hong Kong. [Open the course website](https://kochiuyu.github.io/economics-for-finance-practice/).

## Published teaching material

The [12-chapter essentials route](https://kochiuyu.github.io/economics-for-finance-practice/curriculum.html#essentials) now runs from interpreting market prices to managing a Hong Kong importer’s exchange and funding exposure. Each chapter includes a worked answer and onward navigation.

| Page | What a reader can do |
| --- | --- |
| [Adverse selection](https://kochiuyu.github.io/economics-for-finance-practice/chapters/adverse-selection.html) | Work out which sellers accept a price and when verification restores trade. |
| [Dealer-pricing lab](https://kochiuyu.github.io/economics-for-finance-practice/chapters/dealer-pricing.html) | Submit buy and sell orders, revise beliefs and quotes, and change the informed share. |
| [HKTVmall case guide and exercise](https://kochiuyu.github.io/economics-for-finance-practice/cases/hktvmall.html) | Compare eight procurement, price, and allocation decisions with fully disclosed illustrative data. |
| [State-price lab](https://kochiuyu.github.io/economics-for-finance-practice/chapters/state-prices.html) | Move a payoff between recession and expansion while holding expected cash flow fixed. |
| [Bank liquidity lab](https://kochiuyu.github.io/economics-for-finance-practice/chapters/bank-liquidity.html) | Test withdrawals, reserves, and quick-sale prices against the balance sheet. |
| [Global shutdown seminar](https://kochiuyu.github.io/economics-for-finance-practice/cases/global-shutdown.html) | Choose a bridge-loan recipient using cash forecasts and repayment scenarios. |
| [Course record](https://kochiuyu.github.io/economics-for-finance-practice/original-course/index.html) | Trace the ten lectures, five assigned cases, and assessment weights. |

## Editorial plan

The [curriculum and publication plan](planning/course-plan.md) maps 29 subject chapters and two evidence workshops to the original lectures, readings, and new writing. The [source register](planning/source-register.md) records how the first release uses the teaching archive.

Milestones 1 and 2 are published. The investment route now continues from state prices into [two-fund portfolio choice](https://kochiuyu.github.io/economics-for-finance-practice/chapters/portfolio-choice.html) and [market risk](https://kochiuyu.github.io/economics-for-finance-practice/chapters/market-risk.html). The eight-chapter investment route is complete, including behavioral finance, productivity and terminal valuation, and fixed-income repricing and refinancing. The costs and capacity chapter, strategic-entry chapter, and Maruti Suzuki seminar are published. Milestone 3 is complete with chapters on borrower incentives, debt and equity, and IPO allocation. Milestone 4 is published. All 29 chapters and five case seminars are available. The two evidence workshops and Shenzhen capstone complete milestone 5. The [Micro Cases guide](cases/micro-cases.qmd) pairs 20 additional classroom decisions with individual chapters. Milestone 3 develops the investment, firms, and financing chapters, including portfolio choice, strategic entry, financing incentives, IPO allocation, and fixed income. See the publication plan for chapter dependencies and completion criteria.

## Build and publish

Run `quarto render` from the repository root (first release built with Quarto 1.9.36). Open `docs/index.html` or run `python -m http.server --directory docs` for a local preview. Pages are written in Quarto Markdown. The shared template is in `layout/` and the standalone activities are in `assets/`. Edit source files, render again, and commit the updated sources and `docs/` together. GitHub Pages serves `main /docs`.

Before release, test the dealer’s first buy (next bid 0.50 and ask 0.90), the zero-information case (both quotes 0.50), and the shortage case (immediate supply, HK$50, priority first → 30 priority households and HK$800). Check navigation, keyboard controls, small screens, and print output.
