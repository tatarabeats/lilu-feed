import type { FeedItem } from '../types/feed';

type ArchiveItem = Omit<FeedItem, 'badge' | 'archiveDate' | 'id'> & { id?: string };

const raw: ArchiveItem[] = [
  // === SPEECHES ===
  {
    category: 'philosophy',
    contentType: 'speech',
    title: 'Global Value Investing in Our Era',
    summary: 'Li Lu presents his framework for understanding value investing in a world shaped by technological disruption and geopolitical shifts. Delivered at a major investment conference in December 2024.',
    articleBody: `Li Luは2024年12月の投資カンファレンスで、現代におけるバリュー投資の枠組みを提示した。テクノロジーの破壊的変化と地政学的シフトが進む世界で、どのように価値を見極めるかがテーマだ。

彼の主張の核心は、バリュー投資の原則は時代を超えて有効だが、適用する対象は変化するということ。AI、クラウドコンピューティング、電気自動車などのテクノロジー企業も、適切な価格で買えばバリュー投資の対象になり得る。重要なのは「何を買うか」ではなく「いくらで買うか」だ。

Li Luはまた、地政学的リスクを投資機会として捉える視点を強調。米中関係の緊張は特定の企業にとってディスカウントを生み出し、それが安全余裕（margin of safety）になるという逆説的な見方を提示した。彼自身のポートフォリオがPDD Holdings（中国EC企業）を14%保有していることが、この哲学の具体例だ。`,
    imageUrl: null,
    sourceUrl: 'https://www.himcap.com/publications',
    sourceName: 'Himalaya Capital',
    sourceFaviconUrl: null,
    publishedAt: '2024-12-01T00:00:00Z',
    tickers: [],
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'speech',
    title: 'The Practice of Value Investing',
    summary: 'A comprehensive talk on how value investing principles apply to modern markets. Li Lu discusses margin of safety, owner mentality, and the importance of staying within your circle of competence.',
    articleBody: `Li Luの2019年の講演「バリュー投資の実践」は、彼の投資哲学の4本柱を体系的に解説した重要なスピーチだ。

第1の柱「安全余裕（Margin of Safety）」: 本質的価値より大幅に安い価格で買うこと。分析の誤りや予期せぬ事態から身を守る保険となる。Li Luは「間違えても元本を失わない価格で買え」と強調する。

第2の柱「オーナーの精神（Owner's Mentality）」: 株を買うとき、自分をその企業のオーナーだと考える。この視点の転換が、企業の評価方法も保有期間も根本的に変える。経営者以上にビジネスを理解すべきだという。

第3の柱「ミスター・マーケット」: 市場はあなたの召使いであって導き手ではない。市場の変動を利用して、恐怖の時に買い、価格が高い時は待つ。感情に振り回されないこと。

第4の柱「能力の輪（Circle of Competence）」: 自分が本当に理解できるビジネスだけに投資する。輪の大きさより、その境界を知ることが重要。能力の輪の外で投資すると永久的な資本損失が起きる。`,
    imageUrl: null,
    sourceUrl: 'https://www.himcap.com/publications',
    sourceName: 'Himalaya Capital',
    sourceFaviconUrl: null,
    publishedAt: '2019-11-01T00:00:00Z',
    tickers: [],
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'speech',
    title: 'Civilizations, Modernization, and Value Investing',
    summary: 'Li Lu explains his unique civilizational framework: modernization is a compounding phenomenon, and understanding this trajectory is key to identifying long-term investment opportunities.',
    articleBody: `Li Luの最もユニークな知的貢献は、文明論と投資を結びつけた枠組みだ。この2020年の講演で、彼は近代化（モダナイゼーション）そのものが複利的な現象であると論じる。

核心的な洞察: 一度近代化の軌道に乗った文明は、知識・技術・生活水準の複合的成長がほぼ止められなくなる。これは過去250年の人類史が証明している。産業革命以前の数千年間、1人あたりGDPはほぼ横ばいだったが、近代化の波が始まると指数関数的に上昇した。

投資への応用: Li Luはこの枠組みを使って、どの国・どの産業が近代化の恩恵を最も受けるかを分析する。中国はまだ近代化の途上にあり、14億人の消費者が中産階級に移行する過程で巨大な投資機会が生まれるという。彼がPDD Holdings（Temu）やBank of Americaに集中投資する根拠もここにある。

重要なのは、この見方が短期的な市場ノイズを無視する根拠にもなること。地政学的摩擦や一時的な景気後退は、文明レベルの長期トレンドの前では些末な出来事に過ぎない。`,
    imageUrl: null,
    sourceUrl: 'https://www.himcap.com/publications',
    sourceName: 'Himalaya Capital',
    sourceFaviconUrl: null,
    publishedAt: '2020-04-01T00:00:00Z',
    tickers: [],
    author: 'Li Lu',
  },

  // === BOOKS ===
  {
    category: 'philosophy',
    contentType: 'book',
    title: 'Moving the Mountain — Li Lu\'s Tiananmen Memoir',
    summary: 'Li Lu\'s 1990 memoir recounting his experience as a student leader during the Tiananmen Square protests. A firsthand account of courage, survival, and the pursuit of freedom.',
    articleBody: `『Moving the Mountain（山を動かす）』は、Li Luが1990年に出版した天安門事件の回顧録だ。1966年中国生まれ、唐山大地震のサバイバーである彼が、天安門広場で学生リーダーとなり、最終的にアメリカに亡命するまでの壮絶な体験を描いている。

Li Luは1989年の民主化運動で学生指導者の一人として活動。軍の武力鎮圧の中で命からがら脱出し、フランスを経てアメリカに渡った。無一文の難民として到着した彼は、コロンビア大学に入学する。

この本が投資家としてのLi Luを理解する上で重要な理由: 彼のリスク管理能力、逆境での冷静な判断力、そして「最悪の事態でも生き残る」という安全余裕の考え方は、天安門での経験に根ざしている。文字通り命がかかった状況でのサバイバル経験が、投資における「永久的な資本損失を避ける」という鉄則に結びついている。

また、権威に対して独立した思考を持つ姿勢——群衆に流されず、自分の分析を信じる——もこの時期に形成された。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Book',
    sourceFaviconUrl: null,
    publishedAt: '1990-01-01T00:00:00Z',
    tickers: [],
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'book',
    title: '文明、現代化、価値投資与中国',
    summary: 'Li Luの2020年の著書。文明の発展、近代化のプロセス、そして中国における価値投資の可能性について論じた包括的な投資哲学書。',
    articleBody: `2020年に出版されたLi Luの著書は、彼の知的世界を最も包括的に示す作品だ。タイトルの通り、文明・近代化・価値投資・中国という4つのテーマを一本の糸で紡いでいる。

第1部「文明」: 人類の文明史を俯瞰し、なぜ特定の地域が先に発展したかを分析。ジャレド・ダイアモンドの『銃・病原菌・鉄』に影響を受けつつ、独自の視点を加えている。

第2部「近代化」: 近代化を複利的現象として捉える彼独自の理論を展開。科学革命→産業革命→情報革命の各段階で、成長が加速するメカニズムを解説。

第3部「価値投資」: グレアム→バフェット→マンガーの知的系譜を辿りながら、バリュー投資の本質を論じる。重要なのは「正しいビジネスを正しい価格で買う」というシンプルな原則だと説く。

第4部「中国」: 中国が近代化の軌道に完全に乗ったと論じ、14億人の消費者市場が生み出す投資機会を分析。地政学的リスクを認めつつも、長期的には近代化の力がそれを凌駕すると主張する。

Li Luの投資哲学を深く理解したい人にとって必読の一冊。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Book',
    sourceFaviconUrl: null,
    publishedAt: '2020-09-01T00:00:00Z',
    tickers: [],
    author: 'Li Lu',
  },

  // === PODCASTS ===
  {
    category: 'philosophy',
    contentType: 'podcast',
    title: 'Founders Podcast #362 — Li Lu: Moving the Mountain',
    summary: 'David Senra examines Li Lu\'s extraordinary journey from surviving the Tangshan earthquake to leading protests at Tiananmen Square to becoming one of the greatest investors of our time.',
    articleBody: `David Senraの「Founders Podcast」第362回は、Li Luの人生を詳細に追ったエピソードだ。Senraは数百冊の起業家・投資家の伝記を読んできたが、Li Luの人生は「最も驚異的」と評する。

エピソードの主要な学び:

1. 「逆境は最高の教師」: Li Luは1976年の唐山大地震（死者24万人）を10歳で生き延び、孤児として育った。この経験が、最悪の事態に備える投資哲学の根底にある。

2. 「独立思考の原点」: 天安門事件で学生リーダーとして立ち上がったことは、権威や群衆の意見に流されない姿勢の出発点。投資でも「他人が何を言おうと、自分の分析を信じる」という原則に繋がる。

3. 「知的好奇心の力」: 難民としてアメリカに渡り、コロンビア大学でBA・JD・MBAの3学位を同時取得。この知的貪欲さが、あらゆるビジネスを深く理解する能力の源泉。

4. 「メンターの重要性」: Charlie Mungerとの出会いがLi Luの投資人生を決定的に変えた。Senraは「適切な人に出会うタイミングが人生を変える」と強調する。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Founders Podcast',
    sourceFaviconUrl: null,
    publishedAt: '2024-01-15T00:00:00Z',
    tickers: [],
    author: 'David Senra',
  },
  {
    category: 'philosophy',
    contentType: 'podcast',
    title: 'Founders Podcast #363 — Li Lu: Value Investing',
    summary: 'Part 2 of the Li Lu deep dive. Senra explores Li Lu\'s investment philosophy, his relationship with Charlie Munger, and how he introduced BYD to Berkshire Hathaway.',
    articleBody: `Founders Podcast第363回は、Li Luの投資哲学とCharlie Mungerとの関係に焦点を当てたPart 2だ。

Li LuとMungerの関係: 1990年代後半、Li LuはMungerに出会い、バリュー投資に目覚める。Mungerは自分の個人資産$88Mの運用をLi Luに託した——Mungerが生涯で唯一使った外部ファンドマネージャーだ。この信頼は、Li Luの能力の証明であり、彼の投資アプローチへの最高の推薦状でもある。

BYD紹介のエピソード: 2008年、Li LuはMungerに中国のBYD（バッテリー・電気自動車メーカー）を紹介した。Mungerは即座にバフェットに投資を勧め、バークシャーは$232Mを投資。この投資は後に$7B以上に成長し、バークシャー史上最高の投資の一つとなった。

Senraが強調するポイント: Li Luの投資プロセスは驚くほどシンプルだ。(1) 本当に理解できるビジネスだけを探す、(2) 本質的価値を計算する、(3) 大幅なディスカウントで買う、(4) 長期保有する。たった9銘柄に$3.57Bを集中投資している事実が、このアプローチの純度を物語っている。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Founders Podcast',
    sourceFaviconUrl: null,
    publishedAt: '2024-01-22T00:00:00Z',
    tickers: ['BRK-B'],
    author: 'David Senra',
  },
  {
    category: 'philosophy',
    contentType: 'podcast',
    title: 'The Investor\'s Podcast — Li Lu & Himalaya Capital',
    summary: 'A deep analysis of Li Lu\'s concentrated portfolio approach and how Himalaya Capital has generated exceptional returns with just 9 holdings.',
    articleBody: `The Investor's Podcastによるヒマラヤ・キャピタルの分析エピソード。たった9銘柄で$3.57Bを運用するLi Luの集中投資アプローチを深掘りする。

集中投資の哲学: Li Luのポートフォリオは、大手ファンドマネージャーの中でも異例の集中度だ。上位3銘柄（GOOG 43.86%、BAC 16.08%、PDD 14.64%）だけで全体の74%を占める。これは「少数の企業を深く理解する」方が「多数の企業を浅く知る」よりも良いリターンを生むという確信に基づく。

リターンの源泉: ヒマラヤ・キャピタルの長期リターンは市場平均を大幅に上回っている。その理由は3つ: (1) 集中投資による高い確信度、(2) 長期保有による複利効果の最大化、(3) 市場のパニック時に積極的に買い増す逆張りの勇気。

ポッドキャストの結論: Li Luのアプローチは誰にでも模倣できるものではない。なぜなら、それには「本当に深くビジネスを理解する」という膨大な知的作業と、「市場が暴落しても動じない」という精神的強さが必要だからだ。しかし、その原則——能力の輪を守り、安全余裕を確保し、長期で考える——は全ての投資家に適用できる。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'The Investor\'s Podcast',
    sourceFaviconUrl: null,
    publishedAt: '2023-06-01T00:00:00Z',
    tickers: ['GOOG', 'BAC', 'PDD'],
    author: 'The Investor\'s Podcast',
  },

  // === KEY QUOTES / PRINCIPLES ===
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Margin of Safety — The First Pillar',
    summary: 'The concept of margin of safety is the bedrock of value investing. Buy assets at a significant discount to intrinsic value to protect against errors in analysis and unforeseen events.',
    articleBody: `「安全余裕（Margin of Safety）」はLi Luの投資哲学の第1の柱であり、バリュー投資の最も基本的な概念だ。

本質的価値（intrinsic value）を計算し、それよりも大幅に安い価格でのみ買う。この「差額」が安全余裕だ。なぜこれが重要かというと、(1) 分析は常に不完全であり間違いがありえる、(2) 予期せぬ悪いイベントは必ず起きる、(3) その両方が同時に起きても元本を守れる価格で買うべきだからだ。

Li Luの実践: 彼はポートフォリオの各銘柄に対して、本質的価値の50%以下で買うことを目指すと言われている。これは「間違えても大丈夫」な投資を意味する。

天安門事件のサバイバーであるLi Luにとって、「最悪の事態に備える」は単なる投資理論ではない。命がかかった状況で学んだ実践的知恵だ。投資における永久的な資本損失（permanent capital loss）を避けることは、彼にとって生存本能に近い。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2019-11-01T00:00:00Z',
    tickers: [],
    fullText: 'The concept of margin of safety is the bedrock of value investing. You must buy at a price significantly below intrinsic value. This margin protects you from errors in judgment and unforeseen adversity.',
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Owner\'s Mentality — Think Like a Business Owner',
    summary: 'When you buy a stock, think of yourself as a part-owner of the business. This mindset fundamentally changes how you evaluate companies and how long you hold them.',
    articleBody: `「オーナーの精神（Owner's Mentality）」は、株式投資に対する根本的な姿勢の転換を求めるLi Luの教えだ。

株を「紙切れ」や「チャートの線」として見るのではなく、実際のビジネスの一部を所有していると考える。あなたがGOOG株を持っているなら、あなたはGoogleの共同オーナーだ。

この視点の転換がもたらす変化:
- 企業の評価方法が変わる: 株価ではなく、ビジネスの質・競争優位性・経営陣の能力を見るようになる
- 保有期間が変わる: 良いビジネスを所有しているなら、わざわざ売る理由がない。Li Luの保有期間は年単位、時に10年以上
- 情報の優先度が変わる: 日々の株価ではなく、四半期の業績、競合の動向、産業の構造変化に注目する

Li Luは「経営者以上にそのビジネスを理解すべき」と言う。これが彼がたった9銘柄に集中する理由でもある——深く理解できる企業の数には限りがあるからだ。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2019-11-01T00:00:00Z',
    tickers: [],
    fullText: 'When you buy a stock, think of yourself as a part-owner of the business. You should understand the business as well as, if not better than, the management.',
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Mr. Market — Your Servant, Not Your Guide',
    summary: 'The market is there to serve you, not to instruct you. Use market fluctuations to your advantage by buying when others are fearful and being patient when prices are high.',
    articleBody: `「ミスター・マーケット」はBenjamin Grahamが考案した有名な比喩だが、Li Luはこれを投資の核心的原則として日常的に実践している。

ミスター・マーケットは毎日あなたのドアをノックし、あなたの持つビジネスの持分を売りたい・買いたいと言ってくる気まぐれな隣人だ。彼は感情的で、時に陶酔状態で高い価格を提示し、時にパニック状態で安い価格を叫ぶ。

Li Luの教え: このミスター・マーケットはあなたの「召使い」であり「案内人」ではない。彼が安い価格を提示してきたら利用する。高い価格を要求してきたら無視する。重要なのは、ミスター・マーケットの感情に同調しないことだ。

実践例: 2008年のリーマンショック、2020年のコロナショックで、多くの投資家がパニック売りした時、Li Luは積極的に買い増していたとされる。市場が最も恐怖に支配されている時こそ、最高の安全余裕が得られる瞬間だからだ。

市場の短期的な動きは「ノイズ」であり、ビジネスの本質的価値とは無関係。この区別ができるかどうかが、投資家としての成否を分ける。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2019-11-01T00:00:00Z',
    tickers: [],
    fullText: 'The market is there to serve you, not to instruct you. It is your servant, not your guide. When Mr. Market offers you a bargain, take it. When he demands a premium, walk away.',
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Circle of Competence — Know Your Boundaries',
    summary: 'The size of your circle of competence is not as important as knowing its boundaries. Investing outside your circle is where permanent capital loss occurs.',
    articleBody: `「能力の輪（Circle of Competence）」は、Li Luの投資判断における最も実践的な原則だ。

自分が本当に理解できるビジネスの範囲——それが能力の輪だ。Li Luの言葉を借りれば、「輪の大きさは重要ではない。重要なのはその境界を知ること」。

なぜ境界が重要か: 能力の輪の外で投資すると、リスクを正確に評価できない。分析が正しいかどうかの判断もできない。結果として、永久的な資本損失が起きる可能性が高まる。

Li Luの実践: 彼のポートフォリオ9銘柄は、全て彼が深く理解しているビジネスだ。テック（GOOG）、金融（BAC, BRK-B, EWBC）、中国EC（PDD）、エネルギー（OXY）——いずれも彼のバックグラウンド（中国出身、コロンビア大学BA/JD/MBA、Munger門下）と直接つながる領域。

能力の輪を広げる方法: Li Luは「毎日読む」ことを推奨する。年間レポート、業界レポート、歴史書、科学書——あらゆる知識が能力の輪を少しずつ広げる。ただし、広げている最中のエリアには投資しない。完全に理解してからだ。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2019-11-01T00:00:00Z',
    tickers: [],
    fullText: 'Invest within your circle of competence. The size of that circle is not very important; knowing its boundaries, however, is vital.',
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Modernization as Compound Interest',
    summary: 'Li Lu\'s unique civilizational insight: the process of modernization itself is a compounding phenomenon. Countries that enter the path of modernization experience exponential growth in living standards.',
    articleBody: `「近代化は複利である」——これはLi Luの最もオリジナルな知的貢献だ。

従来の投資家は企業レベルで複利を考える。Li Luは文明レベルで複利を考える。一度近代化の軌道に乗った国は、知識・技術・生活水準が指数関数的に成長し、その流れはほぼ止められない。

歴史的証拠: 産業革命以前の数千年間、世界の1人あたりGDPはほぼ$1,000で横ばいだった。しかし、近代化の波が始まると、200年で$12,000以上に跳ね上がった。これは複利のパワーそのものだ。

投資への応用: Li Luはこのフレームワークを使って「どの国がまだ近代化の途上にあるか」を分析する。中国の14億人がまだ完全には近代化していないという事実は、巨大な投資機会を意味する。

この視点が与えてくれるもの: 短期的な市場ノイズ（貿易戦争、規制強化、景気後退）を「文明レベルのトレンド」の文脈で評価できるようになる。数十年単位で見れば、これらは些末な出来事に過ぎない。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2020-04-01T00:00:00Z',
    tickers: [],
    fullText: 'Modernization is the most powerful force in human history. Once a civilization enters the path of modernization, the compound growth in knowledge, technology, and living standards becomes nearly unstoppable.',
    author: 'Li Lu',
  },
  {
    category: 'philosophy',
    contentType: 'quote',
    title: 'Concentration vs Diversification',
    summary: 'Li Lu runs one of the most concentrated portfolios among major fund managers — just 9 holdings. He believes deep understanding of a few businesses beats shallow knowledge of many.',
    articleBody: `Li Luのポートフォリオはたった9銘柄。運用額$3.57Bの大手ファンドマネージャーとしては異例の集中度だ。

なぜ集中するのか: 「少数のことを深く知る方が、多数のことを浅く知るよりもいい。集中は深い確信の自然な結果だ」とLi Luは言う。

数字が語る集中度:
- GOOG: 43.86%（ポートフォリオの約半分が1銘柄）
- BAC: 16.08%
- PDD: 14.64%
- BRK-B: 12.64%
- 上位4銘柄で87%以上

これは一般的な分散投資の常識に真っ向から反する。しかしLi Luの論理はシンプルだ: 本当に優れたビジネスを適切な価格で見つけるのは極めて稀な機会。見つけたら大きく賭ける。分散は「無知に対するヘッジ」であり、深く理解している場合は不要。

リスク管理: 集中投資のリスクは「安全余裕」で管理する。各銘柄を本質的価値より大幅に安い価格で買っていれば、個別のリスクはすでに織り込まれている。

この姿勢はCharlie Mungerの影響が色濃い。Mungerも「良いアイデアは人生で20個もない。見つけたら大きく賭けろ」と説いていた。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu',
    sourceFaviconUrl: null,
    publishedAt: '2024-01-01T00:00:00Z',
    tickers: ['GOOG', 'BAC', 'PDD', 'BRK-B'],
    fullText: 'I prefer to know a lot about a few things rather than a little about many things. Concentration is the natural result of deep conviction.',
    author: 'Li Lu',
  },

  // === MUNGER MEMORIAL ===
  {
    category: 'philosophy',
    contentType: 'speech',
    title: 'Li Lu\'s Tribute to Charlie Munger',
    summary: 'Li Lu\'s heartfelt tribute to his mentor Charlie Munger, published after Munger\'s passing in November 2023. Reflects on their decades-long relationship and Munger\'s profound influence on his thinking.',
    articleBody: `2023年11月、Charlie Mungerが99歳で亡くなった。Li Luは師であり友であった人物への追悼文を発表した。

Li LuとMungerの出会い: 1990年代後半、Li Luはまだ若い投資家だった。Mungerとの出会いが彼の人生を決定的に変えた。Mungerはバリュー投資の真髄を教えただけでなく、「正しいビジネスを正しい価格で買う」というシフトをもたらした。グレアムの「シケモクバリュー（安いだけの株を拾う）」から、「素晴らしいビジネスを適正価格で買う」への進化だ。

信頼の証: Mungerは自身の個人資産$88Mの運用をLi Luに委託した。Mungerが生涯で外部マネージャーに資金を委ねたのはこの一度きり。この事実だけで、Li Luの投資家としての能力がどれほど高く評価されていたかがわかる。

Mungerの教え: Li Luは追悼文で、Mungerから学んだ最も重要なことは「マルチディシプリナリー・アプローチ（学際的思考法）」だと述べている。物理学、生物学、心理学、歴史——あらゆる分野の知識を投資判断に活かす。

Li Luの言葉: 「Charlieは私に投資だけでなく、より良い人間になる方法を教えてくれた。」`,
    imageUrl: null,
    sourceUrl: 'https://moiglobal.com/wp-content/uploads/li-lu-on-charlie-munger-202412.pdf',
    sourceName: 'MOI Global',
    sourceFaviconUrl: null,
    publishedAt: '2024-12-01T00:00:00Z',
    tickers: ['BRK-B'],
    author: 'Li Lu',
  },

  // === COMPANY DEEP DIVES (from portfolio) ===
  {
    category: 'company_deep_dive',
    title: 'Why Li Lu\'s Largest Bet is Alphabet (GOOG)',
    summary: 'Alphabet represents 43.86% of Himalaya Capital\'s portfolio — an extraordinarily concentrated position. The thesis centers on Google\'s dominance in search, cloud computing growth, and AI leadership.',
    articleBody: `Alphabet（GOOG）はHimalaya Capitalのポートフォリオの43.86%を占める——Li Luの最大の賭けだ。$3.57Bの運用資産のうち約$1.56BがGoogleに集中している。

投資テーゼ:

1. 検索の独占的支配: Google検索は世界の検索市場の90%以上を支配。この圧倒的シェアは「使えば使うほど良くなる」ネットワーク効果によって守られている。広告主にとってGoogle以外の選択肢は実質的にない。

2. クラウドコンピューティング: Google Cloudは急成長中で、AWS・Azureに次ぐ第3位。エンタープライズ市場への浸透が加速しており、高い利益率が期待される。

3. AI: GoogleはAI研究の最前線（DeepMind、Gemini）。AI検索への移行は短期的にはリスクだが、長期的にはGoogleの技術的優位性が活きる。

4. YouTube: 世界第2の検索エンジンであり、最大の動画プラットフォーム。広告収入に加え、サブスクリプション（YouTube Premium）収入も成長中。

なぜ43%も集中するのか: Li Luの哲学では、深く理解し確信が持てるビジネスに大きく賭ける。Alphabetは「能力の輪」の中にあり、安全余裕も確保できていると判断したのだろう。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Portfolio Analysis',
    sourceFaviconUrl: null,
    publishedAt: '2025-03-01T00:00:00Z',
    tickers: ['GOOG'],
  },
  {
    category: 'company_deep_dive',
    title: 'Bank of America: Li Lu\'s Financial Sector Bet',
    summary: 'BAC at 16.08% of the portfolio reflects Li Lu\'s conviction in America\'s largest consumer bank. The thesis: rising rates benefit net interest margins, and BAC\'s digital transformation is underappreciated.',
    articleBody: `Bank of America（BAC）はHimalaya Capitalのポートフォリオの16.08%を占める。Li Luの金融セクターへの確信を示すポジションだ。

投資テーゼ:

1. アメリカ最大の消費者銀行: BACは約6,700万の消費者・中小企業の顧客を持つ。このスケールは競合が容易に模倣できない参入障壁だ。

2. 金利環境の追い風: 銀行は預金と貸出の金利差（純金利マージン）で稼ぐ。金利が上昇する環境ではBACの収益力が自然に向上する。

3. デジタル変革: BACはモバイルバンキング（Erica AIアシスタント）に大規模投資。4,600万のアクティブデジタルユーザーを持ち、テック企業としての側面も強い。これが効率改善と若年層の取り込みに繋がっている。

4. バフェット／マンガーの系譜: Warren BuffettもBACの大株主。Li Luが師匠と同じ銘柄を保有していることは、バリュー投資の知的系譜の一貫性を示す。

Li Luが金融株を好む理由: 銀行は本質的にレバレッジビジネスだが、BACのような「大きすぎて潰せない」銀行は、政府の暗黙の保証という追加の安全余裕がある。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Portfolio Analysis',
    sourceFaviconUrl: null,
    publishedAt: '2025-03-01T00:00:00Z',
    tickers: ['BAC'],
  },
  {
    category: 'company_deep_dive',
    title: 'PDD Holdings: The China Consumer Play',
    summary: 'PDD (Temu\'s parent) at 14.64% represents Li Lu\'s bet on Chinese consumer spending. Despite geopolitical risks, PDD\'s execution in e-commerce and international expansion via Temu is remarkable.',
    articleBody: `PDD Holdings（Temu／Pinduoduoの親会社）はHimalaya Capitalのポートフォリオの14.64%を占める。Li Luの「中国消費者」に対する賭けだ。

投資テーゼ:

1. 中国EC市場のディスラプター: Pinduoduoは中国で「グループ購入」モデルを革新し、アリババとJD.comの牙城を崩した。価格競争力と農村部への浸透で急成長。

2. Temu——世界展開: 2022年に海外向けに「Temu」ブランドをローンチ。超低価格戦略で北米・欧州を席巻。DAU（日間アクティブユーザー）は急増中。

3. 利益率の驚異: PDDの営業利益率は30%超。同業のAmazonが5-7%であることを考えると、驚異的な効率性。

4. 地政学的ディスカウント: 米中関係の緊張で中国株は大幅にディスカウントされている。Li Luの文明論フレームワークでは、これは長期投資家にとって安全余裕を提供する。

リスク: 米国のTemu規制リスク、中国政府のテック規制、為替リスク。しかしLi Luは、14億人の消費市場の成長力がこれらのリスクを長期的に凌駕すると判断したのだろう。

Li Luが中国出身であることも重要——彼は中国の消費者心理とビジネス環境を「能力の輪」の中で深く理解している。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Portfolio Analysis',
    sourceFaviconUrl: null,
    publishedAt: '2025-03-01T00:00:00Z',
    tickers: ['PDD'],
  },
  {
    category: 'company_deep_dive',
    title: 'Berkshire Hathaway: The Student Holds the Master\'s Work',
    summary: 'BRK-B at 12.64% — Li Lu holding Buffett/Munger\'s company is deeply symbolic. It also serves as a cash-equivalent with upside: Berkshire\'s insurance float and diverse operating businesses.',
    articleBody: `Berkshire Hathaway（BRK-B）はHimalaya Capitalのポートフォリオの12.64%を占める。弟子が師匠の会社を保有するという象徴的な意味だけでなく、投資テーゼとしても合理的だ。

投資テーゼ:

1. 現金同等物プラスアルファ: バークシャーは$150B以上の現金を保有。これは実質的に「現金＋優良ビジネスの束」を買うのと同じ。ダウンサイドリスクが極めて限定的。

2. 保険フロート: バークシャーの保険事業は巨大なフロート（顧客から預かった保険料）を生み出し、これを投資に回す。「お金を借りて投資するが、利息を払わなくていい」モデル。

3. 多角化された事業群: BNSF鉄道、Geico保険、See's Candies、Dairy Queen——いずれもキャッシュフロー生成力が高い優良事業。

4. 後継計画: Greg Abelが後継CEOとして準備済み。バフェットの投資哲学はバークシャーの文化として組織に埋め込まれており、個人の退任リスクは限定的。

Li Luにとっての意味: Mungerへの敬意の表現であると同時に、バークシャーはLi Luの投資哲学——安全余裕、能力の輪、オーナーの精神——の全てを体現する企業でもある。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Portfolio Analysis',
    sourceFaviconUrl: null,
    publishedAt: '2025-03-01T00:00:00Z',
    tickers: ['BRK-B'],
  },
  {
    category: 'company_deep_dive',
    title: 'East West Bancorp: The Cross-Pacific Banking Bridge',
    summary: 'EWBC at 8.74% is Li Lu\'s niche banking play. East West Bank uniquely bridges US and Chinese business communities — a moat born from cultural competence that competitors can\'t replicate.',
    articleBody: `East West Bancorp（EWBC）はHimalaya Capitalのポートフォリオの8.74%を占める。Li Luのニッチ銀行への賭けだ。

投資テーゼ:

1. 唯一無二のポジション: East West Bankは米国と中国のビジネスコミュニティを橋渡しする唯一の銀行。バイリンガル対応、両国の商慣習への理解、太平洋をまたぐ取引のファシリテーション——これらは競合が簡単に模倣できない文化的コンピテンシーから生まれるモートだ。

2. 成長する顧客基盤: 米国のアジア系コミュニティは最も急速に成長する人口セグメント。EWBCはこの成長を直接的に享受する。

3. 高い資本効率: EWBCのROE（自己資本利益率）は大手銀行を上回る水準。ニッチに集中することで効率的に資本を活用。

4. Li Luの能力の輪: Li Lu自身が中国系アメリカ人として、EWBCの顧客層と市場を肌感覚で理解している。これは他の投資家にはない情報優位性だ。

リスク: 米中関係の悪化による太平洋間ビジネスの減少、中国経済の減速。しかし、これらのリスクは株価に既に織り込まれていると判断したのだろう。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Portfolio Analysis',
    sourceFaviconUrl: null,
    publishedAt: '2025-03-01T00:00:00Z',
    tickers: ['EWBC'],
  },

  // === RECOMMENDED BOOKS ===
  {
    category: 'philosophy',
    contentType: 'book_recommendation',
    title: 'Li Lu\'s Recommended Reading: Poor Charlie\'s Almanack',
    summary: 'Charlie Munger\'s collected wisdom on investing, psychology, and decision-making. Li Lu considers Munger his most important mentor and this book essential reading for any serious investor.',
    articleBody: `『Poor Charlie's Almanack（プアチャーリーの年鑑）』は、Charlie Mungerの講演、エッセイ、知恵を集めた書籍だ。Li Luは「全ての投資家が読むべき一冊」として強く推薦している。

本の核心メッセージ:

1. マルチディシプリナリー思考: 投資判断に一つの学問だけでは不十分。物理学（臨界点）、生物学（進化）、心理学（認知バイアス）、歴史（繰り返しパターン）——あらゆる分野のメンタルモデルを使いこなす。

2. 逆転の発想（Inversion）: 「成功する方法」を考えるのではなく、「失敗する方法」を列挙して全て避ける。投資では「お金を増やす方法」より「お金を失わない方法」の方が重要。

3. 人間心理の理解: Mungerは25の心理的傾向（誤判断の心理学）を体系化。確証バイアス、損失回避、社会的証明——これらを理解することが投資の成否を分ける。

Li Luへの影響: MungerのマルチディシプリナリーアプローチはLi Luの文明論フレームワークに直接つながっている。歴史、経済学、物理学を横断して投資機会を分析する手法は、この本が原点だ。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu Book List',
    sourceFaviconUrl: null,
    publishedAt: '2020-01-01T00:00:00Z',
    tickers: [],
    author: 'Charlie Munger',
  },
  {
    category: 'philosophy',
    contentType: 'book_recommendation',
    title: 'Li Lu\'s Recommended Reading: The Intelligent Investor',
    summary: 'Benjamin Graham\'s classic on value investing. Li Lu studied under Graham\'s intellectual lineage at Columbia Business School. The concepts of Mr. Market and margin of safety originate here.',
    articleBody: `『The Intelligent Investor（賢明なる投資家）』はBenjamin Grahamの1949年の名著で、バリュー投資のバイブルだ。Warren Buffettは「投資に関して書かれた最高の本」と評している。

本の核心メッセージ:

1. 投資と投機の区別: 投資とは「綿密な分析に基づき、元本の安全性と適切なリターンを約束する行為」。それ以外は投機。この定義はLi Luの全ての投資判断の出発点。

2. ミスター・マーケット: 市場は気まぐれな隣人——この比喩は本書で初めて登場した。Li Luが日常的に実践している「市場の感情に流されない」姿勢の知的源泉。

3. 安全余裕: 本質的価値以下で買うことの重要性。Grahamはこれを「投資の中心概念」と呼んだ。Li Luの投資哲学の第1の柱。

Li Luとの繋がり: Li Luはコロンビア・ビジネススクールでGrahamの知的系譜を直接学んだ。Graham→Buffett→Munger→Li Luという師弟関係の系譜があり、この本はその起源にある。

現代の投資家にとっての価値: 出版から75年以上経っても原則は全く色褪せない。むしろ、アルゴリズムトレーディングやSNS時代において、「感情に流されない」「安全余裕を確保する」といった教えの重要性は増している。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu Book List',
    sourceFaviconUrl: null,
    publishedAt: '2020-01-01T00:00:00Z',
    tickers: [],
    author: 'Benjamin Graham',
  },
  {
    category: 'philosophy',
    contentType: 'book_recommendation',
    title: 'Li Lu\'s Recommended Reading: Guns, Germs, and Steel',
    summary: 'Jared Diamond\'s exploration of why some civilizations advanced faster than others. This book deeply influenced Li Lu\'s civilizational framework for understanding modernization and compound growth.',
    articleBody: `『Guns, Germs, and Steel（銃・病原菌・鉄）』はJared Diamondの1997年の著作で、なぜ特定の文明が他より速く発展したかを地理・生態学的に分析した本だ。

本の核心メッセージ: 文明の発展速度の差は、人種や文化の優劣ではなく、地理的条件（農耕に適した野生植物・家畜化可能な動物の分布、大陸の東西軸と南北軸の違いなど）によって説明できる。

Li Luへの影響: この本はLi Luの「近代化は複利」フレームワークの知的基盤になっている。Diamondが「なぜ特定の文明が先に発展したか」を分析したのに対し、Li Luは「近代化の波に乗った文明はどこまで成長するか」を分析する。

投資への応用: Li Luは地理・文化・制度の条件を分析することで、どの国が近代化の恩恵を最も受けるかを予測する。中国への投資（PDD Holdings）も、14億人が近代化の軌道に乗っているという文明レベルの分析に基づいている。

この本が教えてくれること: 投資判断を個別企業の財務分析だけに頼るのは視野が狭い。文明・歴史・地理の大きな流れを理解することで、より深い投資洞察が得られる。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Li Lu Book List',
    sourceFaviconUrl: null,
    publishedAt: '2020-01-01T00:00:00Z',
    tickers: [],
    author: 'Jared Diamond',
  },

  // === HISTORICAL CONTEXT ===
  {
    category: 'market_context',
    title: 'Li Lu\'s BYD Introduction Changed Berkshire\'s History',
    summary: 'In 2008, Li Lu introduced BYD to Charlie Munger, leading to Berkshire\'s $232M investment. That stake grew to over $7 billion — one of Berkshire\'s best investments ever.',
    articleBody: `2008年、Li LuはCharlie MungerにBYD（比亜迪）を紹介した。この一つの行動が、バークシャー・ハサウェイの歴史を変えた。

経緯: Li Luは中国でのリサーチ中にBYDを発見。当時BYDはバッテリーメーカーから自動車メーカーへの転換期にあり、電気自動車（EV）の開発に注力していた。Li LuはBYDの創業者・王伝福（Wang Chuanfu）の能力と、EVの将来性に確信を持ちMungerに紹介。

MungerからBuffettへ: MungerはBYDに感銘を受け、Buffettに投資を強く推薦。バークシャーは2008年に$232M（約260億円）でBYD株の10%を取得した。

驚異的リターン: この投資は後に$7B（約1兆円）以上に成長。30倍以上のリターンを生み、バークシャー史上最高の投資の一つとなった。

なぜこのエピソードが重要か:
- Li Luの「能力の輪」（中国ビジネスの深い理解）が具体的な価値を生んだ事例
- 「良い投資アイデアは人生で数個しかない」——BYDはその一つだった
- メンター（Munger）との信頼関係が機会を最大化した
- バリュー投資は「安い株を買う」だけではなく、「未来の巨大企業を見抜く目」も含む`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Investment History',
    sourceFaviconUrl: null,
    publishedAt: '2008-09-01T00:00:00Z',
    tickers: ['BRK-B'],
  },
  {
    category: 'market_context',
    title: 'Himalaya Capital: From $88M Munger Seed to $3.57B',
    summary: 'Charlie Munger entrusted Li Lu with $88 million — the only outside manager Munger ever used. Under Li Lu\'s stewardship, Himalaya Capital has grown to manage $3.57 billion.',
    articleBody: `Himalaya Capital Managementの物語は、メンターと弟子の信頼から始まった。

設立: Li Luは1997年にシアトルでHimalaya Capitalを設立。当初は小規模なファンドだった。

Mungerの信頼: Charlie Mungerは自身の個人資産から$88M（約100億円）をLi Luに委託した。Mungerは97年間の人生で、外部のファンドマネージャーに資金を預けたのはこの一度きり。Warren Buffettですら別のマネージャーは使わない。この事実が、Li Luの能力に対するMungerの評価の高さを物語っている。

成長: Mungerのシード投資を含むAUM（運用資産額）は、2025年Q4時点で$3.57B（約5,000億円）に成長。約40倍の成長は、Li Luの投資アプローチの有効性を長期で証明している。

運用スタイルの特徴:
- 極端な集中投資（9銘柄のみ）
- 超長期保有（一部のポジションは10年以上）
- 低い回転率（頻繁な売買をしない）
- メディア露出を極力避ける（インタビューは稀）

Li Luの報酬体系: 一般的なヘッジファンドの「2%管理報酬 + 20%成功報酬」ではなく、より投資家に有利な条件だと言われている。これは「オーナーの精神」の実践——ファンドマネージャー自身も投資家と利害を一致させる。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Fund History',
    sourceFaviconUrl: null,
    publishedAt: '1997-01-01T00:00:00Z',
    tickers: [],
  },
  {
    category: 'market_context',
    title: 'Li Lu\'s Columbia Triple Degree: BA + JD + MBA',
    summary: 'After arriving in the US as a Tiananmen refugee, Li Lu simultaneously earned three degrees from Columbia University — a bachelor\'s, a law degree, and an MBA. This intellectual foundation shapes his analytical rigor.',
    articleBody: `天安門事件後にアメリカに亡命したLi Luは、コロンビア大学で前例のない学業を成し遂げた——学士号（BA）、法学博士号（JD）、経営学修士号（MBA）の3学位を同時に取得したのだ。

背景: 中国から文字通り着の身着のまま渡米したLi Luは、英語もろくに話せない状態からスタート。奨学金を得てコロンビア大学に入学し、驚異的な知的貪欲さで3つの大学院プログラムを並行して修了した。

各学位が投資家Li Luに与えたもの:

BA（教養学部）: 歴史、哲学、科学の広範な知識。これがMungerの「マルチディシプリナリー・アプローチ」と共鳴し、文明論フレームワークの基盤となった。

JD（法学）: 契約・規制・コーポレートガバナンスの理解。投資先企業の法的リスクを評価する能力。SEC提出書類を深く読み解く力。

MBA（経営学）: 財務分析、競争戦略、企業価値評価の体系的知識。Benjamin Grahamの知的系譜をコロンビアBSで直接学んだ。

この知的基盤の重要性: Li Luの投資分析の深さ——企業のビジネスモデル、競争優位性、規制環境、文明的コンテキストを統合的に評価する能力——は、この異例の学際的教育に根ざしている。`,
    imageUrl: null,
    sourceUrl: null,
    sourceName: 'Biography',
    sourceFaviconUrl: null,
    publishedAt: '1996-01-01T00:00:00Z',
    tickers: [],
  },
];

let idCounter = 0;

export const ARCHIVE_ITEMS: FeedItem[] = raw.map((item) => {
  const id = item.id ?? `archive-${String(++idCounter).padStart(3, '0')}`;
  const publishedAt = new Date(item.publishedAt);
  const archiveDate = `${publishedAt.getFullYear()}-${String(publishedAt.getMonth() + 1).padStart(2, '0')}`;

  return {
    ...item,
    id,
    badge: 'ARCHIVE' as const,
    archiveDate,
  };
});
