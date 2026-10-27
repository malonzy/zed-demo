/* Zed Multimedia prototype – shared data.
   Headlines, images and links come from zedmultimedia.com (WordPress REST API).
   Ages ("minsAgo"), market numbers and video titles are mock.
   Key points on articles are written for the prototype. */

window.ZED = (function () {
  const mk = (cat, catSlug, list, start) =>
    list.map((p, i) => Object.assign({ cat, catSlug, minsAgo: start + i * 75 }, p));

  /* ---------- Home stories (also feed the category pages) ---------- */
  const HOME = [
    { id: "48959", cat: "Entertainment", catSlug: "entertainment", minsAgo: 150,
      title: "Veteran Ghanaian actress Grace Nortey dies at 89",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Veteran-Ghanaian-actress-Grace-Nortey.jpg",
      excerpt: "Veteran Ghanaian actress Grace Nortey has reportedly died at the University of Ghana Medical Centre in the early hours of Wednesday, August 26, 2026. She was 89.",
      link: "https://zedmultimedia.com/2026/08/27/veteran-ghanaian-actress-grace-nortey-dies-at-89/" },
    { id: "48957", cat: "Business", catSlug: "business", minsAgo: 195,
      title: "GoldBod should be judged by strategic objectives – Analyst",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/02/Financial-Analyst-John-Kyei.jpg",
      excerpt: "Financial Analyst John Kyei has urged stakeholders to assess the performance of the Ghana Gold Board (GoldBod) based on its strategic objectives rather than solely on accounting profits or losses.",
      link: "https://zedmultimedia.com/2026/08/25/goldbod-should-be-judged-by-strategic-objectives-analyst/" },
    { id: "48955", cat: "Business", catSlug: "business", minsAgo: 240,
      title: "IMF urges GOLDBOD to rethink gold programme financing",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/02/IMF-Building-2.jpg",
      excerpt: "The IMF has called on the Ghana Gold Board and the government to review the financing structure of the Domestic Gold Purchase Programme to reduce its costs.",
      link: "https://zedmultimedia.com/2026/08/25/imf-urges-goldbod-to-rethink-gold-programme-financing/" },
    { id: "48952", cat: "News", catSlug: "news", minsAgo: 285,
      title: "UCC Beats GCTU in TBSC 2026 National Semi-Finals",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/TBSC.jpg",
      excerpt: "The University of Cape Coast has secured a place in the grand finale of the 2026 Tertiary Business Sense Challenge after defeating GCTU in a fiercely contested semi-final.",
      link: "https://zedmultimedia.com/2026/08/25/ucc-beats-gctu-in-tbsc-2026-national-semi-finals/" },
    { id: "48950", cat: "Business", catSlug: "business", minsAgo: 330,
      title: "Investors Earned GH¢37bn in Dividends, Nearly GH¢800m in Bond Coupons",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Managing-Director-of-the-Ghana-Stock-Exchange-GSE-Abena-Amoah.jpg",
      excerpt: "The Ghana Stock Exchange says the capital market is increasingly delivering meaningful returns to investors while giving businesses alternative sources of long-term financing.",
      link: "https://zedmultimedia.com/2026/08/25/investors-earned-gh%c2%a237bn-in-dividends-nearly-gh%c2%a2800m-in-bond-coupons/" },
    { id: "48948", cat: "Business", catSlug: "business", minsAgo: 375,
      title: "Finance Minister Calls for Shift from Raw Exports to Value-Added Trade with China",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Finance-Minister-Calls-for-Shift-from-Raw-Exports-to-Value-Added-Trade-with-China.jpg",
      excerpt: "Finance Minister Dr Cassiel Ato Forson has called for a major shift in Ghana’s trade relationship with China, urging greater emphasis on local processing, manufacturing and job creation.",
      link: "https://zedmultimedia.com/2026/08/25/finance-minister-calls-for-shift-from-raw-exports-to-value-added-trade-with-china/" },
    { id: "48946", cat: "Business", catSlug: "business", minsAgo: 420,
      title: "PETROSOL Lists GH¢200m Note Programme on GSE",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/PETROSOL-Fuel-Filling-Station.jpg",
      excerpt: "PETROSOL Platinum Energy PLC has officially listed its GH¢200 million note programme on the Ghana Fixed Income Market.",
      link: "https://zedmultimedia.com/2026/08/25/petrosol-lists-gh%c2%a2200m-note-programme-on-gse/" },
    { id: "48940", cat: "Politics", catSlug: "politics", minsAgo: 465,
      title: "OSP Receives Three Petitions over Afenyo-Markin Extortion Allegations",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Special-Prosecutor-Kissi-Agyebeng1.jpg",
      excerpt: "The Office of the Special Prosecutor has received three separate petitions concerning allegations made by the CEO of the Ghana Gold Board against the Minority Leader.",
      link: "https://zedmultimedia.com/2026/08/25/osp-receives-three-petitions-over-afenyo-markin-extortion-allegations/" },
    { id: "48937", cat: "Lifestyle", catSlug: "lifestyle", minsAgo: 510,
      title: "Mövenpick Ambassador Hotel Eyes Wider Community Reach as It Marks 15 Years",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/08/General-Manager-of-the-Movenpick-Ambassador-Hotel-Accra-Isaac-Okpoti-Adjei.jpg",
      excerpt: "The Mövenpick Ambassador Hotel Accra says it is repositioning its operations to serve a broader section of the Ghanaian community as it marks 15 years in Ghana.",
      link: "https://zedmultimedia.com/2026/08/17/movenpick-ambassador-hotel-eyes-wider-community-reach-as-it-marks-15-years/" },
    { id: "48935", cat: "Politics", catSlug: "politics", minsAgo: 555,
      title: "Vice President Urges Civil Servants to Renew Commitment to Excellence",
      image: "https://zedmultimedia.com/wp-content/uploads/2026/02/Vice-President-Jane-Naana-Opoku-Agyemang.jpg",
      excerpt: "Vice President Professor Jane Naana Opoku-Agyemang has urged civil servants to renew their commitment to professionalism, integrity and excellence.",
      link: "https://zedmultimedia.com/2026/08/17/vice-president-urges-civil-servants-to-renew-commitment-to-excellence/" }
  ];

  /* ---------- Fetched per-category stories ---------- */
  const ENERGY = { id: "energy-shortfall", cat: "Business", catSlug: "business", minsAgo: 60,
    title: "Govt taking steps to reduce energy sector shortfall",
    image: "https://zedmultimedia.com/wp-content/uploads/2026/02/BoG8.jpg",
    excerpt: "Government says it has taken bold steps to reduce, if not eliminate, the continuous support to the Electricity Company of Ghana in financing the country’s energy sector shortfalls.",
    link: "" };

  const politicsFetched = mk("Politics", "politics", [
    { id: "13480", title: "Presidential filing fee hit GH¢100k, GH¢10k for parliamentary – EC", image: "https://zedmultimedia.com/wp-content/uploads/2024/08/Mrs-Jean-Mensah-EC-Chairperson.jpg", excerpt: "The Electoral Commission has announced that nominations for the 2024 presidential and parliamentary elections will open with new filing fees.", link: "https://zedmultimedia.com/2024/08/01/presidential-filing-fee-hit-gh%c2%a2100k-gh%c2%a210k-for-parliamentary-ec/" },
    { id: "13414", title: "Recall Parliament to approve loans, bills – Majority to Speaker", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/Alexander-Afenyo-Markin-Majority-Leader.jpg", excerpt: "The Majority Leader, Alexander Afenyo-Markin, has requested an extraordinary sitting of Parliament just 24 hours after the House rose.", link: "https://zedmultimedia.com/2024/07/31/recall-parliament-to-approve-loans-bills-majority-to-speaker/" },
    { id: "13408", title: "Appointments Committee reschedules vetting of Supreme Court Nominees to August 13", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/APPOINTMENT.jpg", excerpt: "The Appointments Committee of Parliament has rescheduled the vetting of two of the President’s nominees to the Supreme Court.", link: "https://zedmultimedia.com/2024/07/31/appointments-committee-reschedules-vetting-of-supreme-court-nominees-to-august-13/" },
    { id: "13381", title: "Speaker calls for collaborative efforts to address challenges posed by climate change, disability", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/Bagbin.jpg", excerpt: "In cognizance of the dangers of climate change and the roles persons with disabilities play in society, the Speaker called for collaboration.", link: "https://zedmultimedia.com/2024/07/30/speaker-calls-for-collaborative-efforts-to-address-challenges-posed-by-climate-change-disability/" },
    { id: "12799", title: "NPP finds worthy allies in churches – Dr Prempeh", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/Kristor-Asafo-1.jpg", excerpt: "Running mate of the New Patriotic Party, Dr. Matthew Opoku Prempeh, has emphasized the significant role of the church.", link: "https://zedmultimedia.com/2024/07/15/npp-finds-worthy-allies-in-churches-dr-prempeh/" },
    { id: "12753", title: "Napo apologizes for comments on Kwame Nkrumah", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/NAPO-APPOLOGISE.jpeg", excerpt: "Dr. Matthew Opoku Prempeh, the running mate of the NPP, has issued an apology for his recent comments.", link: "https://zedmultimedia.com/2024/07/12/napo-apologizes-for-comments-on-kwame-nkrumah/" },
    { id: "12692", title: "Dr. Bawumia challenges Mahama to a debate on policies ahead of December elections", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/Bawumia-and-Mahama-3.jpg", excerpt: "The NPP Flagbearer, Dr. Mahamudu Bawumia, has dared former President John Dramani Mahama to a debate on policies.", link: "https://zedmultimedia.com/2024/07/11/dr-bawumia-challenges-mahama-to-a-debate-on-polices-ahead-of-december-elections/" },
    { id: "12593", title: "Do not let Bawumia regret choosing you: Otumfuo advices Napo", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/Asantehene-Bawumia.jpg", excerpt: "Asantehene Otumfuo Osei Tutu II has called on Matthew Opoku Prempeh, the NPP’s running mate, to be loyal and humble.", link: "https://zedmultimedia.com/2024/07/09/do-not-let-bawumia-regret-choosing-you-otumfuo-advices-napo/" },
    { id: "12590", title: "Excitement builds in Kumasi as NPP prepares to unveil Napo as Bawumia’s running mate", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/NAPO-BAWUMIA.png", excerpt: "The city of Kumasi is buzzing with anticipation as the NPP gears up for the grand unveiling of its running mate.", link: "https://zedmultimedia.com/2024/07/09/excitement-builds-in-kumasi-as-npp-prepares-to-unveil-napo-as-bawumias-running-mate/" },
    { id: "12582", title: "EC announces mop-up voter registration from August 1 to 3", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/EC.jpg", excerpt: "The Electoral Commission of Ghana will embark on a mop-up voter registration exercise from August 1 to August 3, 2024.", link: "https://zedmultimedia.com/2024/07/09/ec-announces-mop-up-voter-registration-from-august-1-to-3/" },
    { id: "12568", title: "I will adjust IMF agreement – Ex-Prez Mahama", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/JDM4.jpg", excerpt: "Former President John Dramani Mahama, the NDC flagbearer, has pledged to adjust the country’s IMF agreement if elected.", link: "https://zedmultimedia.com/2024/07/09/i-will-adjust-imf-agreement-ex-prez-mahama/" }
  ], 520);

  const businessFetched = mk("Business", "business", [
    { id: "48926", title: "Govt Exceeds T Bill Target by 88%", image: "https://zedmultimedia.com/wp-content/uploads/2025/10/Approximately-GHS5.415-billion.jpg", excerpt: "The government has exceeded its Treasury bill target by 88 percent, reflecting a significant increase in investor appetite for short-term securities.", link: "https://zedmultimedia.com/2026/08/17/govt-exceeds-t-bill-target-by-88/" },
    { id: "48924", title: "Commodity Volatility Is Keeping African Exporters in a Low-Value Cycle – Afreximbank", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/African-Commodities.jpg", excerpt: "African commodity exporters face a persistent deterioration in the value of their exports relative to manufactured imports.", link: "https://zedmultimedia.com/2026/08/17/commodity-volatility-is-keeping-african-exporters-in-a-low-value-cycle-afreximbank/" },
    { id: "48882", title: "Ghana Retail Market Performance in Q1 2026 Values up 15.6%", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Maverick-Research.jpg", excerpt: "Ghana emerged as the strongest-performing retail market in West Africa during the first half of 2026, according to Maverick Research.", link: "https://zedmultimedia.com/2026/08/17/ghana-retail-market-performance-in-q1-2026-values-up-15-6/" },
    { id: "48880", title: "AfCFTA Pushes Interoperable Digital Systems for Trade", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/afcfta.jpg", excerpt: "The AfCFTA Secretariat is advancing efforts to connect national digital systems across Africa to make cross-border trade faster.", link: "https://zedmultimedia.com/2026/08/17/afcfta-pushes-interoperable-digital-systems-for-trade/" },
    { id: "48875", title: "Africa Infrastructure Investment Offers High Returns – World Bank", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Infrastructure-Investment-Offers-High-Returns.jpg", excerpt: "Sub-Saharan Africa could generate some of the world’s highest returns from new infrastructure investment, with transport especially promising.", link: "https://zedmultimedia.com/2026/08/17/africa-infrastructure-investment-offers-high-returns-world-bank/" },
    { id: "48765", title: "Ghana’s Economy Grows 5.1% in May 2026", image: "https://zedmultimedia.com/wp-content/uploads/2026/03/GSS8.jpg", excerpt: "Ghana’s economy expanded by 5.1 per cent in May 2026 compared with the same period last year, although growth moderated.", link: "https://zedmultimedia.com/2026/08/14/ghanas-economy-grows-5-1-in-may-2026/" },
    { id: "48763", title: "Fiscal Discipline Key to Sustaining Ghana’s Economic Gains – BoG", image: "https://zedmultimedia.com/wp-content/uploads/2026/02/BoG8.jpg", excerpt: "Bank of Ghana Governor Dr Johnson Asiama has stressed the need for continued fiscal discipline and prudent debt management.", link: "https://zedmultimedia.com/2026/08/14/fiscal-discipline-key-to-sustaining-ghanas-economic-gains-bog/" },
    { id: "48760", title: "More Than 40% Electricity Tariff Hikes to Pressure Businesses", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/AGI-President-Kofi-Nsiah-Poku.jpg", excerpt: "The Association of Ghana Industries has raised concerns over sharp increases in electricity costs facing businesses.", link: "https://zedmultimedia.com/2026/08/14/more-than-40-electricity-tariff-hikes-to-pressure-businesses/" },
    { id: "48758", title: "Ginger Price Surge Creates Investment Opportunities — GSS", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ginger1.jpg", excerpt: "The Ghana Statistical Service says the sustained increase in ginger prices presents opportunities across the crop’s value chain.", link: "https://zedmultimedia.com/2026/08/14/ginger-price-surge-creates-investment-opportunities-gss/" },
    { id: "48756", title: "Private Sector Credit Growth Hits 41.2%", image: "https://zedmultimedia.com/wp-content/uploads/2025/05/Dr.-Johnson-Pandit-Asiama_Governor-BoG-Fintech_1000x500.jpg", excerpt: "Private sector credit recorded a strong rebound in June 2026, growing by 41.2 per cent as financial conditions eased.", link: "https://zedmultimedia.com/2026/08/14/private-sector-credit-growth-hits-41-2/" },
    { id: "48752", title: "BoG Urges Fintechs to Prioritise Customer Protection", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Head-of-Fintech-and-Innovation-at-the-Bank-of-Ghana-Owureku-Asare.jpg", excerpt: "The Bank of Ghana has urged fintech companies to place customer protection, governance, cybersecurity and data privacy first.", link: "https://zedmultimedia.com/2026/08/14/bog-urges-fintechs-to-prioritise-customer-protection/" },
    { id: "48660", title: "IMF Upgrades Ghana’s Debt Distress Risk to Moderate", image: "https://zedmultimedia.com/wp-content/uploads/2026/02/IMF-Building-2.jpg", excerpt: "The IMF has upgraded Ghana’s risk of debt distress from “high” to “moderate”, citing a sustained improvement in debt indicators.", link: "https://zedmultimedia.com/2026/08/10/imf-upgrades-ghanas-debt-distress-risk-to-moderate/" }
  ], 100);

  const sports = mk("Sports", "sports", [
    { id: "48907", title: "Fernandez Booed by Chelsea Fans as Alonso Offers Glimpse of Blueprint", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Fernandez.jpg", excerpt: "Enzo Fernandez was booed by sections of the Chelsea support as Morgan Rogers scored on his first appearance.", link: "https://zedmultimedia.com/2026/08/17/fernandez-booed-by-chelsea-fans-as-alonso-offers-glimpse-of-blueprint/" },
    { id: "48905", title: "PSG Sign World Cup Winner Torres from Barcelona", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Torres.jpg", excerpt: "Ferran Torres, who scored the winning goal for Spain at the World Cup, has joined European champions Paris St-Germain.", link: "https://zedmultimedia.com/2026/08/17/psg-sign-world-cup-winner-torres-from-barcelona/" },
    { id: "48903", title: "This is Probably my Last Year of Football – Cristiano Ronaldo", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Christiano-Ronaldo.jpg", excerpt: "Cristiano Ronaldo has strongly indicated that the 2026/27 season could be his final campaign as a professional footballer.", link: "https://zedmultimedia.com/2026/08/17/this-is-probably-my-last-year-of-football-cristiano-ronaldo/" },
    { id: "48804", title: "Baba Yara Stadium Set for September Return", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/BABA-YARA-SPORTS-STADIUM.jpg", excerpt: "The Baba Yara Sports Stadium in Kumasi is on course to return to football action when Ghana’s 2026/27 season begins.", link: "https://zedmultimedia.com/2026/08/14/baba-yara-stadium-set-for-september-return/" },
    { id: "48802", title: "Sports Ministry Rejects Black Queens’ Per Diem Claims", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/BLACK-QUEENS3.jpg", excerpt: "The Ministry of Sports and Recreation has rejected claims by the Black Queens that they are owed outstanding per diems.", link: "https://zedmultimedia.com/2026/08/14/sports-ministry-rejects-black-queens-per-diem-claims/" },
    { id: "48800", title: "Messi Opens Up on Football Future After Father’s Death", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/LIONEL-MESSI-AND-FATHER-JORGE-MESSI.jpg", excerpt: "Lionel Messi has opened up about his uncertain football future following the death of his father, Jorge Messi.", link: "https://zedmultimedia.com/2026/08/14/messi-opens-up-on-football-future-after-fathers-death/" },
    { id: "48794", title: "Malawi Make History, Reach First WAFCON Final", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/MALAWI-WOMENS-TEAM.jpg", excerpt: "Malawi have reached the final of the Women’s Africa Cup of Nations for the first time after another stunning performance.", link: "https://zedmultimedia.com/2026/08/14/malawi-make-history-reach-first-wafcon-final/" },
    { id: "48733", title: "Trump Backs Infantino as FIFA President", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/X2VIASGYCVCNDLN6NJCLJ7VRZE.jpg", excerpt: "US President Donald Trump has thrown his support behind Gianni Infantino, warning FIFA against removing its president.", link: "https://zedmultimedia.com/2026/08/13/trump-backs-infantino-as-fifa-president/" },
    { id: "48731", title: "Samartex Get Top-Four Lifeline After Hearts of Oak Pull Out", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/FC-SMARTEX.jpg", excerpt: "FC Samartex 1996 have secured a surprise place in the 2026 GHALCA Top Four Tournament after Hearts of Oak pulled out.", link: "https://zedmultimedia.com/2026/08/13/samartex-get-top-four-lifeline-after-hearts-of-oak-pull-out/" },
    { id: "48729", title: "Liverpool Agree Barcola Terms as PSG Deal Nears", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/BRADLEY-BARCOLA.jpg", excerpt: "Liverpool’s pursuit of Bradley Barcola has entered a crucial phase, with the Paris Saint-Germain winger a key target.", link: "https://zedmultimedia.com/2026/08/13/liverpool-agree-barcola-terms-as-psg-deal-nears/" },
    { id: "48723", title: "Mumin Denies Girona Move as Ghana Defender Searches for New Club", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Abdul-Mumin.jpg", excerpt: "Ghana defender Abdul Mumin has rejected reports linking him with a move to Spanish La Liga side Girona.", link: "https://zedmultimedia.com/2026/08/13/mumin-denies-girona-move-as-ghana-defender-searches-for-new-club/" },
    { id: "48686", title: "Liam Delap Scores First Chelsea Goal Since January", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Liam-Delap.jpg", excerpt: "Liam Delap scored his first Chelsea goals since January as Xabi Alonso’s side drew 3-3 with Johor Darul Ta’zim.", link: "https://zedmultimedia.com/2026/08/10/liam-delap-scores-first-chelsea-goal-since-january/" }
  ], 90);

  const entertainmentFetched = mk("Entertainment", "entertainment", [
    { id: "48894", title: "Dr Cryme Recalls How Music Led Him to TV Presenting", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-rapper-Darlington-Agyekum-popularly-known-as-Dr-Cryme.jpg", excerpt: "Ghanaian rapper Darlington Agyekum, popularly known as Dr Cryme, has recounted how his music career led him into television presenting.", link: "https://zedmultimedia.com/2026/08/17/dr-cryme-recalls-how-music-led-him-to-tv-presenting/" },
    { id: "48892", title: "Success Is About Fulfilment, Not Mansions or Cars — Nhoya Ruthlyn", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-digital-marketer-content-creator-and-creative-director-Nhoya-Ruthlyn.jpg", excerpt: "Content creator Nhoya Ruthlyn says her understanding of success has evolved from material wealth to personal fulfilment.", link: "https://zedmultimedia.com/2026/08/17/success-is-about-fulfilment-not-mansions-or-cars-nhoya-ruthlyn/" },
    { id: "48889", title: "King Ayisoba Calls for Appointment as Fugu Ambassador", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-traditional-musician-King-Ayisoba.jpg", excerpt: "Traditional musician King Ayisoba has appealed to the government to appoint him as a Fugu Ambassador.", link: "https://zedmultimedia.com/2026/08/17/king-ayisoba-calls-for-appointment-as-fugu-ambassador/" },
    { id: "48812", title: "My Parents Now Support My Comedy Career — Nhoya Ruthlyn", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-digital-marketer-content-creator-and-creative-director-Nhoya-Ruthlyn.jpg", excerpt: "Nhoya Ruthlyn says her family initially struggled to accept her decision to pursue comedy and content creation.", link: "https://zedmultimedia.com/2026/08/14/my-parents-now-support-my-comedy-career-nhoya-ruthlyn/" },
    { id: "48808", title: "Being Alive Alone Is Enough for Me – Dr Cryme", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-rapper-Darlington-Agyekum-popularly-known-as-Dr-Cryme.jpg", excerpt: "Dr Cryme has described himself as a spiritual person rather than a deeply religious individual.", link: "https://zedmultimedia.com/2026/08/14/being-alive-alone-is-enough-for-me-dr-cryme/" },
    { id: "48806", title: "Ghanaian Men Are Not Stingy, Women Demand Too Much – Stonebwoy", image: "https://zedmultimedia.com/wp-content/uploads/2025/03/Stonebwoy_700x500.jpg", excerpt: "Dancehall artiste Stonebwoy has challenged the perception that Ghanaian men are naturally frugal.", link: "https://zedmultimedia.com/2026/08/14/ghanaian-men-are-not-stingy-women-demand-too-much-stonebwoy/" },
    { id: "48741", title: "Govt Plans Second National Theatre", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/The-Minister-of-Tourism-Culture-and-Creative-Arts-Abla-Dzifa-Gomashie.jpg", excerpt: "The government has announced plans to establish a second National Theatre in Kumasi to expand Ghana’s cultural infrastructure.", link: "https://zedmultimedia.com/2026/08/13/govt-plans-second-national-theatre/" },
    { id: "48737", title: "Stonebwoy Explains How He Coined the Term Afro-Dancehall", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Multiple-award-winning-Ghanaian-ReggaeDancehall-artiste-and-global-music-icon-Stonebwoy.jpg", excerpt: "Stonebwoy has explained the thought process behind his musical identity and how he came to describe his sound.", link: "https://zedmultimedia.com/2026/08/13/stonebwoy-explains-how-he-coined-the-term-afro-dancehall/" },
    { id: "48735", title: "Nhoya Ruthlyn Turns Childhood Bullying Into Strength and Inspiration", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Digital-marketer-and-content-creator-Nhoya-Ruthlyn.jpg", excerpt: "Nhoya Ruthlyn has opened up about being bullied over her appearance and deep voice.", link: "https://zedmultimedia.com/2026/08/13/nhoya-ruthlyn-turns-childhood-bullying-into-strength-and-inspiration/" },
    { id: "48672", title: "Akon Questions P-Square Management Over May D Dispute", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Senegalese-American-singer-songwriter-record-producer-and-businessman-Akon.jpg", excerpt: "Akon has criticised the management of Nigerian music duo P-Square over its handling of artiste May D.", link: "https://zedmultimedia.com/2026/08/10/akon-questions-p-square-management-over-may-d-dispute/" }
  ], 140);

  const lifestyleFetched = mk("Lifestyle", "lifestyle", [
    { id: "31292", title: "Isolation fuels mental illness — Advocate", image: "https://zedmultimedia.com/wp-content/uploads/2025/07/Stanislaus-Nyaku_Mental-Health-Advocate_700x500.jpg", excerpt: "A mental health advocate has emphasized the critical role of communication in maintaining mental wellness.", link: "https://zedmultimedia.com/2025/07/18/isolation-fuels-mental-illness-advocate/" },
    { id: "30956", title: "Dermatologist warns against using triple action creams on babies", image: "https://zedmultimedia.com/wp-content/uploads/2025/07/Dr.-Kofi-Brifo_Dermatologist_700x500.jpg", excerpt: "A dermatologist has raised alarm over the growing use of harmful chemicals in everyday skincare products.", link: "https://zedmultimedia.com/2025/07/15/dematologist-warns-against-using-triple-action-creams-on-babies/" },
    { id: "30768", title: "Dietitian urges parents to make healthy eating fun and colourful for kids", image: "https://zedmultimedia.com/wp-content/uploads/2025/07/Registered-Dietitian-Emelia-Bamfo-Boatemaa_700x500.jpg", excerpt: "A dietitian is urging parents to embrace fun and engaging strategies to encourage healthy eating habits.", link: "https://zedmultimedia.com/2025/07/09/dietitian-urges-parents-to-make-healthy-eating-fun-and-colorful-for-kids/" },
    { id: "30496", title: "The truth about fasting: Benefits and warnings", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Gracia-Helarie-Fraikue_Dietitian-MPH_700x500.jpg", excerpt: "A dietician has highlighted the health benefits of intermittent fasting for metabolism and insulin response.", link: "https://zedmultimedia.com/2025/06/30/the-truth-about-fasting-benefits-and-warnings/" },
    { id: "30500", title: "Dietitian cautions public on intermittent fasting risks", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Prince-Frimpong_Dietitian_700x50.jpg", excerpt: "A dietitian has advised Ghanaians to approach intermittent fasting with caution, particularly those with certain health conditions.", link: "https://zedmultimedia.com/2025/06/30/dietitian-cautions-public-on-intermittent-fasting-risks/" },
    { id: "30206", title: "University of Ghana resumes COVID-19 safety measures as cases rise", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/University-of-Ghana_700x400.jpg", excerpt: "The University of Ghana has reinstated its COVID-19 safety protocols following a resurgence of cases on campus.", link: "https://zedmultimedia.com/2025/06/25/university-of-ghana-resumes-covid-19-safety-measures-as-cases-rise/" },
    { id: "30037", title: "AMA Health Director calls for truthful reporting to fight Mpox", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Dr.-Louisa-Ademki-Matey_Director-of-Health-Services-for-the-Accra-Metropolis_1000x500.jpg", excerpt: "The Director of Health Services for the Accra Metropolitan Assembly has appealed to the public to be truthful and cooperative.", link: "https://zedmultimedia.com/2025/06/24/ama-health-director-calls-for-truthful-reporting-to-fight-mpox/" },
    { id: "30031", title: "Psychologist warns of rising smartphone addiction among students", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Robertson-David-Mfodwo_Clinical-Psychologist_700x500.jpg", excerpt: "A clinical psychologist has raised alarm over growing smartphone addiction among university students and professionals.", link: "https://zedmultimedia.com/2025/06/23/psychologist-warns-of-rising-smartphone-addiction-among-students/" },
    { id: "30029", title: "Too much screen time hurting your focus, expert warns", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Justice-Ocloo_Mental-health-Advocate_700x500.jpg", excerpt: "A mental health advocate has shed light on the science behind digital distractions and their effect on the brain.", link: "https://zedmultimedia.com/2025/06/23/too-much-screen-time-hurting-your-focus-expert-warns/" },
    { id: "29999", title: "Ghana records 107 Mpox cases", image: "https://zedmultimedia.com/wp-content/uploads/2024/08/Monkeypox.jpg", excerpt: "The Ghana Health Service has confirmed nine new cases of Mpox, bringing the total number of recorded cases to 107.", link: "https://zedmultimedia.com/2025/06/23/ghana-records-107-mpox-cases/" },
    { id: "29576", title: "Fitness coach links morning exercise to workplace productivity", image: "https://zedmultimedia.com/wp-content/uploads/2025/06/Victor-Konu_Fitness-Coach_700x500.jpg", excerpt: "Fitness coach Victor Konu has emphasized the connection between regular physical activity and productivity.", link: "https://zedmultimedia.com/2025/06/16/fitness-coach-links-morning-exercise-to-workplace-productivity/" }
  ], 200);

  const tech = mk("Technology", "technology", [
    { id: "32358", title: "Google taps nuclear power to fuel AI boom in Oak Ridge move", image: "https://zedmultimedia.com/wp-content/uploads/2025/08/Google-building_700x500.jpg", excerpt: "Google, with Kairos Power, has selected Oak Ridge, Tennessee, as the site for an advanced small modular nuclear reactor.", link: "https://zedmultimedia.com/2025/08/19/google-taps-nuclear-power-to-fuel-ai-boom-in-oak-ridge-move/" },
    { id: "31932", title: "Perplexity AI makes $34.5bn bid for Google Chrome", image: "https://zedmultimedia.com/wp-content/uploads/2025/08/Perplexity-AI_700x400.jpg", excerpt: "AI startup Perplexity has made an unsolicited USD34.5 billion offer to acquire Google’s Chrome browser.", link: "https://zedmultimedia.com/2025/08/13/perplexity-ai-makes-34-5bn-bid-for-google-chrome/" },
    { id: "31819", title: "US tech giants agree to pay 15% revenue from China chip sales in high-stakes deal", image: "https://zedmultimedia.com/wp-content/uploads/2025/08/3254.jpg", excerpt: "Nvidia and AMD have reached an unprecedented agreement with the US government over revenues from specific chip sales in China.", link: "https://zedmultimedia.com/2025/08/12/us-tech-giants-agree-to-pay-15-revenue-from-china-chip-sales-in-high-stakes-deal/" },
    { id: "31569", title: "Dawa’s billion-dollar bet on Ghana’s tech future", image: "https://zedmultimedia.com/wp-content/uploads/2025/08/George-Spencer-Quaye_CEO-of-Mobex-Africa_700x500.jpg", excerpt: "The partnership with the UAE to establish a USD1 billion Innovation and Technology Hub in Dawa, Greater Accra.", link: "https://zedmultimedia.com/2025/08/06/dawas-billion-dollar-bet-on-ghanas-tech-future/" },
    { id: "31546", title: "AI no substitute for human thinking – Tech expert", image: "https://zedmultimedia.com/wp-content/uploads/2025/08/AI-and-tech-expert_Julian-Owusu_700x500.jpg", excerpt: "AI and tech expert Julian Owusu has cautioned that artificial intelligence should be regarded strictly as a tool.", link: "https://zedmultimedia.com/2025/08/06/ai-no-substitute-for-human-thinking-tech-expert/" },
    { id: "30588", title: "Data prices have been reduced as promised, but Ghanaians are still not happy", image: "https://zedmultimedia.com/wp-content/uploads/2025/07/Delppy_700x500.jpg", excerpt: "Ghana’s Minister for Communications and Digitalisation made good on a promise to reduce data prices, but users remain unsatisfied.", link: "https://zedmultimedia.com/2025/07/03/data-prices-have-been-reduced-as-promised-but-ghanaians-are-still-not-happy/" },
    { id: "26938", title: "Data Protection expert urges AI adoption to strengthen cybersecurity", image: "https://zedmultimedia.com/wp-content/uploads/2025/05/Richard-Amo-Hene_Certified-Data-Protection-Trainer_1000x500.jpg", excerpt: "A certified data protection trainer is urging government and corporate institutions in Ghana to adopt AI for security.", link: "https://zedmultimedia.com/2025/05/08/data-protection-expert-urges-ai-adoption-to-strengthen-cybersecurity/" },
    { id: "24354", title: "Ghana STEM Network Calls on Government for a Robust Approach to Sustainable STEM Education", image: "https://zedmultimedia.com/wp-content/uploads/2025/03/Ghana-STEM-Network_073402_700x500.jpg", excerpt: "The era of fossil fuel-driven economic growth is giving way to one fuelled by knowledge, the network says.", link: "https://zedmultimedia.com/2025/03/21/ghana-stem-network-calls-on-government-for-a-robust-approach-to-sustainable-stem-education-in-ghana-2/" },
    { id: "23789", title: "BeTechConnected Hosts Future of Work 2.0 Media Soirée", image: "https://zedmultimedia.com/wp-content/uploads/2025/03/BeTechConnected_Future-of-Work-2.0_700x500.jpg", excerpt: "BeTechConnected has hosted the Future of Work 2.0 media soirée, an exclusive gathering to provide knowledge and insights.", link: "https://zedmultimedia.com/2025/03/12/betechconnected-hosts-future-of-work-2-0-media-soiree-setting-the-stage-for-transformative-event/" },
    { id: "22199", title: "Why MFA isn’t the cyber security silver bullet you think it is", image: "https://zedmultimedia.com/wp-content/uploads/2025/01/Allen-Olayiwola_New_700x500.jpg", excerpt: "Multi-factor authentication has become a cornerstone of modern IT security, but it is not a cure-all.", link: "https://zedmultimedia.com/2025/02/12/why-mfa-isnt-the-cyber-security-silver-bullet-you-think-it-is/" },
    { id: "21330", title: "Saving IT teams from burnout and cyber threats", image: "https://zedmultimedia.com/wp-content/uploads/2025/01/Allen-Olayiwola_New_700x500.jpg", excerpt: "As cyber threats evolve, IT teams in Ghana are under increasing pressure to keep businesses safe.", link: "https://zedmultimedia.com/2025/01/27/saving-it-teams-from-burnout-and-cyber-threats/" },
    { id: "21301", title: "AT unveils strategic expansions, innovations for 2025", image: "https://zedmultimedia.com/wp-content/uploads/2025/01/AT-Logo_700x500.jpg", excerpt: "Telecommunications giant AT has unveiled a series of initiatives for 2025 aimed at enhancing customer experience.", link: "https://zedmultimedia.com/2025/01/27/at-unveils-strategic-expansions-innovations-for-2025/" }
  ], 160);

  /* ---------- Category lists ---------- */
  const homeBy = (slug) => HOME.filter((p) => p.catSlug === slug);
  const BY_CAT = {
    business: [ENERGY, ...homeBy("business"), ...businessFetched].slice(0, 12),
    politics: [...homeBy("politics"), ...politicsFetched].slice(0, 12),
    sports: sports.slice(0, 12),
    entertainment: [...homeBy("entertainment"), ...entertainmentFetched].slice(0, 12),
    lifestyle: [...homeBy("lifestyle"), ...lifestyleFetched].slice(0, 12),
    technology: tech.slice(0, 12)
  };
  /* News = a mix of everything, newest first by mock age */
  const pool = [...HOME, ENERGY, ...businessFetched.slice(0, 3), ...sports.slice(0, 3), ...entertainmentFetched.slice(0, 2), ...tech.slice(0, 2)];
  BY_CAT.news = pool.sort((a, b) => a.minsAgo - b.minsAgo).slice(0, 12);

  const CATS = {
    news: { name: "News", tabs: ["Ghana", "Africa", "World"] },
    business: { name: "Business", tabs: ["Economy", "Markets", "Companies", "Africa"] },
    politics: { name: "Politics", tabs: ["Ghana", "Africa", "North America", "Europe"] },
    lifestyle: { name: "Lifestyle", tabs: ["Health", "Family", "Wellness"] },
    sports: { name: "Sports", tabs: ["Football", "Athletics", "Boxing", "Basketball"] },
    entertainment: { name: "Entertainment", tabs: ["Music", "Film & TV", "Celebrity"] },
    technology: { name: "Technology", tabs: ["AI", "Telecom", "Cybersecurity", "Startups"] }
  };

  /* ---------- Everything, de-duplicated (used by search and article lookup) ---------- */
  const seen = new Set();
  const ALL = [];
  [...HOME, ENERGY, ...businessFetched, ...politicsFetched, ...sports, ...entertainmentFetched, ...lifestyleFetched, ...tech].forEach((p) => {
    if (!seen.has(p.id)) { seen.add(p.id); ALL.push(p); }
  });

  /* ---------- Articles with full text ----------
     Body text is the publisher's own copy. Key points are written for the prototype.
     Posts without an entry here fall back to their excerpt plus a link to the live story. */
  const ARTICLES = {
    "energy-shortfall": {
      caption: "Ghanaian officials discuss strategies to boost ECG’s efficiency by reducing government support and addressing a $1.2 billion energy sector shortfall for 2024.",
      keyPoints: [
        "The Ghanaian government is reducing its financial support to the Electricity Company of Ghana (ECG) to promote operational efficiency and decrease liabilities. This aims to alleviate the burden on the Ministry of Finance, with an emphasis on making ECG more self-sufficient.",
        "For 2024, the government has allocated approximately GHS 18 billion (US$1.2 billion) to address energy sector shortfalls, ensuring that ECG can pay independent power producers and other stakeholders within the energy value chain, amidst challenges like unpaid bills and operational inefficiencies.",
        "Experts advocate for a multi-stakeholder approach, including private sector involvement, to enhance ECG’s efficiency and reduce its debt. This would facilitate better revenue collection and ultimately lessen the government’s financial burden, allowing for reallocation of funds to critical sectors such as education and health."
      ],
      body: [
        "Government says it has taken bold steps to reduce, if not eliminate, the continuous support to the Electricity Company of Ghana (ECG) in financing the country’s energy sector shortfalls.",
        "That action by the government, Dr Amin Adam said was to make ECG cost and operationally efficient, thereby, reducing the emergency liabilities the company imposed on the Ministry of Finance.",
        "He was responding to a question asked by the Ghana News Agency at a press briefing at the just ended International Monetary Fund (IMF)/World Bank Group (WBG) Annual Meetings in Washington DC (USA).",
        "In 2024 alone, the government has committed approximately, GHS18 billion (US$1.2bn) in financing energy sector shortfalls, to enable ECG pay Independent Power Producers (IPPs), and other value chain players.",
        "The other sector players include the Volta River Authority (VRA), Bui Power Authority (BPI), Ghana National Gas Company, Ghana Grid Company (GRIDCo), and ECG itself.",
        "The shortfall, attributed to losses, created by people consuming and not paying bills, and inefficiencies in metering and billing systems and other operational challenges, leading to ECG’s inability to pay value chain players as due them.",
        "However, Dr Amin Adam, has indicated that the situation, which the African Centre for Energy Policy (ACEP) has described as “unsustainable” would be reduced drastically, through sector-collaborative initiatives.",
        "“This is a matter that we can no longer leave for the energy sector players alone. This is why the Finance Ministry has taken interest in negotiating measures that we need to implement,” he said.",
        "“We’re working closely with the Ministry of Energy to ensure that these measures are implemented in order for ECG to collect more to pay everybody, and then the burden on the budget of having to pay for the shortfall is minimised or eliminated,” Dr Amin Adam said.",
        "The interventions include the recent US$260 million deal with the World Bank for the procurement of about one million smart metres to reach more customers, and their integration to ensure enhanced revenue collection.",
        "Also, there would be an effective and transparent implementation of the Cash Waterfall Mechanism, and a sector-wide audit to correct the challenges in the entire energy sector, the Finance Minister said.",
        "He stated that the savings from the interventions to reduce the government’s commitment to ECG’s shortfall would be “repurposed to critical areas of education, health, and road infrastructure.”",
        "“If they [ECG] were to be efficient in collecting more, if those who steal power were to be paying for the power, then they will be able to collect more to pay all those in the value chain, what is due them,” he echoed.",
        "In an exclusive interview with GNA on the margins of the IMF/WBG Annual Meetings, Mr Ben Boakye, Executive Director, ACEP, called for a bi-partisan-multi stakeholder approach to ending the challenges in the energy sector, particularly ECG’s inefficiencies.",
        "“Currently, ECG is pilling more than 50 per cent of its revenue as debt. So, there’s significant under recoveries in the sector, which undermines Ghana’s budget because the government guarantees a lot of the power plants,” he said."
      ]
    },
    "48957": {
      caption: "Financial Analyst John Kyei.",
      keyPoints: [
        "Financial Analyst John Kyei says GoldBod should be judged on its strategic objectives, not only on accounting profits or losses.",
        "He points to foreign exchange reserves, import cover and value addition to Ghana’s gold as the real scorecard.",
        "He also links GoldBod’s success to tracing gold purchases and curbing illegal mining."
      ],
      body: [
        "Financial Analyst John Kyei has urged stakeholders to assess the performance of the Ghana Gold Board (GoldBod) based on its strategic objectives rather than solely on accounting profits or losses.",
        "His comments come amid ongoing discussions over the reported GH¢22 billion loss associated with the Bank of Ghana’s Domestic Gold Purchase Programme.",
        "Speaking on Business Breakfast on Zed, Mr. Kyei said GoldBod was established to perform specific strategic functions, including supporting the accumulation of foreign exchange reserves and improving the country’s access to foreign exchange.",
        "He argued that these objectives should form a key part of any assessment of the institution’s performance.",
        "“But if we don’t want to do that and want to make them a strategic agency to cater for our accumulation of reserves and also our forex needs, then we should not be too much concerned about the losses,” he said.",
        "According to him, the nature of GoldBod’s operations means fluctuations in gold prices can significantly affect the accounting value of its holdings.",
        "“If the business always has to be buying whether price is high or low, and then the gold price swing, you know it will always affect the way you value gold at the end, and it will create massive losses,” he explained.",
        "Mr. Kyei said GoldBod’s performance should instead be measured against indicators such as the country’s foreign exchange reserves and import cover.",
        "“So your scorecard should be one. We have enough forex. You can see the trajectory. The import cover keeps increasing,” he said.",
        "Mr. Kyei further identified value addition to Ghana’s gold resources as another area that should be considered when assessing GoldBod.",
        "The Financial Analyst also said GoldBod’s role in formalising the gold trading chain should be assessed alongside efforts to tackle illegal mining.",
        "“And this should be the scorecard for them, not the accounting profit or losses,” he stressed."
      ]
    },
    "48946": {
      caption: "A PETROSOL fuel filling station.",
      keyPoints: [
        "PETROSOL Platinum Energy PLC has listed a GH¢200 million note programme on the Ghana Fixed Income Market.",
        "The notes are debt securities, so the company is not selling ownership stakes.",
        "The listing gives investors a new corporate debt option and the company an alternative to bank loans."
      ],
      body: [
        "PETROSOL Platinum Energy PLC has officially listed its GH¢200 million note programme on the Ghana Stock Exchange’s Ghana Fixed Income Market (GFIM) today, August 24, 2026, becoming the latest energy-sector company to access Ghana’s capital market for funding.",
        "The listing marks PETROSOL’s entry into the country’s organised fixed-income market at a time when businesses are increasingly exploring alternatives to traditional bank financing to secure longer-term capital.",
        "Unlike an equity listing, the transaction does not involve PETROSOL selling ownership stakes in the company.",
        "Instead, the notes constitute debt securities through which investors provide funds to the company, with PETROSOL expected to fulfil agreed interest and repayment obligations.",
        "The Ghana Fixed Income Market provides a platform for trading government and corporate bonds, enabling investors to buy and sell eligible securities after their initial issuance. The market is intended to promote liquidity, price discovery and transparency in fixed-income trading.",
        "For investors, the GH¢200 million programme introduces another corporate debt instrument through which they can gain exposure to Ghana’s energy and downstream petroleum industry."
      ]
    },
    "48959": {
      caption: "Veteran Ghanaian actress Grace Nortey.",
      keyPoints: [
        "Veteran Ghanaian actress Grace Nortey has reportedly died at the University of Ghana Medical Centre. She was 89.",
        "Her career spanned more than five decades across Ghanaian theatre and film.",
        "She also featured in the Netflix war film Beasts of No Nation."
      ],
      body: [
        "Veteran Ghanaian actress Grace Nortey has reportedly died at the University of Ghana Medical Centre (UGMC) in the early hours of Wednesday, August 26, 2026. She was 89.",
        "Nortey, who celebrated her birthday on February 1, leaves behind a career spanning more than five decades and a lasting legacy in Ghanaian theatre and film.",
        "She was widely known for portraying strong-willed and outspoken maternal characters, often taking on roles that confronted social norms, patriarchy and injustice.",
        "Born on February 1, 1937, Nortey became one of the most respected figures in Ghana’s entertainment industry, earning admiration for her commanding performances on both stage and screen.",
        "Her career also extended to internationally recognised productions. She featured in the 2011 Ghanaian drama Sinking Sands and the 2015 Netflix war film Beasts of No Nation, showcasing her versatility as an actress.",
        "Nortey’s contribution to the arts was also reflected in her family. She is survived by five children, including actress Sheila Nortey, who followed in her mother’s footsteps and pursued a career in acting."
      ]
    },
    "48940": {
      caption: "Special Prosecutor Kissi Agyebeng.",
      keyPoints: [
        "The Office of the Special Prosecutor has received three separate petitions over allegations against the Minority Leader.",
        "The OSP will assess whether the matter falls within its mandate before deciding on any investigation.",
        "The Minority Leader has denied the allegations and says he intends to pursue legal action."
      ],
      body: [
        "The Office of the Special Prosecutor (OSP) has disclosed that it has received three separate petitions concerning allegations of extortion and related conduct made by the Chief Executive Officer of the Ghana Gold Board (GoldBod), Sammy Gyamfi, against the Minority Leader of Parliament, Alexander Afenyo-Markin.",
        "According to the OSP, one of the petitions was jointly submitted by two individuals, while two other petitions were submitted separately by different individuals, all in connection with the allegations against the Minority Leader.",
        "In a statement issued on Monday, August 24, the anti-corruption agency said it had taken note of the public allegations and would assess the petitions to determine whether the matter falls within its statutory mandate.",
        "The OSP further indicated that, after assessing the allegations, it would determine whether there are grounds for any further investigative action.",
        "The development follows allegations by Mr Gyamfi, who accused Mr Afenyo-Markin of extortion. The Minority Leader has denied the allegations and has indicated that he intends to pursue legal action against the GoldBod Chief Executive Officer.",
        "The OSP’s assessment will determine whether the allegations fall within its jurisdiction and whether the circumstances warrant further action by the anti-corruption agency."
      ]
    }
  };

  /* ---------- Mock markets ---------- */
  const TICKER = [
    { name: "S&P 500", value: "5,806.35", change: 0.15 },
    { name: "Nasdaq", value: "18,385.60", change: 0.60 },
    { name: "US 10 Yr", value: "4.19", change: 0.47 },
    { name: "FTSE 100", value: "8,269.38", change: 0.13 },
    { name: "Crude Oil", value: "70.08", change: -0.98 },
    { name: "Gold", value: "2,748.00", change: 0.68 }
  ];
  const STOCKS = [
    { symbol: "GCB", price: 5.42, change: 0.12 },
    { symbol: "MTNGH", price: 0.31, change: -0.01 },
    { symbol: "EGH", price: 3.18, change: 0.05 },
    { symbol: "SCB", price: 3.95, change: 0.00 },
    { symbol: "GOIL", price: 1.66, change: -0.04 }
  ];
  const MARKET = [
    { name: "GSE Composite", value: "4,812.30", change: 0.42 },
    { name: "GSE-FSI", value: "2,644.10", change: 0.18 },
    { name: "Ghana Cedi / USD", value: "15.40", change: -0.22 },
    { name: "91-day T-Bill", value: "14.8%", change: 0.05 }
  ];

  /* ---------- Mock video cards ---------- */
  const VIDEOS = [
    { title: "Celebrating innovation: GDIW 2024 sets new standards", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/TBSC.jpg" },
    { title: "EU pushes for greater digitalisation in agric sector", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Finance-Minister-Calls-for-Shift-from-Raw-Exports-to-Value-Added-Trade-with-China.jpg" },
    { title: "Mahama pledges fiscal discipline and local production", image: "https://zedmultimedia.com/wp-content/uploads/2024/07/JDM4.jpg" },
    { title: "Dr Cryme recalls how music led him to TV presenting", image: "https://zedmultimedia.com/wp-content/uploads/2026/08/Ghanaian-rapper-Darlington-Agyekum-popularly-known-as-Dr-Cryme.jpg" }
  ];

  return { HOME, BY_CAT, CATS, ALL, ARTICLES, TICKER, STOCKS, MARKET, VIDEOS };
})();
