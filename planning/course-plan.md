# Economics for Finance Practice

## Plan for a public course website

**Purpose.** Preserve Chiu Yu Ko’s 2023–24 CUHK course for the part-time Master of Finance and create a resource that a reader can use independently. Keep the course title. Use the home page to pose the kinds of questions the course answers. Put the institution, course code FINA 6282, teaching dates, and original sequence on a permanent **Original course** page.

**Editorial proposal.** Organize the first public edition around six subject areas, with 29 proposed chapters and two evidence workshops. Offer a short route across the subject areas and deeper routes for investment analysts, lenders, treasury teams, and readers interested in fintech. Preserve the five historical cases and develop the Shenzhen housing and IPO exercise into a capstone. The archive records the ten numbered lecture sources and the dated syllabus. The public edition can grow as new decisions, cases, or evidence warrant a chapter.

## 1. What the folder contributes

| Source in the teaching folder | Evidence and editorial use |
| --- | --- |
| `Course Outline/*22JAN2024.docx` | Use this dated outline for the public history. It lists the ten topics, marks trade and the additional finance block as time-permitting, identifies five cases, and gives the assessment weights. Describe these as the documented plan. A surviving deck establishes that material was prepared. |
| `Slides/Week1.Rmd` through `Week10.Rmd` and their PDFs | Use the editable sources for explanations, equations, and figures. Use the corresponding rendered page to check diagrams and notation. Week 2 contains substantial mathematical detail, Week 3 goes through consumption-based pricing, and Week 6 contains a complete sequential-trading example inside a public economics deck. |
| `Course Outline/CourseOutline.Rmd` and `Slides/All_Slides.Rmd` | Earlier designs include a different sequence and fuller ambitions for portfolio theory and behavioral economics. Use them to develop full chapters on portfolio choice, risk premia, and behavioral finance. Preserve their relationship to the later weekly decks in the archive. |
| `case/Acutally Used/Case Questions.docx` and `Cases_information.txt` in the same directory | The question pack identifies five assigned cases and the decisions students discussed. The larger case catalog and `Cases_Excel.xlsx` are leads for future writing. Membership in that catalog alone does not establish that a case was assigned. |
| `Quiz/Quiz1.docx`, `Quiz2.docx`, topic question banks, and `Final_Exam_v2.docx` | Preserve the combination of analytical checks and applied writing. The final pairs multiple-choice items with a Hong Kong waste-charging micro case. Consolidate repeated concepts into new questions with explanations. |
| `SampleQuestion-HousingPrice_and_IPO.docx` | The Shenzhen housing and IPO exercise asks whether co-movement supports a causal explanation. Its exhibits, questions, and suggested answers provide a starting point for an original data capstone. |
| `Reading/`, `Reference.txt`, and the figures in the lecture sources | Select a first reading and an optional technical reading where they serve distinct purposes. Recover figures from named models in the source. The many numbered plot files and compiled versions are poor public navigation aids. |

The original assessment was participation **5%**, quizzes **20%**, group project **30%**, and final exam **45%**. Preserve those numbers on the history page. Public readers get self-checks, short case decisions, and an individual capstone memo with a worked discussion.

## 2. Expanded curriculum

The first editorial map has **29 subject chapters in six parts and two evidence workshops**. A chapter follows one decision from an opening question to a worked answer. The numbers support navigation and production planning. A future edition can add a chapter wherever the model, the decision, or the evidence merits further treatment. Keep stable topic-based URLs as the sequence evolves.

The source column distinguishes a weekly lecture from an early draft, a reading, or a proposed new application. Each row describes a deliverable that can be tested with a reader.

### Part I. Markets, firms, and prices

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 1. What can a price move tell us? | A stock rises on results day. Draw two explanations for the move and say what the analyst needs to know about expectations to distinguish them. | Week 1 on market clearing, price discovery, institutions, and market efficiency. |
| 2. Demand, substitution, and elasticity | Estimate the revenue effect of a price increase using a demand schedule. Explain why a close substitute can reverse the recommendation. | Week 2 on preferences and consumer choice. Keep the Slutsky decomposition and preference axioms in linked derivations. |
| 3. Costs, capacity, and market power | Decide whether a producer should absorb an input cost increase, reprice, or reduce output. Recalculate after a rival adds capacity. | Week 2 on production, marginal cost, monopoly, and entry. Add a margin worksheet. |
| 4. Welfare, incidence, and rationing | Given a fixed stock and a demand schedule, compare a price increase, a queue, and a purchase limit. Identify who receives the goods and who bears each cost. | Weeks 1–2 on surplus and welfare. Preserve the Edgeworth box and welfare theorems in a technical note. |

### Part II. Risk, valuation, and investment

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 5. Saving, borrowing, and project appraisal | Decide whether to bring spending forward or invest in a project. Build the two-period budget line and find the borrowing rate at which the choice changes. | Week 3 on intertemporal choice and present value. Add a project with dated cash flows. |
| 6. Risk sharing and insurance | Compute the largest premium a risk-averse household would pay. Change its wealth and explain why willingness to insure changes. | Week 3 on expected utility, certainty equivalents, and risk premia. Link stochastic dominance and Arrow–Pratt measures. |
| 7. State prices and the value of insurance in a downturn | Price two claims with the same average payoff and different recession payoffs. Recover their prices from state prices and then from a stochastic discount factor. | Week 3 on the consumption-based pricing equation. Add a reproducible two-state example. |
| 8. Diversification and portfolio choice | Build a two-asset opportunity set. Vary correlation and a short-sale constraint, then locate the minimum-variance portfolio and the efficient portion of the curve. | Earlier course outline and combined slides on mean–variance choice. Write the portfolio lab in full. |
| 9. Which risks command a premium? | Use two portfolios with equal volatility and different market exposure to examine a CAPM prediction. Compare that prediction with a factor-based account and discuss estimation uncertainty. | Week 3 on beta, the early portfolio draft, and the CAPM readings. Add an empirical exhibit and a benchmark calculation. |
| 10. Behavioral finance and limits to arbitrage | Ask a reader to sell one of two holdings, change the displayed purchase prices while holding prospects fixed, then examine the choice. Ask what would have to be true for investor behavior to affect market prices. | Earlier behavioral finance draft, prospect-theory and Hirshleifer readings, and Week 1 on market efficiency. |

### Part III. Strategy, information, and financial contracts

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 11. Entry, commitment, and strategic competition | Solve the Maruti Suzuki entry exercise as a simultaneous game and as a sequential game. Identify when moving first is valuable and when waiting pays. | Week 4 and the Maruti Suzuki question pack. Keep oligopoly models and repeated interaction accessible by topic. |
| 12. Adverse selection, signaling, and screening | A uniform loan rate drives safer borrowers away. Design a two-contract menu and check which borrower chooses each contract. | Week 5 on lemons, signaling, participation constraints, and information rents. |
| 13. Moral hazard and incentives | Given the same borrower pool, choose terms that induce effort after a loan is granted. Calculate the cost of implementing effort under limited liability. | Week 5 on hidden action, incentive compatibility, and credit rationing. |
| 14. Debt, equity, and financing a new project | A project creates value for the firm, yet shareholders decline to fund it. Draw the payoffs to existing debt and equity and test a financing change. | New worked chapter drawing on the agency, capital structure, and debt structure references in `Reference.txt`. |
| 15. Order flow, bid–ask spreads, and price discovery | Post competitive quotes, observe a buy, and quote again. Explain which part of a spread this information model can account for. | Week 6 sequential-trade model and probability trees. The verified pilot calculation appears below. |
| 16. Auctions, IPO allocation, and the winner’s curse | Compute the expected value of an allocation conditional on winning. Compare bids under private and common values, then discuss the implications for a public offering. | The January outline lists auctions and Week 5 discusses IPO signaling. The auction exercise and allocation model need new writing. |

### Part IV. Banks, platforms, and public policy

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 17. Banks, liquidity, and runs | Give a bank runnable deposits and long-lived assets. Test whether it can meet withdrawals, then examine how a liquidity buffer or a change in depositor beliefs affects the outcome. | Week 4 bank-run game and the Gorton safe-assets reading. Add a bank balance sheet and distinguish liquidity from solvency in the worked answer. |
| 18. Public goods, externalities, and corporate responses | Use HKTVmall to weigh procurement, price, access, and spillovers. In a second exercise, use the Hong Kong waste-charging scenario to compare incentives and incidence. | Week 6, HKTVmall, and the historical final exam. Keep free riding, Coase bargaining, CSR/ESG, and VCG where readers can follow the relevant argument. |
| 19. Platform participation, reputation, and lending | Choose which side of a lending platform to subsidize. Trace participation, screening cost, and lender returns, then decide whether Dianrong’s expansion can be justified. | Week 7, Dianrong, and the Tadelis reading on reputation. Extend the existing one-sided network model to the lending example. |
| 20. Payments, settlement, and digital money | Compare payment arrangements for a merchant who cares about fees, time to settlement, and redemption at par. Identify who bears settlement or redemption risk. | Week 7 on Bitcoin incentives and readings on transaction fees and stablecoins. Add a small merchant payments exhibit. |

### Part V. Macroeconomics and fixed income

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 21. Reading growth, prices, and real returns | Given output, a price index, and a nominal return, decide whether a forecast describes higher volumes or higher prices. State the base period and compute a real return. | Week 8 on GDP, inflation, money, and the Fisher relation. |
| 22. Productivity and long-run valuation | Decompose growth into inputs and productivity. Decide which components can support an analyst’s terminal growth assumption. | Week 8 on Solow dynamics and growth accounting. Add a terminal-value sensitivity exercise. |
| 23. Business cycles, demand, and supply shocks | Two firms report the same fall in sales. Use information on prices, orders, and capacity to diagnose different shocks and predict their cash-flow effects. | Weeks 8–9 on aggregate demand and supply and the global shutdown case. |
| 24. Monetary and fiscal transmission | Trace a rate increase and a fiscal expansion from the policy instrument through expenditure, output, and inflation to a borrower’s interest coverage. | Week 9 on IS–LM, IS–MP, and inflation adjustment. Use the original derivations to show what changes with the policy rule. |
| 25. Yield curves, duration, and refinancing | Compare two debt schedules after a parallel shift and a steepening of the yield curve. Separate the change in market value from the cost of refinancing at maturity. | New fixed-income chapter building on Chapters 5, 7, and 24 and the macro-finance readings. Write the dated cash-flow table and rate scenarios. |

### Part VI. Trade, currencies, and international finance

| Chapter | Decision or exercise | Starting material |
| --- | --- | --- |
| 26. Tariffs, pass-through, and supply chains | Use the U.S.–China trade case to decide when an importer should absorb a tariff, change suppliers, or reprice. Allocate the cost across the exporter, importer, and customer. | Week 10 and the trade-war case questions. Add a two-supplier invoice exercise. |
| 27. Currency exposure and hedging | A Hong Kong importer owes a US-dollar invoice in 90 days. Compare the HK-dollar cash outflow under an unhedged position, a forward, and a natural hedge. | Week 10 and the early outline’s covered-interest-parity topic. Add a treasury worksheet with explicit currency quotation and settlement dates. |
| 28. Exchange-rate regimes and Hong Kong | Use the same importer to compare adjustment under a currency board and a floating rate. Trace the effects on interest expense and customer demand alongside the invoice value. | Week 10 on Mundell–Fleming, the impossible trinity, and the Hong Kong regime. Build a balance-sheet application around the existing diagrams. |
| 29. Capital flows and foreign-currency debt | Stress-test a borrower with domestic revenues, foreign-currency debt, and a near-term rollover. Identify the combination of depreciation and funding conditions it can withstand. | Week 10 on net capital flows and the global asset-pricing readings. Add a cross-border funding scenario. |

### Evidence workshops

| Workshop | What the reader produces | Starting material |
| --- | --- | --- |
| 30. From financial releases to a comparable chart | Choose a measure, distinguish a stock from a flow, align frequency and units, and reproduce a chart from a dated data file. | Shenzhen sample question and Week 8 measurement. Link the workshop from the first empirical exhibit so readers can use it when needed. |
| 31. From co-movement to a defensible claim | Draw two mechanisms consistent with the same chart. Specify a comparison, its identifying assumption, and a result that would weaken the preferred account. | Shenzhen housing and IPO questions. Write a worked causal-evidence discussion and use it for the capstone memo. |

### Routes through the material

The full table of contents belongs on the chapters page. The opening page offers an essentials route and a choice by professional task. Each chapter supplies the short prerequisite calculation at the point of use.

| Route | Suggested order | Finish with |
| --- | --- | --- |
| **Essentials** | 1 → 2 → 5 → 6 → 7 → 12 → 15 → 17 → 21 → 23 → 24 → 28 | Explain how information, risk, and the macro environment can each change a financial price. |
| **Investment analysis** | 5 → 6 → 7 → 8 → 9 → 10 → 22 → 25 | Write an investment note that separates cash-flow assumptions, exposure to risk, and discount rates. |
| **Credit and banking** | 12 → 13 → 14 → 17 → 24 → 25 → 29 | Recommend lending terms and stress-test the borrower under a funding shock. |
| **Corporate treasury in Hong Kong** | 3 → 5 → 25 → 26 → 27 → 28 → 29 | Compare the margin, currency, and refinancing effects of two sourcing and hedging policies. |
| **Markets and fintech** | 1 → 12 → 15 → 16 → 19 → 20 | Explain where a platform or trading venue creates value, and which party bears information and settlement costs. |
| **Case seminar** | Maruti Suzuki → HKTVmall → Dianrong → global shutdown → U.S.–China trade war → Shenzhen capstone | Defend five decisions, then write an evidence memo. Each case guide links the relevant chapter and a self-contained exercise. |

### How the original lectures map to the public edition

| Numbered lecture source | Principal destinations |
| --- | --- |
| Week 1 · Markets and financial markets | 1 and 4, with market efficiency revisited in 10 |
| Week 2 · Foundations of the market mechanism | 2–4 and the formal microeconomics notes |
| Week 3 · Uncertainty and intertemporal choice | 5–7 and 9, with the preference and asset-pricing derivations retained |
| Week 4 · Game theory | 11 and 17 |
| Week 5 · Contract theory | 12–13, with IPO signaling revisited in 16 |
| Week 6 · Public goods, externalities, and sequential trading | 15 and 18 |
| Week 7 · Technology and network effects | 19–20 |
| Week 8 · Classical macroeconomics and growth | 21–23 |
| Week 9 · Keynesian macroeconomics and business cycles | 23–24 |
| Week 10 · Trade and exchange rates | 26–29, with new firm-level applications identified in the chapter map |

**What earns a future chapter.** Start with a decision readers cannot yet make. Give it a worked example, identify the model or evidence it requires, and name the chapter that prepares the reader for it. For example, the existing platform and IPO chapters could lead to an original case on whether a growing marketplace lender should list, contingent on finding usable evidence about its financing options. A derivation serving one existing decision can live alongside that chapter.

## 3. Five historical cases and a public capstone

The five case guides preserve the original titles, authors, publisher references, and place in the course. Each links to an original exercise containing all the information a reader needs. A new numerical exhibit should identify its values as illustrative. A historical exhibit should identify the source and date. Publisher cases, exhibits, and instructor notes stay outside the public repository unless redistribution has been cleared.

| Historical case | Economic question to preserve | Self-contained exercise to write |
| --- | --- | --- |
| Should Maruti Suzuki Invest in Electric Cars? | What is the value of entering before a rival, and what is the value of waiting? | A two-stage EV capacity game with illustrative payoffs. Change the demand outlook and let the reader decide again. |
| HKTVmall: Responding to Shortages during the COVID-19 Pandemic | How can a retailer weigh margin, access, and the risk of waiting for supply? | Give an independent retailer two procurement offers, a delivery delay, and a binding stock limit. Ask readers to set a price and defend an allocation rule. Credit the original case and Chiu Yu Ko, Nouri Najjar, and Adam Fremeth. |
| Dianrong: Marketplace Lending, Blockchain, and “The New Finance” in China | Should a lending platform expand across the value chain, and how should it finance expansion? | Show how a borrower subsidy changes applications, lender participation, and screening cost. Ask what evidence would justify funding expansion. |
| COVID-19: The Global Shutdown | How can the same disruption depress both spending and productive capacity? | Give a borrower a dated baseline cash-flow statement and two shock scenarios. Ask which policy intervention helps in each. |
| The U.S.–China Trade War | Who bears a tariff when firms can reprice, absorb it, or change suppliers? | Provide a small importer’s invoice and two sourcing alternatives. Vary pass-through and ask when the preferred supplier changes. |

**Capstone — Shenzhen housing and IPOs.** Give the reader the role of an analyst reviewing a claim that weaker IPO activity explains a housing slowdown. Use a fixed historical window chosen after checking series coverage. Plot the Shenzhen housing measure and new SZSE listings at a common frequency. Document the housing index base, distinguish new listings from the stock of listed firms, and explain that SZSE issuers can be based outside Shenzhen. The original exercise used average transaction prices among its exhibits. An official price index measures something different and should carry its own label.

Ask for a one-page memo containing a chart, a proposed wealth or credit channel, a competing common shock, and one comparison that could help distinguish them. The worked discussion should reward a reader who concludes that the evidence is insufficient for a causal claim. Candidate primary sources are the [National Bureau of Statistics housing tables](https://www.stats.gov.cn/english/PressRelease/202401/t20240117_1946674.html) and [SZSE Fact Books](https://www.szse.cn/www/English/siteMarketData/publication/factBook/).

## 4. Build the first lesson around an actual calculation

**Pilot Chapter 15 with the adverse-selection explanation from Chapter 12.** The dealer example is compact enough to verify by hand, and a single trade gives the reader a reason to use Bayes’ rule.

1. Start with a security worth either 0 or 1, with equal prior probabilities. Half of traders know the value. They buy when it is 1 and sell when it is 0. The others buy and sell with equal probability. A competitive, risk-neutral dealer posts break-even quotes conditional on the order received.
2. Ask the reader to predict whether a buy or a sell conveys good news. Show the probability tree. A buy occurs with probability 0.75 in the high state and 0.25 in the low state. The initial ask is **0.75** and the initial bid is **0.25**.
3. Let the reader choose **Buy**. With independent trader arrivals conditional on the fixed asset value, the next buy takes the posterior probability of the high state to **0.90**. A sell following the first buy returns it to **0.50**. The dealer’s next quotes are therefore **0.50 bid and 0.90 ask**.
4. Let the reader change the informed-trader share. At zero the initial quotes both equal **0.50**. End by asking which observed spreads the model can explain and what additional evidence would distinguish information costs from inventory or order-processing costs.

The opening fits on one screen. The full derivation, an accessible table of outcomes, and a printable worked answer sit below it. This pilot sets a standard for later activities. Every control changes a quantity that matters to the decision.

## 5. Navigation, publishing, and maintenance

| Entry point | What the reader can do |
| --- | --- |
| **Home** | Start the course, jump to a case, or find the original course record. Offer the essentials route and a compact subject index. |
| **Chapters** | Browse six subject areas and two evidence workshops, or follow a route by professional task. Show each chapter’s opening question, prerequisite, and reader output. |
| **Cases & labs** | Filter by decision and concept. Show which activities are self-contained, which use historical data, and where the published case can be found. |
| **Reference** | Find a model by name, inspect its assumptions and notation, follow a derivation, or select an annotated reading. Preserve one stable link per technical note. |
| **Original course** | See the dated outline summary, ten-topic sequence, five cases, and assessment format. A crosswalk links every historical topic to its public chapters or technical notes. Record later additions in a short change history. |

Use a clean **Quarto website on GitHub Pages**. Use `economics-for-finance-practice` as the proposed repository name. Store editable pages under `chapters/`, `cases/`, `labs/`, `reference/`, and `original-course/`. Put this plan in `planning/` and link it from the README. Keep figure-generation code and local, versioned inputs beside the relevant activity. Render from a clean checkout and deploy tagged releases as milestones. Quarto documents a GitHub Actions workflow for rendering and publishing the site. [Quarto publishing guide](https://quarto.org/docs/publishing/github-pages.html)

Build the public repository by selecting material from the teaching folder. Record the source file and section, destination page, adaptation made, and attribution for each published item. Rebuild selected R/TikZ figures with descriptive filenames and check them against the rendered lectures. Use bibliographic links for books, papers, publisher cases, and other instructors’ slides. Keep old contact details, assessment keys, duplicate outlines, compiled caches, and administrative files in the teaching archive. The January syllabus repeats the shutdown-case URL for the trade-war entry. Use publisher item **719034** for that case. [Publisher catalog](https://store.hbr.org/product/the-u-s-china-trade-war/719034)

Use short reading sections that each lead to a decision. Give every numerical exercise units, one worked base case, and one changed assumption. Make the essential example readable on a phone and in print. A historical dataset should carry its observation window, retrieval date, units, and transformation notes so that future updates preserve the original exercise.

## 6. Publication sequence

| Release | Work in order | Completion test |
| --- | --- | --- |
| 1. Course record and pilot | Create the README, original-course page, source map, and home page. Publish the adverse-selection introduction from 12, the complete dealer lab in 15, and the HKTVmall guide with its independent shortage exercise. | A reader can trace all ten original topics, calculate the second-round quotes, and make the shortage decision. Check the deployed pages on a phone, with a keyboard, and in print. |
| 2. Complete the essentials route | Complete 1, 2, 5–7, 12, 17, 21, 23, 24, and 28. Add the bank liquidity exercise. Publish the global shutdown guide and link its scenarios from the business-cycle chapter. Connect the completed material to the pilot. | A reader can follow the entire essentials route with a worked answer at each stop. Each shortcut supplies the prerequisite example it relies on. |
| 3. Investment, firms, and financing | Publish 3, 8–11, 13–14, 16, 22, and 25. Add the Maruti Suzuki guide, portfolio lab, project financing exercise, and debt repricing worksheet. | The investment route is usable end to end. The reader can distinguish household risk aversion, portfolio risk reduction, and the price of aggregate risk through three different exercises. |
| 4. Policy, platforms, and international exposure | Publish 4, 18–20, 26–27, and 29. Complete the HKTVmall materials and add the Dianrong and trade-war guides. Link the new treasury exercises to the Hong Kong regime chapter. Use dated local monetary and financial series where relevant. [HKMA data directory](https://www.hkma.gov.hk/eng/data-publications-and-research/data-and-statistics/economic-financial-data-for-hong-kong/) | All six subject areas, all five historical case guides, and the professional routes are navigable. The same importer’s invoice reconciles across the tariff, hedging, and currency-regime examples. |
| 5. Evidence workshops and complete edition | Publish 30–31 and the Shenzhen exercise with a fixed data vintage, reproducible chart, one-page memo prompt, and worked discussion. Add reciprocal links from relevant chapters and record the edition in the release history. | Readers can reproduce the chart, distinguish plausible mechanisms from measured facts, and explain which further evidence would change their conclusion. |
| Later editions | Review questions left open by the cases and professional routes. Add a chapter, a new case, or a technical note according to the reader’s task. | Each addition has a source trail, a worked answer, and a clear route from existing material. |

**Publication record.** The pilot includes the original-course record, dealer lab, and HKTVmall exercise. The essentials edition connects all twelve chapters on the short route, adds the self-selection loan menu, state-price and bank-liquidity labs, and the global shutdown seminar. The next milestone is investment, firms, and financing. Start with portfolio choice and the pricing of market risk, which extend the worked state-price chapter.
