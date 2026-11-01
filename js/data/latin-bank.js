"use strict";
// ════════════════════════════════════════════════════════════════
// GRAMMAR POINTS — in Bass's order, with the chapters they come from
// ════════════════════════════════════════════════════════════════
const GRAMMAR = [
  { k: 'A', name: 'Present tense: amo and moneo verbs', ch: 'Ch 2–8' },
  { k: 'B', name: 'Nouns like puella: nominative and accusative', ch: 'Ch 9–18' },
  { k: 'C', name: 'cur?, quod, ubi?, quis?, quid?', ch: 'Ch 14–20' },
  { k: 'D', name: 'The verb sum', ch: 'Ch 22' },
  { k: 'E', name: 'Adjectives like bonus', ch: 'Ch 23, 46' },
  { k: 'F', name: 'Present tense: rego, audio and capio verbs', ch: 'Ch 25' },
  { k: 'G', name: 'Questions with -ne', ch: 'Ch 26' },
  { k: 'H', name: 'All six cases of puella', ch: 'Ch 28–31' },
  { k: 'I', name: 'Nouns like servus, puer, ager and vir', ch: 'Ch 35–37' },
  { k: 'J', name: 'Prepositions', ch: 'Ch 38' },
  { k: 'K', name: 'ego, tu, nos, vos', ch: 'Ch 41' },
  { k: 'L', name: 'Neuter nouns like bellum', ch: 'Ch 42' },
  { k: 'M', name: 'Imperatives', ch: 'Ch 48' },
  { k: 'N', name: 'Numbers', ch: 'Ch 49' },
  { k: 'O', name: 'Infinitives', ch: 'Ch 53' },
  { k: 'P', name: 'Adjectives like miser and pulcher', ch: 'Ch 54' },
  { k: 'Q', name: 'Imperfect tense', ch: 'Ch 57' },
  { k: 'R', name: 'Perfect tense', ch: 'Ch 60–73' },
  // CE Level 2 (Bass Ch 74–116). Ticking any of these assumes all of Level 1.
  { k: 'S', lv: 2, name: 'Third declension nouns (rex, opus, mare)', ch: 'Ch 77–79' },
  { k: 'T', lv: 2, name: 'Future tense', ch: 'Ch 81–82' },
  { k: 'U', lv: 2, name: 'eo (I go) and its compounds', ch: 'Ch 84' },
  { k: 'V', lv: 2, name: '-que, et… et…, quamquam', ch: 'Ch 75, 77, 85' },
  { k: 'W', lv: 2, name: 'hic, haec, hoc and ille, illa, illud', ch: 'Ch 89, 91' },
  { k: 'X', lv: 2, name: 'is, ea, id and personal pronouns', ch: 'Ch 94, 96' },
  { k: 'Y', lv: 2, name: 'Pluperfect tense', ch: 'Ch 99' },
  { k: 'Z', lv: 2, name: 'Third declension adjectives (fortis, felix, ingens)', ch: 'Ch 101, 103' },
  { k: 'a', lv: 2, name: 'Comparison of adjectives', ch: 'Ch 104, 106' },
  { k: 'b', lv: 2, name: 'possum and debeo', ch: 'Ch 109, 113' },
  { k: 'c', lv: 2, name: 'Prohibitions: noli, nolite', ch: 'Ch 111' },
  { k: 'd', lv: 2, name: 'Questions with nonne and num', ch: 'Ch 112' },
  { k: 'e', lv: 2, name: 'Reflexive pronoun se', ch: 'Ch 115' },
  // CE Level 3 (Bass Ch 117–140). Ticking any of these assumes all of Levels 1 and 2.
  { k: 'f', lv: 3, name: 'Passive: present, imperfect and future', ch: 'Ch 118–119, 130' },
  { k: 'g', lv: 3, name: 'Perfect passive', ch: 'Ch 121' },
  { k: 'h', lv: 3, name: 'Pluperfect passive', ch: 'Ch 123' },
  { k: 'i', lv: 3, name: 'volo and nolo', ch: 'Ch 126' },
  { k: 'j', lv: 3, name: 'Expressions of time', ch: 'Ch 127' },
  { k: 'k', lv: 3, name: 'fero (I carry, I bear)', ch: 'Ch 129' },
  { k: 'l', lv: 3, name: 'Relative clauses: qui, quae, quod', ch: 'Ch 132' },
  { k: 'm', lv: 3, name: 'Present participles', ch: 'Ch 133' },
  { k: 'n', lv: 3, name: 'Purpose clauses: ut and ne', ch: 'Ch 135' },
  { k: 'o', lv: 3, name: 'Indirect commands', ch: 'Ch 137' },
  { k: 'p', lv: 3, name: 'Perfect participle passive', ch: 'Ch 139' },
  { k: 'q', lv: 3, name: 'Place: domus, rus and Roma', ch: 'Ch 140' },
  // Common Academic Scholarship (Bass Ch 141–154). Assumes all of Levels 1–3.
  { k: 'r', lv: 4, name: 'Ablative absolute', ch: 'Ch 141–142' },
  { k: 's', lv: 4, name: 'Indirect statement: present infinitive', ch: 'Ch 144' },
  { k: 't', lv: 4, name: 'Present infinitive passive', ch: 'Ch 145' },
  { k: 'u', lv: 4, name: 'Indirect statement: perfect infinitive', ch: 'Ch 147' },
  { k: 'v', lv: 4, name: 'Deponent verbs', ch: 'Ch 149–150' },
  { k: 'w', lv: 4, name: 'cum + subjunctive', ch: 'Ch 152' },
  { k: 'x', lv: 4, name: 'Deponent perfect participles', ch: 'Ch 154' },
];
// Ticking a point from a higher level assumes every point from the levels below it.
const lvOf = k => { const g = GRAMMAR.find(x => x.k === k); return g ? (g.lv || 1) : 1; };
function topLevel() { let m = 1; ticked.forEach(k => { m = Math.max(m, lvOf(k)); }); return m; }
const hasL2 = () => topLevel() >= 2;
function effTicked() { const s = new Set(ticked), m = topLevel(); GRAMMAR.forEach(g => { if ((g.lv || 1) < m) s.add(g.k); }); return s; }

const PRESETS = [
  { label: 'Ch 1–8', keys: 'A' },
  { label: 'Ch 1–19', keys: 'ABC' },
  { label: 'Ch 1–38', keys: 'ABCDEFGHIJ' },
  { label: 'Ch 1–56', keys: 'ABCDEFGHIJKLMNOP' },
  { label: 'Whole of Level 1', keys: 'ABCDEFGHIJKLMNOPQR' },
  { label: 'Level 2: Ch 74–99', keys: 'ABCDEFGHIJKLMNOPQRSTUVWXY' },
  { label: 'Whole of Level 2', keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcde' },
  { label: 'Whole of Level 3', keys: 'fghijklmnopq' },
  { label: 'Scholarship', keys: 'rstuvwx' },
];

const QTYPES = [
  { k: 'tr', name: 'Translate: choose the English' },
  { k: 'un', name: 'Unscramble the Latin' },
  { k: 'gap', name: 'Choose the right form' },
  { k: 'parse', name: 'Parse a word' },
];

// ════════════════════════════════════════════════════════════════
// HINT TABLES — copied from Prep School Latin
// ════════════════════════════════════════════════════════════════
const PN6 = ['1st sg', '2nd sg', '3rd sg', '1st pl', '2nd pl', '3rd pl'];
const TABLES = {
  amo: { title: 'Present tense: amo (1) and moneo (2)', cols: ['', 'amo', 'moneo'],
    rows: [['I', 'amo', 'moneo'], ['you (sg)', 'amas', 'mones'], ['he, she, it', 'amat', 'monet'], ['we', 'amamus', 'monemus'], ['you (pl)', 'amatis', 'monetis'], ['they', 'amant', 'monent']] },
  pres: { title: 'Present tense: all four conjugations', cols: ['', 'amo (1)', 'moneo (2)', 'rego (3)', 'audio (4)'],
    rows: [['I', 'amo', 'moneo', 'rego', 'audio'], ['you (sg)', 'amas', 'mones', 'regis', 'audis'], ['he, she, it', 'amat', 'monet', 'regit', 'audit'], ['we', 'amamus', 'monemus', 'regimus', 'audimus'], ['you (pl)', 'amatis', 'monetis', 'regitis', 'auditis'], ['they', 'amant', 'monent', 'regunt', 'audiunt']],
    note: 'capio and facio (mixed conjugation) behave like audio.' },
  sum: { title: 'Present tense: sum (I am)', cols: ['', 'Latin', 'English'],
    rows: [['1st sg', 'sum', 'I am'], ['2nd sg', 'es', 'you are'], ['3rd sg', 'est', 'he, she, it is'], ['1st pl', 'sumus', 'we are'], ['2nd pl', 'estis', 'you are'], ['3rd pl', 'sunt', 'they are']],
    note: 'sum is followed by the nominative, not the accusative.' },
  puellaNA: { title: 'Nouns like puella', cols: ['case', 'job', 'singular', 'plural'],
    rows: [['nominative', 'subject', 'puella', 'puellae'], ['accusative', 'object', 'puellam', 'puellas']] },
  puella: { title: 'All the cases of puella', cols: ['case', 'job', 'singular', 'plural'],
    rows: [['nominative', 'subject', 'puella', 'puellae'], ['vocative', 'person spoken to', 'puella', 'puellae'], ['accusative', 'object', 'puellam', 'puellas'], ['genitive', 'of', 'puellae', 'puellarum'], ['dative', 'to, for', 'puellae', 'puellis'], ['ablative', 'by, with, from', 'puella', 'puellis']] },
  servus: { title: 'Second declension: servus, puer, ager, vir', cols: ['', 'servus', 'puer', 'ager', 'vir'],
    rows: [['nom sg', 'servus', 'puer', 'ager', 'vir'], ['voc sg', 'serve', 'puer', 'ager', 'vir'], ['acc sg', 'servum', 'puerum', 'agrum', 'virum'], ['gen sg', 'servi', 'pueri', 'agri', 'viri'], ['dat sg', 'servo', 'puero', 'agro', 'viro'], ['abl sg', 'servo', 'puero', 'agro', 'viro'],
      ['nom pl', 'servi', 'pueri', 'agri', 'viri'], ['voc pl', 'servi', 'pueri', 'agri', 'viri'], ['acc pl', 'servos', 'pueros', 'agros', 'viros'], ['gen pl', 'servorum', 'puerorum', 'agrorum', 'virorum'], ['dat pl', 'servis', 'pueris', 'agris', 'viris'], ['abl pl', 'servis', 'pueris', 'agris', 'viris']],
    note: 'magister and liber go like ager.' },
  bellum: { title: 'Neuter nouns: bellum (war)', cols: ['case', 'singular', 'plural'],
    rows: [['nominative', 'bellum', 'bella'], ['vocative', 'bellum', 'bella'], ['accusative', 'bellum', 'bella'], ['genitive', 'belli', 'bellorum'], ['dative', 'bello', 'bellis'], ['ablative', 'bello', 'bellis']] },
  bonus: { title: 'Adjectives: bonus (good)', cols: ['', 'masculine', 'feminine', 'neuter'],
    rows: [['nom sg', 'bonus', 'bona', 'bonum'], ['voc sg', 'bone', 'bona', 'bonum'], ['acc sg', 'bonum', 'bonam', 'bonum'], ['gen sg', 'boni', 'bonae', 'boni'], ['dat sg', 'bono', 'bonae', 'bono'], ['abl sg', 'bono', 'bona', 'bono'],
      ['nom pl', 'boni', 'bonae', 'bona'], ['voc pl', 'boni', 'bonae', 'bona'], ['acc pl', 'bonos', 'bonas', 'bona'], ['gen pl', 'bonorum', 'bonarum', 'bonorum'], ['dat pl', 'bonis', 'bonis', 'bonis'], ['abl pl', 'bonis', 'bonis', 'bonis']],
    note: 'An adjective has the same gender, case and number as its noun.' },
  miser: { title: 'Adjectives in -er: miser and pulcher', cols: ['', 'miser (m)', 'misera (f)', 'miserum (n)', 'pulcher (m)', 'pulchra (f)', 'pulchrum (n)'],
    rows: [['nom sg', 'miser', 'misera', 'miserum', 'pulcher', 'pulchra', 'pulchrum'], ['acc sg', 'miserum', 'miseram', 'miserum', 'pulchrum', 'pulchram', 'pulchrum'], ['gen sg', 'miseri', 'miserae', 'miseri', 'pulchri', 'pulchrae', 'pulchri'], ['dat sg', 'misero', 'miserae', 'misero', 'pulchro', 'pulchrae', 'pulchro'], ['abl sg', 'misero', 'misera', 'misero', 'pulchro', 'pulchra', 'pulchro'],
      ['nom pl', 'miseri', 'miserae', 'misera', 'pulchri', 'pulchrae', 'pulchra'], ['acc pl', 'miseros', 'miseras', 'misera', 'pulchros', 'pulchras', 'pulchra'], ['gen pl', 'miserorum', 'miserarum', 'miserorum', 'pulchrorum', 'pulchrarum', 'pulchrorum'], ['dat pl', 'miseris', 'miseris', 'miseris', 'pulchris', 'pulchris', 'pulchris'], ['abl pl', 'miseris', 'miseris', 'miseris', 'pulchris', 'pulchris', 'pulchris']],
    note: 'noster and sacer go like pulcher.' },
  prep: { title: 'Prepositions', cols: ['Latin', 'case', 'English'],
    rows: [['ad', 'accusative', 'to, towards'], ['contra', 'accusative', 'against'], ['in', 'accusative', 'into'], ['per', 'accusative', 'through, along'], ['prope', 'accusative', 'near'], ['trans', 'accusative', 'across'], ['a / ab', 'ablative', 'away from'], ['cum', 'ablative', 'with'], ['de', 'ablative', 'down from'], ['e / ex', 'ablative', 'out of'], ['in', 'ablative', 'in, on']] },
  ego: { title: 'ego and tu', cols: ['', 'first person', '', 'second person', ''],
    rows: [['nom sg', 'ego', 'I', 'tu', 'you'], ['acc sg', 'me', 'me', 'te', 'you'], ['nom pl', 'nos', 'we', 'vos', 'you'], ['acc pl', 'nos', 'us', 'vos', 'you']] },
  imp: { title: 'Imperatives', cols: ['conjugation', 'present', 'singular', 'plural', 'English'],
    rows: [['1', 'amo', 'ama', 'amate', 'love!'], ['2', 'moneo', 'mone', 'monete', 'warn!'], ['3', 'rego', 'rege', 'regite', 'rule!'], ['3½', 'capio', 'cape', 'capite', 'take!'], ['4', 'audio', 'audi', 'audite', 'hear! listen!']] },
  inf: { title: 'Infinitives', cols: ['conjugation', 'present', 'infinitive', 'English'],
    rows: [['1', 'amo', 'amare', 'to love'], ['2', 'moneo', 'monere', 'to warn'], ['3', 'rego', 'regere', 'to rule'], ['3½', 'capio', 'capere', 'to take'], ['4', 'audio', 'audire', 'to hear'], ['irregular', 'sum', 'esse', 'to be']] },
  impf: { title: 'Imperfect tense', cols: ['', 'amo', 'moneo', 'rego', 'audio', 'sum'],
    rows: [['I was', 'amabam', 'monebam', 'regebam', 'audiebam', 'eram'], ['you (sg) were', 'amabas', 'monebas', 'regebas', 'audiebas', 'eras'], ['he was', 'amabat', 'monebat', 'regebat', 'audiebat', 'erat'], ['we were', 'amabamus', 'monebamus', 'regebamus', 'audiebamus', 'eramus'], ['you (pl) were', 'amabatis', 'monebatis', 'regebatis', 'audiebatis', 'eratis'], ['they were', 'amabant', 'monebant', 'regebant', 'audiebant', 'erant']],
    note: 'Endings: -bam, -bas, -bat, -bamus, -batis, -bant.' },
  perf: { title: 'Perfect tense', cols: ['', 'amo', 'moneo', 'rego', 'audio', 'sum'],
    rows: [['I', 'amavi', 'monui', 'rexi', 'audivi', 'fui'], ['you (sg)', 'amavisti', 'monuisti', 'rexisti', 'audivisti', 'fuisti'], ['he, she, it', 'amavit', 'monuit', 'rexit', 'audivit', 'fuit'], ['we', 'amavimus', 'monuimus', 'reximus', 'audivimus', 'fuimus'], ['you (pl)', 'amavistis', 'monuistis', 'rexistis', 'audivistis', 'fuistis'], ['they', 'amaverunt', 'monuerunt', 'rexerunt', 'audiverunt', 'fuerunt']],
    note: 'Endings: -i, -isti, -it, -imus, -istis, -erunt. The perfect stem comes from the third principal part.' },
  tenses: { title: 'Three tenses of amo', cols: ['', 'present', 'imperfect', 'perfect'],
    rows: [['I', 'amo', 'amabam', 'amavi'], ['you (sg)', 'amas', 'amabas', 'amavisti'], ['he, she, it', 'amat', 'amabat', 'amavit'], ['we', 'amamus', 'amabamus', 'amavimus'], ['you (pl)', 'amatis', 'amabatis', 'amavistis'], ['they', 'amant', 'amabant', 'amaverunt']],
    note: 'Present: now. Imperfect: was doing, used to do. Perfect: did, has done.' },
  qw: { title: 'Question words', cols: ['Latin', 'English'],
    rows: [['cur?', 'why?'], ['quod', 'because'], ['ubi?', 'where?'], ['ubi', 'when'], ['quis?', 'who?'], ['quid?', 'what?']] },
  ne: { title: 'Questions with -ne', cols: ['statement', 'question'],
    rows: [['ambulat.', 'ambulatne?'], ['puellae rident.', 'puellaene rident?'], ['Marcus Flaviam amat.', 'Marcusne Flaviam amat?']],
    note: '-ne on the first word turns a statement into a question.' },
  num: { title: 'Numbers', cols: ['', 'cardinal', '', 'ordinal', ''],
    rows: [['1', 'unus', 'one', 'primus', 'first'], ['2', 'duo', 'two', 'secundus', 'second'], ['3', 'tres', 'three', 'tertius', 'third'], ['4', 'quattuor', 'four', 'quartus', 'fourth'], ['5', 'quinque', 'five', 'quintus', 'fifth'], ['6', 'sex', 'six', 'sextus', 'sixth'], ['7', 'septem', 'seven', 'septimus', 'seventh'], ['8', 'octo', 'eight', 'octavus', 'eighth'], ['9', 'novem', 'nine', 'nonus', 'ninth'], ['10', 'decem', 'ten', 'decimus', 'tenth']] },
  // ── CE Level 2 tables (Bass Ch 77–115) ──
  decl3: { title: 'Third declension: rex (m.) and opus (n.)', cols: ['case', 'rex sg', 'rex pl', 'opus sg', 'opus pl'],
    rows: [['nominative', 'rex', 'reges', 'opus', 'opera'], ['vocative', 'rex', 'reges', 'opus', 'opera'], ['accusative', 'regem', 'reges', 'opus', 'opera'], ['genitive', 'regis', 'regum', 'operis', 'operum'], ['dative', 'regi', 'regibus', 'operi', 'operibus'], ['ablative', 'rege', 'regibus', 'opere', 'operibus']],
    note: 'Find the stem from the genitive: regis → reg-. mare has ablative mari and plural maria.' },
  fut: { title: 'Future tense', cols: ['', 'amo (1)', 'moneo (2)', 'rego (3)', 'capio (3½)', 'audio (4)', 'sum'],
    rows: [['I shall', 'amabo', 'monebo', 'regam', 'capiam', 'audiam', 'ero'], ['you (sg) will', 'amabis', 'monebis', 'reges', 'capies', 'audies', 'eris'], ['he will', 'amabit', 'monebit', 'reget', 'capiet', 'audiet', 'erit'], ['we shall', 'amabimus', 'monebimus', 'regemus', 'capiemus', 'audiemus', 'erimus'], ['you (pl) will', 'amabitis', 'monebitis', 'regetis', 'capietis', 'audietis', 'eritis'], ['they will', 'amabunt', 'monebunt', 'regent', 'capient', 'audient', 'erunt']] },
  eo: { title: 'eo, ire, ii: I go', cols: ['', 'present', 'imperfect', 'perfect', 'future'],
    rows: [['I', 'eo', 'ibam', 'ii', 'ibo'], ['you (sg)', 'is', 'ibas', 'iisti', 'ibis'], ['he, she, it', 'it', 'ibat', 'iit', 'ibit'], ['we', 'imus', 'ibamus', 'iimus', 'ibimus'], ['you (pl)', 'itis', 'ibatis', 'iistis', 'ibitis'], ['they', 'eunt', 'ibant', 'ierunt', 'ibunt']],
    note: 'Infinitive ire. Imperatives i, ite. adeo (go towards), ineo (go in), exeo (go out), pereo (perish), redeo (return), transeo (cross) go the same way.' },
  que: { title: 'Joining words', cols: ['Latin', 'English'],
    rows: [['-que', 'and (joined to the second word: pueri puellaeque)'], ['et… et…', 'both… and…'], ['quamquam', 'although'], ['ubi', 'when'], ['postquam', 'after']] },
  hic: { title: 'hic, haec, hoc: this, these', cols: ['', 'masculine', 'feminine', 'neuter'],
    rows: [['nom sg', 'hic', 'haec', 'hoc'], ['acc sg', 'hunc', 'hanc', 'hoc'], ['gen sg', 'huius', 'huius', 'huius'], ['dat sg', 'huic', 'huic', 'huic'], ['abl sg', 'hoc', 'hac', 'hoc'],
      ['nom pl', 'hi', 'hae', 'haec'], ['acc pl', 'hos', 'has', 'haec'], ['gen pl', 'horum', 'harum', 'horum'], ['dat pl', 'his', 'his', 'his'], ['abl pl', 'his', 'his', 'his']] },
  ille: { title: 'ille, illa, illud: that, those', cols: ['', 'masculine', 'feminine', 'neuter'],
    rows: [['nom sg', 'ille', 'illa', 'illud'], ['acc sg', 'illum', 'illam', 'illud'], ['gen sg', 'illius', 'illius', 'illius'], ['dat sg', 'illi', 'illi', 'illi'], ['abl sg', 'illo', 'illa', 'illo'],
      ['nom pl', 'illi', 'illae', 'illa'], ['acc pl', 'illos', 'illas', 'illa'], ['gen pl', 'illorum', 'illarum', 'illorum'], ['dat pl', 'illis', 'illis', 'illis'], ['abl pl', 'illis', 'illis', 'illis']] },
  is: { title: 'is, ea, id: he, she, it', cols: ['', 'masculine', 'feminine', 'neuter'],
    rows: [['nom sg', 'is (he)', 'ea (she)', 'id (it)'], ['acc sg', 'eum (him)', 'eam (her)', 'id (it)'], ['gen sg', 'eius (his)', 'eius (her)', 'eius (of it)'], ['dat sg', 'ei (to him)', 'ei (to her)', 'ei (to it)'], ['abl sg', 'eo', 'ea', 'eo'],
      ['nom pl', 'ei (they)', 'eae (they)', 'ea (they)'], ['acc pl', 'eos (them)', 'eas (them)', 'ea (them)'], ['gen pl', 'eorum (their)', 'earum (their)', 'eorum (their)'], ['dat pl', 'eis (to them)', 'eis', 'eis'], ['abl pl', 'eis', 'eis', 'eis']] },
  pron: { title: 'ego, tu, nos, vos', cols: ['', 'I', 'you (sg)', 'we', 'you (pl)'],
    rows: [['nominative', 'ego', 'tu', 'nos', 'vos'], ['accusative', 'me', 'te', 'nos', 'vos'], ['genitive', 'mei', 'tui', 'nostrum', 'vestrum'], ['dative', 'mihi', 'tibi', 'nobis', 'vobis'], ['ablative', 'me', 'te', 'nobis', 'vobis']],
    note: 'mecum = with me, tecum = with you, nobiscum = with us, vobiscum = with you (pl).' },
  plupf: { title: 'Pluperfect tense (had…)', cols: ['', 'amo', 'moneo', 'rego', 'capio', 'audio', 'sum'],
    rows: [['I had', 'amaveram', 'monueram', 'rexeram', 'ceperam', 'audiveram', 'fueram'], ['you (sg) had', 'amaveras', 'monueras', 'rexeras', 'ceperas', 'audiveras', 'fueras'], ['he had', 'amaverat', 'monuerat', 'rexerat', 'ceperat', 'audiverat', 'fuerat'], ['we had', 'amaveramus', 'monueramus', 'rexeramus', 'ceperamus', 'audiveramus', 'fueramus'], ['you (pl) had', 'amaveratis', 'monueratis', 'rexeratis', 'ceperatis', 'audiveratis', 'fueratis'], ['they had', 'amaverant', 'monuerant', 'rexerant', 'ceperant', 'audiverant', 'fuerant']],
    note: 'Perfect stem + -eram, -eras, -erat, -eramus, -eratis, -erant.' },
  adj3: { title: 'Third declension adjectives: fortis, felix, ingens', cols: ['', 'fortis m/f', 'forte n', 'felix m/f', 'ingens m/f'],
    rows: [['nom sg', 'fortis', 'forte', 'felix', 'ingens'], ['acc sg', 'fortem', 'forte', 'felicem', 'ingentem'], ['gen sg', 'fortis', 'fortis', 'felicis', 'ingentis'], ['dat sg', 'forti', 'forti', 'felici', 'ingenti'], ['abl sg', 'forti', 'forti', 'felici', 'ingenti'],
      ['nom pl', 'fortes', 'fortia', 'felices', 'ingentes'], ['acc pl', 'fortes', 'fortia', 'felices', 'ingentes'], ['gen pl', 'fortium', 'fortium', 'felicium', 'ingentium'], ['dat pl', 'fortibus', 'fortibus', 'felicibus', 'ingentibus'], ['abl pl', 'fortibus', 'fortibus', 'felicibus', 'ingentibus']],
    note: 'omnes on its own = everyone; omnia on its own = everything.' },
  comp: { title: 'Comparison of adjectives', cols: ['positive', 'comparative', 'superlative'],
    rows: [['altus (high)', 'altior (higher)', 'altissimus (highest, very high)'], ['pulcher (beautiful)', 'pulchrior', 'pulcherrimus'], ['fortis (brave)', 'fortior', 'fortissimus'], ['felix (lucky)', 'felicior', 'felicissimus'], ['facilis (easy)', 'facilior', 'facillimus'], ['difficilis (difficult)', 'difficilior', 'difficillimus']],
    note: 'quam = than. Comparatives end -ior (neuter -ius) and go like fortior; superlatives go like bonus.' },
  irrcomp: { title: 'Irregular comparison', cols: ['positive', 'comparative', 'superlative'],
    rows: [['bonus (good)', 'melior (better)', 'optimus (very good, best)'], ['malus (bad)', 'peior (worse)', 'pessimus (very bad, worst)'], ['magnus (big)', 'maior (bigger)', 'maximus (very big, biggest)'], ['parvus (small)', 'minor (smaller)', 'minimus (very small, smallest)'], ['multus (much, many)', 'plus (more)', 'plurimus (most, very many)']] },
  possum: { title: 'possum: I am able, I can', cols: ['', 'present', 'imperfect', 'perfect', 'future', 'pluperfect'],
    rows: [['I', 'possum', 'poteram', 'potui', 'potero', 'potueram'], ['you (sg)', 'potes', 'poteras', 'potuisti', 'poteris', 'potueras'], ['he, she, it', 'potest', 'poterat', 'potuit', 'poterit', 'potuerat'], ['we', 'possumus', 'poteramus', 'potuimus', 'poterimus', 'potueramus'], ['you (pl)', 'potestis', 'poteratis', 'potuistis', 'poteritis', 'potueratis'], ['they', 'possunt', 'poterant', 'potuerunt', 'poterunt', 'potuerant']],
    note: 'possum and debeo (I must, ought to) are followed by an infinitive.' },
  noli: { title: 'Prohibitions: do not…!', cols: ['Latin', 'English'],
    rows: [['noli currere, serve!', 'Do not run, slave! (one person)'], ['nolite currere, servi!', 'Do not run, slaves! (more than one)']],
    note: 'noli / nolite + infinitive. The person spoken to is in the vocative.' },
  nonne: { title: 'Questions: -ne, nonne, num', cols: ['Latin', 'English', 'answer expected'],
    rows: [['laboratne?', 'Is he working?', 'yes or no'], ['nonne laborat?', 'He is working, isn’t he?', 'yes'], ['num laborat?', 'He isn’t working, is he?', 'no']] },
  se: { title: 'Reflexive pronoun se', cols: ['case', 'Latin', 'English'],
    rows: [['accusative', 'se', 'himself, herself, themselves'], ['genitive', 'sui', 'of himself, of themselves'], ['dative', 'sibi', 'to or for himself, themselves'], ['ablative', 'se', '(by) himself, themselves'], ['', 'secum', 'with him, with them']],
    note: 'se refers back to the subject of the verb.' },
  // ── CE Level 3 and Scholarship tables (Bass Ch 118–154) ──
  passive: { title: 'Passive: present, imperfect, future (amo)', cols: ['', 'present', 'imperfect', 'future'],
    rows: [['I', 'amor', 'amabar', 'amabor'], ['you (sg)', 'amaris', 'amabaris', 'amaberis'], ['he, she, it', 'amatur', 'amabatur', 'amabitur'], ['we', 'amamur', 'amabamur', 'amabimur'], ['you (pl)', 'amamini', 'amabamini', 'amabimini'], ['they', 'amantur', 'amabantur', 'amabuntur']],
    note: 'I am loved, I was being loved, I shall be loved. By a person = a / ab + ablative; by a thing = ablative alone.' },
  perfpass: { title: 'Perfect and pluperfect passive', cols: ['', 'perfect', 'pluperfect'],
    rows: [['I', 'amatus sum', 'amatus eram'], ['you (sg)', 'amatus es', 'amatus eras'], ['he', 'amatus est', 'amatus erat'], ['she', 'amata est', 'amata erat'], ['we', 'amati sumus', 'amati eramus'], ['you (pl)', 'amati estis', 'amati eratis'], ['they', 'amati sunt', 'amati erant']],
    note: 'Perfect participle passive + sum (I was loved) or eram (I had been loved). The participle agrees with the subject.' },
  volo: { title: 'volo (I want) and nolo (I do not want)', cols: ['', 'volo', 'nolo'],
    rows: [['I', 'volo', 'nolo'], ['you (sg)', 'vis', 'non vis'], ['he, she, it', 'vult', 'non vult'], ['we', 'volumus', 'nolumus'], ['you (pl)', 'vultis', 'non vultis'], ['they', 'volunt', 'nolunt'], ['imperfect', 'volebam', 'nolebam'], ['perfect', 'volui', 'nolui']],
    note: 'Both are usually followed by an infinitive: laborare nolo = I do not want to work.' },
  time: { title: 'Expressions of time', cols: ['case', 'question', 'example'],
    rows: [['accusative', 'how long?', 'multos dies = for many days'], ['ablative', 'when?', 'tertio die = on the third day'], ['ablative', 'within what time?', 'paucis horis = in a few hours']] },
  fero: { title: 'fero, ferre, tuli, latum: I carry, I bear', cols: ['', 'present', 'imperfect', 'future', 'perfect'],
    rows: [['I', 'fero', 'ferebam', 'feram', 'tuli'], ['you (sg)', 'fers', 'ferebas', 'feres', 'tulisti'], ['he, she, it', 'fert', 'ferebat', 'feret', 'tulit'], ['we', 'ferimus', 'ferebamus', 'feremus', 'tulimus'], ['you (pl)', 'fertis', 'ferebatis', 'feretis', 'tulistis'], ['they', 'ferunt', 'ferebant', 'ferent', 'tulerunt']],
    note: 'Passive: feror, ferris, fertur, ferimur, ferimini, feruntur.' },
  qui: { title: 'Relative pronoun: qui, quae, quod (who, which)', cols: ['', 'm', 'f', 'n'],
    rows: [['nom sg', 'qui', 'quae', 'quod'], ['acc sg', 'quem', 'quam', 'quod'], ['gen sg', 'cuius', 'cuius', 'cuius'], ['dat sg', 'cui', 'cui', 'cui'], ['abl sg', 'quo', 'qua', 'quo'], ['nom pl', 'qui', 'quae', 'quae'], ['acc pl', 'quos', 'quas', 'quae'], ['gen pl', 'quorum', 'quarum', 'quorum'], ['dat pl', 'quibus', 'quibus', 'quibus'], ['abl pl', 'quibus', 'quibus', 'quibus']],
    note: 'Gender and number come from the word it refers back to; its case comes from its job in its own clause. quocum = with whom.' },
  prespart: { title: 'Present participle: portans (carrying)', cols: ['', 'singular', 'plural'],
    rows: [['nominative', 'portans', 'portantes'], ['accusative', 'portantem', 'portantes'], ['genitive', 'portantis', 'portantium'], ['dative', 'portanti', 'portantibus'], ['ablative', 'portante', 'portantibus']],
    note: 'portans, monens, regens, audiens, capiens. Goes like ingens and agrees with the noun it describes.' },
  purpose: { title: 'Imperfect subjunctive and purpose clauses', cols: ['', 'amo', 'moneo', 'rego', 'audio', 'sum'],
    rows: [['I', 'amarem', 'monerem', 'regerem', 'audirem', 'essem'], ['you (sg)', 'amares', 'moneres', 'regeres', 'audires', 'esses'], ['he, she, it', 'amaret', 'moneret', 'regeret', 'audiret', 'esset'], ['we', 'amaremus', 'moneremus', 'regeremus', 'audiremus', 'essemus'], ['you (pl)', 'amaretis', 'moneretis', 'regeretis', 'audiretis', 'essetis'], ['they', 'amarent', 'monerent', 'regerent', 'audirent', 'essent']],
    note: 'Present infinitive + -m, -s, -t, -mus, -tis, -nt. ut + subjunctive = in order to; ne + subjunctive = in order not to.' },
  indcmd: { title: 'Indirect commands', cols: ['verb', 'person told', 'then'],
    rows: [['impero (I order)', 'dative', 'ut / ne + subjunctive'], ['persuadeo (I persuade)', 'dative', 'ut / ne + subjunctive'], ['moneo (I warn, advise)', 'accusative', 'ut / ne + subjunctive'], ['rogo (I ask)', 'accusative', 'ut / ne + subjunctive'], ['iubeo (I order)', 'accusative', 'infinitive']],
    note: 'ut = to; ne = not to. dux militibus imperavit ut pugnarent = The leader ordered the soldiers to fight.' },
  ppp: { title: 'Perfect participle passive (PPP)', cols: ['verb', 'PPP', 'meaning'],
    rows: [['porto', 'portatus, -a, -um', 'having been carried'], ['moneo', 'monitus, -a, -um', 'having been warned'], ['rego', 'rectus, -a, -um', 'having been ruled'], ['audio', 'auditus, -a, -um', 'having been heard'], ['capio', 'captus, -a, -um', 'having been captured'], ['video', 'visus, -a, -um', 'having been seen']],
    note: 'The PPP goes like bonus and agrees with its noun. Often best translated with a clause: urbem captam = the city which they had captured.' },
  place: { title: 'Place without a preposition', cols: ['', 'to', 'at, in', 'from'],
    rows: [['domus (home)', 'domum', 'domi', 'domo'], ['rus (country)', 'rus', 'ruri', 'rure'], ['Roma (Rome)', 'Romam', 'Romae', 'Roma']],
    note: 'Names of towns, domus and rus take no preposition.' },
  ablabs: { title: 'Ablative absolute', cols: ['Latin', 'English'],
    rows: [['urbe capta', 'when the city had been captured'], ['hoc audito', 'when this had been heard'], ['hostibus visis', 'when the enemy had been seen']],
    note: 'Noun + participle, both in the ablative, not linked to the rest of the sentence. Start with when… had been… then tidy the English.' },
  indst: { title: 'Indirect statement: accusative + infinitive', cols: ['Latin', 'English'],
    rows: [['scio puerum currere', 'I know that the boy is running'], ['sciebam puerum currere', 'I knew that the boy was running'], ['dixit se timere', 'he said that he was afraid']],
    note: 'After dico, scio, video, audio, credo, nescio: the subject goes into the accusative and the verb into the infinitive. se = he, she, they (the subject).' },
  infpass: { title: 'Present infinitive passive', cols: ['active', 'passive', 'meaning'],
    rows: [['amare', 'amari', 'to be loved'], ['monere', 'moneri', 'to be warned'], ['regere', 'regi', 'to be ruled'], ['audire', 'audiri', 'to be heard'], ['capere', 'capi', 'to be captured']],
    note: '3rd conjugation and capio verbs: change -ere to -i.' },
  perfinf: { title: 'Perfect infinitive', cols: ['verb', 'active', 'passive'],
    rows: [['amo', 'amavisse (to have loved)', 'amatus esse (to have been loved)'], ['moneo', 'monuisse', 'monitus esse'], ['rego', 'rexisse', 'rectus esse'], ['audio', 'audivisse', 'auditus esse'], ['capio', 'cepisse', 'captus esse']],
    note: 'In indirect statement the perfect infinitive shows the action happened earlier: dicit eum venisse = he says that he has come; dixit eum venisse = he said that he had come.' },
  deponent: { title: 'Deponent verbs: passive forms, active meaning', cols: ['', 'present', 'imperfect', 'future', 'perfect'],
    rows: [['I', 'conor', 'conabar', 'conabor', 'conatus sum'], ['you (sg)', 'conaris', 'conabaris', 'conaberis', 'conatus es'], ['he, she, it', 'conatur', 'conabatur', 'conabitur', 'conatus est'], ['we', 'conamur', 'conabamur', 'conabimur', 'conati sumus'], ['you (pl)', 'conamini', 'conabamini', 'conabimini', 'conati estis'], ['they', 'conantur', 'conabantur', 'conabuntur', 'conati sunt']],
    note: 'conor (try), hortor (encourage), loquor (speak), sequor (follow), proficiscor (set out), ingredior (enter), egredior (go out), patior (suffer), morior (die).' },
  cumsubj: { title: 'cum + subjunctive', cols: ['', 'imperfect subjunctive', 'pluperfect subjunctive'],
    rows: [['I', 'amarem', 'amavissem'], ['you (sg)', 'amares', 'amavisses'], ['he, she, it', 'amaret', 'amavisset'], ['we', 'amaremus', 'amavissemus'], ['you (pl)', 'amaretis', 'amavissetis'], ['they', 'amarent', 'amavissent']],
    note: 'cum + imperfect subjunctive = when, while or since… was; cum + pluperfect subjunctive = when or since… had. Pluperfect subjunctive = perfect infinitive + -m, -s, -t…' },
  deppart: { title: 'Deponent perfect participles', cols: ['verb', 'participle', 'meaning'],
    rows: [['conor', 'conatus', 'having tried'], ['hortor', 'hortatus', 'having encouraged'], ['loquor', 'locutus', 'having spoken'], ['sequor', 'secutus', 'having followed'], ['proficiscor', 'profectus', 'having set out'], ['ingredior', 'ingressus', 'having entered'], ['patior', 'passus', 'having suffered']],
    note: 'Deponent participles are active in meaning: having done, not having been done.' },
};
TABLES.ager = TABLES.servus; // some Level 1 gap questions point at 'ager'
// Hint shown for translate / unscramble questions: the table for the most advanced point in the sentence
const TAG_TABLE = { x: 'deppart', w: 'cumsubj', v: 'deponent', u: 'perfinf', t: 'infpass', s: 'indst', r: 'ablabs', q: 'place', p: 'ppp', o: 'indcmd', n: 'purpose', m: 'prespart', l: 'qui', k: 'fero', j: 'time', i: 'volo', h: 'perfpass', g: 'perfpass', f: 'passive', e: 'se', d: 'nonne', c: 'noli', b: 'possum', a: 'comp', Z: 'adj3', Y: 'plupf', X: 'is', W: 'hic', V: 'que', U: 'eo', T: 'fut', S: 'decl3', R: 'perf', Q: 'impf', O: 'inf', M: 'imp', P: 'miser', N: 'num', L: 'bellum', K: 'ego', J: 'prep', I: 'servus', H: 'puella', G: 'ne', F: 'pres', E: 'bonus', D: 'sum', C: 'qw', B: 'puellaNA', A: 'amo' };
const TAG_ORDER = 'xwvutsrqponmlkjihgfedcbaZYXWVUTSRQOMPNLKJIHGFEDCBA';
// ════════════════════════════════════════════════════════════════
// QUESTION BANK — every Latin sentence and form is taken from
// Prep School Latin (R. C. Bass, 2018), CE Level 1, Chapters 2–73.
// ch  = Bass chapter the sentence comes from
// t   = grammar points the sentence needs (see GRAMMAR below)
// d   = three wrong English translations
// u   = 1 if usable as an unscramble question
// g   = [word index, [correct form, wrong forms...], extra grammar needed, hint table]
// p   = [word index, 'pn' | 'case' | 'tense', answer, hint table]
// ════════════════════════════════════════════════════════════════
const BANK = [];
function T(ch, lat, en, t, d, x) { BANK.push(Object.assign({ ch, lat, en, t: t.split(' '), d }, x || {})); }

// ── A: Present tense, amo and moneo verbs (Ch 2–8) ──
T(2, 'porto.', 'I carry.', 'A', ['He carries.', 'They carry.', 'We carry.'], { g: [[0, ['porto', 'portat', 'portant', 'portas']]], p: [[0, 'pn', '1s']] });
T(2, 'intrat.', 'He enters.', 'A', ['They enter.', 'You (sg) enter.', 'We enter.'], { g: [[0, ['intrat', 'intrant', 'intras', 'intramus']]], p: [[0, 'pn', '3s']] });
T(2, 'habitant.', 'They live.', 'A', ['He lives.', 'We live.', 'You (pl) live.'], { g: [[0, ['habitant', 'habitat', 'habitas', 'habitamus']]], p: [[0, 'pn', '3p']] });
T(2, 'amas.', 'You (sg) love.', 'A', ['You (pl) love.', 'They love.', 'We love.'], { g: [[0, ['amas', 'amat', 'amatis', 'amant']]], p: [[0, 'pn', '2s']] });
T(2, 'cantamus.', 'We are singing.', 'A', ['They are singing.', 'You (pl) are singing.', 'I am singing.'], { g: [[0, ['cantamus', 'cantant', 'cantatis', 'canto']]], p: [[0, 'pn', '1p']] });
T(2, 'festinatis.', 'You (pl) are hurrying.', 'A', ['We are hurrying.', 'They are hurrying.', 'You (sg) are hurrying.'], { g: [[0, ['festinatis', 'festinas', 'festinant', 'festinamus']]], p: [[0, 'pn', '2p']] });
T(2, 'laborant.', 'They are working.', 'A', ['He is working.', 'We are working.', 'You (pl) are working.'], { g: [[0, ['laborant', 'laborat', 'laboratis', 'laboramus']]], p: [[0, 'pn', '3p']] });
T(2, 'clamo.', 'I shout.', 'A', ['He shouts.', 'We shout.', 'I sing.'], { g: [[0, ['clamo', 'clamat', 'clamant', 'clamas']]], p: [[0, 'pn', '1s']] });
T(2, 'pugnas.', 'You (sg) are fighting.', 'A', ['You (pl) are fighting.', 'We are fighting.', 'He is fighting.'], { g: [[0, ['pugnas', 'pugnat', 'pugnatis', 'pugnamus']]], p: [[0, 'pn', '2s']] });
T(2, 'parant.', 'They prepare.', 'A', ['He prepares.', 'They carry.', 'You (pl) prepare.'], { g: [[0, ['parant', 'parat', 'paras', 'paratis']]], p: [[0, 'pn', '3p']] });
T(2, 'ambulamus.', 'We are walking.', 'A', ['They are walking.', 'I am walking.', 'We are working.'], { g: [[0, ['ambulamus', 'ambulant', 'ambulatis', 'ambulo']]], p: [[0, 'pn', '1p']] });
T(2, 'portatis.', 'You (pl) carry.', 'A', ['You (sg) carry.', 'We carry.', 'They carry.'], { g: [[0, ['portatis', 'portas', 'portamus', 'portant']]], p: [[0, 'pn', '2p']] });
T(4, 'habitamus et laboramus.', 'We live and work.', 'A', ['They live and work.', 'We live and walk.', 'You (pl) live and work.'], { p: [[0, 'pn', '1p']] });
T(4, 'clamant et pugnant.', 'They shout and fight.', 'A', ['They sing and fight.', 'He shouts and fights.', 'We shout and fight.'], { p: [[1, 'pn', '3p']] });
T(4, 'canto et clamo.', 'I sing and shout.', 'A', ['I sing and walk.', 'They sing and shout.', 'He sings and shouts.'], { p: [[0, 'pn', '1s']] });
T(4, 'ambulas et clamas.', 'You (sg) walk and shout.', 'A', ['You (pl) walk and shout.', 'You (sg) walk and sing.', 'They walk and shout.'], { p: [[2, 'pn', '2s']] });
T(5, 'Marcus festinat.', 'Marcus is hurrying.', 'A', ['Marcus and Sextus are hurrying.', 'Marcus is shouting.', 'Marcus is walking.'], { g: [[1, ['festinat', 'festinant', 'festinas', 'festino']]], p: [[1, 'pn', '3s']] });
T(5, 'Aurelia et Iulia laborant.', 'Aurelia and Julia are working.', 'A', ['Aurelia and Julia are walking.', 'Aurelia and Julia are fighting.', 'Aurelia is working.'], { g: [[3, ['laborant', 'laborat', 'laboras', 'laboramus']]], p: [[3, 'pn', '3p']] });
T(5, 'Cornelius et Publius pugnant.', 'Cornelius and Publius are fighting.', 'A', ['Cornelius and Publius are shouting.', 'Cornelius and Publius are working.', 'Cornelius is fighting.'], { g: [[3, ['pugnant', 'pugnat', 'pugnatis', 'pugnamus']]] });
T(5, 'Flavia clamat.', 'Flavia is shouting.', 'A', ['Flavia is singing.', 'Flavia and Julia are shouting.', 'Flavia is hurrying.'], { g: [[1, ['clamat', 'clamant', 'clamas', 'clamo']]], p: [[1, 'pn', '3s']] });
T(6, 'video.', 'I see.', 'A', ['He sees.', 'I have.', 'I warn.'], { g: [[0, ['video', 'videt', 'vident', 'videmus']]], p: [[0, 'pn', '1s']] });
T(6, 'non video.', 'I do not see.', 'A', ['I see.', 'He does not see.', 'I do not have.'], { p: [[1, 'pn', '1s']] });
T(6, 'Marcus manet.', 'Marcus stays.', 'A', ['Marcus sees.', 'Marcus warns.', 'Marcus and Sextus stay.'], { g: [[1, ['manet', 'manent', 'manes', 'maneo']]], p: [[1, 'pn', '3s']] });
T(6, 'Aurelia et Valeria manent.', 'Aurelia and Valeria are staying.', 'A', ['Aurelia is staying.', 'Aurelia and Valeria are warning.', 'Aurelia and Valeria are seeing.'], { g: [[3, ['manent', 'manet', 'manes', 'manemus']]], p: [[3, 'pn', '3p']] });
T(6, 'monetis.', 'You (pl) warn.', 'A', ['We warn.', 'They warn.', 'You (pl) see.'], { g: [[0, ['monetis', 'mones', 'monent', 'monemus']]], p: [[0, 'pn', '2p']] });
T(6, 'habemus.', 'We have.', 'A', ['We live.', 'They have.', 'You (pl) have.'], { g: [[0, ['habemus', 'habent', 'habet', 'habeo']]], p: [[0, 'pn', '1p']] });
T(6, 'non videmus.', 'We do not see.', 'A', ['We see.', 'They do not see.', 'We do not stay.'], { p: [[1, 'pn', '1p']] });
T(6, 'Marcus et Sextus non manent.', 'Marcus and Sextus do not stay.', 'A', ['Marcus and Sextus stay.', 'Marcus does not stay.', 'Marcus and Sextus do not see.'], { p: [[4, 'pn', '3p']] });
T(6, 'Iulia non videt.', 'Julia does not see.', 'A', ['Julia sees.', 'Julia does not stay.', 'Julia does not warn.'], { g: [[2, ['videt', 'vident', 'vides', 'video']]] });
T(6, 'video et maneo.', 'I see and I stay.', 'A', ['I see and I warn.', 'He sees and he stays.', 'We see and we stay.'], { p: [[2, 'pn', '1s']] });
T(6, 'manes.', 'You (sg) stay.', 'A', ['You (pl) stay.', 'He stays.', 'You (sg) see.'], { g: [[0, ['manes', 'manet', 'manent', 'maneo']]], p: [[0, 'pn', '2s']] });
T(6, 'videtis.', 'You (pl) see.', 'A', ['We see.', 'They see.', 'You (sg) see.'], { g: [[0, ['videtis', 'videmus', 'vident', 'vides']]], p: [[0, 'pn', '2p']] });
T(6, 'habent.', 'They have.', 'A', ['They live.', 'He has.', 'We have.'], { g: [[0, ['habent', 'habet', 'habemus', 'habes']]], p: [[0, 'pn', '3p']] });
T(8, 'cantas.', 'You (sg) are singing.', 'A', ['You (pl) are singing.', 'They are singing.', 'You (sg) are shouting.'], { p: [[0, 'pn', '2s']] });
T(8, 'clamatis.', 'You (pl) are shouting.', 'A', ['We are shouting.', 'They are shouting.', 'You (pl) are singing.'], { g: [[0, ['clamatis', 'clamas', 'clamant', 'clamamus']]], p: [[0, 'pn', '2p']] });
T(8, 'manet.', 'She stays.', 'A', ['They stay.', 'She sees.', 'I stay.'], { p: [[0, 'pn', '3s']] });

// ── B: First declension nouns, nominative and accusative (Ch 9–18) ──
T(10, 'puella clamat.', 'The girl is shouting.', 'A B', ['The girls are shouting.', 'The girl is singing.', 'The woman is shouting.'], { g: [[1, ['clamat', 'clamant', 'clamas', 'clamatis']]], p: [[0, 'case', 'nom sg'], [1, 'pn', '3s']] });
T(10, 'puellae clamant.', 'The girls are shouting.', 'A B', ['The girl is shouting.', 'The girls are singing.', 'The women are shouting.'], { g: [[1, ['clamant', 'clamat', 'clamas', 'clamamus']]], p: [[0, 'case', 'nom pl']] });
T(10, 'feminae vident.', 'The women see.', 'A B', ['The woman sees.', 'The women stay.', 'The girls see.'], { g: [[1, ['vident', 'videt', 'vides', 'videtis']]], p: [[0, 'case', 'nom pl']] });
T(10, 'agricolae manent.', 'The farmers are staying.', 'A B', ['The farmer is staying.', 'The farmers are warning.', 'The sailors are staying.'], { g: [[1, ['manent', 'manet', 'manes', 'manemus']]], p: [[0, 'case', 'nom pl']] });
T(10, 'nautae pugnant.', 'The sailors are fighting.', 'A B', ['The sailor is fighting.', 'The farmers are fighting.', 'The sailors are shouting.'], { g: [[1, ['pugnant', 'pugnat', 'pugnas', 'pugnamus']]], p: [[0, 'case', 'nom pl']] });
T(10, 'filiae cantant.', 'The daughters are singing.', 'A B', ['The daughter is singing.', 'The daughters are shouting.', 'The girls are singing.'], { p: [[0, 'case', 'nom pl'], [1, 'pn', '3p']] });
T(10, 'agricolae laborant et clamant.', 'The farmers work and shout.', 'A B', ['The farmer works and shouts.', 'The farmers walk and shout.', 'The sailors work and shout.'], { p: [[3, 'pn', '3p']] });
T(10, 'puellae et feminae festinant.', 'The girls and the women are hurrying.', 'A B', ['The girl and the woman are hurrying.', 'The girls and the women are singing.', 'The girls and the daughters are hurrying.'], { g: [[3, ['festinant', 'festinat', 'festinas', 'festinatis']]] });
T(10, 'nauta clamat et pugnat.', 'The sailor shouts and fights.', 'A B', ['The sailors shout and fight.', 'The sailor sings and fights.', 'The farmer shouts and fights.'], { p: [[0, 'case', 'nom sg']] });
T(10, 'agricola festinat.', 'The farmer is hurrying.', 'A B', ['The farmers are hurrying.', 'The sailor is hurrying.', 'The farmer is working.'], { g: [[1, ['festinat', 'festinant', 'festinas', 'festino']]] });
T(11, 'puella nautam amat.', 'The girl loves the sailor.', 'A B', ['The sailor loves the girl.', 'The girls love the sailor.', 'The girl loves the sailors.'], { u: 1, g: [[1, ['nautam', 'nauta', 'nautae', 'nautas']]], p: [[1, 'case', 'acc sg'], [0, 'case', 'nom sg']] });
T(11, 'nauta puellam amat.', 'The sailor loves the girl.', 'A B', ['The girl loves the sailor.', 'The sailors love the girl.', 'The sailor loves the girls.'], { u: 1, g: [[1, ['puellam', 'puella', 'puellae', 'puellas']]], p: [[1, 'case', 'acc sg']] });
T(11, 'agricola filiam amat.', 'The farmer loves the daughter.', 'A B', ['The daughter loves the farmer.', 'The farmer loves the daughters.', 'The farmers love the daughter.'], { u: 1, g: [[1, ['filiam', 'filia', 'filiae', 'filias']]], p: [[1, 'case', 'acc sg']] });
T(11, 'femina nautam non amat.', 'The woman does not love the sailor.', 'A B', ['The woman loves the sailor.', 'The sailor does not love the woman.', 'The women do not love the sailor.'], { u: 1 });
T(11, 'agricola hastam tenet.', 'The farmer is holding a spear.', 'A B', ['The farmer has a spear.', 'The farmers are holding a spear.', 'The farmer is holding spears.'], { u: 1, g: [[2, ['tenet', 'tenent', 'teneo']]], p: [[1, 'case', 'acc sg']] });
T(11, 'nauta pecuniam amat.', 'The sailor loves money.', 'A B', ['The sailors love money.', 'The sailor carries money.', 'The sailor loves the girl.'], { u: 1 });
T(11, 'puella reginam laudat.', 'The girl praises the queen.', 'A B', ['The queen praises the girl.', 'The girl calls the queen.', 'The girls praise the queen.'], { u: 1, g: [[1, ['reginam', 'regina', 'reginae']]], p: [[1, 'case', 'acc sg']] });
T(11, 'agricola reginam spectat.', 'The farmer is watching the queen.', 'A B', ['The queen is watching the farmer.', 'The farmers are watching the queen.', 'The farmer is calling the queen.'], { u: 1 });
T(11, 'regina filiam habet.', 'The queen has a daughter.', 'A B', ['The daughter has a queen.', 'The queen loves the daughter.', 'The queen has daughters.'], { u: 1, p: [[1, 'case', 'acc sg']] });
T(11, 'agricola filiam vocat.', 'The farmer calls the daughter.', 'A B', ['The daughter calls the farmer.', 'The farmer warns the daughter.', 'The farmers call the daughter.'], { u: 1, g: [[2, ['vocat', 'vocant', 'vocas', 'voco']]] });
T(11, 'regina deam videt.', 'The queen sees the goddess.', 'A B', ['The goddess sees the queen.', 'The queen praises the goddess.', 'The queens see the goddess.'], { u: 1, p: [[1, 'case', 'acc sg']] });
T(13, 'feminam necant.', 'They are killing the woman.', 'A B', ['The woman is killing them.', 'They are killing the women.', 'He is killing the woman.'], { p: [[0, 'case', 'acc sg'], [1, 'pn', '3p']] });
T(13, 'pecuniam teneo.', 'I am holding the money.', 'A B', ['He is holding the money.', 'I have the money.', 'I am carrying the money.'], { p: [[1, 'pn', '1s']] });
T(13, 'reginam vocat.', 'He calls the queen.', 'A B', ['The queen calls.', 'They call the queen.', 'He praises the queen.'], { p: [[0, 'case', 'acc sg']] });
T(15, 'reginae rident.', 'The queens are laughing.', 'A B', ['The queen is laughing.', 'The queens are crying.', 'The goddesses are laughing.'], { p: [[0, 'case', 'nom pl']] });
T(15, 'hasta necat.', 'The spear kills.', 'A B', ['The spears kill.', 'He kills the spear.', 'The arrow kills.'], { p: [[0, 'case', 'nom sg']] });
T(18, 'puella nautas monet.', 'The girl warns the sailors.', 'A B', ['The girl warns the sailor.', 'The sailors warn the girl.', 'The girls warn the sailors.'], { u: 1, g: [[1, ['nautas', 'nautam', 'nauta', 'nautae']]], p: [[1, 'case', 'acc pl']] });
T(18, 'puellae nautam monent.', 'The girls warn the sailor.', 'A B', ['The girl warns the sailor.', 'The sailor warns the girls.', 'The girls warn the sailors.'], { u: 1, p: [[0, 'case', 'nom pl'], [1, 'case', 'acc sg']] });
T(18, 'feminae agricolas amant.', 'The women love the farmers.', 'A B', ['The farmers love the women.', 'The women love the farmer.', 'The woman loves the farmers.'], { u: 1, g: [[1, ['agricolas', 'agricolam', 'agricola', 'agricolae']]], p: [[1, 'case', 'acc pl']] });
T(18, 'agricola puellas spectat.', 'The farmer is watching the girls.', 'A B', ['The girls are watching the farmer.', 'The farmer is watching the girl.', 'The farmers are watching the girls.'], { u: 1, p: [[1, 'case', 'acc pl']] });
T(18, 'femina cenam parat.', 'The woman is preparing dinner.', 'A B', ['The women are preparing dinner.', 'The woman is eating dinner.', 'The woman is carrying dinner.'], { u: 1, g: [[2, ['parat', 'parant', 'paras', 'paro']]] });
T(18, 'feminae puellas vocant.', 'The women are calling the girls.', 'A B', ['The girls are calling the women.', 'The women are calling the girl.', 'The woman is calling the girls.'], { u: 1, p: [[1, 'case', 'acc pl']] });
T(18, 'puellae hastas non portant.', 'The girls are not carrying spears.', 'A B', ['The girls are carrying spears.', 'The girl is not carrying spears.', 'The girls are not carrying a spear.'], { u: 1, p: [[1, 'case', 'acc pl']] });
T(18, 'feminae agricolas timent.', 'The women fear the farmers.', 'A B', ['The farmers fear the women.', 'The women frighten the farmers.', 'The women fear the farmer.'], { u: 1, g: [[2, ['timent', 'timet', 'timeo', 'timetis']]] });
T(18, 'agricolae deam non laudant.', 'The farmers do not praise the goddess.', 'A B', ['The goddess does not praise the farmers.', 'The farmers praise the goddess.', 'The farmer does not praise the goddess.'], { u: 1 });
T(18, 'nauta villam habet.', 'The sailor has a villa.', 'A B', ['The sailor lives in a villa.', 'The sailors have a villa.', 'The sailor has villas.'], { u: 1, g: [[2, ['habet', 'habent', 'habes', 'habeo']]] });
T(18, 'villam intramus.', 'We enter the villa.', 'A B', ['They enter the villa.', 'We enter the villas.', 'We have the villa.'], { p: [[1, 'pn', '1p']] });
T(18, 'hastam moveo.', 'I am moving the spear.', 'A B', ['I am holding the spear.', 'He is moving the spear.', 'I am moving the spears.'], { p: [[1, 'pn', '1s']] });
T(18, 'nautae non pugnant.', 'The sailors are not fighting.', 'A B', ['The sailor is not fighting.', 'The sailors are fighting.', 'The farmers are not fighting.'], {});
T(18, 'puellas spectamus.', 'We are watching the girls.', 'A B', ['The girls are watching us.', 'We are watching the girl.', 'They are watching the girls.'], { p: [[0, 'case', 'acc pl'], [1, 'pn', '1p']] });
T(18, 'deam laudamus.', 'We praise the goddess.', 'A B', ['The goddess praises us.', 'We praise the goddesses.', 'They praise the goddess.'], { p: [[1, 'pn', '1p']] });
T(18, 'feminas amatis.', 'You (pl) love the women.', 'A B', ['You (sg) love the women.', 'The women love you (pl).', 'You (pl) love the woman.'], { p: [[0, 'case', 'acc pl'], [1, 'pn', '2p']] });
T(18, 'agricolam vides.', 'You (sg) see the farmer.', 'A B', ['The farmer sees you (sg).', 'You (pl) see the farmer.', 'You (sg) see the farmers.'], { p: [[1, 'pn', '2s']] });

// ── C: Question words and quod (Ch 14, 16, 20) ──
T(14, 'cur Marcus ridet?', 'Why is Marcus laughing?', 'A C', ['Where is Marcus laughing?', 'Why is Marcus singing?', 'Marcus is laughing because...'], { g: [[2, ['ridet', 'rident', 'rideo', 'ridemus']]] });
T(14, 'Marcus ridet quod non laborat.', 'Marcus is laughing because he is not working.', 'A C', ['Marcus is laughing but he is not working.', 'Marcus is not laughing because he is working.', 'Marcus is working because he is not laughing.'], { p: [[1, 'pn', '3s']] });
T(14, 'nauta hastam habet quod pugnat.', 'The sailor has a spear because he is fighting.', 'A B C', ['The sailor is fighting because he has a spear.', 'Why does the sailor have a spear?', 'The sailor has a spear but he is not fighting.'], {});
T(14, 'cur puella nautam amat?', 'Why does the girl love the sailor?', 'A B C', ['Why does the sailor love the girl?', 'Where does the girl love the sailor?', 'The girl loves the sailor because...'], {});
T(14, 'puella nautam amat quod nauta pecuniam habet.', 'The girl loves the sailor because the sailor has money.', 'A B C', ['The sailor loves the girl because the girl has money.', 'The girl loves the sailor because she has money.', 'The girl loves the money because the sailor has it.'], {});
T(14, 'femina agricolam timet quod hastam portat.', 'The woman fears the farmer because he is carrying a spear.', 'A B C', ['The farmer fears the woman because she is carrying a spear.', 'The woman frightens the farmer because he is carrying a spear.', 'Why does the woman fear the farmer?'], {});
T(14, 'Iulia Flaviam timet quod Flavia Iuliam terret.', 'Julia fears Flavia because Flavia frightens Julia.', 'A B C', ['Flavia fears Julia because Julia frightens Flavia.', 'Julia frightens Flavia because Flavia fears Julia.', 'Julia fears Flavia but Flavia does not frighten Julia.'], {});
T(14, 'agricola reginam necat quod reginam non amat.', 'The farmer kills the queen because he does not love the queen.', 'A B C', ['The queen kills the farmer because she does not love the farmer.', 'The farmer does not kill the queen because he loves the queen.', 'Why does the farmer kill the queen?'], {});
T(14, 'cur Publius puellam terret?', 'Why is Publius frightening the girl?', 'A B C', ['Why is the girl frightening Publius?', 'Why is Publius afraid of the girl?', 'Where is Publius frightening the girl?'], {});
T(20, 'quis laborat? Flavia laborat.', 'Who is working? Flavia is working.', 'A C', ['Why is Flavia working? Flavia is working.', 'Who is working? Flavia is not working.', 'Where is Flavia working? Flavia is working.'], {});

// ── D: The verb sum (Ch 22) ──
T(22, 'puella sum.', 'I am a girl.', 'B D', ['You (sg) are a girl.', 'She is a girl.', 'We are girls.'], { g: [[1, ['sum', 'es', 'est', 'sumus']]], p: [[1, 'pn', '1s', 'sum']] });
T(22, 'nauta es.', 'You (sg) are a sailor.', 'B D', ['I am a sailor.', 'He is a sailor.', 'You (pl) are sailors.'], { g: [[1, ['es', 'est', 'sum', 'estis']]], p: [[1, 'pn', '2s', 'sum']] });
T(22, 'agricolae sumus.', 'We are farmers.', 'B D', ['They are farmers.', 'You (pl) are farmers.', 'We are sailors.'], { g: [[1, ['sumus', 'sunt', 'estis', 'sum']]], p: [[1, 'pn', '1p', 'sum']] });
T(22, 'deae estis.', 'You (pl) are goddesses.', 'B D', ['We are goddesses.', 'They are goddesses.', 'You (sg) are a goddess.'], { g: [[1, ['estis', 'sumus', 'sunt', 'es']]], p: [[1, 'pn', '2p', 'sum']] });
T(22, 'puellae sunt.', 'They are girls.', 'B D', ['We are girls.', 'She is a girl.', 'They are women.'], { g: [[1, ['sunt', 'est', 'sumus', 'estis']]], p: [[1, 'pn', '3p', 'sum']] });
T(22, 'quis es?', 'Who are you (sg)?', 'C D', ['Who is he?', 'Who are they?', 'Why are you (sg) here?'], { p: [[1, 'pn', '2s', 'sum']] });
T(22, 'regina sum.', 'I am the queen.', 'B D', ['You (sg) are the queen.', 'She is the queen.', 'I am a goddess.'], { p: [[1, 'pn', '1s', 'sum']] });
T(22, 'Flavia puella est.', 'Flavia is a girl.', 'B D', ['Flavia is a woman.', 'Flavia and Julia are girls.', 'Flavia is not a girl.'], { g: [[2, ['est', 'sunt', 'es', 'sum']]] });
T(22, 'Flavia et Iulia nautae non sunt.', 'Flavia and Julia are not sailors.', 'B D', ['Flavia and Julia are sailors.', 'Flavia is not a sailor.', 'Flavia and Julia are not farmers.'], { p: [[4, 'pn', '3p', 'sum']] });

// ── E: Adjectives like bonus (Ch 23, 46) ──
T(23, 'Flavia Romana est.', 'Flavia is Roman.', 'D E', ['Flavia is Greek.', 'Flavia and Julia are Roman.', 'Flavia is not Roman.'], { g: [[1, ['Romana', 'Romanus', 'Romani', 'Romanae'], '', 'bonus']] });
T(23, 'Marcus et Sextus Romani sunt.', 'Marcus and Sextus are Romans.', 'D E', ['Marcus and Sextus are Greeks.', 'Marcus is a Roman.', 'Marcus and Sextus are not Romans.'], { g: [[3, ['Romani', 'Romanus', 'Romana', 'Romanae'], '', 'bonus']] });
T(23, 'Flavia et Iulia Graecae non sunt.', 'Flavia and Julia are not Greek.', 'D E', ['Flavia and Julia are Greek.', 'Flavia is not Greek.', 'Flavia and Julia are not Roman.'], { g: [[3, ['Graecae', 'Graeca', 'Graeci', 'Graecus'], '', 'bonus']] });
T(23, 'Marcus Graecus non est.', 'Marcus is not Greek.', 'D E', ['Marcus is Greek.', 'Marcus is not Roman.', 'Marcus and Sextus are not Greek.'], { g: [[1, ['Graecus', 'Graeca', 'Graeci', 'Graecae'], '', 'bonus']] });
T(23, 'nautae Romani sumus.', 'We are Roman sailors.', 'B D E', ['They are Roman sailors.', 'We are Greek sailors.', 'You (pl) are Roman sailors.'], { p: [[2, 'pn', '1p', 'sum']] });
T(23, 'agricola est laetus.', 'The farmer is happy.', 'B D E', ['The farmers are happy.', 'The farmer is not happy.', 'The sailor is happy.'], { g: [[2, ['laetus', 'laeta', 'laeti'], '', 'bonus']] });
T(23, 'agricolae sunt laeti.', 'The farmers are happy.', 'B D E', ['The farmer is happy.', 'The farmers are good.', 'The girls are happy.'], { g: [[2, ['laeti', 'laetus', 'laeta'], '', 'bonus']] });
T(24, 'Marcus est nauta Romanus.', 'Marcus is a Roman sailor.', 'B D E', ['Marcus is a Greek sailor.', 'Marcus is a Roman farmer.', 'Marcus and Sextus are Roman sailors.'], {});
T(24, 'cena bona est.', 'The dinner is good.', 'B D E', ['The dinners are good.', 'The dinner is not good.', 'The wine is good.'], {});
T(23, 'puellae Romanae sunt.', 'The girls are Roman.', 'B D E', ['The girl is Roman.', 'The girls are Greek.', 'The girls are not Roman.'], {});

// ── F: Present tense, rego, audio and capio verbs (Ch 25) ──
T(25, 'mitto.', 'I send.', 'F', ['I put.', 'He sends.', 'I say.'], { g: [[0, ['mitto', 'mittit', 'mittis', 'mittimus']]], p: [[0, 'pn', '1s']] });
T(25, 'curris.', 'You (sg) are running.', 'F', ['You (pl) are running.', 'He is running.', 'They are running.'], { g: [[0, ['curris', 'currit', 'currunt', 'curro']]], p: [[0, 'pn', '2s']] });
T(25, 'currunt.', 'They are running.', 'F', ['He is running.', 'We are running.', 'They are coming.'], { g: [[0, ['currunt', 'currit', 'curris', 'currimus']]], p: [[0, 'pn', '3p']] });
T(25, 'dormitis.', 'You (pl) are sleeping.', 'F', ['We are sleeping.', 'You (sg) are sleeping.', 'They are sleeping.'], { g: [[0, ['dormitis', 'dormit', 'dormiunt', 'dormimus']]], p: [[0, 'pn', '2p']] });
T(25, 'ducitis.', 'You (pl) are leading.', 'F', ['You (sg) are leading.', 'They are leading.', 'You (pl) are saying.'], { p: [[0, 'pn', '2p']] });
T(25, 'venimus.', 'We are coming.', 'F', ['They are coming.', 'I am coming.', 'We are sleeping.'], { g: [[0, ['venimus', 'veniunt', 'venitis', 'venio']]], p: [[0, 'pn', '1p']] });
T(25, 'ducunt.', 'They lead.', 'F', ['He leads.', 'They say.', 'We lead.'], { g: [[0, ['ducunt', 'ducit', 'ducimus', 'ducitis']]], p: [[0, 'pn', '3p']] });
T(25, 'audimus.', 'We hear.', 'F', ['They hear.', 'You (pl) hear.', 'We come.'], { g: [[0, ['audimus', 'audiunt', 'auditis', 'audio']]], p: [[0, 'pn', '1p']] });
T(25, 'audis.', 'You (sg) hear.', 'F', ['He hears.', 'You (pl) hear.', 'I hear.'], { g: [[0, ['audis', 'audit', 'auditis', 'audio']]], p: [[0, 'pn', '2s']] });
T(25, 'faciunt.', 'They make.', 'F', ['They take.', 'He makes.', 'They say.'], { g: [[0, ['faciunt', 'facis', 'facimus']]], p: [[0, 'pn', '3p']] });
T(25, 'capis.', 'You (sg) take.', 'F', ['He takes.', 'You (pl) take.', 'You (sg) make.'], { g: [[0, ['capis', 'capit', 'capimus', 'capiunt']]], p: [[0, 'pn', '2s']] });
T(25, 'audiunt.', 'They hear.', 'F', ['He hears.', 'We hear.', 'They come.'], { g: [[0, ['audiunt', 'audit', 'audis', 'audimus']]], p: [[0, 'pn', '3p']] });
T(25, 'dormiunt.', 'They are sleeping.', 'F', ['He is sleeping.', 'We are sleeping.', 'They are coming.'], { p: [[0, 'pn', '3p']] });
T(25, 'capit.', 'He takes.', 'F', ['They take.', 'He makes.', 'You (sg) take.'], { g: [[0, ['capit', 'capiunt', 'capis', 'capimus']]], p: [[0, 'pn', '3s']] });
T(25, 'regitis.', 'You (pl) rule.', 'F', ['We rule.', 'They rule.', 'You (sg) rule.'], { g: [[0, ['regitis', 'regit', 'regunt', 'regimus']]], p: [[0, 'pn', '2p']] });
T(25, 'veniunt.', 'They are coming.', 'F', ['He is coming.', 'We are coming.', 'They are sleeping.'], { p: [[0, 'pn', '3p']] });
T(25, 'ponit.', 'He puts.', 'F', ['They put.', 'He sends.', 'I put.'], { g: [[0, ['ponit', 'ponitis', 'ponis', 'pono']]], p: [[0, 'pn', '3s']] });
T(25, 'dicit.', 'He says.', 'F', ['They say.', 'He leads.', 'You (sg) say.'], { p: [[0, 'pn', '3s']] });
T(25, 'puella non laborat. dormit.', 'The girl is not working. She is sleeping.', 'A B F', ['The girl is working. She is not sleeping.', 'The girls are not working. They are sleeping.', 'The girl is not sleeping. She is working.'], {});
T(25, 'feminae pecuniam capiunt.', 'The women take the money.', 'B F', ['The woman takes the money.', 'The women make the money.', 'The women take the spear.'], { u: 1, g: [[2, ['capiunt', 'capit', 'capis', 'capimus']]] });
T(25, 'puella reginam audit.', 'The girl hears the queen.', 'B F', ['The queen hears the girl.', 'The girls hear the queen.', 'The girl sees the queen.'], { u: 1, g: [[2, ['audit', 'audiunt', 'audis', 'audio']]] });
T(25, 'agricola currit.', 'The farmer runs.', 'B F', ['The farmers run.', 'The farmer comes.', 'The sailor runs.'], { g: [[1, ['currit', 'currunt', 'curris', 'curro']]] });
T(25, 'curro quod festino.', 'I am running because I am hurrying.', 'A C F', ['I am hurrying because I am running.', 'He is running because he is hurrying.', 'Why am I running?'], {});
T(25, 'laboramus quod villam facimus.', 'We are working because we are making a villa.', 'A B C F', ['They are working because they are making a villa.', 'We are making a villa because we are working.', 'We are working because we have a villa.'], {});
T(32, 'poeta pecuniam capit.', 'The poet takes the money.', 'B F', ['The poets take the money.', 'The poet makes money.', 'The poet takes the spear.'], { u: 1 });
T(32, 'ancillae reginam audiunt.', 'The maidservants listen to the queen.', 'B F', ['The queen listens to the maidservants.', 'The maidservant listens to the queen.', 'The maidservants see the queen.'], { u: 1 });
T(32, 'undas audis.', 'You (sg) hear the waves.', 'B F', ['You (sg) hear the wave.', 'The waves hear you (sg).', 'You (pl) hear the waves.'], { p: [[1, 'pn', '2s']] });
T(32, 'incolae dormiunt.', 'The inhabitants are sleeping.', 'B F', ['The inhabitant is sleeping.', 'The inhabitants are coming.', 'The sailors are sleeping.'], {});
T(32, 'regina venit.', 'The queen is coming.', 'B F', ['The queens are coming.', 'The queen is sleeping.', 'The goddess is coming.'], {});

// ── G: Questions with -ne (Ch 26) ──
T(26, 'currone?', 'Am I running?', 'F G', ['I am running.', 'Are they running?', 'Is he running?'], {});
T(26, 'mittimusne?', 'Are we sending?', 'F G', ['We are sending.', 'Are they sending?', 'Are you (pl) sending?'], {});
T(26, 'ridentne?', 'Are they laughing?', 'A G', ['They are laughing.', 'Is he laughing?', 'Are they crying?'], {});
T(26, 'regitne?', 'Is he ruling?', 'F G', ['He is ruling.', 'Are they ruling?', 'Is he leading?'], {});
T(26, 'festinatisne?', 'Are you (pl) hurrying?', 'A G', ['You (pl) are hurrying.', 'Are we hurrying?', 'Are you (sg) hurrying?'], {});
T(26, 'audisne?', 'Are you (sg) listening?', 'F G', ['You (sg) are listening.', 'Is he listening?', 'Are you (pl) listening?'], {});
T(26, 'timesne?', 'Are you (sg) afraid?', 'A G', ['You (sg) are afraid.', 'Is he afraid?', 'Are you (sg) frightening?'], {});
T(26, 'amasne puellam?', 'Do you (sg) love the girl?', 'A B G', ['You (sg) love the girl.', 'Does the girl love you (sg)?', 'Do you (sg) love the girls?'], {});
T(26, 'agricolane laborat?', 'Is the farmer working?', 'A B G', ['The farmer is working.', 'Are the farmers working?', 'Why is the farmer working?'], {});
T(26, 'agricolaene laborant?', 'Are the farmers working?', 'A B G', ['The farmers are working.', 'Is the farmer working?', 'Are the sailors working?'], {});
T(26, 'deamne timet?', 'Does he fear the goddess?', 'A B G', ['He fears the goddess.', 'Does the goddess fear him?', 'Does he frighten the goddess?'], {});
T(26, 'reginane ridet?', 'Is the queen laughing?', 'A B G', ['The queen is laughing.', 'Why is the queen laughing?', 'Are the queens laughing?'], {});
T(26, 'estne Flavia nauta?', 'Is Flavia a sailor?', 'B D G', ['Flavia is a sailor.', 'Is Flavia a farmer?', 'Who is Flavia?'], {});
T(26, 'nautane pecuniam habet?', 'Does the sailor have money?', 'A B G', ['The sailor has money.', 'Do the sailors have money?', 'Where does the sailor have money?'], {});
T(26, 'puellaene currunt?', 'Are the girls running?', 'B F G', ['The girls are running.', 'Is the girl running?', 'Are the girls coming?'], {});
T(26, 'nautaene puellam amant?', 'Do the sailors love the girl?', 'A B G', ['The sailors love the girl.', 'Does the girl love the sailors?', 'Does the sailor love the girl?'], {});
T(26, 'mittisne pecuniam?', 'Are you (sg) sending the money?', 'B F G', ['You (sg) are sending the money.', 'Is he sending the money?', 'Are you (sg) taking the money?'], {});
T(26, 'Marcusne Flaviam amat?', 'Does Marcus love Flavia?', 'A B G', ['Marcus loves Flavia.', 'Does Flavia love Marcus?', 'Why does Marcus love Flavia?'], {});

// ── H: First declension, all six cases (Ch 28–31) ──
T(31, 'hasta nautae necat.', 'The spear of the sailor kills.', 'A B H', ['The spear kills the sailor.', 'The spears of the sailors kill.', 'The spear of the girl kills.'], { g: [[1, ['nautae', 'nautam', 'nauta', 'nautis'], '', 'puella']], p: [[1, 'case', 'gen sg', 'puella']] });
T(31, 'filia reginae venit.', 'The daughter of the queen is coming.', 'B F H', ['The daughter is coming to the queen.', 'The daughters of the queen are coming.', 'The queen of the daughter is coming.'], { p: [[1, 'case', 'gen sg', 'puella']] });
T(31, 'ancilla poetae cantat.', 'The maidservant of the poet is singing.', 'A B H', ['The poet of the maidservant is singing.', 'The maidservant is singing to the poet.', 'The maidservants of the poet are singing.'], { p: [[1, 'case', 'gen sg', 'puella']] });
T(31, 'filia feminae timet.', 'The daughter of the woman is afraid.', 'A B H', ['The daughter is afraid of the woman.', 'The daughters of the woman are afraid.', 'The woman of the daughter is afraid.'], {});
T(31, 'regina insulae ridet.', 'The queen of the island is laughing.', 'A B H', ['The queen is laughing on the island.', 'The queens of the island are laughing.', 'The queen of the island is crying.'], { p: [[1, 'case', 'gen sg', 'puella']] });
T(31, 'turba nautarum venit.', 'A crowd of sailors is coming.', 'B F H', ['A crowd of girls is coming.', 'The sailors of the crowd are coming.', 'A crowd of sailors is running.'], { g: [[1, ['nautarum', 'nautas', 'nautis', 'nautae'], '', 'puella']], p: [[1, 'case', 'gen pl', 'puella']] });
T(31, 'agricolae puellas hastis terrent.', 'The farmers frighten the girls with spears.', 'A B H', ['The girls frighten the farmers with spears.', 'The farmers frighten the girl with a spear.', 'The farmers give spears to the girls.'], { u: 1, p: [[2, 'case', 'abl pl', 'puella'], [1, 'case', 'acc pl', 'puella']] });
T(31, 'filia agricolae cantat.', 'The daughter of the farmer is singing.', 'A B H', ['The daughters of the farmer are singing.', 'The daughter is singing to the farmer.', 'The farmer of the daughter is singing.'], {});
T(31, 'nauta filiam reginae amat.', 'The sailor loves the daughter of the queen.', 'A B H', ['The daughter of the queen loves the sailor.', 'The sailor loves the queen of the daughter.', 'The sailors love the daughter of the queen.'], { p: [[2, 'case', 'gen sg', 'puella']] });
T(31, 'cenam agricolis paramus.', 'We are preparing dinner for the farmers.', 'A B H', ['We are preparing dinner for the farmer.', 'The farmers are preparing dinner for us.', 'They are preparing dinner for the farmers.'], { p: [[1, 'case', 'dat pl', 'puella']] });
T(31, 'nautae incolas sagittis necant.', 'The sailors kill the inhabitants with arrows.', 'A B H', ['The inhabitants kill the sailors with arrows.', 'The sailors kill the inhabitant with an arrow.', 'The sailors give arrows to the inhabitants.'], { u: 1, p: [[2, 'case', 'abl pl', 'puella']] });
T(31, 'turbam puellarum videmus.', 'We see a crowd of girls.', 'A B H', ['A crowd of girls sees us.', 'We see the girls of the crowd.', 'They see a crowd of girls.'], { p: [[1, 'case', 'gen pl', 'puella']] });
T(31, 'puella pecuniam agricolae dat.', 'The girl gives money to the farmer.', 'A B H', ['The farmer gives money to the girl.', 'The girl gives money to the farmers.', 'The girl takes money from the farmer.'], { u: 1, g: [[2, ['agricolae', 'agricolam', 'agricola', 'agricolis'], '', 'puella']], p: [[2, 'case', 'dat sg', 'puella']] });
T(31, 'puella pecuniam agricolis dat.', 'The girl gives money to the farmers.', 'A B H', ['The girl gives money to the farmer.', 'The farmers give money to the girl.', 'The girls give money to the farmers.'], { u: 1, g: [[2, ['agricolis', 'agricolae', 'agricolas'], '', 'puella']], p: [[2, 'case', 'dat pl', 'puella']] });
T(31, 'poeta insulam nautae ostendit.', 'The poet shows the island to the sailor.', 'B F H', ['The sailor shows the island to the poet.', 'The poet shows the island to the sailors.', 'The poet shows the sailor to the island.'], { u: 1, p: [[2, 'case', 'dat sg', 'puella']] });
T(31, 'poeta insulam nautis ostendit.', 'The poet shows the island to the sailors.', 'B F H', ['The poet shows the island to the sailor.', 'The sailors show the island to the poet.', 'The poets show the island to the sailors.'], { u: 1, p: [[2, 'case', 'dat pl', 'puella']] });
T(31, 'femina aquam poetae dat.', 'The woman gives water to the poet.', 'A B H', ['The poet gives water to the woman.', 'The woman gives water to the poets.', 'The woman gives wine to the poet.'], { u: 1 });
T(31, 'sagittas nautis paro.', 'I am preparing arrows for the sailors.', 'A B H', ['I am preparing arrows for the sailor.', 'The sailors are preparing arrows for me.', 'He is preparing arrows for the sailors.'], { p: [[1, 'case', 'dat pl', 'puella']] });
T(32, 'turba puellas terret.', 'The crowd frightens the girls.', 'A B', ['The girls frighten the crowd.', 'The crowds frighten the girls.', 'The crowd frightens the girl.'], { u: 1 });
T(32, 'nautae undas non timent.', 'The sailors do not fear the waves.', 'A B', ['The waves do not frighten the sailors.', 'The sailors fear the waves.', 'The sailor does not fear the waves.'], { u: 1 });
T(32, 'poetae timent.', 'The poets are afraid.', 'A B', ['The poet is afraid.', 'The poets are frightening.', 'The girls are afraid.'], {});

// ── I: Second declension nouns, servus, puer, ager, vir (Ch 35–37) ──
T(35, 'amicus currit.', 'The friend is running.', 'F I', ['The friends are running.', 'The friend is coming.', 'He is running to the friend.'], { g: [[0, ['amicus', 'amicum', 'amici', 'amicos'], '', 'servus']], p: [[0, 'case', 'nom sg', 'servus']] });
T(35, 'amicum habeo.', 'I have a friend.', 'A I', ['A friend has me.', 'I have friends.', 'He has a friend.'], { p: [[0, 'case', 'acc sg', 'servus']] });
T(35, 'amici pugnant.', 'The friends are fighting.', 'A I', ['The friend is fighting.', 'They are fighting the friends.', 'The friends are shouting.'], { p: [[0, 'case', 'nom pl', 'servus']] });
T(35, 'gladios habemus.', 'We have swords.', 'A I', ['We have a sword.', 'They have swords.', 'We have spears.'], { p: [[0, 'case', 'acc pl', 'servus']] });
T(35, 'dominum timent.', 'They fear the master.', 'A I', ['The master fears them.', 'They fear the masters.', 'They frighten the master.'], { p: [[0, 'case', 'acc sg', 'servus']] });
T(35, 'nuntii veniunt.', 'The messengers are coming.', 'F I', ['The messenger is coming.', 'The messengers are running.', 'The allies are coming.'], { p: [[0, 'case', 'nom pl', 'servus']] });
T(35, 'muros spectas.', 'You (sg) are looking at the walls.', 'A I', ['You (sg) are looking at the wall.', 'You (pl) are looking at the walls.', 'The walls are looking at you (sg).'], { p: [[0, 'case', 'acc pl', 'servus']] });
T(35, 'equos amamus.', 'We love horses.', 'A I', ['Horses love us.', 'We love the horse.', 'They love horses.'], { p: [[0, 'case', 'acc pl', 'servus']] });
T(35, 'ventum audimus.', 'We hear the wind.', 'F I', ['The wind hears us.', 'We hear the winds.', 'They hear the wind.'], {});
T(35, 'dominus servum habet.', 'The master has a slave.', 'A I', ['The slave has a master.', 'The master has slaves.', 'The masters have a slave.'], { u: 1, g: [[1, ['servum', 'servus', 'servi', 'servos'], '', 'servus']], p: [[1, 'case', 'acc sg', 'servus']] });
T(35, 'domini servos habent.', 'The masters have slaves.', 'A I', ['The slaves have masters.', 'The master has slaves.', 'The masters have a slave.'], { u: 1, g: [[1, ['servos', 'servum', 'servi', 'servus'], '', 'servus']], p: [[1, 'case', 'acc pl', 'servus']] });
T(35, 'servi cibum parant.', 'The slaves are preparing food.', 'A I', ['The slave is preparing food.', 'The slaves are carrying food.', 'The slaves are preparing dinner.'], { u: 1, p: [[0, 'case', 'nom pl', 'servus']] });
T(35, 'servi dominum audiunt.', 'The slaves listen to the master.', 'F I', ['The master listens to the slaves.', 'The slave listens to the master.', 'The slaves listen to the masters.'], { u: 1, g: [[1, ['dominum', 'dominus', 'domini'], '', 'servus']] });
T(35, 'gladius amicum terret.', 'The sword frightens the friend.', 'A I', ['The friend frightens the sword.', 'The sword frightens the friends.', 'The friend fears the sword.'], { u: 1 });
T(35, 'deus gladios non timet.', 'The god does not fear swords.', 'A I', ['The god fears swords.', 'Swords do not frighten the god.', 'The gods do not fear swords.'], { u: 1 });
T(35, 'dominus nuntium mittit.', 'The master sends a messenger.', 'F I', ['The messenger sends the master.', 'The master sends messengers.', 'The masters send a messenger.'], { u: 1, g: [[2, ['mittit', 'mittunt', 'mittis', 'mitto']]] });
T(35, 'gladii servos necant.', 'The swords kill the slaves.', 'A I', ['The slaves kill with swords.', 'The sword kills the slave.', 'The slaves kill the swords.'], { u: 1 });
T(35, 'deus dominum vocat.', 'The god calls the master.', 'A I', ['The master calls the god.', 'The god calls the masters.', 'The gods call the master.'], { u: 1 });
T(35, 'filius dominum audit.', 'The son listens to the master.', 'F I', ['The master listens to the son.', 'The sons listen to the master.', 'The son sees the master.'], { u: 1 });
T(35, 'equi cibum amant.', 'The horses love food.', 'A I', ['The horse loves food.', 'The horses love wine.', 'Food loves the horses.'], { u: 1, p: [[0, 'case', 'nom pl', 'servus']] });
T(35, 'socii muros spectant.', 'The allies are looking at the walls.', 'A I', ['The ally is looking at the walls.', 'The allies are looking at the wall.', 'The walls are looking at the allies.'], { u: 1 });
T(35, 'servus cibum portat.', 'The slave is carrying food.', 'A I', ['The slaves are carrying food.', 'The slave is preparing food.', 'The slave is carrying wine.'], { u: 1 });
T(40, 'magister librum scribit.', 'The teacher is writing a book.', 'F I', ['The teacher is reading a book.', 'The teachers are writing a book.', 'The teacher is writing books.'], { u: 1, p: [[1, 'case', 'acc sg', 'ager']] });
T(40, 'vir libros non legit.', 'The man does not read books.', 'F I', ['The man reads books.', 'The men do not read books.', 'The man does not write books.'], { u: 1 });
T(40, 'puella puerum non amat.', 'The girl does not love the boy.', 'A B I', ['The boy does not love the girl.', 'The girl loves the boy.', 'The girl does not love the boys.'], { u: 1, g: [[1, ['puerum', 'puer', 'pueri', 'pueros'], '', 'servus']], p: [[1, 'case', 'acc sg', 'servus']] });
T(40, 'pueri librum magistro dant.', 'The boys give a book to the teacher.', 'A H I', ['The teacher gives a book to the boys.', 'The boy gives a book to the teacher.', 'The boys give books to the teacher.'], { u: 1, p: [[2, 'case', 'dat sg', 'ager']] });
T(40, 'magister librum pueris scribit.', 'The teacher is writing a book for the boys.', 'F H I', ['The boys are writing a book for the teacher.', 'The teacher is writing a book for the boy.', 'The teacher is reading a book to the boys.'], { u: 1, p: [[2, 'case', 'dat pl', 'servus']] });
T(46, 'servus cibum bonum parat.', 'The slave is preparing good food.', 'A E I', ['The good slave is preparing food.', 'The slaves are preparing good food.', 'The slave is preparing bad food.'], { u: 1, g: [[2, ['bonum', 'bonus', 'boni', 'bonos'], '', 'bonus']] });
T(46, 'magister iratus pueros malos monet.', 'The angry teacher warns the bad boys.', 'A E I', ['The bad teacher warns the angry boys.', 'The angry teacher warns the bad boy.', 'The angry boys warn the bad teacher.'], { p: [[2, 'case', 'acc pl', 'servus']] });
T(46, 'agricola multos agros habet.', 'The farmer has many fields.', 'A B E I', ['The farmer has a big field.', 'Many farmers have fields.', 'The farmer has few fields.'], { u: 1, g: [[1, ['multos', 'multus', 'multi', 'multa'], '', 'bonus']] });
T(46, 'puer multas puellas spectat.', 'The boy is looking at many girls.', 'A B E I', ['Many boys are looking at the girl.', 'The boy is looking at the girl.', 'The girls are looking at the boy.'], { u: 1 });
T(46, 'pueri boni bellum saevum timent.', 'The good boys fear a savage war.', 'A E I L', ['The savage boys fear a good war.', 'The good boy fears a savage war.', 'The good boys fear savage wars.'], {});
T(46, 'nauta iratus puellam terret.', 'The angry sailor frightens the girl.', 'A B E', ['The angry girl frightens the sailor.', 'The sailor frightens the angry girl.', 'The angry sailors frighten the girl.'], { u: 1 });
T(46, 'puella nautam saevum non amat.', 'The girl does not love the savage sailor.', 'A B E', ['The savage girl does not love the sailor.', 'The savage sailor does not love the girl.', 'The girl loves the savage sailor.'], { u: 1, g: [[2, ['saevum', 'saevus', 'saeva'], '', 'bonus']] });
T(46, 'dominus multam pecuniam servis dat.', 'The master gives much money to the slaves.', 'A B E H I', ['The master gives money to many slaves.', 'The slaves give much money to the master.', 'The master gives much money to the slave.'], {});
T(46, 'dominus pecuniam multis servis dat.', 'The master gives money to many slaves.', 'A B E H I', ['The master gives much money to the slaves.', 'Many slaves give money to the master.', 'The master gives money to the slave.'], { p: [[3, 'case', 'dat pl', 'servus']] });
T(46, 'libros bonos saepe lego.', 'I often read good books.', 'E F I', ['I always read good books.', 'I often write good books.', 'He often reads good books.'], {});
T(46, 'femina bona aquam nautae fesso dat.', 'The good woman gives water to the tired sailor.', 'A B E H', ['The tired woman gives water to the good sailor.', 'The good woman gives water to the tired sailors.', 'The tired sailor gives water to the good woman.'], {});
T(46, 'dominus vinum servis fessis dat.', 'The master gives wine to the tired slaves.', 'A E H I L', ['The tired master gives wine to the slaves.', 'The master gives wine to the tired slave.', 'The tired slaves give wine to the master.'], {});
T(46, 'pueri sunt laeti quod magister est bonus.', 'The boys are happy because the teacher is good.', 'C D E I', ['The teacher is happy because the boys are good.', 'The boys are good because the teacher is happy.', 'The boy is happy because the teacher is good.'], {});
T(46, 'magister iratus est quod pueri boni non sunt.', 'The teacher is angry because the boys are not good.', 'C D E I', ['The boys are angry because the teacher is not good.', 'The teacher is not angry because the boys are good.', 'The teacher is angry because the boy is not good.'], {});

// ── J: Prepositions (Ch 38) ──
T(38, 'in muro sedeo.', 'I am sitting on the wall.', 'A I J', ['I am sitting near the wall.', 'He is sitting on the wall.', 'I am running into the wall.'], { g: [[1, ['muro', 'murum', 'murus', 'muri'], '', 'prep']] });
T(38, 'ad villam ambulamus.', 'We are walking to the villa.', 'A B J', ['We are walking away from the villa.', 'We are walking in the villa.', 'They are walking to the villa.'], { g: [[0, ['ad', 'a', 'in', 'e'], '', 'prep']] });
T(38, 'contra Romanos pugnat.', 'He fights against the Romans.', 'A I J', ['He fights with the Romans.', 'They fight against the Romans.', 'He fights near the Romans.'], { g: [[0, ['contra', 'cum', 'prope', 'ad'], '', 'prep']] });
T(38, 'per viam currimus.', 'We are running along the road.', 'B F J', ['We are running across the road.', 'We are running into the road.', 'They are running along the road.'], { g: [[0, ['per', 'trans', 'in', 'ad'], '', 'prep']] });
T(38, 'in villa habitas.', 'You (sg) live in the villa.', 'A B J', ['You (sg) live near the villa.', 'You (pl) live in the villa.', 'You (sg) run into the villa.'], { g: [[1, ['villa', 'villam', 'villis', 'villas'], '', 'prep']] });
T(38, 'prope insulam habitamus.', 'We live near the island.', 'A B J', ['We live on the island.', 'They live near the island.', 'We sail to the island.'], { g: [[0, ['prope', 'trans', 'contra', 'per'], '', 'prep']] });
T(38, 'trans viam ambulat.', 'He walks across the road.', 'A B J', ['He walks along the road.', 'He walks in the road.', 'They walk across the road.'], { g: [[0, ['trans', 'per', 'ad', 'in'], '', 'prep']] });
T(38, 'cum amicis cantamus.', 'We are singing with friends.', 'A I J', ['We are singing to friends.', 'We are singing with a friend.', 'They are singing with friends.'], {});
T(38, 'a villa curris.', 'You (sg) are running away from the villa.', 'B F J', ['You (sg) are running to the villa.', 'You (sg) are running into the villa.', 'You (pl) are running away from the villa.'], { g: [[0, ['a', 'ad', 'in', 'per'], '', 'prep']] });
T(38, 'in villam curris.', 'You (sg) are running into the villa.', 'B F J', ['You (sg) are running in the villa.', 'You (sg) are running away from the villa.', 'They are running into the villa.'], { g: [[1, ['villam', 'villa', 'villis', 'villas'], '', 'prep']] });
T(38, 'puer a magistro currit.', 'The boy runs away from the teacher.', 'F I J', ['The boy runs to the teacher.', 'The teacher runs away from the boy.', 'The boy runs with the teacher.'], { u: 1, g: [[1, ['a', 'ad', 'cum', 'contra'], '', 'prep']] });
T(38, 'puella cum amicis venit.', 'The girl comes with friends.', 'B F I J', ['The girl comes to her friends.', 'The girls come with a friend.', 'The girl comes with a friend.'], { u: 1, g: [[2, ['amicis', 'amicos', 'amicum', 'amici'], '', 'prep']] });
T(38, 'nautae in muro sedent.', 'The sailors are sitting on the wall.', 'A B I J', ['The sailor is sitting on the wall.', 'The sailors are running into the wall.', 'The sailors are sitting near the wall.'], { u: 1 });
T(38, 'servus in villa habitat.', 'The slave lives in the villa.', 'A B I J', ['The slaves live in the villa.', 'The slave runs into the villa.', 'The slave lives in the villas.'], { u: 1 });
T(38, 'servi in villis habitant.', 'The slaves live in the villas.', 'A B I J', ['The slaves live in the villa.', 'The slave lives in the villas.', 'The slaves walk into the villas.'], { u: 1, g: [[2, ['villis', 'villas', 'villa', 'villam'], '', 'prep']] });
T(38, 'vir per vias festinat.', 'The man hurries through the streets.', 'A B I J', ['The man hurries across the street.', 'The men hurry through the streets.', 'The man hurries into the streets.'], { u: 1 });
T(38, 'equus ad murum ambulat.', 'The horse walks towards the wall.', 'A I J', ['The horse walks away from the wall.', 'The horses walk towards the wall.', 'The horse walks on the wall.'], { u: 1, g: [[2, ['murum', 'muro', 'murus', 'muros'], '', 'prep']] });
T(38, 'Romani contra Graecos pugnant.', 'The Romans fight against the Greeks.', 'A I J', ['The Greeks fight against the Romans.', 'The Romans fight with the Greeks.', 'The Roman fights against the Greeks.'], { u: 1 });
T(38, 'turba puellarum in viam currit.', 'A crowd of girls runs into the road.', 'B F H J', ['A crowd of girls runs in the road.', 'The girls run into the crowd.', 'A crowd of girls runs away from the road.'], { u: 1, g: [[3, ['viam', 'via', 'viae', 'vias'], '', 'prep']] });
T(38, 'puer amicum in via videt.', 'The boy sees a friend in the road.', 'A B I J', ['The friend sees the boy in the road.', 'The boy sees a friend on the island.', 'The boy sees friends in the road.'], { u: 1 });
T(38, 'puellae in equis sedent.', 'The girls are sitting on horses.', 'A B I J', ['The girl is sitting on a horse.', 'The girls are sitting near the horses.', 'The horses are sitting on the girls.'], { u: 1 });
T(38, 'Marcus et Flavia per viam ambulant.', 'Marcus and Flavia are walking along the road.', 'A B J', ['Marcus and Flavia are walking across the road.', 'Marcus is walking with Flavia into the road.', 'Marcus and Flavia are running along the road.'], {});
T(38, 'servus aquam in villam portat.', 'The slave carries water into the villa.', 'A B I J', ['The slave carries water in the villa.', 'The slaves carry water into the villa.', 'The slave carries wine into the villa.'], { u: 1, g: [[3, ['villam', 'villa', 'villis'], '', 'prep']] });
T(38, 'ancilla cenam in villa parat.', 'The maidservant prepares dinner in the villa.', 'A B J', ['The maidservant prepares dinner for the villa.', 'The maidservants prepare dinner in the villa.', 'The maidservant carries dinner into the villa.'], { u: 1 });
T(38, 'equum ex aqua ducit.', 'He leads the horse out of the water.', 'B F I J', ['He leads the horse into the water.', 'The horse leads him out of the water.', 'He leads the horses out of the water.'], { g: [[1, ['ex', 'in', 'ad', 'trans'], '', 'prep']] });
T(38, 'agricolae contra nautas pugnant.', 'The farmers fight against the sailors.', 'A B J', ['The sailors fight against the farmers.', 'The farmers fight with the sailors.', 'The farmer fights against the sailors.'], { u: 1 });
T(38, 'nautae ab insula currunt.', 'The sailors run away from the island.', 'B F J', ['The sailors run to the island.', 'The sailors run across the island.', 'The sailor runs away from the island.'], { u: 1, g: [[1, ['ab', 'ad', 'in', 'trans'], '', 'prep']] });
T(38, 'pueri prope magistrum laborant.', 'The boys work near the teacher.', 'A I J', ['The boys work with the teacher.', 'The boy works near the teacher.', 'The teacher works near the boys.'], { u: 1 });
T(38, 'agricola nuntium ad amicum mittit.', 'The farmer sends a messenger to the friend.', 'B F I J', ['The friend sends a messenger to the farmer.', 'The farmer sends a messenger away from the friend.', 'The farmer sends the friend to the messenger.'], { u: 1 });
T(40, 'puer et vir in agro currunt.', 'The boy and the man are running in the field.', 'F I J', ['The boy and the man are running into the field.', 'The boy and the man are running near the field.', 'The boys and the men are running in the fields.'], { g: [[4, ['agro', 'agrum', 'ager', 'agri'], '', 'prep']] });
T(40, 'puer et vir in agrum currunt.', 'The boy and the man are running into the field.', 'F I J', ['The boy and the man are running in the field.', 'The boy and the man are running away from the field.', 'The boy is running into the field with the man.'], { g: [[4, ['agrum', 'agro', 'ager', 'agri'], '', 'prep']] });
T(40, 'equos in agris videmus.', 'We see horses in the fields.', 'A I J', ['We see horses in the field.', 'Horses see us in the fields.', 'We see a horse in the fields.'], {});
T(40, 'libri pueri in villa sunt.', 'The books of the boy are in the villa.', 'B D H I J', ['The boy\'s book is in the villa.', 'The books of the boys are in the villa.', 'The books of the boy are in the field.'], { p: [[1, 'case', 'gen sg', 'servus']] });
T(40, 'turba puerorum ad agrum festinat.', 'A crowd of boys is hurrying to the field.', 'A H I J', ['A crowd of boys is hurrying away from the field.', 'The boys are hurrying to the crowd in the field.', 'A crowd of girls is hurrying to the field.'], { u: 1, p: [[1, 'case', 'gen pl', 'servus']] });

// ── K: ego, tu, nos, vos (Ch 41) ──
T(41, 'ego te amo.', 'I love you.', 'A K', ['You love me.', 'We love you.', 'I love him.'], { g: [[1, ['te', 'tu', 'me', 'ego'], '', 'ego']] });
T(41, 'tune me amas?', 'Do you love me?', 'A G K', ['Do I love you?', 'You love me.', 'Do you love us?'], {});
T(41, 'me amat.', 'He loves me.', 'A K', ['I love him.', 'He loves you.', 'They love me.'], {});
T(41, 'vos amamus.', 'We love you (pl).', 'A K', ['You (pl) love us.', 'We love them.', 'They love you (pl).'], {});
T(41, 'nos amant.', 'They love us.', 'A K', ['We love them.', 'They love you (pl).', 'We love you (pl).'], {});
T(41, 'nos currimus, vos ambulatis.', 'We are running, you (pl) are walking.', 'A F K', ['You (pl) are running, we are walking.', 'We are walking, you (pl) are running.', 'They are running, you (pl) are walking.'], {});
T(41, 'ego rideo, tu fles.', 'I am laughing, you are crying.', 'A K', ['You are laughing, I am crying.', 'I am crying, you are laughing.', 'We are laughing, you are crying.'], { g: [[1, ['rideo', 'ridet', 'ridemus']]] });
T(41, 'vos disceditis, nos manemus.', 'You (pl) are departing, we are staying.', 'A F K', ['We are departing, you (pl) are staying.', 'You (pl) are staying, we are departing.', 'They are departing, we are staying.'], {});
T(41, 'puellae nos spectant.', 'The girls are watching us.', 'A B K', ['We are watching the girls.', 'The girls are watching you (pl).', 'The girl is watching us.'], { u: 1 });
T(41, 'ego te amo, sed tu me non amas.', 'I love you, but you do not love me.', 'A K', ['You love me, but I do not love you.', 'I do not love you, but you love me.', 'I love you, and you love me.'], {});
T(41, 'nos Romani sumus, vos Graeci estis.', 'We are Romans, you (pl) are Greeks.', 'D E K', ['You (pl) are Romans, we are Greeks.', 'We are Greeks, you (pl) are Romans.', 'They are Romans, we are Greeks.'], {});
T(51, 'puella te non amat.', 'The girl does not love you.', 'A B K', ['You do not love the girl.', 'The girl loves you.', 'The girl does not love me.'], { u: 1 });

// ── L: Neuter nouns, bellum (Ch 42) ──
T(42, 'pueri bella amant.', 'The boys love wars.', 'A I L', ['The boys love war.', 'The boy loves wars.', 'Wars love the boys.'], { u: 1, p: [[1, 'case', 'acc pl', 'bellum']] });
T(42, 'templa specto.', 'I am looking at the temples.', 'A L', ['I am looking at the temple.', 'He is looking at the temples.', 'The temples are looking at me.'], { p: [[0, 'case', 'acc pl', 'bellum']] });
T(42, 'servus scutum portat.', 'The slave is carrying a shield.', 'A I L', ['The slave is carrying shields.', 'The slaves are carrying a shield.', 'The slave is carrying a sword.'], { u: 1, g: [[1, ['scutum', 'scuta', 'scuto'], '', 'bellum']] });
T(42, 'servi scuta portant.', 'The slaves are carrying shields.', 'A I L', ['The slaves are carrying a shield.', 'The slave is carrying shields.', 'The shields are carrying the slaves.'], { u: 1, g: [[1, ['scuta', 'scutum', 'scuto'], '', 'bellum']], p: [[1, 'case', 'acc pl', 'bellum']] });
T(42, 'agricola caelum spectat.', 'The farmer is looking at the sky.', 'A B L', ['The farmers are looking at the sky.', 'The farmer is looking at the temple.', 'The farmer is looking at the field.'], { u: 1 });
T(42, 'nautae pericula non timent.', 'The sailors do not fear dangers.', 'A B L', ['The sailors fear dangers.', 'Dangers do not frighten the sailors.', 'The sailor does not fear danger.'], { u: 1, p: [[1, 'case', 'acc pl', 'bellum']] });
T(42, 'nauta vinum amat.', 'The sailor loves wine.', 'A B L', ['The sailors love wine.', 'The sailor loves water.', 'The sailor carries wine.'], { u: 1 });
T(42, 'auxilium non venit.', 'Help is not coming.', 'F L', ['Help is coming.', 'He is not coming to help.', 'The allies are not coming.'], { p: [[0, 'case', 'nom sg', 'bellum']] });
T(42, 'puella bellum timet.', 'The girl fears war.', 'A B L', ['War frightens the girl.', 'The girls fear war.', 'The girl fears wars.'], { u: 1 });
T(42, 'dominus auxilium servis dat.', 'The master gives help to the slaves.', 'A H I L', ['The slaves give help to the master.', 'The master gives help to the slave.', 'The master asks the slaves for help.'], { u: 1, p: [[2, 'case', 'dat pl', 'servus']] });
T(42, 'templum in oppido est.', 'The temple is in the town.', 'D J L', ['The temple is near the town.', 'The temples are in the town.', 'The town is in the temple.'], { u: 1, g: [[2, ['oppido', 'oppidum', 'oppida', 'oppidis'], '', 'prep']] });
T(42, 'pueri verba magistri non audiunt.', 'The boys do not listen to the words of the teacher.', 'F H I L', ['The teacher does not listen to the words of the boys.', 'The boys listen to the words of the teacher.', 'The boy does not listen to the words of the teacher.'], { p: [[2, 'case', 'gen sg', 'ager']] });
T(42, 'nautae in proeliis saepe pugnant.', 'Sailors often fight in battles.', 'A B J L', ['Sailors always fight in battles.', 'Sailors often fight in a battle.', 'Sailors never fight in battles.'], {});
T(42, 'Romani oppidum capiunt.', 'The Romans capture the town.', 'F I L', ['The town captures the Romans.', 'The Romans capture the towns.', 'The Roman captures the town.'], { u: 1 });
T(42, 'oppidum auxilio Graecorum capiunt.', 'They capture the town with the help of the Greeks.', 'F H I L', ['The Greeks capture the town with their help.', 'They capture the Greeks with the help of the town.', 'They capture the towns with the help of the Greeks.'], {});
T(42, 'magister puellas verbis terret.', 'The teacher frightens the girls with words.', 'A B H I L', ['The girls frighten the teacher with words.', 'The teacher frightens the girl with a word.', 'The teacher praises the girls with words.'], { u: 1, p: [[2, 'case', 'abl pl', 'bellum']] });
T(51, 'vinum bibimus.', 'We are drinking wine.', 'F L', ['We are drinking water.', 'They are drinking wine.', 'We love wine.'], { p: [[1, 'pn', '1p']] });
T(51, 'periculum timeo.', 'I fear danger.', 'A L', ['Danger frightens me.', 'He fears danger.', 'I fear dangers.'], {});
T(51, 'librum legunt.', 'They are reading a book.', 'F I', ['They are writing a book.', 'He is reading a book.', 'They are reading books.'], { p: [[1, 'pn', '3p']] });
T(51, 'discipuli laeti sunt.', 'The pupils are happy.', 'D E I', ['The pupil is happy.', 'The pupils are tired.', 'The pupils are not happy.'], {});
T(51, 'servi in agris laborant.', 'The slaves work in the fields.', 'A I J', ['The slaves work in the field.', 'The slave works in the fields.', 'The slaves run into the fields.'], { u: 1 });
T(51, 'puer multos amicos habet.', 'The boy has many friends.', 'A E I', ['The boy has a good friend.', 'Many boys have friends.', 'The boy has few friends.'], { u: 1 });
T(51, 'bella me non terrent.', 'Wars do not frighten me.', 'A K L', ['I do not fear wars.', 'Wars frighten me.', 'War does not frighten me.'], {});

// ── M: Imperatives (Ch 48) ──
T(48, 'ride, puer!', 'Laugh, boy!', 'A H I M', ['The boy laughs.', 'Laugh, boys!', 'Cry, boy!'], { g: [[0, ['ride', 'ridet', 'rideo'], '', 'imp']] });
T(48, 'currite, servi!', 'Run, slaves!', 'F H I M', ['Run, slave!', 'The slaves are running.', 'Come, slaves!'], { g: [[0, ['currite', 'curre', 'currunt', 'curritis'], '', 'imp']] });
T(48, 'magistrum audite, pueri!', 'Listen to the teacher, boys!', 'F H I M', ['Listen to the teacher, boy!', 'The boys listen to the teacher.', 'Listen to the boys, teacher!'], {});
T(48, 'veni, amice!', 'Come, friend!', 'F H I M', ['Come, friends!', 'The friend comes.', 'Run, friend!'], {});
T(48, 'oppidum capite, servi!', 'Capture the town, slaves!', 'F H I L M', ['Capture the town, slave!', 'The slaves capture the town.', 'Look at the town, slaves!'], {});
T(48, 'templum spectate, servi!', 'Look at the temple, slaves!', 'A H I L M', ['Look at the temple, slave!', 'The slaves look at the temple.', 'Look at the temples, slaves!'], {});
T(48, 'cibum para, serve!', 'Prepare the food, slave!', 'A H I M', ['Prepare the food, slaves!', 'The slave prepares the food.', 'Carry the food, slave!'], { g: [[1, ['para', 'parat', 'paras'], '', 'imp']] });
T(48, 'pueri, laborate!', 'Boys, work!', 'A H I M', ['Boy, work!', 'The boys are working.', 'Boys, play!'], { g: [[1, ['laborate', 'labora', 'laborant', 'laboratis'], '', 'imp']] });
T(48, 'hic mane, Marce!', 'Stay here, Marcus!', 'A H I M', ['Marcus stays here.', 'Stay there, Marcus!', 'Come here, Marcus!'], {});
T(48, 'servum puni, domine!', 'Punish the slave, master!', 'F H I M', ['Punish the master, slave!', 'The master punishes the slave.', 'Punish the slaves, master!'], {});
T(48, 'pugnate, nautae!', 'Fight, sailors!', 'A B H M', ['Fight, sailor!', 'The sailors are fighting.', 'Shout, sailors!'], { g: [[0, ['pugnate', 'pugna', 'pugnant', 'pugnatis'], '', 'imp']] });
T(48, 'Graecos necate, Romani!', 'Kill the Greeks, Romans!', 'A H I M', ['Kill the Romans, Greeks!', 'The Romans kill the Greeks.', 'Kill the Greek, Romans!'], {});
T(48, 'cenam para, femina!', 'Prepare dinner, woman!', 'A B H M', ['Prepare dinner, women!', 'The woman prepares dinner.', 'Eat dinner, woman!'], {});
T(48, 'librum lege, poeta!', 'Read the book, poet!', 'B F H I M', ['Read the book, poets!', 'The poet reads the book.', 'Write the book, poet!'], {});
T(48, 'cantate, puellae!', 'Sing, girls!', 'A B H M', ['Sing, girl!', 'The girls are singing.', 'Shout, girls!'], { g: [[0, ['cantate', 'cantant', 'cantatis'], '', 'imp']] });
T(48, 'dormite, puellae!', 'Sleep, girls!', 'B F H M', ['Sleep, girl!', 'The girls are sleeping.', 'Come, girls!'], {});
T(48, 'vinum bibe, regina!', 'Drink the wine, queen!', 'B F H L M', ['Drink the wine, queens!', 'The queen drinks the wine.', 'Drink the water, queen!'], {});
T(48, 'terram rege, regina!', 'Rule the land, queen!', 'B F H M', ['Rule the land, queens!', 'The queen rules the land.', 'Look at the land, queen!'], {});
T(48, 'contra Romanos pugnate!', 'Fight against the Romans!', 'A I J M', ['They fight against the Romans.', 'Fight with the Romans!', 'Fight against the Greeks!'], {});
T(48, 'scuta movete, servi!', 'Move the shields, slaves!', 'A H I L M', ['Move the shield, slave!', 'The slaves move the shields.', 'Hold the shields, slaves!'], {});

// ── N: Numbers (Ch 49) ──
T(45, 'quattuor nautae quoque in taberna adsunt.', 'Four sailors are also present in the pub.', 'B D J N', ['Four sailors are also away from the pub.', 'Three sailors are also present in the pub.', 'The fourth sailor is also present in the pub.'], {});
T(47, 'nauta primus clamat.', 'The first sailor shouts.', 'A B N', ['The second sailor shouts.', 'One sailor shouts.', 'The first sailors shout.'], {});
T(47, 'nauta secundus rogat.', 'The second sailor asks.', 'A B N', ['The first sailor asks.', 'Two sailors ask.', 'The second sailor replies.'], {});
T(47, 'quattuor nautae rident.', 'The four sailors laugh.', 'A B N', ['The fourth sailor laughs.', 'The three sailors laugh.', 'The four sailors cry.'], {});
T(47, 'nauta tertius clamat.', 'The third sailor shouts.', 'A B N', ['Three sailors shout.', 'The fourth sailor shouts.', 'The third sailor laughs.'], {});
T(47, '‘ubi est pecunia?’ clamat nauta quartus.', '‘Where is the money?’ shouts the fourth sailor.', 'B C D N', ['‘Where is the money?’ shout the four sailors.', '‘Why is the money here?’ shouts the fourth sailor.', '‘Where is the money?’ shouts the third sailor.'], {});

// ── O: Infinitives (Ch 53) ──
T(53, 'ludere cupimus.', 'We want to play.', 'F O', ['We are playing.', 'They want to play.', 'We want to read.'], { g: [[0, ['ludere', 'ludimus', 'ludunt', 'ludo'], '', 'inf']] });
T(53, 'laborare non cupimus.', 'We do not want to work.', 'A F O', ['We want to work.', 'We are not working.', 'They do not want to work.'], { g: [[0, ['laborare', 'laboramus', 'laborant', 'laboro'], '', 'inf']] });
T(53, 'festinare cupio.', 'I want to hurry.', 'A F O', ['I am hurrying.', 'He wants to hurry.', 'I want to walk.'], { g: [[0, ['festinare', 'festino', 'festinat', 'festinant'], '', 'inf']] });
T(53, 'puellae cantare parant.', 'The girls are preparing to sing.', 'A B O', ['The girls are singing.', 'The girl is preparing to sing.', 'The girls want to sing.'], { u: 1 });
T(53, 'Marcus pugnare cupit.', 'Marcus wants to fight.', 'A F O', ['Marcus is fighting.', 'Marcus decides to fight.', 'Marcus does not want to fight.'], { u: 1, g: [[1, ['pugnare', 'pugnat', 'pugnant', 'pugno'], '', 'inf']] });
T(53, 'nautae bibere cupiunt.', 'The sailors want to drink.', 'B F O', ['The sailor wants to drink.', 'The sailors are drinking.', 'The sailors want to eat.'], { u: 1 });
T(53, 'puer scribere non cupit.', 'The boy does not want to write.', 'F I O', ['The boy wants to write.', 'The boy is not writing.', 'The boy does not want to read.'], { u: 1 });
T(53, 'discipuli dormire cupiunt.', 'The pupils want to sleep.', 'F I O', ['The pupils are sleeping.', 'The pupil wants to sleep.', 'The pupils want to play.'], { u: 1, g: [[1, ['dormire', 'dormiunt', 'dormit', 'dormio'], '', 'inf']] });
T(53, 'poeta librum legere cupit.', 'The poet wants to read a book.', 'B F I O', ['The poet wants to write a book.', 'The poet is reading a book.', 'The poets want to read a book.'], { u: 1 });
T(53, 'manere constituit.', 'He decides to stay.', 'A F O', ['He is staying.', 'They decide to stay.', 'He decides to depart.'], {});
T(53, 'discedere parant.', 'They prepare to depart.', 'A F O', ['They are departing.', 'He prepares to depart.', 'They prepare to stay.'], {});
T(53, 'servus currere constituit.', 'The slave decides to run.', 'F I O', ['The slave is running.', 'The slaves decide to run.', 'The slave decides to stay.'], { u: 1 });
T(53, 'magister discipulos punire constituit.', 'The teacher decides to punish the pupils.', 'F I O', ['The pupils decide to punish the teacher.', 'The teacher punishes the pupils.', 'The teacher decides to punish the pupil.'], { u: 1 });
T(53, 'regina terram regere constituit.', 'The queen decides to rule the land.', 'B F O', ['The queen rules the land.', 'The queen wants to rule the land.', 'The queen decides to rule the island.'], { u: 1, g: [[2, ['regere', 'regit', 'regunt', 'rego'], '', 'inf']] });
T(53, 'dominus servos laborare iubet.', 'The master orders the slaves to work.', 'A I O', ['The slaves order the master to work.', 'The master orders the slave to work.', 'The master wants the slaves to work.'], { u: 1, g: [[2, ['laborare', 'laborant', 'laborat', 'laboro'], '', 'inf']] });
T(53, 'magister discipulos scribere iubet.', 'The teacher orders the pupils to write.', 'A F I O', ['The pupils order the teacher to write.', 'The teacher orders the pupils to read.', 'The teacher orders the pupil to write.'], { u: 1 });
T(53, 'Marcus nautam discedere iubet.', 'Marcus orders the sailor to depart.', 'A B F O', ['The sailor orders Marcus to depart.', 'Marcus orders the sailors to depart.', 'Marcus orders the sailor to stay.'], { u: 1 });
T(53, 'ego te hic manere iubeo.', 'I order you to stay here.', 'A K O', ['You order me to stay here.', 'I order you to depart.', 'I want you to stay here.'], {});
T(53, 'regina viros hastas parare iubet.', 'The queen orders the men to prepare spears.', 'A B I O', ['The men order the queen to prepare spears.', 'The queen orders the man to prepare a spear.', 'The queen orders the men to carry spears.'], {});
T(53, 'dea ancillas templum spectare iubet.', 'The goddess orders the maidservants to look at the temple.', 'A B L O', ['The maidservants order the goddess to look at the temple.', 'The goddess orders the maidservant to look at the temple.', 'The goddess orders the maidservants to build the temple.'], {});

// ── P: Adjectives in -er (Ch 52, 54) ──
T(54, 'in templo sacro sedemus.', 'We are sitting in the sacred temple.', 'A J L P', ['We are sitting in the big temple.', 'They are sitting in the sacred temple.', 'We are running into the sacred temple.'], {});
T(54, 'Flavia misera est quod nautae mali sunt.', 'Flavia is miserable because the sailors are wicked.', 'B C D E P', ['Flavia is wicked because the sailors are miserable.', 'The sailors are miserable because Flavia is wicked.', 'Flavia is miserable because the sailor is wicked.'], {});
T(54, 'viri mali oppidum sacrum hastis et gladiis oppugnant.', 'Wicked men attack the sacred town with spears and swords.', 'A B E H I L P', ['Sacred men attack the wicked town with spears and swords.', 'A wicked man attacks the sacred town with spears and swords.', 'Wicked men attack the sacred town with arrows and swords.'], {});
T(23, 'dea est misera.', 'The goddess is miserable.', 'B D P', ['The goddesses are miserable.', 'The goddess is happy.', 'The queen is miserable.'], { g: [[2, ['misera', 'miser', 'miseri', 'miserae'], '', 'miser']] });
T(23, 'puella misera es.', 'You (sg) are a miserable girl.', 'B D P', ['She is a miserable girl.', 'You (pl) are miserable girls.', 'You (sg) are a happy girl.'], {});
T(23, 'agricolae miseri sumus.', 'We are miserable farmers.', 'B D P', ['They are miserable farmers.', 'We are happy farmers.', 'You (pl) are miserable farmers.'], { g: [[1, ['miseri', 'miser', 'misera', 'miserae'], '', 'miser']] });
T(23, 'regina misera est.', 'The queen is miserable.', 'B D P', ['The queens are miserable.', 'The queen is not miserable.', 'The goddess is miserable.'], {});
T(52, 'pecunia nostra tuta est.', 'Our money is safe.', 'B D E P', ['Your money is safe.', 'Our money is not safe.', 'Our money is good.'], {});
T(46, 'puer puellam scuto magno terret.', 'The boy frightens the girl with a big shield.', 'A B E H I L', ['The girl frightens the boy with a big shield.', 'The boy frightens the girl with a small shield.', 'The boy frightens the girls with big shields.'], { u: 1 });
T(54, 'servi murum aedificant.', 'The slaves are building a wall.', 'A I', ['The slave is building a wall.', 'The slaves are attacking a wall.', 'The slaves are building walls.'], { u: 1, g: [[2, ['aedificant', 'aedificat', 'aedificamus']]] });
T(54, 'Romani muros oppugnant.', 'The Romans attack the walls.', 'A I', ['The Romans build the walls.', 'The Romans attack the wall.', 'The walls attack the Romans.'], { u: 1 });
T(54, 'nautae ad insulam navigant.', 'The sailors sail to the island.', 'A B J', ['The sailors sail away from the island.', 'The sailor sails to the island.', 'The sailors sail around the island.'], { u: 1 });
T(54, 'agricolae multas hastas iaciunt.', 'The farmers throw many spears.', 'B E F', ['Many farmers throw spears.', 'The farmer throws many spears.', 'The farmers throw many arrows.'], { u: 1 });
T(54, 'regina ad terram navigat et oppidum novum aedificat.', 'The queen sails to the land and builds a new town.', 'A B E J L', ['The queen sails away from the land and builds a new town.', 'The queen sails to the land and attacks a new town.', 'The queen sails to the land and builds a big town.'], {});
T(54, 'Marcus nauta notus et clarus est.', 'Marcus is a well-known and famous sailor.', 'B D E', ['Marcus is a well-known and wicked sailor.', 'Marcus and the sailor are well known and famous.', 'Marcus is a new and famous sailor.'], {});

// ── Q: Imperfect tense (Ch 57) ──
T(57, 'laudabat.', 'He was praising.', 'Q', ['He praises.', 'They were praising.', 'I was praising.'], { g: [[0, ['laudabat', 'laudat', 'laudabatis']]], p: [[0, 'tense', 'impf'], [0, 'pn', '3s', 'impf']] });
T(57, 'ponebam.', 'I was putting.', 'Q', ['I put.', 'He was putting.', 'We were putting.'], { p: [[0, 'tense', 'impf'], [0, 'pn', '1s', 'impf']] });
T(57, 'ludebant.', 'They were playing.', 'Q', ['They play.', 'He was playing.', 'We were playing.'], { g: [[0, ['ludebant', 'ludebat', 'ludunt']]], p: [[0, 'pn', '3p', 'impf']] });
T(57, 'mittebat.', 'He was sending.', 'Q', ['He sends.', 'They were sending.', 'He was putting.'], { p: [[0, 'tense', 'impf']] });
T(57, 'capiebat.', 'He was taking.', 'Q', ['He takes.', 'They were taking.', 'He was making.'], { p: [[0, 'pn', '3s', 'impf']] });
T(57, 'erat.', 'He was.', 'D Q', ['He is.', 'They were.', 'I was.'], { g: [[0, ['erat', 'est', 'erant', 'eram'], '', 'impf']], p: [[0, 'tense', 'impf']] });
T(57, 'faciebam.', 'I was making.', 'Q', ['I make.', 'They were making.', 'I was taking.'], { p: [[0, 'pn', '1s', 'impf']] });
T(57, 'ambulabamus.', 'We were walking.', 'Q', ['We walk.', 'They were walking.', 'You (pl) were walking.'], { g: [[0, ['ambulabamus', 'ambulamus', 'ambulabat', 'ambulabas']]], p: [[0, 'pn', '1p', 'impf']] });
T(57, 'currebat.', 'He was running.', 'Q', ['He runs.', 'They were running.', 'He was coming.'], { p: [[0, 'tense', 'impf']] });
T(57, 'puniebant.', 'They were punishing.', 'Q', ['They punish.', 'He was punishing.', 'They were coming.'], { p: [[0, 'pn', '3p', 'impf']] });
T(57, 'veniebas.', 'You (sg) were coming.', 'Q', ['You (sg) come.', 'You (pl) were coming.', 'He was coming.'], { g: [[0, ['veniebas', 'veniebat', 'venis']]], p: [[0, 'pn', '2s', 'impf']] });
T(57, 'videbamus.', 'We were seeing.', 'Q', ['We see.', 'They were seeing.', 'We were having.'], { p: [[0, 'pn', '1p', 'impf']] });
T(57, 'bibebant.', 'They were drinking.', 'Q', ['They drink.', 'He was drinking.', 'They were eating.'], { p: [[0, 'tense', 'impf']] });
T(57, 'dormiebam.', 'I was sleeping.', 'Q', ['I sleep.', 'He was sleeping.', 'We were sleeping.'], { g: [[0, ['dormiebam', 'dormio', 'dormit']]], p: [[0, 'pn', '1s', 'impf']] });
T(57, 'ridebas.', 'You (sg) were laughing.', 'Q', ['You (sg) laugh.', 'He was laughing.', 'You (pl) were laughing.'], { p: [[0, 'pn', '2s', 'impf']] });
T(57, 'iam laborat; heri ludebat.', 'Now he is working; yesterday he was playing.', 'A Q', ['Now he is playing; yesterday he was working.', 'Now they are working; yesterday they were playing.', 'Now he is working; today he is playing.'], { p: [[3, 'tense', 'impf'], [1, 'tense', 'pres']] });
T(57, 'heri librum legebam; hodie nihil facio.', 'Yesterday I was reading a book; today I am doing nothing.', 'F I Q', ['Today I am reading a book; yesterday I was doing nothing.', 'Yesterday I was writing a book; today I am doing nothing.', 'Yesterday he was reading a book; today he is doing nothing.'], { p: [[2, 'tense', 'impf']] });
T(57, 'magister multa verba dicebat.', 'The teacher was saying many words.', 'E I L Q', ['The teacher says many words.', 'The teachers were saying many words.', 'The teacher was writing many words.'], { u: 1 });
T(57, 'nautae in villa saepe manebant.', 'The sailors often used to stay in the villa.', 'B J Q', ['The sailors always used to stay in the villa.', 'The sailors often stay in the villa.', 'The sailor often used to stay in the villa.'], {});
T(57, 'cur currebas, puer?', 'Why were you running, boy?', 'C H I Q', ['Why are you running, boy?', 'Where were you running, boy?', 'Why was the boy running?'], {});
T(57, 'currebam quod timebam.', 'I was running because I was afraid.', 'C Q', ['I was afraid because I was running.', 'He was running because he was afraid.', 'I run because I am afraid.'], {});
T(57, 'femina aquam pueris saepe dabat.', 'The woman often used to give water to the boys.', 'B H I Q', ['The boys often used to give water to the woman.', 'The woman often used to give water to the boy.', 'The woman often gives water to the boys.'], {});
T(57, 'multi servi ex oppido currebant.', 'Many slaves were running out of the town.', 'E I J L Q', ['Many slaves were running into the town.', 'Many slaves run out of the town.', 'The slave was running out of the big town.'], {});
T(57, 'Romani contra Graecos saepe pugnabant.', 'The Romans often used to fight against the Greeks.', 'I J Q', ['The Greeks often used to fight against the Romans.', 'The Romans often fight against the Greeks.', 'The Romans often used to fight with the Greeks.'], {});
T(57, 'Graeci Romanos non timebant.', 'The Greeks were not afraid of the Romans.', 'I Q', ['The Romans were not afraid of the Greeks.', 'The Greeks are not afraid of the Romans.', 'The Greeks were not frightening the Romans.'], { u: 1, g: [[3, ['timebant', 'timent', 'timebam']]] });
T(57, 'Romani oppidum oppugnabant.', 'The Romans were attacking the town.', 'I L Q', ['The Romans attack the town.', 'The town was attacking the Romans.', 'The Romans were building the town.'], { u: 1, p: [[2, 'tense', 'impf']] });
T(57, 'puer ad villam ambulabat.', 'The boy was walking to the villa.', 'B I J Q', ['The boy walks to the villa.', 'The boys were walking to the villa.', 'The boy was walking away from the villa.'], { u: 1 });
T(57, 'magister saevus erat.', 'The teacher was savage.', 'D E I Q', ['The teacher is savage.', 'The teachers were savage.', 'The teacher was angry.'], {});
T(57, 'puellas amabam.', 'I used to love the girls.', 'B Q', ['The girls used to love me.', 'I love the girls.', 'I used to love the girl.'], { p: [[1, 'pn', '1s', 'impf']] });
T(57, 'servi in agris pugnabant.', 'The slaves were fighting in the fields.', 'I J Q', ['The slaves are fighting in the fields.', 'The slave was fighting in the fields.', 'The slaves were working in the fields.'], { u: 1 });
T(57, 'pueri magistrum non audiebant.', 'The boys were not listening to the teacher.', 'I Q', ['The teacher was not listening to the boys.', 'The boys are not listening to the teacher.', 'The boy was not listening to the teacher.'], { u: 1 });
T(57, 'per viam ambulabamus.', 'We were walking along the road.', 'B J Q', ['We walk along the road.', 'They were walking along the road.', 'We were walking across the road.'], {});
T(57, 'timebam quod magister iratus erat.', 'I was afraid because the teacher was angry.', 'C D E I Q', ['The teacher was angry because I was afraid.', 'I am afraid because the teacher is angry.', 'He was afraid because the teacher was angry.'], {});
T(57, 'magna turba puerorum veniebat.', 'A big crowd of boys was coming.', 'B E H I Q', ['A big crowd of boys is coming.', 'A small crowd of boys was coming.', 'A big crowd of girls was coming.'], {});
T(57, 'nautae vinum saepe bibebant.', 'The sailors often used to drink wine.', 'B L Q', ['The sailors often drink wine.', 'The sailor often used to drink wine.', 'The sailors always used to drink wine.'], { u: 1 });
T(57, 'celeriter currebam.', 'I was running quickly.', 'Q', ['I was running slowly.', 'I run quickly.', 'He was running quickly.'], {});
T(57, 'puellae ludebant sed pueri non ludebant.', 'The girls were playing but the boys were not playing.', 'B I Q', ['The boys were playing but the girls were not playing.', 'The girls are playing but the boys are not playing.', 'The girls were playing and the boys were playing.'], {});

// ── R: Perfect tense (Ch 60–73) ──
T(60, 'oppidum oppugnavimus.', 'We attacked the town.', 'L R', ['We were attacking the town.', 'They attacked the town.', 'We attack the town.'], { p: [[1, 'tense', 'perf'], [1, 'pn', '1p', 'perf']] });
T(60, 'templum intravit.', 'He entered the temple.', 'L R', ['He enters the temple.', 'They entered the temple.', 'He was entering the temple.'], { p: [[1, 'pn', '3s', 'perf']] });
T(60, 'pecuniam portaverunt.', 'They carried the money.', 'B R', ['They carry the money.', 'He carried the money.', 'They were carrying the money.'], { p: [[1, 'pn', '3p', 'perf']] });
T(60, 'servos laudavi.', 'I praised the slaves.', 'I R', ['The slaves praised me.', 'I praised the slave.', 'He praised the slaves.'], { p: [[1, 'pn', '1s', 'perf']] });
T(60, 'murum aedificavisti.', 'You (sg) built a wall.', 'I R', ['You (pl) built a wall.', 'You (sg) build a wall.', 'He built a wall.'], { p: [[1, 'pn', '2s', 'perf']] });
T(60, 'nuntium necavit.', 'He killed the messenger.', 'I R', ['The messenger killed him.', 'They killed the messenger.', 'He kills the messenger.'], {});
T(60, 'equum necavimus.', 'We killed the horse.', 'I R', ['The horse killed us.', 'We kill the horse.', 'They killed the horse.'], { p: [[1, 'pn', '1p', 'perf']] });
T(60, 'dominus servum laudavit.', 'The master praised the slave.', 'I R', ['The slave praised the master.', 'The master praised the slaves.', 'The master praises the slave.'], { u: 1, g: [[2, ['laudavit', 'laudat', 'laudabat', 'laudaverunt'], 'Q']] });
T(60, 'dominus servos laudavit.', 'The master praised the slaves.', 'I R', ['The slaves praised the master.', 'The master praised the slave.', 'The masters praised the slaves.'], { u: 1 });
T(60, 'Romani oppidum oppugnaverunt.', 'The Romans attacked the town.', 'I L R', ['The Romans attack the town.', 'The town attacked the Romans.', 'The Romans built the town.'], { u: 1, p: [[2, 'tense', 'perf']] });
T(60, 'Romani multa oppida aedificaverunt.', 'The Romans built many towns.', 'E I L R', ['The Romans attacked many towns.', 'The Romans build many towns.', 'Many Romans built towns.'], { u: 1 });
T(60, 'servus cenam paravit.', 'The slave prepared dinner.', 'B I R', ['The slave prepares dinner.', 'The slaves prepared dinner.', 'The slave was preparing dinner.'], { u: 1, g: [[2, ['paravit', 'parat', 'paraverunt', 'paravi']]] });
T(60, 'Romani Graecos superaverunt.', 'The Romans overcame the Greeks.', 'I R', ['The Greeks overcame the Romans.', 'The Romans overcome the Greeks.', 'The Romans attacked the Greeks.'], { u: 1 });
T(60, 'nuntius proelium spectavit.', 'The messenger watched the battle.', 'I L R', ['The messenger watches the battle.', 'The messengers watched the battle.', 'The messenger was watching the battles.'], { u: 1 });
T(60, 'puer auxilium rogavit.', 'The boy asked for help.', 'I L R', ['The boy gave help.', 'The boys asked for help.', 'The boy asks for help.'], { u: 1 });
T(60, 'femina cenam bonam paravit.', 'The woman prepared a good dinner.', 'B E R', ['The good woman prepared dinner.', 'The woman prepares a good dinner.', 'The woman prepared a bad dinner.'], { u: 1 });
T(60, 'incolae Romanos superaverunt.', 'The inhabitants overcame the Romans.', 'B I R', ['The Romans overcame the inhabitants.', 'The inhabitants overcome the Romans.', 'The inhabitant overcame the Romans.'], { u: 1 });
T(60, 'sagitta virum necavit.', 'The arrow killed the man.', 'B I R', ['The man killed the arrow.', 'The arrow killed the men.', 'The spear killed the man.'], { u: 1, g: [[1, ['virum', 'vir', 'viri', 'viros'], '', 'servus']] });
T(68, 'discipuli dormiverunt.', 'The pupils slept.', 'I R', ['The pupil slept.', 'The pupils are sleeping.', 'The pupils were sleeping.'], { p: [[1, 'pn', '3p', 'perf']] });
T(68, 'verba audivimus.', 'We heard the words.', 'L R', ['We hear the words.', 'They heard the words.', 'We heard the word.'], { p: [[1, 'pn', '1p', 'perf']] });
T(68, 'servum punivisti.', 'You (sg) punished the slave.', 'I R', ['The slave punished you (sg).', 'You (pl) punished the slave.', 'You (sg) punished the slaves.'], { p: [[1, 'pn', '2s', 'perf']] });
T(68, 'terram rexi.', 'I ruled the land.', 'B R', ['I rule the land.', 'He ruled the land.', 'I led the land.'], { p: [[1, 'pn', '1s', 'perf']] });
T(68, 'magistri boni fuerunt.', 'The teachers were good.', 'D E I R', ['The teacher was good.', 'The teachers are good.', 'The boys were good.'], {});
T(68, 'servus equum duxit.', 'The slave led the horse.', 'I R', ['The horse led the slave.', 'The slave leads the horse.', 'The slaves led the horse.'], { u: 1, g: [[2, ['duxit', 'duxerunt', 'duxi', 'duximus']]] });
T(68, 'multa verba dixit.', 'He said many words.', 'E L R', ['He says many words.', 'They said many words.', 'He wrote many words.'], {});
T(68, 'magister discipulos terruit.', 'The teacher frightened the pupils.', 'I R', ['The pupils frightened the teacher.', 'The teacher frightens the pupils.', 'The teacher feared the pupils.'], { u: 1 });
T(68, 'puer gladium tenuit.', 'The boy held the sword.', 'I R', ['The boy holds the sword.', 'The boys held the sword.', 'The boy held the swords.'], { u: 1 });
T(68, 'nautae oppidum oppugnaverunt.', 'The sailors attacked the town.', 'B L R', ['The sailors attack the town.', 'The sailor attacked the town.', 'The town attacked the sailors.'], { u: 1 });
T(68, 'dominus servos punivit.', 'The master punished the slaves.', 'I R', ['The slaves punished the master.', 'The master punishes the slaves.', 'The master punished the slave.'], { u: 1 });
T(68, 'discipuli nuntium audiverunt.', 'The pupils heard the messenger.', 'I R', ['The messenger heard the pupils.', 'The pupils hear the messenger.', 'The pupil heard the messenger.'], { u: 1 });
T(72, 'vir stetit.', 'The man stood.', 'I R', ['The man stands.', 'The men stood.', 'The man ran.'], {});
T(72, 'equus cucurrit.', 'The horse ran.', 'I R', ['The horse runs.', 'The horses ran.', 'The horse came.'], {});
T(72, 'puellae manserunt.', 'The girls stayed.', 'B R', ['The girl stayed.', 'The girls stay.', 'The girls laughed.'], { p: [[1, 'pn', '3p', 'perf']] });
T(72, 'auxilium venit.', 'Help came.', 'L R', ['Help is not coming.', 'The allies came.', 'Help was coming.'], {});
T(72, 'Romani fugerunt.', 'The Romans fled.', 'I R', ['The Romans flee.', 'The Roman fled.', 'The Romans fought.'], {});
T(72, 'regina risit.', 'The queen laughed.', 'B R', ['The queen laughs.', 'The queens laughed.', 'The queen cried.'], {});
T(72, 'hastam ieci.', 'I threw the spear.', 'B R', ['He threw the spear.', 'I throw the spear.', 'I took the spear.'], { p: [[1, 'pn', '1s', 'perf']] });
T(72, 'cibum consumpsistis.', 'You (pl) ate the food.', 'I R', ['You (sg) ate the food.', 'You (pl) eat the food.', 'We ate the food.'], { p: [[1, 'pn', '2p', 'perf']] });
T(72, 'templa deleverunt.', 'They destroyed the temples.', 'L R', ['They destroyed the temple.', 'They destroy the temples.', 'They built the temples.'], { p: [[1, 'pn', '3p', 'perf']] });
T(72, 'scutum cepit.', 'He took the shield.', 'L R', ['He takes the shield.', 'They took the shield.', 'He made the shield.'], {});
T(72, 'reginam vidit.', 'He saw the queen.', 'B R', ['The queen saw him.', 'He sees the queen.', 'They saw the queen.'], {});
T(72, 'murum moverunt.', 'They moved the wall.', 'I R', ['They move the wall.', 'He moved the wall.', 'They built the wall.'], {});
T(72, 'nauta ab insula navigavit.', 'The sailor sailed away from the island.', 'B J R', ['The sailor sailed to the island.', 'The sailors sailed away from the island.', 'The sailor sails away from the island.'], { u: 1 });
T(72, 'magister librum bonum scripsit.', 'The teacher wrote a good book.', 'E I R', ['The good teacher wrote a book.', 'The teacher read a good book.', 'The teacher writes a good book.'], { u: 1 });
T(72, 'servi ex oppido fugerunt.', 'The slaves fled out of the town.', 'I J L R', ['The slaves fled into the town.', 'The slave fled out of the town.', 'The slaves flee out of the town.'], { u: 1 });
T(72, 'puer parvus in viam cucurrit.', 'The small boy ran into the road.', 'B E I J R', ['The small boy ran in the road.', 'The big boy ran into the road.', 'The small boys ran into the road.'], { u: 1 });
T(72, 'puer in muro stetit.', 'The boy stood on the wall.', 'I J R', ['The boy stands on the wall.', 'The boy ran into the wall.', 'The boys stood on the wall.'], { u: 1 });
T(72, 'quid fecistis, pueri?', 'What did you do, boys?', 'C H I R', ['What did you do, boy?', 'What are you doing, boys?', 'Why did you do it, boys?'], {});
T(72, 'vir hastam iecit.', 'The man threw the spear.', 'B I R', ['The man threw the spears.', 'The man throws the spear.', 'The man took the spear.'], { u: 1 });
T(72, 'ad oppidum celeriter venimus.', 'We came quickly to the town.', 'J L R', ['We came slowly to the town.', 'We came quickly from the town.', 'They came quickly to the town.'], {});
T(72, 'librum non legistis, discipuli.', 'You did not read the book, pupils.', 'H I R', ['You read the book, pupils.', 'You did not write the book, pupils.', 'The pupils did not read the book.'], {});
T(72, 'ancillae aquam et vinum biberunt.', 'The maidservants drank water and wine.', 'B L R', ['The maidservant drank water and wine.', 'The maidservants drink water and wine.', 'The maidservants carried water and wine.'], {});
T(72, 'multi servi in villa laboraverunt.', 'Many slaves worked in the villa.', 'B E I J R', ['Many slaves worked in the field.', 'Many slaves work in the villa.', 'The slave worked in the big villa.'], {});
T(72, 'dominus multam pecuniam servo dedit.', 'The master gave much money to the slave.', 'B E H I R', ['The slave gave much money to the master.', 'The master gave much money to the slaves.', 'The master gave money to many slaves.'], {});
T(72, 'magister discipulos laborare iussit.', 'The teacher ordered the pupils to work.', 'I O R', ['The pupils ordered the teacher to work.', 'The teacher orders the pupils to work.', 'The teacher ordered the pupils to play.'], { u: 1 });
T(72, 'Romani murum oppugnare constituerunt.', 'The Romans decided to attack the wall.', 'I O R', ['The Romans decided to build the wall.', 'The Romans decide to attack the wall.', 'The Romans attacked the wall.'], { u: 1 });
T(72, 'vir gladium cepit et in proelium cucurrit.', 'The man took the sword and ran into the battle.', 'I J L R', ['The man took the sword and ran away from the battle.', 'The man takes the sword and runs into the battle.', 'The man took the shield and ran into the battle.'], {});
T(72, 'discipuli verba magistri non audiverunt.', 'The pupils did not hear the words of the teacher.', 'H I L R', ['The teacher did not hear the words of the pupils.', 'The pupils heard the words of the teacher.', 'The pupils do not hear the words of the teacher.'], { p: [[2, 'case', 'gen sg', 'ager']] });
T(72, 'servus equos ex agris duxit.', 'The slave led the horses out of the fields.', 'I J R', ['The slave led the horses into the fields.', 'The slaves led the horses out of the fields.', 'The slave led the horse out of the field.'], { u: 1 });
T(72, 'dominus multa verba servis dixit.', 'The master said many words to the slaves.', 'E H I L R', ['The slaves said many words to the master.', 'The master said many words to the slave.', 'The master says many words to the slaves.'], {});
T(72, 'periculum nautas terruit.', 'The danger frightened the sailors.', 'B L R', ['The sailors feared the danger.', 'The danger frightens the sailors.', 'The danger frightened the sailor.'], { u: 1 });
T(72, 'aurum magistro ostendimus.', 'We showed the gold to the teacher.', 'H I L R', ['The teacher showed the gold to us.', 'We showed the gold to the teachers.', 'We show the gold to the teacher.'], {});
T(72, 'Marcus et Valeria in taberna manserunt.', 'Marcus and Valeria stayed in the pub.', 'B J R', ['Marcus and Valeria stay in the pub.', 'Marcus and Valeria ran into the pub.', 'Marcus stayed in the pub with Valeria.'], {});
T(72, 'servus pecuniam capere cupivit.', 'The slave wanted to take the money.', 'B I O R', ['The slave took the money.', 'The slaves wanted to take the money.', 'The slave wants to take the money.'], { u: 1 });
T(72, 'pueri cum amicis in via luserunt.', 'The boys played with friends in the road.', 'I J R', ['The boys played with friends in the field.', 'The boys play with friends in the road.', 'The boy played with a friend in the road.'], {});
T(73, 'cucurrimus.', 'We ran.', 'R', ['We run.', 'We were running.', 'They ran.'], { g: [[0, ['cucurrimus', 'currimus', 'currebamus', 'cucurrerunt'], 'F Q']], p: [[0, 'tense', 'perf'], [0, 'pn', '1p', 'perf']] });
T(73, 'pugnabam.', 'I was fighting.', 'Q', ['I fight.', 'I fought.', 'We were fighting.'], { g: [[0, ['pugnabam', 'pugno', 'pugnavi', 'pugnabat'], 'R']], p: [[0, 'tense', 'impf']] });
T(73, 'pugnavi.', 'I fought.', 'R', ['I fight.', 'I was fighting.', 'He fought.'], { g: [[0, ['pugnavi', 'pugno', 'pugnabam', 'pugnavit'], 'Q']], p: [[0, 'tense', 'perf']] });
T(73, 'viderunt.', 'They saw.', 'R', ['They see.', 'They were seeing.', 'He saw.'], { g: [[0, ['viderunt', 'vident', 'videbant', 'vidit'], 'Q']], p: [[0, 'tense', 'perf'], [0, 'pn', '3p', 'perf']] });
T(73, 'fuit.', 'He was.', 'D R', ['He is.', 'They were.', 'I was.'], { g: [[0, ['fuit', 'est', 'fuerunt', 'fui'], '', 'perf']], p: [[0, 'tense', 'perf']] });
T(73, 'scripsit.', 'He wrote.', 'R', ['He writes.', 'They wrote.', 'He was writing.'], { g: [[0, ['scripsit', 'scribit', 'scribebat', 'scripsi'], 'Q']], p: [[0, 'tense', 'perf']] });
T(73, 'dedimus.', 'We gave.', 'R', ['We give.', 'We were giving.', 'They gave.'], { g: [[0, ['dedimus', 'damus', 'dabamus', 'dedit'], 'Q']], p: [[0, 'pn', '1p', 'perf']] });
T(73, 'riserunt.', 'They laughed.', 'R', ['They laugh.', 'They were laughing.', 'He laughed.'], { g: [[0, ['riserunt', 'rident', 'ridebant', 'risit'], 'Q']], p: [[0, 'tense', 'perf']] });
T(73, 'misisti.', 'You (sg) sent.', 'R', ['You (sg) send.', 'You (pl) sent.', 'You (sg) were sending.'], { g: [[0, ['misisti', 'mittis', 'mittebas', 'misit'], 'F Q']], p: [[0, 'pn', '2s', 'perf']] });
T(73, 'delevi.', 'I destroyed.', 'R', ['I destroy.', 'I was destroying.', 'He destroyed.'], { p: [[0, 'tense', 'perf']] });
T(73, 'erant.', 'They were.', 'D Q', ['They are.', 'He was.', 'We were.'], { g: [[0, ['erant', 'sunt', 'erat', 'eramus'], '', 'impf']], p: [[0, 'pn', '3p', 'impf']] });
T(73, 'audiebatis.', 'You (pl) were listening.', 'Q', ['You (pl) listened.', 'You (pl) listen.', 'You (sg) were listening.'], { g: [[0, ['audiebatis', 'auditis', 'audivistis', 'audiebas'], 'F R']] });
T(73, 'consumpsimus.', 'We ate.', 'R', ['We eat.', 'We were eating.', 'They ate.'], { p: [[0, 'pn', '1p', 'perf']] });
T(73, 'discesserunt.', 'They departed.', 'R', ['They depart.', 'He departed.', 'They were departing.'], { p: [[0, 'tense', 'perf']] });

// ════════════════════════════════════════════════════════════════
// CE LEVEL 2 — every Latin sentence is taken from Prep School Latin
// (R. C. Bass, 2018), Chapters 75–116. Level 2 sentences carry only
// their Level 2 grammar keys: ticking any Level 2 point assumes the
// whole of Level 1 has been covered.
// ════════════════════════════════════════════════════════════════

// ── V: -que, et… et…, quamquam (Ch 75, 77, 85) ──
T(75, 'puer puellaque currunt.', 'The boy and girl are running.', 'V', ['The boy and the girls are running.', 'The boys and the girl are running.', 'The boy runs to the girl.'], { u: 1 });
T(75, 'servus timet fugitque.', 'The slave is afraid and flees.', 'V', ['The slave flees because he is afraid.', 'The slaves are afraid and flee.', 'The slave is not afraid and stays.'], {});
T(75, 'dominus intrat servumque punit.', 'The master enters and punishes the slave.', 'V', ['The slave enters and punishes the master.', 'The master enters and punishes the slaves.', 'The master and the slave enter.'], { u: 1 });
T(75, 'puella intrat amicumque videt.', 'The girl enters and sees her friend.', 'V', ['The girl and her friend enter.', 'The girl enters and sees her friends.', 'The friend enters and sees the girl.'], { u: 1 });
T(75, 'semper ridemus ludimusque.', 'We always laugh and play.', 'V', ['We never laugh and play.', 'They always laugh and play.', 'We always laugh and work.'], { u: 1 });
T(75, 'magister Sextum Marcumque punit.', 'The teacher punishes Sextus and Marcus.', 'V', ['Sextus and Marcus punish the teacher.', 'The teacher and Sextus punish Marcus.', 'The teacher praises Sextus and Marcus.'], { u: 1 });
T(75, 'servi fessi miserique erant.', 'The slaves were tired and miserable.', 'V', ['The slaves are tired and miserable.', 'The slave was tired and miserable.', 'The slaves were tired but happy.'], { u: 1 });
T(75, 'templum sacrum pulchrumque erat.', 'The temple was sacred and beautiful.', 'V', ['The temple is sacred and beautiful.', 'The temples were sacred and beautiful.', 'The temple was big and beautiful.'], { u: 1 });
T(75, 'servi cibum aquamque habebant.', 'The slaves had food and water.', 'V', ['The slaves had food but no water.', 'The slave had food and water.', 'The slaves were giving food and water.'], { u: 1 });
T(77, 'et matrem et patrem habeo.', 'I have both a mother and a father.', 'S V', ['I have a mother but not a father.', 'He has both a mother and a father.', 'I love both my mother and my father.'], {});
T(77, 'soror mea et pulchra et clara est.', 'My sister is both beautiful and famous.', 'S V', ['My sister is beautiful but not famous.', 'My sisters are both beautiful and famous.', 'My mother is both beautiful and famous.'], {});
T(77, 'et mater et pater regis irati erant.', 'Both the mother and the father of the king were angry.', 'S V', ['The king was angry with his mother and father.', 'Both the mother and the father of the king are angry.', 'The mother of the king was angry with the father.'], {});
T(85, 'vir, quamquam multam pecuniam habebat, non laetus erat.', 'Although the man had a lot of money, he was not happy.', 'V', ['Because the man had a lot of money, he was happy.', 'Although the man was not happy, he had a lot of money.', 'Although the man has a lot of money, he is not happy.'], {});
T(85, 'nautae, quamquam undae magnae erant, non timebant.', 'Although the waves were big, the sailors were not afraid.', 'V', ['Because the waves were big, the sailors were afraid.', 'Although the waves were small, the sailors were afraid.', 'Although the waves were big, the sailor was not afraid.'], {});
T(85, 'rex, quamquam clarus erat, uxorem non habebat.', 'Although the king was famous, he did not have a wife.', 'S V', ['Because the king was famous, he had a wife.', 'Although the king had a wife, he was not famous.', 'Although the king is famous, he does not have a wife.'], {});
T(85, 'quamquam iter longum non erat, iuvenes fessi erant.', 'Although the journey was not long, the young men were tired.', 'S V', ['Because the journey was long, the young men were tired.', 'Although the journey was long, the young men were not tired.', 'Although the journey was not long, the young man was tired.'], {});
T(85, 'servus, quamquam fessus erat, bene laborabat.', 'Although the slave was tired, he was working well.', 'V', ['Because the slave was tired, he was not working well.', 'Although the slave was working well, he was tired.', 'Although the slaves were tired, they were working well.'], {});
T(85, 'Graeci, quamquam bene pugnaverunt, Romanos non superaverunt.', 'Although the Greeks fought well, they did not overcome the Romans.', 'V', ['Because the Greeks fought well, they overcame the Romans.', 'Although the Romans fought well, they did not overcome the Greeks.', 'Although the Greeks did not fight well, they overcame the Romans.'], {});
T(85, 'Paris, ubi lucem claram vidit, magnopere timebat.', 'When Paris saw the bright light, he was very afraid.', 'S V', ['When Paris saw the bright light, he was not afraid.', 'Paris was very afraid because he did not see the light.', 'When Paris sees the bright light, he is very afraid.'], {});
T(85, 'ubi ad urbem advenimus, ad templum festinavimus.', 'When we arrived at the city, we hurried to the temple.', 'S V', ['When we arrived at the temple, we hurried to the city.', 'When they arrived at the city, they hurried to the temple.', 'When we arrive at the city, we hurry to the temple.'], {});
T(85, 'mater in villa sola manebat.', 'Mother was staying alone in the villa.', 'V', ['Mother was staying in the villa with a friend.', 'Mother stays alone in the villa.', 'Mother was walking alone to the villa.'], { u: 1 });
T(116, 'miles, quamquam fessus erat, diu pugnavit.', 'Although the soldier was tired, he fought for a long time.', 'S V', ['Because the soldier was tired, he did not fight for long.', 'Although the soldiers were tired, they fought for a long time.', 'Although the soldier fought for a long time, he was not tired.'], {});
T(116, 'Graeci, ubi Troiam ceperunt, Helenam ad Graeciam reduxerunt.', 'When the Greeks captured Troy, they led Helen back to Greece.', 'V', ['When the Trojans captured Greece, they led Helen back to Troy.', 'When the Greeks captured Helen, they led her back to Troy.', 'When the Greeks capture Troy, they will lead Helen back to Greece.'], {});
T(116, 'Troiani, ubi equum viderunt, timebant.', 'When the Trojans saw the horse, they were afraid.', 'V', ['When the Trojans saw the horse, they were happy.', 'When the Greeks saw the horse, they were afraid.', 'When the Trojan saw the horses, he was afraid.'], { u: 1 });

// ── S: Third declension nouns (Ch 77–79) ──
T(77, 'montem vidi.', 'I saw the mountain.', 'S', ['I saw the mountains.', 'He saw the mountain.', 'I see the mountain.'], { g: [[0, ['montem', 'mons', 'montes', 'montis'], '', 'decl3']], p: [[0, 'case', 'acc sg', 'decl3']] });
T(77, 'pater currit.', 'Father is running.', 'S', ['The fathers are running.', 'Mother is running.', 'Father is laughing.'], { p: [[0, 'case', 'nom sg', 'decl3']] });
T(77, 'uxorem meam amo.', 'I love my wife.', 'S', ['My wife loves me.', 'I love my wives.', 'He loves my wife.'], { u: 1, g: [[0, ['uxorem', 'uxor', 'uxores', 'uxoris'], '', 'decl3']] });
T(77, 'rex regit.', 'The king rules.', 'S', ['The kings rule.', 'The king is running.', 'The king is ruled.'], { p: [[0, 'case', 'nom sg', 'decl3']] });
T(77, 'matrem amamus.', 'We love our mother.', 'S', ['Mother loves us.', 'We love our mothers.', 'They love their mother.'], { p: [[0, 'case', 'acc sg', 'decl3']] });
T(77, 'fratrem et sororem habeo.', 'I have a brother and a sister.', 'S', ['I have a father and a sister.', 'I have brothers and sisters.', 'He has a brother and a sister.'], { u: 1 });
T(77, 'rex sororem pulchram habet.', 'The king has a beautiful sister.', 'S', ['The king has a beautiful wife.', 'The sister has a handsome king.', 'The king has beautiful sisters.'], { u: 1 });
T(77, 'multos montes vidimus.', 'We saw many mountains.', 'S', ['We saw a big mountain.', 'They saw many mountains.', 'Many mountains saw us.'], { u: 1, g: [[1, ['montes', 'montem', 'montium', 'montibus'], '', 'decl3']], p: [[1, 'case', 'acc pl', 'decl3']] });
T(77, 'ad montem altum appropinquabamus.', 'We were approaching the high mountain.', 'S', ['We were approaching the high mountains.', 'We were walking away from the high mountain.', 'They were approaching the high mountain.'], { u: 1 });
T(77, 'uxor mea iam venit.', 'My wife is already coming.', 'S', ['My wife is not coming.', 'My wives are already coming.', 'My sister is already coming.'], { u: 1, p: [[0, 'case', 'nom sg', 'decl3']] });
T(77, 'Marcus frater Aureliae est.', 'Marcus is the brother of Aurelia.', 'S', ['Aurelia is the sister of Marcus.', 'Marcus is the father of Aurelia.', 'Marcus is the friend of Aurelia.'], { u: 1 });
T(77, 'puella cibum patri parabat.', 'The girl was preparing food for her father.', 'S', ['The father was preparing food for the girl.', 'The girl was preparing food for her mother.', 'The girl was eating her father’s food.'], { g: [[2, ['patri', 'patrem', 'pater', 'patris'], '', 'decl3']], p: [[2, 'case', 'dat sg', 'decl3']] });
T(77, 'servi ad montem festinant.', 'The slaves are hurrying to the mountain.', 'S', ['The slaves are hurrying away from the mountain.', 'The slave is hurrying to the mountain.', 'The slaves are hurrying to the mountains.'], { u: 1 });
T(77, 'in montibus sunt multae viae.', 'In the mountains there are many roads.', 'S', ['In the mountain there is a long road.', 'There are many mountains on the road.', 'In the mountains there were many roads.'], { p: [[1, 'case', 'abl pl', 'decl3']] });
T(77, 'rex matrem patremque amabat.', 'The king loved his mother and father.', 'S V', ['The mother and father loved the king.', 'The king loved his mother and brother.', 'The king loves his mother and father.'], { u: 1 });
T(77, 'patrem bonum habeo.', 'I have a good father.', 'S', ['I have a good mother.', 'The good father has me.', 'He has a good father.'], { u: 1 });
T(77, 'puer cum sorore semper pugnat.', 'The boy always fights with his sister.', 'S', ['The boy never fights with his sister.', 'The sister always fights with the boy.', 'The boy always fights with his sisters.'], { u: 1, g: [[2, ['sorore', 'sororem', 'soror', 'sororis'], '', 'prep']] });
T(77, 'pater pueri iratus est.', 'The boy’s father is angry.', 'S', ['The father is angry with the boy.', 'The boy’s father was angry.', 'The boy’s mother is angry.'], { u: 1 });
T(77, 'rex pecuniam sorori dat.', 'The king gives money to his sister.', 'S', ['The sister gives money to the king.', 'The king gives money to his sisters.', 'The king takes money from his sister.'], { u: 1, p: [[2, 'case', 'dat sg', 'decl3']] });
T(77, 'puella pecuniam regis capit.', 'The girl takes the king’s money.', 'S', ['The king takes the girl’s money.', 'The girl gives money to the king.', 'The girl takes the kings’ money.'], { u: 1, g: [[2, ['regis', 'regem', 'rex', 'regum'], '', 'decl3']], p: [[2, 'case', 'gen sg', 'decl3']] });
T(77, 'puer multa dona matri dedit.', 'The boy gave many presents to his mother.', 'S', ['The mother gave many presents to the boy.', 'The boy gave many presents to his mothers.', 'The boy gives many presents to his mother.'], { u: 1 });
T(77, 'uxor regis pulchra est.', 'The wife of the king is beautiful.', 'S', ['The king’s wives are beautiful.', 'The wife of the king was beautiful.', 'The king’s sister is beautiful.'], { u: 1, g: [[1, ['regis', 'regem', 'rex', 'regi'], '', 'decl3']] });

// ── S: Third declension neuter nouns (Ch 79) ──
T(79, 'nauta mare non timet.', 'The sailor does not fear the sea.', 'S', ['The sea does not frighten the sailors.', 'The sailor fears the sea.', 'The sailors do not fear the sea.'], { u: 1, p: [[1, 'case', 'acc sg', 'decl3']] });
T(79, 'iter longum et difficile erat.', 'The journey was long and difficult.', 'S Z', ['The journey was long but easy.', 'The journeys were long and difficult.', 'The journey is long and difficult.'], { u: 1 });
T(79, 'servi corpus portabant.', 'The slaves were carrying the body.', 'S', ['The slaves were carrying the bodies.', 'The slave was carrying the body.', 'The slaves carried the body.'], { u: 1, g: [[1, ['corpus', 'corpora', 'corporis', 'corpore'], '', 'decl3']] });
T(79, 'multa itinera longa fecimus.', 'We made many long journeys.', 'S', ['We made a long journey.', 'They made many long journeys.', 'We make many long journeys.'], { u: 1, g: [[1, ['itinera', 'iter', 'itineris', 'itinere'], '', 'decl3']] });
T(79, 'aqua fluminis alta erat.', 'The water of the river was deep.', 'S', ['The water of the rivers was deep.', 'The river water is deep.', 'The water of the sea was deep.'], { u: 1, p: [[1, 'case', 'gen sg', 'decl3']] });
T(79, 'sunt in urbe multa templa.', 'There are many temples in the city.', 'S', ['There are many cities in the temple.', 'There were many temples in the city.', 'There is a big temple in the city.'], {});
T(79, 'nomen regis Sextus erat.', 'The name of the king was Sextus.', 'S', ['The name of the king is Sextus.', 'Sextus was the king of the city.', 'The name of the boy was Sextus.'], { u: 1 });
T(79, 'pater meus trans mare solus saepe navigat.', 'My father often sails across the sea alone.', 'S', ['My father often sails across the sea with friends.', 'My father never sails across the sea alone.', 'My father often sailed across the sea alone.'], {});
T(79, 'amici itinere fessi erant.', 'The friends were tired from the journey.', 'S', ['The friend was tired from the journey.', 'The friends were happy after the journey.', 'The friends are tired from the journey.'], { u: 1, p: [[1, 'case', 'abl sg', 'decl3']] });
T(79, 'multa corpora in proelio vidi.', 'I saw many bodies in the battle.', 'S', ['I saw many bodies in the river.', 'They saw many bodies in the battle.', 'I saw a body in the battle.'], { u: 1 });
T(79, 'rex lucem claram in caelo vidit.', 'The king saw a bright light in the sky.', 'S', ['The king saw a bright light in the river.', 'The kings saw bright lights in the sky.', 'The king sees a bright light in the sky.'], { u: 1, g: [[1, ['lucem', 'lux', 'lucis', 'luce'], '', 'decl3']] });
T(79, 'nomen urbis Roma erat.', 'The name of the city was Rome.', 'S', ['The name of the city is Rome.', 'Rome was the name of the river.', 'The names of the cities were Roman.'], { u: 1 });
T(79, 'puellae iuvenes pulchros saepe amant.', 'Girls often love handsome young men.', 'S', ['Handsome young men often love girls.', 'Girls never love handsome young men.', 'The girl often loves a handsome young man.'], {});
T(79, 'pater multam pecuniam iuveni dedit.', 'The father gave a lot of money to the young man.', 'S', ['The young man gave a lot of money to the father.', 'The father gave a lot of money to the young men.', 'The father took a lot of money from the young man.'], { u: 1, g: [[3, ['iuveni', 'iuvenem', 'iuvenis', 'iuvenes'], '', 'decl3']] });
T(79, 'ad flumen mox venimus.', 'We soon came to the river.', 'S', ['We soon came to the sea.', 'They soon came to the river.', 'We soon came from the river.'], { u: 1 });
T(79, 'iuvenes advenerunt.', 'The young men arrived.', 'S', ['The young man arrived.', 'The young men are arriving.', 'The young men departed.'], { p: [[0, 'case', 'nom pl', 'decl3']] });
T(79, 'urbes spectamus.', 'We are looking at the cities.', 'S', ['We are looking at the city.', 'The cities are looking at us.', 'They are looking at the cities.'], { p: [[0, 'case', 'acc pl', 'decl3']] });
T(79, 'flumina longa sunt.', 'The rivers are long.', 'S', ['The river is long.', 'The rivers were long.', 'The journeys are long.'], { g: [[0, ['flumina', 'flumen', 'fluminis', 'flumine'], '', 'decl3']], p: [[0, 'case', 'nom pl', 'decl3']] });
T(79, 'rex urbem cepit.', 'The king captured the city.', 'S', ['The city captured the king.', 'The king captures the city.', 'The kings captured the city.'], { g: [[1, ['urbem', 'urbs', 'urbes', 'urbis'], '', 'decl3']] });
T(79, 'urbs pulchra erat.', 'The city was beautiful.', 'S', ['The cities were beautiful.', 'The city is beautiful.', 'The city was big.'], {});

// ── T: Future tense (Ch 81–82) ──
T(81, 'aedificabunt.', 'They will build.', 'T', ['They are building.', 'They were building.', 'We shall build.'], { g: [[0, ['aedificabunt', 'aedificant', 'aedificabant', 'aedificabit'], 'Q', 'fut']], p: [[0, 'pn', '3p', 'fut'], [0, 'tense', 'fut']] });
T(81, 'iubebo.', 'I shall order.', 'T', ['I order.', 'He will order.', 'I was ordering.'], { p: [[0, 'pn', '1s', 'fut'], [0, 'tense', 'fut']] });
T(81, 'respondebitis.', 'You (pl) will reply.', 'T', ['You (pl) reply.', 'You (sg) will reply.', 'You (pl) were replying.'], { p: [[0, 'pn', '2p', 'fut']] });
T(81, 'pugnabimus.', 'We shall fight.', 'T', ['We are fighting.', 'They will fight.', 'We were fighting.'], { g: [[0, ['pugnabimus', 'pugnamus', 'pugnabamus', 'pugnabunt'], 'Q', 'fut']], p: [[0, 'pn', '1p', 'fut'], [0, 'tense', 'fut']] });
T(81, 'clamabit.', 'He will shout.', 'T', ['He shouts.', 'They will shout.', 'He was shouting.'], { p: [[0, 'pn', '3s', 'fut'], [0, 'tense', 'fut']] });
T(81, 'delebunt.', 'They will destroy.', 'T', ['They destroy.', 'He will destroy.', 'They destroyed.'], { p: [[0, 'pn', '3p', 'fut']] });
T(81, 'videbo.', 'I shall see.', 'T', ['I see.', 'I saw.', 'You (sg) will see.'], { g: [[0, ['videbo', 'video', 'videbam', 'videbit'], 'Q', 'fut']], p: [[0, 'tense', 'fut']] });
T(81, 'ridebimus.', 'We shall laugh.', 'T', ['We are laughing.', 'They will laugh.', 'We laughed.'], { p: [[0, 'pn', '1p', 'fut']] });
T(81, 'manebo.', 'I shall stay.', 'T', ['I stay.', 'He will stay.', 'I was staying.'], { p: [[0, 'tense', 'fut']] });
T(82, 'regemus.', 'We shall rule.', 'T', ['We rule.', 'We were ruling.', 'They will rule.'], { g: [[0, ['regemus', 'regimus', 'regebamus', 'regent'], 'Q', 'fut']], p: [[0, 'pn', '1p', 'fut'], [0, 'tense', 'fut']] });
T(82, 'legam.', 'I shall read.', 'T', ['I read.', 'He will read.', 'I was reading.'], { p: [[0, 'pn', '1s', 'fut']] });
T(82, 'curram.', 'I shall run.', 'T', ['I run.', 'You (sg) will run.', 'I ran.'], { p: [[0, 'tense', 'fut']] });
T(82, 'eris.', 'You (sg) will be.', 'T', ['You (sg) are.', 'You (sg) were.', 'He will be.'], { g: [[0, ['eris', 'es', 'eras', 'erit'], 'Q', 'fut']], p: [[0, 'pn', '2s', 'fut']] });
T(82, 'fugiam.', 'I shall flee.', 'T', ['I flee.', 'He will flee.', 'I fled.'], { p: [[0, 'pn', '1s', 'fut']] });
T(82, 'mittent.', 'They will send.', 'T', ['They send.', 'He will send.', 'They were sending.'], { g: [[0, ['mittent', 'mittunt', 'mittebant', 'mittet'], 'Q', 'fut']], p: [[0, 'pn', '3p', 'fut']] });
T(82, 'erunt.', 'They will be.', 'T', ['They are.', 'They were.', 'He will be.'], { g: [[0, ['erunt', 'sunt', 'erant', 'erit'], 'Q', 'fut']], p: [[0, 'tense', 'fut']] });
T(82, 'bibemus.', 'We shall drink.', 'T', ['We drink.', 'They will drink.', 'We were drinking.'], { p: [[0, 'pn', '1p', 'fut']] });
T(82, 'dormiet.', 'He will sleep.', 'T', ['He sleeps.', 'They will sleep.', 'He was sleeping.'], { g: [[0, ['dormiet', 'dormit', 'dormiebat', 'dormient'], 'Q', 'fut']], p: [[0, 'pn', '3s', 'fut']] });
T(82, 'veniam.', 'I shall come.', 'T', ['I come.', 'He will come.', 'I came.'], { p: [[0, 'tense', 'fut']] });
T(82, 'capiemus.', 'We shall capture.', 'T', ['We capture.', 'They will capture.', 'We were capturing.'], { p: [[0, 'pn', '1p', 'fut'], [0, 'tense', 'fut']] });
T(82, 'dicet.', 'He will say.', 'T', ['He says.', 'They will say.', 'He said.'], { g: [[0, ['dicet', 'dicit', 'dicebat', 'dicent'], 'Q', 'fut']], p: [[0, 'pn', '3s', 'fut']] });
T(82, 'cras servus fugiet.', 'Tomorrow the slave will flee.', 'T', ['Yesterday the slave fled.', 'Today the slave is fleeing.', 'Tomorrow the slaves will flee.'], { u: 1, g: [[2, ['fugiet', 'fugit', 'fugiebat', 'fugient'], 'Q', 'fut']] });
T(82, 'cras oppidum capiemus.', 'Tomorrow we shall capture the town.', 'T', ['Today we are capturing the town.', 'Tomorrow they will capture the town.', 'Yesterday we were attacking the town.'], { u: 1, g: [[2, ['capiemus', 'capimus', 'capiebamus', 'capient'], 'Q', 'fut']] });
T(82, 'cras pueri current.', 'Tomorrow the boys will run.', 'T', ['Today the boys are running.', 'Tomorrow the boy will run.', 'Yesterday the boys were running.'], { u: 1, g: [[2, ['current', 'currunt', 'currebant', 'curret'], 'Q', 'fut']] });
T(82, 'pueri magistros numquam audient.', 'The boys will never listen to the teachers.', 'T', ['The teachers will never listen to the boys.', 'The boys never listen to the teachers.', 'The boys will always listen to the teachers.'], { u: 1 });
T(85, 'dominus multa dona servis cras dabit.', 'Tomorrow the master will give many presents to the slaves.', 'T', ['Tomorrow the slaves will give many presents to the master.', 'Yesterday the master gave many presents to the slaves.', 'Tomorrow the master will give many presents to the slave.'], {});

// ── U: eo, ire, ii and its compounds (Ch 84) ──
T(84, 'redibo.', 'I shall return.', 'T U', ['I am returning.', 'I returned.', 'He will return.'], { p: [[0, 'pn', '1s', 'eo']] });
T(84, 'perierunt.', 'They perished.', 'U', ['They perish.', 'He perished.', 'They will perish.'], { p: [[0, 'pn', '3p', 'eo']] });
T(84, 'ibas.', 'You (sg) were going.', 'U', ['You (sg) are going.', 'You (pl) were going.', 'You (sg) went.'], { g: [[0, ['ibas', 'is', 'ibatis', 'ibat'], '', 'eo']], p: [[0, 'pn', '2s', 'eo']] });
T(84, 'ineunt.', 'They go in.', 'U', ['They go out.', 'He goes in.', 'They went in.'], { p: [[0, 'pn', '3p', 'eo']] });
T(84, 'exit.', 'He goes out.', 'U', ['He goes in.', 'They go out.', 'He went out.'], { p: [[0, 'pn', '3s', 'eo']] });
T(84, 'ibant.', 'They were going.', 'U', ['They go.', 'He was going.', 'They went.'], { g: [[0, ['ibant', 'eunt', 'ibat', 'ibunt'], 'T', 'eo']], p: [[0, 'pn', '3p', 'eo']] });
T(84, 'transibunt.', 'They will cross.', 'T U', ['They are crossing.', 'They crossed.', 'He will cross.'], { p: [[0, 'pn', '3p', 'eo']] });
T(84, 'itis.', 'You (pl) are going.', 'U', ['You (sg) are going.', 'They are going.', 'You (pl) were going.'], { g: [[0, ['itis', 'is', 'eunt', 'imus'], '', 'eo']], p: [[0, 'pn', '2p', 'eo']] });
T(84, 'rediit.', 'He returned.', 'U', ['He returns.', 'They returned.', 'He went out.'], { p: [[0, 'pn', '3s', 'eo']] });
T(84, 'exibo.', 'I shall go out.', 'T U', ['I go out.', 'I went out.', 'He will go out.'], { p: [[0, 'pn', '1s', 'eo']] });
T(84, 'ierunt.', 'They went.', 'U', ['They go.', 'He went.', 'They will go.'], { g: [[0, ['ierunt', 'eunt', 'iit', 'ibant'], '', 'eo']], p: [[0, 'pn', '3p', 'eo']] });
T(84, 'ibitis.', 'You (pl) will go.', 'T U', ['You (pl) are going.', 'You (sg) will go.', 'You (pl) were going.'], { p: [[0, 'pn', '2p', 'eo']] });
T(84, 'heri flumen transiimus.', 'Yesterday we crossed the river.', 'S U', ['Tomorrow we shall cross the river.', 'Yesterday they crossed the river.', 'Yesterday we crossed the sea.'], { u: 1 });
T(84, 'ad urbem eo.', 'I am going to the city.', 'S U', ['I am going out of the city.', 'He is going to the city.', 'I went to the city.'], { u: 1, g: [[2, ['eo', 'it', 'eunt', 'is'], '', 'eo']], p: [[2, 'pn', '1s', 'eo']] });
T(84, 'i, puer!', 'Go, boy!', 'U', ['Go, boys!', 'Come, boy!', 'The boy is going.'], {});
T(84, 'per viam ibamus.', 'We were going along the road.', 'U', ['We went along the road.', 'They were going along the road.', 'We were going across the road.'], { u: 1, p: [[2, 'pn', '1p', 'eo']] });
T(84, 'multi iuvenes perierunt.', 'Many young men perished.', 'S U', ['Many young men escaped.', 'A young man perished.', 'Many young men will perish.'], { u: 1 });
T(84, 'pueri mox redierunt.', 'The boys soon returned.', 'U', ['The boys will soon return.', 'The boy soon returned.', 'The boys soon went out.'], { u: 1, g: [[2, ['redierunt', 'redeunt', 'rediit', 'redibunt'], 'T', 'eo']] });
T(84, 'crasne ad urbem redibis?', 'Will you (sg) return to the city tomorrow?', 'S T U', ['Did you (sg) return to the city yesterday?', 'Will you (pl) return to the city tomorrow?', 'Are you (sg) going to the city today?'], {});
T(84, 'celeriter exiit.', 'He went out quickly.', 'U', ['He went in quickly.', 'They went out quickly.', 'He goes out quickly.'], { p: [[1, 'pn', '3s', 'eo']] });
T(84, 'quis ad urbem cras ibit?', 'Who will go to the city tomorrow?', 'S T U', ['Who went to the city yesterday?', 'Who is going to the city today?', 'Why will he go to the city tomorrow?'], { u: 1 });
T(84, 'multi servi trans flumen transierunt.', 'Many slaves went across the river.', 'S U', ['Many slaves will go across the river.', 'A slave went across the river.', 'Many slaves went along the river.'], { u: 1 });
T(84, 'multi iuvenes in bello perierunt.', 'Many young men perished in the war.', 'S U', ['Many young men escaped from the war.', 'Many young men will perish in the war.', 'Many young men fought in the war.'], { u: 1 });
T(84, 'mater paterque ad urbem mox redibunt.', 'Mother and father will soon return to the city.', 'S T U V', ['Mother and father soon returned to the city.', 'Mother and father will soon leave the city.', 'Mother will soon return to the city with father.'], {});
T(84, 'puer ex oppido statim exiit.', 'The boy went out of the town at once.', 'U', ['The boy went into the town at once.', 'The boys went out of the town at once.', 'The boy will go out of the town at once.'], { u: 1 });
T(84, 'vir, ubi in templum iniit, amicum vidit.', 'When the man went into the temple, he saw his friend.', 'U', ['When the man went out of the temple, he saw his friend.', 'When the friend went into the temple, he saw the man.', 'When the man goes into the temple, he sees his friend.'], {});
T(84, 'nauta ad urbem tandem adiit.', 'At last the sailor went towards the city.', 'S U', ['At last the sailor went out of the city.', 'At last the sailors went towards the city.', 'At last the sailor will go towards the city.'], { u: 1 });
T(84, 'rex iuvenes e templo exire iussit.', 'The king ordered the young men to go out of the temple.', 'S U', ['The young men ordered the king to go out of the temple.', 'The king ordered the young men to go into the temple.', 'The king ordered the young man to go out of the temple.'], {});
T(85, 'et pater et mater in bello perierunt.', 'Both father and mother perished in the war.', 'S U V', ['Father and mother escaped from the war.', 'Both father and mother will perish in the war.', 'Father perished in the war, but mother did not.'], {});
T(116, 'multi perierunt, pauci effugerunt.', 'Many perished, few escaped.', 'U', ['Few perished, many escaped.', 'Many escaped, few perished.', 'Many will perish, few will escape.'], {});

// ── W: hic, haec, hoc and ille, illa, illud (Ch 89, 91) ──
T(89, 'hic puer est Marcus.', 'This boy is Marcus.', 'W', ['That boy is Marcus.', 'These boys are Marcus and Sextus.', 'This boy is with Marcus.'], { u: 1, g: [[0, ['hic', 'haec', 'hoc', 'hunc'], '', 'hic']] });
T(89, 'hoc bellum est malum.', 'This war is bad.', 'W', ['That war is bad.', 'These wars are bad.', 'This war is good.'], { u: 1, g: [[0, ['hoc', 'hic', 'haec', 'hunc'], '', 'hic']] });
T(89, 'hae puellae sunt parvae.', 'These girls are small.', 'W', ['This girl is small.', 'Those girls are small.', 'These boys are small.'], { u: 1, g: [[0, ['hae', 'hi', 'haec', 'has'], '', 'hic']] });
T(89, 'hanc puellam amo.', 'I love this girl.', 'W', ['This girl loves me.', 'I love these girls.', 'I love that girl.'], { u: 1, g: [[0, ['hanc', 'haec', 'hunc', 'hac'], '', 'hic']] });
T(89, 'magister pueros his verbis terret.', 'The teacher frightens the boys with these words.', 'W', ['The boys frighten the teacher with these words.', 'The teacher frightens the boys with those words.', 'The teacher frightens the boy with this word.'], { u: 1, g: [[2, ['his', 'hos', 'haec', 'hoc'], '', 'hic']] });
T(89, 'librum huius pueri lego.', 'I am reading this boy’s book.', 'W', ['This boy is reading my book.', 'I am reading these boys’ books.', 'I am reading that boy’s book.'], { u: 1, g: [[1, ['huius', 'hic', 'hunc', 'hoc'], '', 'hic']] });
T(89, 'iuvenis, ubi haec verba audivit, discessit.', 'When the young man heard these words, he departed.', 'S W', ['When the young man heard those words, he stayed.', 'When the young men heard these words, they departed.', 'When the young man said these words, he departed.'], {});
T(89, 'hoc flumen sacrum est.', 'This river is sacred.', 'S W', ['That river is sacred.', 'These rivers are sacred.', 'This river is deep.'], { u: 1, g: [[0, ['hoc', 'hic', 'haec', 'hunc'], '', 'hic']] });
T(89, 'nomen huius puellae Flavia est.', 'The name of this girl is Flavia.', 'S W', ['The name of that girl is Flavia.', 'This girl’s friend is Flavia.', 'The names of these girls are Flavia and Julia.'], { u: 1 });
T(89, 'muri huius urbis alti sunt.', 'The walls of this city are high.', 'S W', ['The walls of that city are high.', 'The wall of this city is high.', 'The walls of these cities are high.'], { u: 1, g: [[1, ['huius', 'hic', 'hanc', 'hac'], '', 'hic']] });
T(89, 'miles hoc gladio bene pugnavit.', 'The soldier fought well with this sword.', 'S W', ['The soldier fought well with that sword.', 'The soldiers fought well with these swords.', 'The soldier fights well with this sword.'], { u: 1, g: [[1, ['hoc', 'hic', 'hunc', 'haec'], '', 'hic']] });
T(89, 'dominus donum his pueris dabit.', 'The master will give a present to these boys.', 'T W', ['These boys will give a present to the master.', 'The master gave a present to these boys.', 'The master will give a present to this boy.'], { u: 1 });
T(91, 'ille servus bonus est.', 'That slave is good.', 'W', ['This slave is good.', 'Those slaves are good.', 'That slave is bad.'], { u: 1, g: [[0, ['ille', 'illa', 'illud', 'illum'], '', 'ille']] });
T(91, 'illa navis magna est.', 'That ship is big.', 'S W', ['This ship is big.', 'Those ships are big.', 'That ship is small.'], { u: 1, g: [[0, ['illa', 'ille', 'illud', 'illam'], '', 'ille']] });
T(91, 'illud templum magnum et pulchrum est.', 'That temple is big and beautiful.', 'W', ['This temple is big and beautiful.', 'Those temples are big and beautiful.', 'That temple was big and beautiful.'], { u: 1, g: [[0, ['illud', 'ille', 'illa', 'illum'], '', 'ille']] });
T(91, 'illum puerum non amo.', 'I do not like that boy.', 'W', ['That boy does not like me.', 'I do not like this boy.', 'I do not like those boys.'], { u: 1, g: [[0, ['illum', 'ille', 'illud', 'illo'], '', 'ille']] });
T(91, 'dominus illos servos saepe punit.', 'The master often punishes those slaves.', 'W', ['Those slaves often punish the master.', 'The master often punishes that slave.', 'The master never punishes those slaves.'], { u: 1, g: [[1, ['illos', 'illi', 'illas', 'illum'], '', 'ille']] });
T(91, 'scuta illorum militum magna sunt.', 'The shields of those soldiers are big.', 'S W', ['The shields of that soldier are big.', 'Those soldiers have small shields.', 'The shields of these soldiers are big.'], { u: 1 });
T(91, 'pecuniam illis servis cras dabo.', 'I shall give money to those slaves tomorrow.', 'T W', ['Those slaves will give me money tomorrow.', 'I gave money to those slaves yesterday.', 'I shall give money to that slave tomorrow.'], { u: 1, g: [[1, ['illis', 'illos', 'illi', 'illa'], '', 'ille']] });
T(91, 'multi iuvenes in illa urbe habitant.', 'Many young men live in that city.', 'S W', ['Many young men live in this city.', 'A young man lives in that city.', 'Many young men are walking into that city.'], { u: 1 });
T(91, 'sunt multae naves in illo flumine.', 'There are many ships on that river.', 'S W', ['There are many ships on this river.', 'There is a big ship on that river.', 'There were many ships on that river.'], {});
T(91, 'ubi sunt libri illorum puerorum?', 'Where are the books of those boys?', 'W', ['Where are the books of that boy?', 'Where are those boys?', 'Why are the books of those boys here?'], { u: 1 });
T(92, 'hic servus bonus, ille malus est.', 'This slave is good, that one is bad.', 'W', ['This slave is bad, that one is good.', 'That slave is good, this one is bad.', 'This slave is good, that master is bad.'], {});
T(92, 'ille servus hunc dominum timebat.', 'That slave was afraid of this master.', 'W', ['This master was afraid of that slave.', 'That slave was afraid of that master.', 'That slave is afraid of this master.'], { u: 1, g: [[2, ['hunc', 'hic', 'hoc', 'huic'], '', 'hic']] });
T(92, 'illi milites hanc urbem oppugnaverunt.', 'Those soldiers attacked this city.', 'S W', ['These soldiers attacked that city.', 'That soldier attacked this city.', 'Those soldiers were attacking this city.'], { u: 1 });
T(92, 'haec navis ad illam insulam navigavit.', 'This ship sailed towards that island.', 'S W', ['That ship sailed towards this island.', 'This ship sailed away from that island.', 'These ships sailed towards that island.'], { u: 1 });
T(92, 'hanc puellam in illa via vidi.', 'I saw this girl in that street.', 'W', ['I saw that girl in this street.', 'This girl saw me in that street.', 'I saw these girls in that street.'], { u: 1 });
T(92, 'nauta navem conspexit.', 'The sailor caught sight of the ship.', 'S', ['The sailors caught sight of the ship.', 'The sailor caught sight of the ships.', 'The ship caught sight of the sailor.'], { u: 1, g: [[1, ['navem', 'navis', 'naves', 'navi'], '', 'decl3']] });
T(97, 'illi milites in proelio fortiter pugnaverunt.', 'Those soldiers fought bravely in the battle.', 'S W', ['These soldiers fought bravely in the battle.', 'That soldier fought bravely in the battle.', 'Those soldiers fought badly in the battle.'], {});
T(97, 'hunc civem in urbe heri conspexi.', 'I caught sight of this citizen in the city yesterday.', 'S W', ['This citizen caught sight of me in the city yesterday.', 'I shall catch sight of this citizen in the city tomorrow.', 'I caught sight of that citizen in the city yesterday.'], {});

// ── X: is, ea, id and personal pronouns (Ch 94, 96) ──
T(94, 'Marcus filium habet. eum amat.', 'Marcus has a son. He loves him.', 'X', ['Marcus has a daughter. He loves her.', 'Marcus has a son. The son loves him.', 'Marcus has sons. He loves them.'], { g: [[3, ['eum', 'eam', 'eos', 'id'], '', 'is']] });
T(94, 'Marcus filiam habet. eam amat.', 'Marcus has a daughter. He loves her.', 'X', ['Marcus has a son. He loves him.', 'Marcus has a daughter. She loves him.', 'Marcus has daughters. He loves them.'], { g: [[3, ['eam', 'eum', 'eas', 'ea'], '', 'is']] });
T(94, 'Marcus servum habet. pecuniam ei dat.', 'Marcus has a slave. He gives money to him.', 'X', ['Marcus has a slave. The slave gives money to him.', 'Marcus has slaves. He gives money to them.', 'Marcus has a slave. He takes money from him.'], { g: [[4, ['ei', 'eum', 'eius', 'eo'], '', 'is']] });
T(94, 'Marcus uxorem pulchram habet. nomen eius est Aurelia.', 'Marcus has a beautiful wife. Her name is Aurelia.', 'S X', ['Marcus has a beautiful sister. Her name is Aurelia.', 'Aurelia has a handsome husband. His name is Marcus.', 'Marcus has a beautiful wife. Their name is Aurelia.'], {});
T(94, 'Aurelia multos amicos habet. amici eius clari sunt.', 'Aurelia has many friends. Her friends are famous.', 'X', ['Aurelia has many friends. Their friends are famous.', 'Aurelia has a friend. Her friend is famous.', 'Aurelia has many famous friends. She is famous too.'], {});
T(94, 'rex servos amat. multam pecuniam eis saepe dat.', 'The king loves his slaves. He often gives them a lot of money.', 'S X', ['The king loves his slaves. They often give him a lot of money.', 'The king loves his slave. He often gives him a lot of money.', 'The king loves his slaves. He never gives them money.'], { g: [[5, ['eis', 'eos', 'eorum', 'ei'], '', 'is']] });
T(94, 'servus aquam rogat. dominus eam ei dat.', 'The slave asks for water. The master gives it to him.', 'X', ['The master asks for water. The slave gives it to him.', 'The slave asks for water. The master gives it to her.', 'The slave asks for food. The master gives it to him.'], {});
T(94, 'Protesilaus fortiter pugnabat. Troiani tamen eum mox occiderunt.', 'Protesilaus was fighting bravely. However, the Trojans soon killed him.', 'X', ['Protesilaus was fighting bravely. However, he soon killed the Trojans.', 'Protesilaus was fighting badly. So the Trojans soon killed him.', 'Protesilaus fought bravely. The Trojans did not kill him.'], {});
T(94, 'navis magna erat. erant in ea multi nautae.', 'The ship was big. There were many sailors in it.', 'S X', ['The ship was small. There were few sailors in it.', 'The ship was big. There were many soldiers in it.', 'The ships were big. There were many sailors in them.'], {});
T(94, 'urbs magna erat. Romani eam capere constituerunt.', 'The city was big. The Romans decided to capture it.', 'S X', ['The city was big. The Romans decided to destroy it.', 'The city was big. The Romans did not capture it.', 'The city was small. The Romans decided to capture it.'], {});
T(94, 'hoc vinum bonum est. id saepe bibo.', 'This wine is good. I often drink it.', 'W X', ['That wine is good. I often drink it.', 'This wine is bad. I never drink it.', 'This wine is good. He often drinks it.'], {});
T(94, 'auxilio eorum urbem cepimus.', 'With their help we captured the city.', 'S X', ['With his help we captured the city.', 'With our help they captured the city.', 'With their help we shall capture the city.'], { u: 1 });
T(96, 'tu ludis; ego laboro.', 'You (sg) are playing; I am working.', 'X', ['I am playing; you (sg) are working.', 'You (pl) are playing; we are working.', 'You (sg) are working; I am playing.'], {});
T(96, 'nos vos non amamus.', 'We do not like you (pl).', 'X', ['You (pl) do not like us.', 'We like you (pl).', 'They do not like you (pl).'], { u: 1 });
T(96, 'nemo me vidit.', 'No one saw me.', 'X', ['I saw no one.', 'No one saw you (sg).', 'Everyone saw me.'], { u: 1 });
T(96, 'te in urbe vidi.', 'I saw you (sg) in the city.', 'S X', ['You (sg) saw me in the city.', 'I saw you (pl) in the city.', 'I shall see you (sg) in the city.'], { u: 1 });
T(96, 'hostes contra nos pugnant.', 'The enemy are fighting against us.', 'S X', ['We are fighting against the enemy.', 'The enemy are fighting with us.', 'The enemy are fighting against you (pl).'], { u: 1 });
T(96, 'pater pecuniam tibi dat.', 'Father gives money to you (sg).', 'S X', ['Father gives money to me.', 'You (sg) give money to Father.', 'Father gives money to you (pl).'], { u: 1, g: [[2, ['tibi', 'te', 'tu', 'tui'], '', 'pron']] });
T(96, 'amici mecum ludunt.', 'My friends are playing with me.', 'X', ['My friends are playing with you (sg).', 'My friend is playing with me.', 'I am playing with my friends.'], { u: 1 });
T(96, 'ego donum tibi dabo.', 'I shall give a present to you (sg).', 'T X', ['You (sg) will give a present to me.', 'I gave a present to you (sg).', 'I shall give a present to him.'], { u: 1 });
T(96, 'magister dona nobis numquam dat.', 'The teacher never gives presents to us.', 'X', ['We never give presents to the teacher.', 'The teacher always gives presents to us.', 'The teacher never gives presents to you (pl).'], { u: 1, g: [[2, ['nobis', 'nos', 'nostrum', 'vobis'], '', 'pron']] });
T(97, 'te cras videbo.', 'I shall see you (sg) tomorrow.', 'T X', ['You (sg) will see me tomorrow.', 'I saw you (sg) yesterday.', 'I shall see you (pl) tomorrow.'], { u: 1 });
T(97, 'quod milites bene pugnabant, dux eos laudavit.', 'Because the soldiers were fighting well, the general praised them.', 'S X', ['Because the general was fighting well, the soldiers praised him.', 'Although the soldiers were fighting well, the general did not praise them.', 'Because the soldier was fighting well, the general praised him.'], {});
T(116, 'quis nos servare poterit?', 'Who will be able to save us?', 'T X b', ['Who was able to save us?', 'Who will be able to save you (pl)?', 'Who wants to save us?'], { u: 1 });
T(116, 'cives, quamquam hostes timebant, contra eos bene pugnaverunt.', 'Although the citizens were afraid of the enemy, they fought well against them.', 'S V X', ['Because the citizens were afraid of the enemy, they did not fight.', 'Although the enemy were afraid of the citizens, they fought well against them.', 'Although the citizens were not afraid of the enemy, they fought badly.'], {});

// ── S: Third declension, revision (Ch 92–97) ──
T(97, 'rex mortuus erat.', 'The king was dead.', 'S', ['The king is dead.', 'The kings were dead.', 'The king was alive.'], { u: 1 });
T(97, 'dux bellum non timet.', 'The general does not fear war.', 'S', ['The general fears war.', 'The generals do not fear war.', 'War does not frighten the soldier.'], { u: 1, p: [[0, 'case', 'nom sg', 'decl3']] });
T(97, 'cives oppida defenderunt.', 'The citizens defended the towns.', 'S', ['The citizens defended the town.', 'The citizen defended the towns.', 'The towns defended the citizens.'], { u: 1, p: [[0, 'case', 'nom pl', 'decl3']] });
T(97, 'duces comites amabant.', 'The leaders loved their companions.', 'S', ['The companions loved their leaders.', 'The leader loved his companion.', 'The leaders love their companions.'], { u: 1 });
T(97, 'hostes multos cives armis vulneraverunt.', 'The enemy wounded many citizens with weapons.', 'S', ['Many citizens wounded the enemy with weapons.', 'The enemy killed many citizens with weapons.', 'The enemy wounded a citizen with a weapon.'], { u: 1, g: [[2, ['cives', 'civis', 'civem', 'civibus'], '', 'decl3']] });
T(116, 'pater meus vocem magnam habet.', 'My father has a loud voice.', 'S', ['My mother has a loud voice.', 'My father has a quiet voice.', 'My father hears a loud voice.'], { u: 1, g: [[2, ['vocem', 'vox', 'voces', 'vocis'], '', 'decl3']] });
T(116, 'bene pugnate, cives!', 'Fight well, citizens!', 'S', ['Fight well, citizen!', 'The citizens are fighting well.', 'Do not fight, citizens!'], {});

// ── Y: Pluperfect tense (Ch 99) ──
T(99, 'amaveramus.', 'We had loved.', 'Y', ['We loved.', 'We were loving.', 'They had loved.'], { g: [[0, ['amaveramus', 'amavimus', 'amabamus', 'amaverant'], 'Q R', 'plupf']], p: [[0, 'pn', '1p', 'plupf'], [0, 'tense', 'plupf']] });
T(99, 'ceperant.', 'They had captured.', 'Y', ['They captured.', 'He had captured.', 'They were capturing.'], { p: [[0, 'pn', '3p', 'plupf'], [0, 'tense', 'plupf']] });
T(99, 'audiveras.', 'You (sg) had heard.', 'Y', ['You (sg) heard.', 'You (pl) had heard.', 'You (sg) were hearing.'], { p: [[0, 'pn', '2s', 'plupf']] });
T(99, 'rexerat.', 'He had ruled.', 'Y', ['He ruled.', 'They had ruled.', 'He will rule.'], { p: [[0, 'tense', 'plupf']] });
T(99, 'dederam.', 'I had given.', 'Y', ['I gave.', 'He had given.', 'I was giving.'], { g: [[0, ['dederam', 'dedi', 'dabam', 'dederat'], 'Q R', 'plupf']], p: [[0, 'pn', '1s', 'plupf']] });
T(99, 'duxerat.', 'He had led.', 'Y', ['He led.', 'They had led.', 'He was leading.'], { p: [[0, 'pn', '3s', 'plupf']] });
T(99, 'miseram.', 'I had sent.', 'Y', ['I sent.', 'He had sent.', 'I was sending.'], { p: [[0, 'tense', 'plupf']] });
T(99, 'cucurrerant.', 'They had run.', 'Y', ['They ran.', 'He had run.', 'They were running.'], { g: [[0, ['cucurrerant', 'cucurrerunt', 'currebant', 'cucurrerat'], 'Q R', 'plupf']], p: [[0, 'pn', '3p', 'plupf']] });
T(99, 'fugerat.', 'He had fled.', 'Y', ['He fled.', 'They had fled.', 'He was fleeing.'], { p: [[0, 'tense', 'plupf']] });
T(99, 'dixerat.', 'He had said.', 'Y', ['He said.', 'They had said.', 'He will say.'], { p: [[0, 'pn', '3s', 'plupf']] });
T(99, 'magister iratus erat quod riseramus.', 'The teacher was angry because we had laughed.', 'Y', ['We had laughed because the teacher was angry.', 'The teacher was angry because they had laughed.', 'The teacher was angry because we were laughing.'], { g: [[4, ['riseramus', 'risimus', 'ridebamus', 'riserant'], 'Q R', 'plupf']] });
T(99, 'puer librum non legerat.', 'The boy had not read the book.', 'Y', ['The boy did not read the book.', 'The boys had not read the book.', 'The boy had not read the books.'], { u: 1, p: [[3, 'tense', 'plupf']] });
T(99, 'puella puerum vulneraverat.', 'The girl had wounded the boy.', 'Y', ['The boy had wounded the girl.', 'The girl wounded the boy.', 'The girl had wounded the boys.'], { u: 1 });
T(99, 'verba non audiveramus.', 'We had not heard the words.', 'Y', ['We did not hear the words.', 'They had not heard the words.', 'We had not said the words.'], { u: 1 });
T(99, 'dominus laetus erat quod bene dormiverat.', 'The master was happy because he had slept well.', 'Y', ['The master was happy because he was sleeping well.', 'The master had slept well because he was happy.', 'The master was sad because he had not slept well.'], {});
T(99, 'servi bene laboraverant.', 'The slaves had worked well.', 'Y', ['The slaves worked well.', 'The slave had worked well.', 'The slaves had worked badly.'], { u: 1, g: [[2, ['laboraverant', 'laboraverunt', 'laborabant', 'laboraverat'], 'Q R', 'plupf']] });
T(99, 'uxor discesserat.', 'The wife had departed.', 'S Y', ['The wife departed.', 'The wives had departed.', 'The wife had arrived.'], { p: [[1, 'tense', 'plupf']] });
T(99, 'servus cibum paraverat.', 'The slave had prepared the food.', 'Y', ['The slave prepared the food.', 'The slaves had prepared the food.', 'The slave had eaten the food.'], { u: 1 });
T(99, 'hostes laeti erant quod Romani discesserant.', 'The enemy were happy because the Romans had departed.', 'S Y', ['The Romans were happy because the enemy had departed.', 'The enemy were happy because the Romans were departing.', 'The enemy were sad because the Romans had departed.'], {});
T(99, 'multa oppida ceperant.', 'They had captured many towns.', 'Y', ['They captured many towns.', 'He had captured many towns.', 'They had captured a big town.'], { u: 1 });
T(99, 'puer celeriter currebat quod magistrum iratum viderat.', 'The boy was running quickly because he had seen the angry teacher.', 'Y', ['The angry teacher was running quickly because he had seen the boy.', 'The boy was running quickly because he saw the happy teacher.', 'The boy had run quickly because he was seeing the angry teacher.'], {});
T(99, 'milites bene pugnaverant.', 'The soldiers had fought well.', 'S Y', ['The soldiers fought well.', 'The soldier had fought well.', 'The soldiers had fought badly.'], { u: 1, g: [[2, ['pugnaverant', 'pugnaverunt', 'pugnabant', 'pugnaverat'], 'Q R', 'plupf']] });
T(99, 'proelium longum fuerat.', 'The battle had been long.', 'Y', ['The battle was long.', 'The battles had been long.', 'The battle will be long.'], { u: 1 });
T(99, 'dominus multos servos liberaverat.', 'The master had set many slaves free.', 'Y', ['The master set many slaves free.', 'Many slaves had set the master free.', 'The master had punished many slaves.'], { u: 1 });
T(99, 'servi ex oppido cucurrerant.', 'The slaves had run out of the town.', 'Y', ['The slaves had run into the town.', 'The slaves ran out of the town.', 'The slave had run out of the town.'], { u: 1 });
T(99, 'nuntius multa verba dixerat.', 'The messenger had said many words.', 'Y', ['The messenger said many words.', 'The messengers had said many words.', 'The messenger had heard many words.'], { u: 1 });
T(99, 'milites trans flumen transierant.', 'The soldiers had crossed the river.', 'S U Y', ['The soldiers crossed the river.', 'The soldier had crossed the river.', 'The soldiers had crossed the sea.'], { u: 1 });
T(99, 'cives oppidum fortiter defenderant.', 'The citizens had defended the town bravely.', 'S Y', ['The citizens defended the town bravely.', 'The citizens had attacked the town bravely.', 'The citizen had defended the town bravely.'], { u: 1 });

// ── Z: Third declension adjectives (Ch 101, 103) ──
T(101, 'dominum crudelem habeo.', 'I have a cruel master.', 'Z', ['The cruel master has me.', 'I have a noble master.', 'He has a cruel master.'], { u: 1, g: [[1, ['crudelem', 'crudelis', 'crudeles', 'crudeli'], '', 'adj3']] });
T(101, 'opus facile facio.', 'I am doing an easy task.', 'S Z', ['I am doing a difficult task.', 'He is doing an easy task.', 'I am doing easy tasks.'], { u: 1, g: [[1, ['facile', 'facilis', 'facilem', 'facilia'], '', 'adj3']] });
T(101, 'omnia vina amo.', 'I love all wines.', 'Z', ['All wines love me.', 'I love this wine.', 'I love all women.'], { u: 1, g: [[0, ['omnia', 'omnes', 'omnis', 'omne'], '', 'adj3']] });
T(101, 'omnes libros lego.', 'I read all the books.', 'Z', ['I read the book.', 'All the boys read books.', 'He reads all the books.'], { u: 1, g: [[0, ['omnes', 'omnia', 'omnis', 'omnem'], '', 'adj3']] });
T(101, 'ducem fortem laudo.', 'I praise the brave leader.', 'S Z', ['The brave leader praises me.', 'I praise the brave leaders.', 'I praise the cruel leader.'], { u: 1, g: [[1, ['fortem', 'fortis', 'fortes', 'forti'], '', 'adj3']] });
T(101, 'servum tristem video.', 'I see the sad slave.', 'Z', ['The sad slave sees me.', 'I see the sad slaves.', 'I see the happy slave.'], { u: 1, g: [[1, ['tristem', 'tristis', 'tristes', 'tristi'], '', 'adj3']] });
T(101, 'milites crudeles timeo.', 'I fear the cruel soldiers.', 'S Z', ['The cruel soldiers fear me.', 'I fear the cruel soldier.', 'I praise the cruel soldiers.'], { u: 1 });
T(101, 'hic miles est fortis et validus.', 'This soldier is brave and strong.', 'S W Z', ['That soldier is brave and strong.', 'These soldiers are brave and strong.', 'This soldier is cruel and strong.'], {});
T(101, 'illa puella nobilis est.', 'That girl is noble.', 'W Z', ['This girl is noble.', 'Those girls are noble.', 'That girl is sad.'], { u: 1 });
T(101, 'cur tristis es, puer?', 'Why are you sad, boy?', 'Z', ['Why are you sad, boys?', 'Where are you, sad boy?', 'Why is the boy sad?'], {});
T(101, 'tristis sum quod magister crudelis est.', 'I am sad because the teacher is cruel.', 'Z', ['The teacher is cruel because I am sad.', 'I am sad because the teacher is noble.', 'He is sad because the teacher is cruel.'], {});
T(101, 'magister crudelis omnes pueros punit.', 'The cruel teacher punishes all the boys.', 'Z', ['All the boys punish the cruel teacher.', 'The cruel teacher punishes the boy.', 'The cruel teacher praises all the boys.'], { u: 1 });
T(101, 'librum facilem legimus.', 'We are reading an easy book.', 'Z', ['We are reading a difficult book.', 'They are reading an easy book.', 'We are reading easy books.'], { u: 1, g: [[1, ['facilem', 'facilis', 'facile', 'faciles'], '', 'adj3']] });
T(101, 'omnes puellae ludunt.', 'All the girls are playing.', 'Z', ['The girl is playing with everyone.', 'All the boys are playing.', 'All the girls are working.'], { u: 1 });
T(101, 'servi tristes dominum crudelem timent.', 'The sad slaves fear the cruel master.', 'Z', ['The cruel master fears the sad slaves.', 'The sad slave fears the cruel master.', 'The sad slaves fear the cruel masters.'], { u: 1 });
T(101, 'itinera difficilia saepe facimus.', 'We often make difficult journeys.', 'S Z', ['We often make easy journeys.', 'We often made a difficult journey.', 'They often make difficult journeys.'], { u: 1, g: [[1, ['difficilia', 'difficilis', 'difficile', 'difficiles'], '', 'adj3']] });
T(103, 'templum ingens aedificamus.', 'We are building a huge temple.', 'Z', ['We are building a small temple.', 'They are building a huge temple.', 'We are building huge temples.'], { u: 1 });
T(103, 'Roma erat urbs ingens.', 'Rome was a huge city.', 'S Z', ['Rome is a huge city.', 'Rome was a small city.', 'Rome was a beautiful city.'], { u: 1 });
T(103, 'dux sapiens milites fortes semper laudat.', 'The wise general always praises brave soldiers.', 'S Z', ['Brave soldiers always praise the wise general.', 'The wise general never praises brave soldiers.', 'The brave general always praises wise soldiers.'], {});
T(103, 'omnes milites Romani audaces erant.', 'All the Roman soldiers were daring.', 'S Z', ['All the Roman soldiers are daring.', 'The Roman soldier was daring.', 'Not all the Roman soldiers were daring.'], {});
T(103, 'milites ducem felicem semper amant.', 'Soldiers always love a lucky general.', 'S Z', ['A lucky general always loves his soldiers.', 'Soldiers never love a lucky general.', 'Soldiers always love a cruel general.'], { u: 1, g: [[2, ['felicem', 'felix', 'felices', 'felici'], '', 'adj3']] });
T(103, 'magister puerum sapientem laudat.', 'The teacher praises the wise boy.', 'Z', ['The wise boy praises the teacher.', 'The teacher praises the wise boys.', 'The teacher punishes the wise boy.'], { u: 1, g: [[2, ['sapientem', 'sapiens', 'sapientes', 'sapienti'], '', 'adj3']] });
T(116, 'senex et fortis et audax erat.', 'The old man was both brave and daring.', 'S V Z', ['The old man was brave but not daring.', 'The young man was both brave and daring.', 'The old man is both brave and daring.'], {});

// ── a: Comparison of adjectives (Ch 104, 106) ──
T(104, 'ille miles fortior quam hic miles est.', 'That soldier is braver than this soldier.', 'S W Z a', ['This soldier is braver than that soldier.', 'That soldier is the bravest soldier.', 'That soldier is as brave as this soldier.'], {});
T(104, 'illa puella sapientior est quam hic puer.', 'That girl is wiser than this boy.', 'W Z a', ['This boy is wiser than that girl.', 'That girl is very wise.', 'That girl is wiser than that boy.'], {});
T(104, 'magistri sapientiores sunt quam pueri.', 'Teachers are wiser than boys.', 'Z a', ['Boys are wiser than teachers.', 'Teachers are very wise.', 'The teacher is wiser than the boy.'], { u: 1, g: [[1, ['sapientiores', 'sapientior', 'sapientissimi', 'sapientes'], '', 'comp']] });
T(104, 'hoc templum altius quam illud est.', 'This temple is higher than that one.', 'W a', ['That temple is higher than this one.', 'This temple is very high.', 'This temple is as high as that one.'], {});
T(104, 'hoc opus non facile sed difficillimum est.', 'This task is not easy but very difficult.', 'S W Z a', ['This task is easy, not difficult.', 'This task is not easy but more difficult.', 'That task is not easy but very difficult.'], {});
T(104, 'milites Romani fortiores quam milites Graeci erant.', 'The Roman soldiers were braver than the Greek soldiers.', 'S Z a', ['The Greek soldiers were braver than the Roman soldiers.', 'The Roman soldiers were very brave.', 'The Roman soldiers are braver than the Greek soldiers.'], {});
T(106, 'ego sum puer bonus, sed tu es melior.', 'I am a good boy, but you (sg) are better.', 'a', ['I am a better boy than you (sg).', 'I am a good boy, but you (sg) are the best.', 'I am a bad boy, but you (sg) are worse.'], {});
T(106, 'Sextus puer pessimus est.', 'Sextus is a very bad boy.', 'a', ['Sextus is a very good boy.', 'Sextus is a worse boy.', 'Sextus was a very bad boy.'], { u: 1, g: [[2, ['pessimus', 'peior', 'malus', 'optimus'], '', 'irrcomp']] });
T(106, 'Iulius Caesar erat dux optimus.', 'Julius Caesar was a very good general.', 'S a', ['Julius Caesar was a better general.', 'Julius Caesar was a very bad general.', 'Julius Caesar is a very good general.'], { u: 1, g: [[4, ['optimus', 'melior', 'bonus', 'pessimus'], '', 'irrcomp']] });
T(106, 'hoc templum est maius quam illud.', 'This temple is bigger than that one.', 'W a', ['That temple is bigger than this one.', 'This temple is very big.', 'This temple is smaller than that one.'], {});
T(106, 'Italia maior quam Britannia est.', 'Italy is bigger than Britain.', 'a', ['Britain is bigger than Italy.', 'Italy is smaller than Britain.', 'Italy is very big.'], { u: 1, g: [[1, ['maior', 'minor', 'maxima', 'magna'], '', 'irrcomp']] });
T(106, 'illa puella minima est.', 'That girl is very small.', 'W a', ['That girl is smaller.', 'This girl is very small.', 'That girl is very big.'], { u: 1, g: [[2, ['minima', 'minor', 'maxima', 'parva'], '', 'irrcomp']] });
T(106, 'plurimi milites oppidum oppugnaverunt.', 'Very many soldiers attacked the town.', 'S a', ['A few soldiers attacked the town.', 'Very many soldiers defended the town.', 'More soldiers attacked the town.'], { u: 1 });
T(106, 'puellae meliores quam pueri sunt.', 'Girls are better than boys.', 'a', ['Boys are better than girls.', 'Girls are worse than boys.', 'Girls are very good.'], { u: 1 });
T(106, 'pueri peiores quam puellae sunt.', 'Boys are worse than girls.', 'a', ['Girls are worse than boys.', 'Boys are better than girls.', 'Boys are very bad.'], { u: 1, g: [[1, ['peiores', 'meliores', 'pessimi', 'mali'], '', 'irrcomp']] });
T(106, 'naves maximae appropinquabant.', 'Very big ships were approaching.', 'S a', ['Very small ships were approaching.', 'Bigger ships were approaching.', 'A very big ship was approaching.'], { u: 1 });
T(106, 'cibus matris tuae optimus erat.', 'Your mother’s food was very good.', 'S a', ['Your mother’s food was very bad.', 'Your mother’s food was better.', 'My mother’s food was very good.'], {});
T(107, 'cives Graeci sapientiores quam cives Romani erant.', 'The Greek citizens were wiser than the Roman citizens.', 'S Z a', ['The Roman citizens were wiser than the Greek citizens.', 'The Greek citizens were very wise.', 'The Greek citizens are wiser than the Roman citizens.'], {});
T(116, 'Graeci fortiores quam nos non sunt.', 'The Greeks are not braver than us.', 'X Z a', ['We are not braver than the Greeks.', 'The Greeks are braver than us.', 'The Greeks were not braver than us.'], {});

// ── b: possum and debeo (Ch 109, 113) ──
T(109, 'potest.', 'He is able.', 'b', ['They are able.', 'He was able.', 'I am able.'], { g: [[0, ['potest', 'possunt', 'potes', 'possum'], '', 'possum']], p: [[0, 'pn', '3s', 'possum']] });
T(109, 'poterat.', 'He was able.', 'b', ['He is able.', 'They were able.', 'He will be able.'], { p: [[0, 'pn', '3s', 'possum']] });
T(109, 'possumus.', 'We are able.', 'b', ['They are able.', 'We were able.', 'You (pl) are able.'], { g: [[0, ['possumus', 'potestis', 'possunt', 'potest'], '', 'possum']], p: [[0, 'pn', '1p', 'possum']] });
T(109, 'poterunt.', 'They will be able.', 'T b', ['They are able.', 'They were able.', 'He will be able.'], { p: [[0, 'pn', '3p', 'possum']] });
T(109, 'laborare possum.', 'I am able to work.', 'b', ['I am able to sleep.', 'He is able to work.', 'I was able to work.'], { g: [[1, ['possum', 'potest', 'possunt', 'potes'], '', 'possum']] });
T(109, 'effugere potest.', 'He can escape.', 'b', ['They can escape.', 'He could escape.', 'He cannot escape.'], {});
T(109, 'vincere possumus.', 'We can win.', 'b', ['We cannot win.', 'They can win.', 'We could win.'], {});
T(109, 'exspectare non poteram.', 'I could not wait.', 'b', ['I can wait.', 'He could not wait.', 'I cannot wait.'], { g: [[2, ['poteram', 'possum', 'poterat', 'potero'], 'T', 'possum']] });
T(109, 'fugere poterant.', 'They were able to flee.', 'b', ['They are able to flee.', 'He was able to flee.', 'They were not able to flee.'], {});
T(109, 'redire non possum.', 'I cannot return.', 'U b', ['I can return.', 'He cannot return.', 'I could not return.'], { u: 1 });
T(109, 'dormire non possum.', 'I cannot sleep.', 'b', ['I can sleep.', 'They cannot sleep.', 'I could not sleep.'], { u: 1 });
T(109, 'nautae ad insulam navigare poterant.', 'The sailors were able to sail to the island.', 'b', ['The sailors were not able to sail to the island.', 'The sailor was able to sail to the island.', 'The sailors are able to sail to the island.'], { u: 1 });
T(109, 'hostes vincere numquam poterimus.', 'We shall never be able to conquer the enemy.', 'S T b', ['The enemy will never be able to conquer us.', 'We were never able to conquer the enemy.', 'We shall soon be able to conquer the enemy.'], { u: 1 });
T(109, 'milites urbem delere non poterant.', 'The soldiers could not destroy the city.', 'S b', ['The soldiers were able to destroy the city.', 'The soldier could not destroy the city.', 'The soldiers cannot destroy the city.'], { u: 1 });
T(109, 'servi ex oppido effugere non poterant.', 'The slaves could not escape from the town.', 'b', ['The slaves were able to escape from the town.', 'The slaves could not enter the town.', 'The slave could not escape from the town.'], {});
T(109, 'Romani tela iacere non poterant.', 'The Romans could not throw their spears.', 'b', ['The Romans were able to throw their spears.', 'The Romans could not carry their spears.', 'The Romans cannot throw their spears.'], { u: 1 });
T(109, 'ille rex bene regere non potest.', 'That king cannot rule well.', 'S W b', ['That king can rule well.', 'This king cannot rule well.', 'That king could not rule well.'], {});
T(109, 'ad urbem hodie venire non potuimus.', 'We were not able to come to the city today.', 'S b', ['We were able to come to the city today.', 'They were not able to come to the city today.', 'We shall not be able to come to the city tomorrow.'], {});
T(109, 'magistri omnia facere non possunt.', 'Teachers cannot do everything.', 'Z b', ['Teachers can do everything.', 'A teacher cannot do everything.', 'Teachers could not do everything.'], { u: 1 });
T(113, 'hostes urbem capere debebant.', 'The enemy had to capture the city.', 'S b', ['The enemy had to defend the city.', 'The enemy must capture the city.', 'The enemy were able to capture the city.'], { u: 1 });
T(113, 'milites celeriter currere debent.', 'The soldiers must run quickly.', 'S b', ['The soldiers can run quickly.', 'The soldier must run quickly.', 'The soldiers had to run quickly.'], { u: 1 });
T(113, 'magistri pueros terrere non debent.', 'Teachers ought not to frighten boys.', 'b', ['Boys ought not to frighten teachers.', 'Teachers ought to frighten boys.', 'Teachers cannot frighten boys.'], { u: 1 });
T(113, 'hoc statim facere debeo.', 'I must do this at once.', 'W b', ['I can do this at once.', 'He must do this at once.', 'I must do that at once.'], { u: 1 });
T(113, 'libros semper legere debetis, pueri!', 'You must always read books, boys!', 'b', ['You must never read books, boys!', 'Boys always read books!', 'You must always read books, boy!'], {});
T(113, 'servi cibum mox parare debebunt.', 'The slaves will soon have to prepare the food.', 'T b', ['The slaves soon had to prepare the food.', 'The slaves will soon be able to prepare the food.', 'The slave will soon have to prepare the food.'], { u: 1 });
T(116, 'hostes flumen transire non poterant.', 'The enemy could not cross the river.', 'S U b', ['The enemy were able to cross the river.', 'The enemy could not cross the sea.', 'The enemy cannot cross the river.'], { u: 1 });

// ── c: Prohibitions — noli, nolite (Ch 111) ──
T(111, 'noli ridere, puer!', 'Do not laugh, boy!', 'c', ['Do not laugh, boys!', 'Laugh, boy!', 'The boy is not laughing.'], { g: [[2, ['puer', 'pueri', 'puerum', 'puero'], '', 'noli']] });
T(111, 'nolite ridere, pueri!', 'Do not laugh, boys!', 'c', ['Do not laugh, boy!', 'Laugh, boys!', 'The boys are not laughing.'], { g: [[0, ['nolite', 'noli', 'non'], '', 'noli']] });
T(111, 'nolite oppugnare, milites!', 'Do not attack, soldiers!', 'S c', ['Do not attack, soldier!', 'Attack, soldiers!', 'The soldiers are not attacking.'], { g: [[0, ['nolite', 'noli', 'non'], '', 'noli']] });
T(111, 'nolite effugere, servi!', 'Do not escape, slaves!', 'c', ['Do not escape, slave!', 'Escape, slaves!', 'The slaves do not escape.'], {});
T(111, 'noli exspectare, amice!', 'Do not wait, friend!', 'c', ['Do not wait, friends!', 'Wait, friend!', 'My friend is not waiting.'], { g: [[0, ['noli', 'nolite', 'non'], '', 'noli']] });
T(111, 'noli discedere, mater!', 'Do not leave, mother!', 'S c', ['Leave, mother!', 'Do not leave, mothers!', 'Mother is not leaving.'], {});
T(111, 'noli flere, femina!', 'Do not cry, woman!', 'c', ['Do not cry, women!', 'Cry, woman!', 'The woman is not crying.'], { g: [[2, ['femina', 'feminae', 'feminam', 'feminas'], '', 'noli']] });
T(111, 'nolite timere, comites!', 'Do not be afraid, companions!', 'S c', ['Do not be afraid, companion!', 'Be afraid, companions!', 'The companions are not afraid.'], {});
T(111, 'nolite oppidum oppugnare, milites!', 'Do not attack the town, soldiers!', 'S c', ['Attack the town, soldiers!', 'Do not attack the town, soldier!', 'Do not defend the town, soldiers!'], {});
T(111, 'noli iter longum facere, amice!', 'Do not make a long journey, friend!', 'S c', ['Make a long journey, friend!', 'Do not make a long journey, friends!', 'My friend is not making a long journey.'], {});
T(111, 'noli hunc servum punire, domine!', 'Do not punish this slave, master!', 'W c', ['Punish this slave, master!', 'Do not punish that slave, master!', 'Do not punish these slaves, master!'], {});
T(111, 'noli e templo exire, puer!', 'Do not go out of the temple, boy!', 'U c', ['Do not go into the temple, boy!', 'Go out of the temple, boy!', 'Do not go out of the temple, boys!'], {});
T(111, 'noli hoc vinum bibere, mater!', 'Do not drink this wine, mother!', 'S W c', ['Drink this wine, mother!', 'Do not drink that wine, mother!', 'Mother does not drink this wine.'], {});
T(111, 'nolite hostes vulnerare, milites!', 'Do not wound the enemy, soldiers!', 'S c', ['Wound the enemy, soldiers!', 'Do not wound the enemy, soldier!', 'Do not fear the enemy, soldiers!'], {});
T(111, 'noli flumen transire, nauta!', 'Do not cross the river, sailor!', 'S U c', ['Cross the river, sailor!', 'Do not cross the river, sailors!', 'The sailor does not cross the river.'], {});
T(116, 'nolite me relinquere, comites!', 'Do not leave me behind, companions!', 'S X c', ['Leave me behind, companions!', 'Do not leave me behind, companion!', 'Do not leave them behind, companions!'], {});

// ── d: Questions with nonne and num (Ch 112) ──
T(112, 'num clamat?', 'He isn’t shouting, is he?', 'd', ['He is shouting, isn’t he?', 'Is he shouting?', 'He is shouting.'], { g: [[0, ['num', 'nonne'], '', 'nonne']] });
T(112, 'nonne flet?', 'He is crying, isn’t he?', 'd', ['He isn’t crying, is he?', 'Is he crying?', 'He is not crying.'], { g: [[0, ['nonne', 'num'], '', 'nonne']] });
T(112, 'nonne pugnant?', 'They are fighting, aren’t they?', 'd', ['They aren’t fighting, are they?', 'Are they fighting?', 'They are not fighting.'], {});
T(112, 'num currebant?', 'They weren’t running, were they?', 'd', ['They were running, weren’t they?', 'Were they running?', 'They were not running.'], {});
T(112, 'nonne bene pugnabat?', 'He was fighting well, wasn’t he?', 'd', ['He wasn’t fighting well, was he?', 'Was he fighting well?', 'He was not fighting well.'], {});
T(112, 'num hic miles fortis est?', 'This soldier isn’t brave, is he?', 'W Z d', ['This soldier is brave, isn’t he?', 'Is this soldier brave?', 'That soldier isn’t brave, is he?'], {});
T(112, 'nonne Hector audax erat?', 'Hector was daring, wasn’t he?', 'Z d', ['Hector wasn’t daring, was he?', 'Was Hector daring?', 'Hector is daring, isn’t he?'], { g: [[0, ['nonne', 'num'], '', 'nonne']] });
T(112, 'nonne cives urbem bene defendebant?', 'The citizens were defending the city well, weren’t they?', 'S d', ['The citizens weren’t defending the city well, were they?', 'Were the citizens defending the city well?', 'The citizens were attacking the city, weren’t they?'], {});
T(112, 'num puer hoc fecit?', 'The boy didn’t do this, did he?', 'W d', ['The boy did this, didn’t he?', 'Did the boy do this?', 'The boy will not do this, will he?'], {});
T(112, 'num Graeci Romanos vicerunt?', 'The Greeks didn’t conquer the Romans, did they?', 'd', ['The Greeks conquered the Romans, didn’t they?', 'The Romans didn’t conquer the Greeks, did they?', 'Did the Greeks conquer the Romans?'], { g: [[0, ['num', 'nonne'], '', 'nonne']] });
T(112, 'num omnes mortem timent?', 'Not everyone fears death, do they?', 'S Z d', ['Everyone fears death, don’t they?', 'Does everyone fear death?', 'No one fears death.'], {});
T(112, 'nonne matrem tuam amas?', 'You love your mother, don’t you?', 'S d', ['You don’t love your mother, do you?', 'Do you love your mother?', 'Your mother loves you, doesn’t she?'], {});
T(112, 'num femina hoc facere poterit?', 'A woman will not be able to do this, will she?', 'T W b d', ['A woman will be able to do this, won’t she?', 'Will a woman be able to do this?', 'A woman was not able to do this, was she?'], {});
T(116, 'nonne milites Graeci felicissimi erant?', 'The Greek soldiers were very lucky, weren’t they?', 'S Z a d', ['The Greek soldiers weren’t very lucky, were they?', 'Were the Greek soldiers lucky?', 'The Greek soldiers were luckier, weren’t they?'], {});

// ── e: Reflexive pronoun se (Ch 115) ──
T(115, 'ille puer se amat.', 'That boy loves himself.', 'W e', ['That boy loves him.', 'This boy loves himself.', 'Those boys love themselves.'], { u: 1, g: [[2, ['se', 'eum', 'sui', 'sibi'], '', 'se']] });
T(115, 'Troiani se defendere paraverunt.', 'The Trojans prepared to defend themselves.', 'e', ['The Trojans prepared to defend them.', 'The Greeks prepared to defend themselves.', 'The Trojans prepared to attack themselves.'], { u: 1 });
T(115, 'illa puella se semper spectat.', 'That girl is always looking at herself.', 'W e', ['That girl is always looking at her.', 'This girl is never looking at herself.', 'Those girls are always looking at themselves.'], { u: 1 });
T(115, 'pueri sapientes se numquam laudant.', 'Wise boys never praise themselves.', 'Z e', ['Wise boys always praise themselves.', 'Wise boys never praise them.', 'A wise boy never praises himself.'], { u: 1 });
T(115, 'cives Troiani se fortiter defendebant.', 'The Trojan citizens were defending themselves bravely.', 'S e', ['The Trojan citizens were defending them bravely.', 'The Trojan citizens defended themselves badly.', 'The Trojan citizen was defending himself bravely.'], { u: 1 });
T(115, 'ille miles se gladio suo vulneravit.', 'That soldier wounded himself with his own sword.', 'S W e', ['That soldier wounded him with his own sword.', 'This soldier wounded himself with his own spear.', 'Those soldiers wounded themselves with their swords.'], {});
T(115, 'multae feminae in flumine se spectabant.', 'Many women were looking at themselves in the river.', 'S e', ['Many women were looking at them in the river.', 'A woman was looking at herself in the river.', 'Many women were swimming in the river.'], {});
// ── From the first Fuga Romana (the illustrated Escape-room edition) ──
// These 15 sentences were written for that game, not taken from Bass.
T(48, 'Festina! Nauta aquam portat.', 'Hurry! The sailor is carrying water.', 'A B M', ['Stop! The farmer is carrying fire.', 'Hurry! The farmer is carrying food.', 'Stop! The sailor is carrying gold.'], { u: 1, g: [[3, ['portat', 'portant', 'portas', 'porto']]], p: [[3, 'pn', '3s']] });
T(38, 'servus in horto est.', 'The slave is in the garden.', 'D H I J', ['The slaves are in the garden.', 'The slave is in the field.', 'The slave is near the garden.'], { u: 1, g: [[3, ['est', 'sunt', 'es', 'sum']]], p: [[2, 'case', 'abl sg']] });
T(25, 'dominus servum videt.', 'The master sees the slave.', 'A I', ['The slave sees the master.', 'The masters see the slave.', 'The master sees the slaves.'], { u: 1, g: [[2, ['videt', 'vident', 'vides', 'videtis']]], p: [[2, 'pn', '3s']] });
T(42, 'Socii in agro pugnant. Vir scutum tenet.', 'The allies fight in the field. The man holds a shield.', 'A I J L', ['The allies stand in the camp. The man carries a sword.', 'The friends run in the forum. The man sees a shield.', 'The slaves fight in the town. The man has a spear.'], { u: 1, p: [[3, 'pn', '3p']] });
T(37, 'Vir Romanus semper fortiter pugnat.', 'A Roman man always fights bravely.', 'A E I', ['A Roman man often walks slowly.', 'A Roman woman never sings well.', 'A brave man always runs quickly.'], { u: 1, g: [[4, ['pugnat', 'pugnant', 'pugnas', 'pugnamus']]] });
T(42, 'Socii ad murum currunt et oppidum oppugnant.', 'The allies run to the wall and attack the town.', 'A F I J L', ['The allies walk from the wall and defend the town.', 'The slaves run to the gate and enter the town.', 'The friends hurry from the temple and watch the town.'], { u: 1, p: [[3, 'pn', '3p']] });
T(38, 'puella cibum in villam portat.', 'The girl carries food into the house.', 'A B I J', ['The girl carries food out of the house.', 'The girls carry food into the house.', 'The girl carries water into the house.'], { u: 1, g: [[4, ['portat', 'portant', 'portas', 'portamus']]], p: [[3, 'case', 'acc sg']] });
T(38, 'Filia mea in villa manet.', 'My daughter stays in the house.', 'A B E J', ['My daughter stays near the house.', 'My daughters stay in the house.', 'My daughter leaves the house.'], { u: 1, g: [[4, ['manet', 'manes', 'maneo', 'manent']]], p: [[4, 'pn', '3s']] });
T(37, 'Vir iratus filium vocat et servum terret.', 'The angry man calls his son and frightens the slave.', 'A E I', ['The happy man sees his daughter and calls the slave.', 'The tired man calls his son and moves the slave.', 'The wretched man calls his son and praises the slave.'], { p: [[3, 'pn', '3s']] });
T(38, 'Nautae ad insulam navigant quod ventus bonus est.', 'The sailors sail to the island because the wind is good.', 'A B C D E I J', ['The sailors sail across the sea because the water is good.', 'The sailors sail from the island because the wind is bad.', 'The sailors sail to the town because the road is good.'], { p: [[3, 'pn', '3p']] });
T(42, 'Nauta aurum et vinum portat.', 'The sailor carries gold and wine.', 'A B L', ['The sailor carries money and arrows.', 'The sailor carries food and water.', 'The sailor carries a book and a sword.'], { u: 1, g: [[4, ['portat', 'portant', 'portas', 'porto']]] });
T(77, 'hostes oppidum nunc oppugnant.', 'The enemy are attacking the town now.', 'S', ['The enemy are defending the town now.', 'The enemy is attacking the town now.', 'The town is attacking the enemy now.'], { u: 1, g: [[3, ['oppugnant', 'oppugnat', 'oppugnas', 'oppugnamus']]], p: [[3, 'pn', '3p']] });
T(37, 'Magister bonos pueros laudat, malos pueros monet.', 'The teacher praises the good boys, warns the bad boys.', 'A E I', ['The farmer praises the good sons, watches the bad daughters.', 'The teacher frightens the good boys, praises the bad boys.', 'The master praises the good slaves, orders the bad slaves.'], { u: 1, p: [[3, 'pn', '3s']] });
T(38, 'Puer bonus in via stat.', 'The good boy is standing in the street.', 'A E I J', ['The good boys are standing in the street.', 'The good boy is walking in the street.', 'The good boy is standing near the street.'], { u: 1, g: [[4, ['stat', 'stant', 'stas', 'statis']]], p: [[4, 'pn', '3s']] });
T(38, 'Ubi est via ad forum?', 'Where is the road to the forum?', 'B C D J L', ['Why is the street from the temple?', 'Where is the wall near the harbour?', 'When is the road into the town?'], { u: 1 });

// ════════════════════════════════════════════════════════════════
// CE LEVEL 3 AND SCHOLARSHIP — every Latin sentence comes from the
// Latin-to-English exercises in Prep School Latin (R. C. Bass, 2018),
// Chapters 117–154. Level 3 sentences carry only their Level 3 keys and
// Scholarship sentences only their Scholarship keys (plus any lower-level
// key that matters): ticking a higher level assumes the levels below it.
// The English and the wrong English options were written for this game.
// ════════════════════════════════════════════════════════════════
T(118, 'amamur.', 'We are loved.', 'f', ['We love.', 'They are loved.', 'We were loved.'], { g: [[0, ['amamur', 'amamus', 'amantur', 'amabamur']]], p: [[0, 'pn', '1p'], [0, 'tense', 'pres']] });
T(118, 'liberamur.', 'We are set free.', 'f', ['We set free.', 'You (pl) are set free.', 'We will be set free.'], { p: [[0, 'pn', '1p']] });
T(118, 'portatur.', 'He is carried.', 'f', ['He carries.', 'They are carried.', 'He was carried.'], { g: [[0, ['portatur', 'portat', 'portantur', 'portabatur']]], p: [[0, 'pn', '3s'], [0, 'tense', 'pres']] });
T(118, 'vulnerantur.', 'They are wounded.', 'f', ['They wound.', 'He is wounded.', 'They will be wounded.'], { p: [[0, 'pn', '3p']] });
T(118, 'laudamini.', 'You (pl) are praised.', 'f', ['You (pl) praise.', 'We are praised.', 'You (sg) are praised.'], { p: [[0, 'pn', '2p']] });
T(118, 'vocaris.', 'You (sg) are called.', 'f', ['You (sg) call.', 'You (pl) are called.', 'He is called.'], { p: [[0, 'pn', '2s']] });
T(118, 'portor.', 'I am carried.', 'f', ['I carry.', 'He is carried.', 'I was carried.'], { p: [[0, 'pn', '1s'], [0, 'tense', 'pres']] });
T(118, 'spectamini.', 'You (pl) are watched.', 'f', ['You (pl) watch.', 'They are watched.', 'We are watched.'], { p: [[0, 'pn', '2p']] });
T(118, 'monetur.', 'He is warned.', 'f', ['He warns.', 'They are warned.', 'He will be warned.'], { p: [[0, 'pn', '3s']] });
T(118, 'delentur.', 'They are destroyed.', 'f', ['They destroy.', 'It is destroyed.', 'They were destroyed.'], { g: [[0, ['delentur', 'delent', 'deletur', 'delebantur']]], p: [[0, 'pn', '3p'], [0, 'tense', 'pres']] });
T(118, 'videmini.', 'You (pl) are seen.', 'f', ['You (pl) see.', 'We are seen.', 'You (sg) are seen.'], { p: [[0, 'pn', '2p']] });
T(118, 'terreris.', 'You (sg) are frightened.', 'f', ['You (sg) frighten.', 'He is frightened.', 'You (pl) are frightened.'], { p: [[0, 'pn', '2s']] });
T(118, 'iubemur.', 'We are ordered.', 'f', ['We order.', 'They are ordered.', 'We were ordered.'], { p: [[0, 'pn', '1p']] });
T(118, 'regimur.', 'We are ruled.', 'f', ['We rule.', 'They are ruled.', 'We will be ruled.'], { p: [[0, 'pn', '1p']] });
T(118, 'mitteris.', 'You (sg) are sent.', 'f', ['You (sg) send.', 'He is sent.', 'You (pl) are sent.'], { p: [[0, 'pn', '2s']] });
T(118, 'traduntur.', 'They are handed over.', 'f', ['They hand over.', 'He is handed over.', 'They were handed over.'], { p: [[0, 'pn', '3p']] });
T(118, 'vincuntur.', 'They are conquered.', 'f', ['They conquer.', 'He is conquered.', 'They will conquer.'], { g: [[0, ['vincuntur', 'vincunt', 'vincitur', 'vincebantur']]], p: [[0, 'pn', '3p']] });
T(118, 'auditur.', 'He is heard.', 'f', ['He hears.', 'They are heard.', 'He was heard.'], { p: [[0, 'pn', '3s']] });
T(118, 'punimur.', 'We are punished.', 'f', ['We punish.', 'They are punished.', 'You (pl) are punished.'], { p: [[0, 'pn', '1p']] });
T(118, 'puniris.', 'You (sg) are punished.', 'f', ['You (sg) punish.', 'You (pl) are punished.', 'He is punished.'], { p: [[0, 'pn', '2s']] });
T(118, 'defendimur.', 'We are defended.', 'f', ['We defend.', 'They are defended.', 'We were defended.'], { p: [[0, 'pn', '1p']] });
T(118, 'legitur.', 'It is read.', 'f', ['He reads.', 'They are read.', 'It was read.'], { p: [[0, 'pn', '3s']] });
T(118, 'miles gladio vulneratur.', 'The soldier is wounded by a sword.', 'f', ['The soldier wounds with a sword.', 'The soldiers are wounded by a sword.', 'The soldier was wounded by a sword.'], { u: 1, g: [[2, ['vulneratur', 'vulnerat', 'vulnerantur', 'vulnerabatur']]] });
T(118, 'urbs ab hostibus oppugnatur.', 'The city is attacked by the enemy.', 'f', ['The city attacks the enemy.', 'The enemy are attacked by the city.', 'The city was attacked by the enemy.'], { u: 1, g: [[3, ['oppugnatur', 'oppugnat', 'oppugnantur', 'oppugnant']]] });
T(118, 'naves tempestate delentur.', 'The ships are destroyed by a storm.', 'f', ['The ships destroy the storm.', 'The ship is destroyed by a storm.', 'The ships were destroyed by a storm.'], { u: 1, g: [[2, ['delentur', 'delent', 'deletur', 'delebunt']]] });
T(118, 'ab hostibus non amamur.', 'We are not loved by the enemy.', 'f', ['We do not love the enemy.', 'The enemy are not loved by us.', 'They are not loved by the enemy.'], { u: 1, g: [[3, ['amamur', 'amamus', 'amantur', 'amatur']]] });
T(119, 'ab hostibus spectamur.', 'We are watched by the enemy.', 'f', ['We watch the enemy.', 'They are watched by the enemy.', 'We were watched by the enemy.'], { u: 1 });
T(119, 'hostes gladiis occiduntur.', 'The enemy are killed with swords.', 'f', ['The enemy kill with swords.', 'The enemy is killed with a sword.', 'The enemy were killed with swords.'], { u: 1, g: [[2, ['occiduntur', 'occidunt', 'occiditur', 'occidebantur']]] });
T(119, 'milites sagittis vulnerantur.', 'The soldiers are wounded by arrows.', 'f', ['The soldiers wound with arrows.', 'The soldier is wounded by arrows.', 'The soldiers will be wounded by arrows.'], { u: 1 });
T(119, 'Patroclus ab Hectore occiditur.', 'Patroclus is killed by Hector.', 'f', ['Patroclus kills Hector.', 'Hector is killed by Patroclus.', 'Patroclus was killed by Hector.'], { u: 1, g: [[3, ['occiditur', 'occidit', 'occiduntur', 'occidebat']]] });
T(119, 'Hector ab Achille occiditur.', 'Hector is killed by Achilles.', 'f', ['Hector kills Achilles.', 'Achilles is killed by Hector.', 'Hector will be killed by Achilles.'], { u: 1 });
T(119, 'muri Troiae non delentur.', 'The walls of Troy are not destroyed.', 'f', ['The walls do not destroy Troy.', 'The wall of Troy is not destroyed.', 'The walls of Troy were not destroyed.'], { u: 1 });
T(119, 'equus prope urbem Troiam ponitur.', 'The horse is placed near the city of Troy.', 'f', ['The horse places Troy near the city.', 'The horses are placed near the city of Troy.', 'The horse was placed near the city of Troy.'], { u: 1 });
T(119, 'mox naves trans mare ad urbem Troiam mittuntur.', 'Soon ships are sent across the sea to the city of Troy.', 'f', ['Soon ships send men across the sea to Troy.', 'Soon a ship is sent across the sea to Troy.', 'Soon ships were sent across the sea to Troy.']);
T(130, 'portabantur.', 'They were being carried.', 'f', ['They were carrying.', 'They are being carried.', 'He was being carried.'], { g: [[0, ['portabantur', 'portabant', 'portantur', 'portabatur']]], p: [[0, 'pn', '3p'], [0, 'tense', 'impf']] });
T(130, 'audiar.', 'I shall be heard.', 'f', ['I shall hear.', 'I am heard.', 'He will be heard.'], { p: [[0, 'pn', '1s'], [0, 'tense', 'fut']] });
T(130, 'regebamur.', 'We were being ruled.', 'f', ['We were ruling.', 'We are ruled.', 'They were being ruled.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'impf']] });
T(130, 'legebatur.', 'It was being read.', 'f', ['He was reading.', 'It is being read.', 'They were being read.'], { p: [[0, 'pn', '3s'], [0, 'tense', 'impf']] });
T(130, 'timebor.', 'I shall be feared.', 'f', ['I shall fear.', 'I was feared.', 'He will be feared.'], { p: [[0, 'pn', '1s'], [0, 'tense', 'fut']] });
T(130, 'vocabor.', 'I shall be called.', 'f', ['I shall call.', 'I am called.', 'You (sg) will be called.'], { g: [[0, ['vocabor', 'vocabo', 'vocor', 'vocabar']]], p: [[0, 'pn', '1s'], [0, 'tense', 'fut']] });
T(130, 'laudor.', 'I am praised.', 'f', ['I praise.', 'I shall be praised.', 'He is praised.'], { p: [[0, 'pn', '1s'], [0, 'tense', 'pres']] });
T(130, 'capiemur.', 'We shall be captured.', 'f', ['We shall capture.', 'We are captured.', 'They will be captured.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'fut']] });
T(130, 'non vincar.', 'I shall not be conquered.', 'f', ['I shall not conquer.', 'I am not conquered.', 'He will not be conquered.'], { p: [[1, 'pn', '1s'], [1, 'tense', 'fut']] });
T(130, 'iubebamur.', 'We were being ordered.', 'f', ['We were ordering.', 'We are ordered.', 'You (pl) were being ordered.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'impf']] });
T(130, 'parabantur.', 'They were being prepared.', 'f', ['They were preparing.', 'It was being prepared.', 'They will be prepared.'], { p: [[0, 'pn', '3p'], [0, 'tense', 'impf']] });
T(130, 'movemur.', 'We are moved.', 'f', ['We move.', 'They are moved.', 'We were being moved.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'pres']] });
T(130, 'templa urbis mox ab hostibus delebuntur.', 'The temples of the city will soon be destroyed by the enemy.', 'f', ['The enemy will soon destroy the city with the temples.', 'The temple of the city will soon be destroyed by the enemy.', 'The temples of the city were soon destroyed by the enemy.'], { u: 1, g: [[5, ['delebuntur', 'delebunt', 'delentur', 'delebitur']]] });
T(130, 'multi servi per vias ducebantur.', 'Many slaves were being led through the streets.', 'f', ['Many slaves were leading through the streets.', 'Many slaves are led through the streets.', 'Many slaves will be led through the streets.'], { u: 1, g: [[4, ['ducebantur', 'ducebant', 'ducuntur', 'ducebatur']]] });
T(130, 'ille dux a multis militibus non amatur.', 'That leader is not loved by many soldiers.', 'f', ['That leader does not love many soldiers.', 'Many soldiers are not loved by that leader.', 'That leader was not loved by many soldiers.'], { u: 1 });
T(130, 'Romani ab hostibus numquam vincentur.', 'The Romans will never be conquered by the enemy.', 'f', ['The Romans will never conquer the enemy.', 'The Romans are never conquered by the enemy.', 'The Roman will never be conquered by the enemy.'], { u: 1, g: [[4, ['vincentur', 'vincent', 'vincuntur', 'vincetur']]] });
T(130, 'pueri ab illo magistro saepe puniuntur.', 'The boys are often punished by that teacher.', 'f', ['The boys often punish that teacher.', 'The boy is often punished by that teacher.', 'The boys were often punished by that teacher.'], { u: 1, g: [[5, ['puniuntur', 'puniunt', 'punitur', 'puniebant']]] });
T(130, 'ab hostibus oppugnamur!', 'We are being attacked by the enemy!', 'f', ['We are attacking the enemy!', 'They are being attacked by the enemy!', 'We were attacked by the enemy!'], { u: 1 });
T(130, 'multi equi ex agris ducebantur.', 'Many horses were being led out of the fields.', 'f', ['Many horses were leading out of the fields.', 'Many horses are led out of the fields.', 'Many horses will be led out of the fields.'], { u: 1 });
T(130, 'laudaris quod fortis es, puer!', 'You are praised because you are brave, boy!', 'f', ['You praise because you are brave, boy!', 'He is praised because he is brave, boy!', 'You were praised because you were brave, boy!'], { u: 1 });
T(130, 'ego ab omnibus puellis amor.', 'I am loved by all the girls.', 'f', ['I love all the girls.', 'All the girls are loved by me.', 'I was loved by all the girls.'], { u: 1, g: [[4, ['amor', 'amo', 'amatur', 'amabor']]] });
T(130, 'dominus a servis timetur quod crudelis est.', 'The master is feared by the slaves because he is cruel.', 'f', ['The master fears the slaves because he is cruel.', 'The slaves are feared by the master because they are cruel.', 'The master was feared by the slaves because he was cruel.'], { u: 1 });
T(130, 'multi agri ab hostibus delebantur.', 'Many fields were being destroyed by the enemy.', 'f', ['Many fields were destroying the enemy.', 'Many fields are destroyed by the enemy.', 'Many fields will be destroyed by the enemy.'], { u: 1 });
T(130, 'verba longa a pueris parvis non saepe dicuntur.', 'Long words are not often said by small boys.', 'f', ['Small boys often say long words.', 'A long word is not often said by small boys.', 'Long words were not often said by small boys.']);
T(130, 'hic servus a domino cras punietur.', 'This slave will be punished by the master tomorrow.', 'f', ['This slave will punish the master tomorrow.', 'This slave is punished by the master today.', 'These slaves will be punished by the master tomorrow.'], { u: 1, g: [[5, ['punietur', 'puniet', 'punitur', 'punientur']]] });
T(130, 'cena bona a matre parabitur.', 'A good dinner will be prepared by mother.', 'f', ['Mother will eat a good dinner.', 'A good dinner is prepared by mother.', 'A good dinner was being prepared by mother.'], { u: 1, g: [[4, ['parabitur', 'parabit', 'paratur', 'parabantur']]] });
T(130, 'templum magnum in hoc monte aedificabitur.', 'A great temple will be built on this mountain.', 'f', ['A great temple was built on this mountain.', 'Great temples will be built on this mountain.', 'He will build a great temple on this mountain.'], { u: 1 });
T(130, 'multi discipuli a magistro cras laudabuntur.', 'Many pupils will be praised by the teacher tomorrow.', 'f', ['Many pupils will praise the teacher tomorrow.', 'One pupil will be praised by the teacher tomorrow.', 'Many pupils were praised by the teacher yesterday.'], { u: 1 });
T(121, 'visus est.', 'He was seen.', 'g', ['He saw.', 'She was seen.', 'They were seen.'], { p: [[0, 'tense', 'perf', null, 'phrase']] });
T(121, 'interfecta est.', 'She was killed.', 'g', ['She killed.', 'He was killed.', 'They were killed.']);
T(121, 'visi sunt.', 'They were seen.', 'g', ['They saw.', 'He was seen.', 'They are seen.'], { p: [[1, 'pn', '3p']] });
T(121, 'interfecti sumus.', 'We were killed.', 'g', ['We killed.', 'They were killed.', 'We are killed.'], { p: [[1, 'pn', '1p']] });
T(121, 'portatae sumus.', 'We (f) were carried.', 'g', ['We carried.', 'They (f) were carried.', 'We are carried.']);
T(121, 'victi sunt.', 'They were conquered.', 'g', ['They conquered.', 'He was conquered.', 'They are conquered.'], { p: [[1, 'pn', '3p'], [0, 'tense', 'perf', null, 'phrase']] });
T(121, 'vulnerata es.', 'You (sg, f) were wounded.', 'g', ['You wounded.', 'She was wounded.', 'You (pl) were wounded.'], { p: [[1, 'pn', '2s']] });
T(121, 'missus sum.', 'I was sent.', 'g', ['I sent.', 'He was sent.', 'I am sent.'], { g: [[1, ['sum', 'est', 'sunt', 'sumus']]], p: [[1, 'pn', '1s'], [0, 'tense', 'perf', null, 'phrase']] });
T(121, 'capta est.', 'She was captured.', 'g', ['She captured.', 'He was captured.', 'She is captured.']);
T(121, 'capti estis.', 'You (pl) were captured.', 'g', ['You (pl) captured.', 'We were captured.', 'You (sg) were captured.'], { g: [[1, ['estis', 'es', 'sunt', 'sumus']]], p: [[1, 'pn', '2p']] });
T(121, 'puniti sumus.', 'We were punished.', 'g', ['We punished.', 'They were punished.', 'We are punished.'], { p: [[1, 'pn', '1p']] });
T(121, 'dictum est.', 'It was said.', 'g', ['He said.', 'They were said.', 'It is said.']);
T(121, 'moniti estis.', 'You (pl) were warned.', 'g', ['You (pl) warned.', 'They were warned.', 'You (sg) were warned.'], { p: [[1, 'pn', '2p']] });
T(121, 'puer punitus est.', 'The boy was punished.', 'g', ['The boy punished.', 'The boys were punished.', 'The boy is punished.'], { u: 1, g: [[1, ['punitus', 'puniti', 'punita', 'punitum']]] });
T(121, 'oppidum oppugnatum est.', 'The town was attacked.', 'g', ['The town attacked.', 'The towns were attacked.', 'The town is being attacked.'], { u: 1, g: [[1, ['oppugnatum', 'oppugnatus', 'oppugnata', 'oppugnati']]] });
T(121, 'pueri puniti sunt.', 'The boys were punished.', 'g', ['The boys punished.', 'The boy was punished.', 'The boys are punished.'], { u: 1, g: [[1, ['puniti', 'punitus', 'punitae', 'punita']]] });
T(121, 'puellae visae sunt.', 'The girls were seen.', 'g', ['The girls saw.', 'The girl was seen.', 'The girls are seen.'], { u: 1, g: [[1, ['visae', 'visa', 'visi', 'visus']]] });
T(121, 'templum aedificatum est.', 'The temple was built.', 'g', ['The temple built.', 'The temples were built.', 'The temple is being built.'], { u: 1 });
T(121, 'templa aedificata sunt.', 'The temples were built.', 'g', ['The temples built.', 'The temple was built.', 'The temples will be built.'], { u: 1, g: [[1, ['aedificata', 'aedificatum', 'aedificati', 'aedificatae']]] });
T(121, 'mater amata est.', 'The mother was loved.', 'g', ['The mother loved.', 'The mothers were loved.', 'The mother is loved.'], { u: 1 });
T(121, 'Romani victi sunt.', 'The Romans were conquered.', 'g', ['The Romans conquered.', 'The Roman was conquered.', 'The Romans are conquered.'], { u: 1, g: [[1, ['victi', 'victus', 'victae', 'victa']]] });
T(121, 'verba audita sunt.', 'The words were heard.', 'g', ['The words heard.', 'The word was heard.', 'The words are being heard.'], { u: 1 });
T(121, 'tela iacta sunt.', 'Spears were thrown.', 'g', ['They threw spears.', 'A spear was thrown.', 'Spears are being thrown.'], { u: 1 });
T(121, 'urbs deleta est.', 'The city was destroyed.', 'g', ['The city destroyed.', 'The cities were destroyed.', 'The city is being destroyed.'], { u: 1, g: [[1, ['deleta', 'deletus', 'deletum', 'deletae']]] });
T(121, 'senex interfectus est.', 'The old man was killed.', 'g', ['The old man killed.', 'The old men were killed.', 'The old man is being killed.'], { u: 1 });
T(121, 'servus a domino punitus est.', 'The slave was punished by the master.', 'g', ['The slave punished the master.', 'The master was punished by the slave.', 'The slaves were punished by the master.'], { u: 1 });
T(121, 'multa verba a rege dicta sunt.', 'Many words were spoken by the king.', 'g', ['The king heard many words.', 'The king was told many words.', 'Many words are spoken by the king.'], { u: 1 });
T(130, 'missi sunt.', 'They were sent.', 'g', ['They sent.', 'They had been sent.', 'He was sent.'], { p: [[1, 'pn', '3p'], [0, 'tense', 'perf', null, 'phrase']] });
T(130, 'vulneratus sum.', 'I was wounded.', 'g', ['I wounded.', 'He was wounded.', 'I had been wounded.'], { p: [[1, 'pn', '1s']] });
T(130, 'occisa est.', 'She was killed.', 'g', ['She killed.', 'He had been killed.', 'They were killed.']);
T(130, 'vocatus sum.', 'I was called.', 'g', ['I called.', 'I am called.', 'I had been called.'], { p: [[1, 'pn', '1s']] });
T(130, 'laudatus sum.', 'I was praised.', 'g', ['I praised.', 'I shall be praised.', 'He was praised.']);
T(130, 'ducti estis.', 'You (pl) were led.', 'g', ['You (pl) led.', 'They were led.', 'You (pl) had been led.'], { p: [[1, 'pn', '2p'], [0, 'tense', 'perf', null, 'phrase']] });
T(130, 'pecunia amici seni data est.', 'The friend\'s money was given to the old man.', 'g', ['The old man gave his friend money.', 'The friend was given money by the old man.', 'The friend\'s money is given to the old man.'], { u: 1 });
T(130, 'haec urbs ab hostibus oppugnata est.', 'This city was attacked by the enemy.', 'g', ['This city attacked the enemy.', 'These cities were attacked by the enemy.', 'This city is being attacked by the enemy.'], { u: 1 });
T(130, 'multi milites ad urbem Troiam missi sunt.', 'Many soldiers were sent to the city of Troy.', 'g', ['Many soldiers sent men to the city of Troy.', 'One soldier was sent to the city of Troy.', 'Many soldiers are sent to the city of Troy.'], { u: 1 });
T(130, 'miles gladio vulneratus est.', 'The soldier was wounded by a sword.', 'g', ['The soldier wounded with a sword.', 'The soldiers were wounded by a sword.', 'The soldier is wounded by a sword.'], { u: 1 });
T(130, 'nuntius ad urbem missus est.', 'The messenger was sent to the city.', 'g', ['The messenger sent a man to the city.', 'The messengers were sent to the city.', 'The messenger is sent to the city.'], { u: 1 });
T(130, 'multa arma militibus a duce data sunt.', 'Many weapons were given to the soldiers by the leader.', 'g', ['The soldiers gave many weapons to the leader.', 'Many weapons were given to the leader by the soldiers.', 'Many weapons are given to the soldiers by the leader.'], { u: 1 });
T(130, 'multi Romani sagittis vulnerati sunt.', 'Many Romans were wounded by arrows.', 'g', ['Many Romans wounded with arrows.', 'One Roman was wounded by arrows.', 'Many Romans are wounded by arrows.'], { u: 1 });
T(130, 'multae viae longae a Romanis aedificatae sunt.', 'Many long roads were built by the Romans.', 'g', ['The Romans built many long walls.', 'Many long roads are built by the Romans.', 'One long road was built by the Romans.'], { u: 1 });
T(130, 'post decem annos urbs Troia capta est.', 'After ten years the city of Troy was captured.', 'g', ['After ten years the city of Troy captured the Greeks.', 'For ten years the city of Troy was attacked.', 'After ten years the city of Troy is captured.'], { u: 1 });
T(130, 'hoc periculum a servis non visum est.', 'This danger was not seen by the slaves.', 'g', ['The slaves did not see this danger.', 'These dangers were not seen by the slaves.', 'This danger is not seen by the slaves.'], { u: 1 });
T(130, 'ille equus vulneratus a milite hasta necatus est.', 'That wounded horse was killed by the soldier with a spear.', 'g p', ['That horse wounded the soldier with a spear.', 'That horse killed the wounded soldier with a spear.', 'That wounded horse is killed by the soldier with a spear.']);
T(123, 'captus eras.', 'You (sg) had been captured.', 'h', ['You (sg) had captured.', 'You (sg) were captured.', 'He had been captured.'], { g: [[1, ['eras', 'es', 'erat', 'eratis']]], p: [[1, 'pn', '2s'], [0, 'tense', 'plupf', null, 'phrase']] });
T(123, 'puniti eratis.', 'You (pl) had been punished.', 'h', ['You (pl) had punished.', 'You (pl) were punished.', 'They had been punished.'], { p: [[1, 'pn', '2p']] });
T(123, 'missus eram.', 'I had been sent.', 'h', ['I had sent.', 'I was sent.', 'He had been sent.'], { p: [[1, 'pn', '1s'], [0, 'tense', 'plupf', null, 'phrase']] });
T(123, 'iussi eramus.', 'We had been ordered.', 'h', ['We had ordered.', 'We were ordered.', 'They had been ordered.'], { p: [[1, 'pn', '1p']] });
T(123, 'visa erat.', 'She had been seen.', 'h', ['She had seen.', 'She was seen.', 'They had been seen.']);
T(123, 'nuntiatum erat.', 'It had been announced.', 'h', ['He had announced.', 'It was announced.', 'They had been announced.']);
T(123, 'vulnerati eramus.', 'We had been wounded.', 'h', ['We had wounded.', 'We were wounded.', 'You (pl) had been wounded.'], { p: [[1, 'pn', '1p']] });
T(123, 'occisus erat.', 'He had been killed.', 'h', ['He had killed.', 'He was killed.', 'They had been killed.'], { p: [[0, 'tense', 'plupf', null, 'phrase']] });
T(123, 'tandem copiae paratae erant.', 'At last the forces had been prepared.', 'h', ['At last the forces had prepared.', 'At last the forces were prepared.', 'At last the force had been prepared.'], { u: 1, g: [[2, ['paratae', 'paratus', 'paratum', 'parati']]] });
T(123, 'hastis vulneratus erat.', 'He had been wounded by spears.', 'h', ['He had wounded with spears.', 'He was wounded by spears.', 'She had been wounded by spears.'], { u: 1 });
T(123, 'omnes muri ab hostibus deleti erant.', 'All the walls had been destroyed by the enemy.', 'h', ['All the walls had destroyed the enemy.', 'All the walls were destroyed by the enemy.', 'The whole wall had been destroyed by the enemy.'], { u: 1 });
T(123, 'ab amicis relictus eram.', 'I had been left by my friends.', 'h', ['I had left my friends.', 'I was left by my friends.', 'My friends had been left by me.'], { u: 1 });
T(123, 'Helena ad urbem Troiam ducta erat.', 'Helen had been led to the city of Troy.', 'h', ['Helen had led them to the city of Troy.', 'Helen was led to the city of Troy.', 'Helen is being led to the city of Troy.'], { u: 1, g: [[4, ['ducta', 'ductus', 'ductum', 'ducti']]] });
T(123, 'naves ad urbem Troiam missae erant.', 'Ships had been sent to the city of Troy.', 'h', ['The ships had sent men to the city of Troy.', 'A ship had been sent to the city of Troy.', 'Ships were sent to the city of Troy.'], { u: 1 });
T(130, 'missi erant.', 'They had been sent.', 'h', ['They had sent.', 'They were sent.', 'He had been sent.'], { p: [[1, 'pn', '3p'], [0, 'tense', 'plupf', null, 'phrase']] });
T(130, 'occisi erant.', 'They had been killed.', 'h', ['They had killed.', 'They were killed.', 'He had been killed.'], { p: [[0, 'tense', 'plupf', null, 'phrase']] });
T(130, 'conspecti eramus.', 'We had been caught sight of.', 'h', ['We had caught sight of.', 'We were caught sight of.', 'They had been caught sight of.'], { p: [[1, 'pn', '1p']] });
T(130, 'oppidum ab hostibus iam deletum erat.', 'The town had already been destroyed by the enemy.', 'h', ['The town had already destroyed the enemy.', 'The town was already destroyed by the enemy.', 'The towns had already been destroyed by the enemy.'], { u: 1 });
T(130, 'multae naves a Graecis paratae erant.', 'Many ships had been prepared by the Greeks.', 'h', ['Many ships had prepared the Greeks.', 'Many ships were prepared by the Greeks.', 'One ship had been prepared by the Greeks.'], { u: 1 });
T(130, 'puer malus a magistro punitus erat.', 'The bad boy had been punished by the teacher.', 'h', ['The bad boy had punished the teacher.', 'The bad boy was punished by the teacher.', 'The bad boys had been punished by the teacher.'], { u: 1 });
T(126, 'manere noluerunt.', 'They did not want to stay.', 'i', ['They wanted to stay.', 'They do not want to stay.', 'He did not want to stay.'], { p: [[1, 'pn', '3p']] });
T(126, 'discedere voluerunt.', 'They wanted to leave.', 'i', ['They did not want to leave.', 'They want to leave.', 'We wanted to leave.'], { p: [[1, 'pn', '3p']] });
T(126, 'visne mecum ire?', 'Do you want to go with me?', 'i', ['Do you want to go with him?', 'Do you not want to go with me?', 'Did you want to go with me?'], { u: 1 });
T(126, 'effugere nolumus.', 'We do not want to escape.', 'i', ['We want to escape.', 'They do not want to escape.', 'We did not want to escape.'], { g: [[1, ['nolumus', 'nolunt', 'non vult', 'volumus']]], p: [[1, 'pn', '1p']] });
T(126, 'ridere volebam.', 'I wanted to laugh.', 'i', ['I did not want to laugh.', 'I want to laugh.', 'He wanted to laugh.'], { p: [[1, 'pn', '1s'], [1, 'tense', 'impf']] });
T(126, 'sapiens esse vult.', 'He wants to be wise.', 'i', ['He wants to be brave.', 'He does not want to be wise.', 'They want to be wise.'], { u: 1, g: [[2, ['vult', 'volunt', 'vis', 'volo']]], p: [[2, 'pn', '3s']] });
T(126, 'hoc facere non vult.', 'He does not want to do this.', 'i', ['He wants to do this.', 'They do not want to do this.', 'He was not able to do this.'], { u: 1 });
T(126, 'laborare nolo.', 'I do not want to work.', 'i', ['I want to work.', 'I am not able to work.', 'He does not want to work.'], { g: [[1, ['nolo', 'nolumus', 'non vult', 'volo']]], p: [[1, 'pn', '1s']] });
T(126, 'ludere volo.', 'I want to play.', 'i', ['I do not want to play.', 'I wanted to play.', 'We want to play.'], { p: [[1, 'pn', '1s']] });
T(126, 'cantare nolebat.', 'He did not want to sing.', 'i', ['He wanted to sing.', 'He does not want to sing.', 'I did not want to sing.'], { p: [[1, 'pn', '3s'], [1, 'tense', 'impf']] });
T(126, 'Graeci Troiam oppugnare volebant.', 'The Greeks wanted to attack Troy.', 'i', ['The Greeks did not want to attack Troy.', 'The Greeks want to attack Troy.', 'The Trojans wanted to attack the Greeks.'], { u: 1 });
T(126, 'hi discipuli laborare numquam volunt.', 'These pupils never want to work.', 'i', ['These pupils always want to work.', 'This pupil never wants to work.', 'These pupils never wanted to work.'], { u: 1, g: [[4, ['volunt', 'vult', 'volumus', 'vis']]] });
T(126, 'Ulixes ad Graeciam redire volebat.', 'Ulysses wanted to return to Greece.', 'i', ['Ulysses did not want to return to Greece.', 'Ulysses wants to return to Greece.', 'Ulysses wanted to leave Greece.'], { u: 1 });
T(126, 'hic puer laborare non vult.', 'This boy does not want to work.', 'i', ['This boy wants to work.', 'These boys do not want to work.', 'This boy did not want to work.'], { u: 1 });
T(126, 'milites autem hoc facere nolebant.', 'However, the soldiers did not want to do this.', 'i', ['However, the soldiers wanted to do this.', 'However, the soldier did not want to do this.', 'However, the soldiers do not want to do this.'], { u: 1 });
T(150, 'hunc ducem sequi nolo.', 'I do not want to follow this leader.', 'i v', ['I want to follow this leader.', 'This leader does not want to follow me.', 'We do not want to follow this leader.'], { u: 1 });
T(127, 'paucis diebus veniam.', 'I shall come in a few days.', 'j', ['I shall come for a few days.', 'I came a few days ago.', 'He will come in a few days.'], { u: 1 });
T(127, 'totam diem dormivi.', 'I slept for the whole day.', 'j', ['I slept on that day.', 'I shall sleep for the whole day.', 'He slept for the whole day.'], { u: 1 });
T(127, 'paucis annis redibo.', 'I shall return in a few years.', 'j', ['I shall return for a few years.', 'I returned a few years ago.', 'We shall return in a few years.'], { u: 1 });
T(127, 'septem dies laboravimus.', 'We worked for seven days.', 'j', ['We worked on the seventh day.', 'We shall work for seven days.', 'They worked for seven days.'], { u: 1 });
T(127, 'quarto anno advenerunt.', 'They arrived in the fourth year.', 'j', ['They arrived for four years.', 'They will arrive in the fourth year.', 'He arrived in the fourth year.'], { u: 1 });
T(127, 'paucis horis discedemus.', 'We shall leave in a few hours.', 'j', ['We shall leave for a few hours.', 'We left a few hours ago.', 'They will leave in a few hours.'], { u: 1 });
T(127, 'eum tertia hora vidi.', 'I saw him at the third hour.', 'j', ['I saw him for three hours.', 'He saw me at the third hour.', 'I shall see him at the third hour.'], { u: 1 });
T(127, 'multas horas non dormivit.', 'He did not sleep for many hours.', 'j', ['He did not sleep in many hours.', 'He slept for many hours.', 'They did not sleep for many hours.'], { u: 1 });
T(127, 'multos dies laborabo.', 'I shall work for many days.', 'j', ['I shall work in many days.', 'I worked for many days.', 'He will work for many days.'], { u: 1 });
T(127, 'multae naves a Graecis paucis diebus paratae sunt.', 'Many ships were prepared by the Greeks in a few days.', 'j g', ['Many ships were prepared by the Greeks for a few days.', 'The Greeks prepared one ship in a few days.', 'Many ships will be prepared by the Greeks in a few days.']);
T(127, 'nautae trans mare multos dies navigaverunt.', 'The sailors sailed across the sea for many days.', 'j', ['The sailors sailed across the sea in many days.', 'The sailor sailed across the sea for many days.', 'The sailors will sail across the sea for many days.'], { u: 1 });
T(127, 'Graeci Troiam multos annos oppugnaverunt.', 'The Greeks attacked Troy for many years.', 'j', ['The Greeks attacked Troy in many years.', 'The Trojans attacked the Greeks for many years.', 'The Greeks will attack Troy for many years.'], { u: 1 });
T(127, 'tandem Graeci Troiam decimo anno ceperunt.', 'At last the Greeks captured Troy in the tenth year.', 'j', ['At last the Greeks captured Troy for ten years.', 'At last the Trojans captured Greece in the tenth year.', 'At last the Greeks will capture Troy in the tenth year.'], { u: 1 });
T(127, 'Troiani contra Graecos multas horas pugnaverunt.', 'The Trojans fought against the Greeks for many hours.', 'j', ['The Trojans fought against the Greeks in a few hours.', 'The Greeks fought against the Trojans for many hours.', 'The Trojans will fight against the Greeks for many hours.'], { u: 1 });
T(127, 'muri paucis horis deleti sunt.', 'The walls were destroyed in a few hours.', 'j g', ['The walls were destroyed for a few hours.', 'The wall was destroyed in a few hours.', 'The walls will be destroyed in a few hours.'], { u: 1 });
T(127, 'omnes Graeci quinque diebus discesserunt.', 'All the Greeks left within five days.', 'j', ['All the Greeks left for five days.', 'All the Greeks will leave within five days.', 'All the Trojans left within five days.'], { u: 1 });
T(127, 'Ulixes trans mare multos annos erravit.', 'Ulysses wandered across the sea for many years.', 'j', ['Ulysses wandered across the sea in many years.', 'Ulysses sailed across the sea in a few years.', 'Ulysses will wander across the sea for many years.'], { u: 1 });
T(127, 'Ulixes nautas paucis horis redire iussit.', 'Ulysses ordered the sailors to return in a few hours.', 'j', ['Ulysses ordered the sailors to return for a few hours.', 'The sailors ordered Ulysses to return in a few hours.', 'Ulysses ordered the sailors to leave in a few hours.'], { u: 1 });
T(129, 'servus multum cibum tulerat.', 'The slave had brought a lot of food.', 'k', ['The slave had eaten a lot of food.', 'The slave will bring a lot of food.', 'The slaves had brought a lot of food.'], { u: 1, g: [[3, ['tulerat', 'tulerant', 'fert', 'ferebat']]] });
T(129, 'multam pecuniam cras feram.', 'I shall bring a lot of money tomorrow.', 'k', ['I brought a lot of money yesterday.', 'He will bring a lot of money tomorrow.', 'I am bringing a lot of money today.'], { u: 1, g: [[3, ['feram', 'feret', 'ferunt', 'tuli']]], p: [[3, 'pn', '1s'], [3, 'tense', 'fut']] });
T(129, 'quid fers?', 'What are you carrying?', 'k', ['What is he carrying?', 'What were you carrying?', 'What will you carry?'], { g: [[1, ['fers', 'fert', 'ferimus', 'tulit']]], p: [[1, 'pn', '2s']] });
T(129, 'milites arma ferunt.', 'The soldiers are carrying weapons.', 'k', ['The soldier is carrying weapons.', 'The soldiers carried weapons.', 'The soldiers will carry weapons.'], { u: 1, g: [[2, ['ferunt', 'fert', 'ferebat', 'feret']]], p: [[2, 'pn', '3p']] });
T(129, 'quid servus ferebat?', 'What was the slave carrying?', 'k', ['What is the slave carrying?', 'What will the slave carry?', 'What were the slaves carrying?'], { u: 1, p: [[2, 'tense', 'impf']] });
T(129, 'servus corpus ferebat.', 'The slave was carrying a body.', 'k', ['The slave is carrying a body.', 'The slaves were carrying a body.', 'The slave had carried a body.'], { u: 1, g: [[2, ['ferebat', 'ferebant', 'fert', 'ferunt']]] });
T(130, 'feremur.', 'We shall be carried.', 'k f', ['We shall carry.', 'We are carried.', 'They will be carried.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'fut']] });
T(133, 'nautae clamantes ad navem ferebantur.', 'The sailors were carried, shouting, to the ship.', 'k f m', ['The sailors carried the shouting men to the ship.', 'The sailor was carried, shouting, to the ship.', 'The sailors are carried, shouting, to the ship.'], { u: 1 });
T(132, 'hic est servus qui bene laborat.', 'This is the slave who works well.', 'l', ['This is the slave whom I like.', 'These are the slaves who work well.', 'This slave works well.'], { u: 1, g: [[3, ['qui', 'quae', 'quod', 'quem']]] });
T(132, 'haec est ancilla quae bene laborat.', 'This is the maidservant who works well.', 'l', ['This is the maidservant whom I praise.', 'These are the maidservants who work well.', 'This maidservant worked well.'], { u: 1, g: [[3, ['quae', 'qui', 'quod', 'quam']]] });
T(132, 'hoc est templum quod maximum est.', 'This is the temple which is very big.', 'l', ['This temple is bigger than that one.', 'These are the temples which are very big.', 'This is the temple which I see.'], { u: 1, g: [[3, ['quod', 'qui', 'quae', 'quem']]] });
T(132, 'hi sunt servi qui heri fugerunt.', 'These are the slaves who ran away yesterday.', 'l', ['This is the slave who ran away yesterday.', 'These are the slaves whom we saw yesterday.', 'These slaves will run away tomorrow.'], { u: 1, g: [[3, ['qui', 'quos', 'quae', 'quorum']]] });
T(132, 'hae sunt puellae quae bene cantant.', 'These are the girls who sing well.', 'l', ['This is the girl who sings well.', 'These are the girls whom I hear.', 'These girls sang well.'], { u: 1, g: [[3, ['quae', 'quas', 'qui', 'quarum']]] });
T(132, 'ille magister est quem non amo.', 'That is the teacher whom I do not like.', 'l', ['That is the teacher who does not like me.', 'That teacher does not like me.', 'Those are the teachers whom I do not like.'], { u: 1, g: [[3, ['quem', 'qui', 'quod', 'cui']]] });
T(132, 'illa puella pulchra est quam amo.', 'That beautiful girl is the one whom I love.', 'l', ['That beautiful girl is the one who loves me.', 'Those girls whom I love are beautiful.', 'That girl loves the beautiful boy.'], { u: 1, g: [[4, ['quam', 'quae', 'qui', 'quem']]] });
T(132, 'hoc vinum est quod saepe bibo.', 'This is the wine which I often drink.', 'l', ['This is the wine which is often drunk.', 'This wine often drinks me.', 'These are the wines which I often drink.'], { u: 1, g: [[3, ['quod', 'quem', 'quam', 'qui']]] });
T(132, 'illi servi sunt quos dominus saepe punit.', 'Those are the slaves whom the master often punishes.', 'l', ['Those are the slaves who often punish the master.', 'That is the slave whom the master often punishes.', 'Those slaves often punished the master.'], { u: 1, g: [[3, ['quos', 'qui', 'quem', 'quibus']]] });
T(132, 'hastae quas fero longae sunt.', 'The spears which I am carrying are long.', 'l k', ['The spears which are carrying me are long.', 'The spear which I am carrying is long.', 'The spears which I carried were long.'], { u: 1, g: [[1, ['quas', 'quae', 'quam', 'quos']]] });
T(132, 'hi sunt servi quibus pecuniam dedi.', 'These are the slaves to whom I gave money.', 'l', ['These are the slaves who gave me money.', 'This is the slave to whom I gave money.', 'These slaves gave money to me.'], { u: 1, g: [[3, ['quibus', 'qui', 'quos', 'quorum']]] });
T(132, 'haec est puella cuius pater clarus est.', 'This is the girl whose father is famous.', 'l', ['This is the girl whose mother is famous.', 'This girl\'s father was famous.', 'These are the girls whose father is famous.'], { u: 1, g: [[3, ['cuius', 'quae', 'quam', 'cui']]] });
T(132, 'hi sunt servi quorum dominus crudelis est.', 'These are the slaves whose master is cruel.', 'l', ['These are the slaves whose master is kind.', 'This is the slave whose master is cruel.', 'These slaves are cruel to their master.'], { u: 1, g: [[3, ['quorum', 'qui', 'quos', 'quibus']]] });
T(132, 'puer quocum ludo amicus meus est.', 'The boy with whom I play is my friend.', 'l', ['The boy whom I play with is not my friend.', 'The boys with whom I play are my friends.', 'My friend plays with the boy.'], { u: 1 });
T(132, 'verba quae dixit magister mala erant.', 'The words which the teacher said were bad.', 'l', ['The words which the teacher heard were bad.', 'The word which the teacher said was bad.', 'The teacher said bad words to the boy.'], { u: 1 });
T(132, 'ibi est villa ex qua multi servi effugerunt.', 'There is the villa from which many slaves escaped.', 'l', ['There is the villa to which many slaves escaped.', 'Many slaves escaped into the villa.', 'There is the villa from which one slave escaped.']);
T(132, 'femina alta quam vides perterrita est.', 'The tall woman whom you see is terrified.', 'l', ['The tall woman who sees you is terrified.', 'The tall women whom you see are terrified.', 'You see the terrified tall woman.'], { u: 1 });
T(150, 'hic est servus bonus cui cibum dedi.', 'This is the good slave to whom I gave food.', 'l', ['This is the good slave who gave me food.', 'These are the good slaves to whom I gave food.', 'The good slave gave food to me.'], { u: 1 });
T(132, 'miles pro patria pugnans occisus est.', 'The soldier was killed while fighting for his country.', 'm g', ['The soldier killed a man fighting for his country.', 'The soldiers were killed while fighting for their country.', 'The soldier fought for his country and was not killed.'], { u: 1 });
T(132, 'pueri magistrum appropinquantem viderunt.', 'The boys saw the teacher approaching.', 'm', ['The teacher saw the boys approaching.', 'The boys, approaching, saw the teacher.', 'The boy saw the teacher approaching.'], { u: 1, g: [[2, ['appropinquantem', 'appropinquantes', 'appropinquans', 'appropinquantis']]] });
T(132, 'feminas clamantes audivimus.', 'We heard the women shouting.', 'm', ['We heard the woman shouting.', 'The shouting women heard us.', 'We, shouting, heard the women.'], { u: 1, g: [[1, ['clamantes', 'clamantem', 'clamans', 'clamantium']]] });
T(133, 'servi dominum appropinquantem viderunt.', 'The slaves saw the master approaching.', 'm', ['The master saw the slaves approaching.', 'The slave saw the master approaching.', 'The slaves, approaching, saw the master.'], { u: 1, g: [[2, ['appropinquantem', 'appropinquantes', 'appropinquans', 'appropinquanti']]] });
T(133, 'feminas flentes videre numquam volumus.', 'We never want to see women weeping.', 'm i', ['We always want to see women weeping.', 'Weeping women never want to see us.', 'We never want to see a woman weeping.'], { u: 1 });
T(133, 'milites fortiter pugnantes interfecti sunt.', 'The soldiers were killed while fighting bravely.', 'm g', ['The soldiers killed men fighting bravely.', 'The soldier was killed while fighting bravely.', 'The soldiers fought bravely and were not killed.'], { u: 1 });
T(133, 'rex cives oppidum defendentes laudavit.', 'The king praised the citizens defending the town.', 'm', ['The citizens praised the king defending the town.', 'The king, defending the town, praised the citizens.', 'The king praised the citizen defending the town.'], { u: 1 });
T(133, 'agricola equum suum ex agro currentem vidit.', 'The farmer saw his horse running out of the field.', 'm', ['The farmer, running out of the field, saw his horse.', 'The farmer saw his horses running out of the field.', 'The horse saw the farmer running out of the field.'], { u: 1 });
T(133, 'puer puellam e villa exeuntem vidit.', 'The boy saw the girl going out of the villa.', 'm', ['The girl saw the boy going out of the villa.', 'The boy, going out of the villa, saw the girl.', 'The boy saw the girls going out of the villa.'], { u: 1 });
T(133, 'servi dominum iterum clamantem audiverunt.', 'The slaves heard the master shouting again.', 'm', ['The master heard the slaves shouting again.', 'The slave heard the master shouting again.', 'The slaves, shouting again, heard the master.'], { u: 1, g: [[3, ['clamantem', 'clamantes', 'clamans', 'clamanti']]] });
T(133, 'miles in muro stans magna voce clamabat.', 'The soldier standing on the wall was shouting in a loud voice.', 'm', ['The soldiers standing on the wall were shouting in a loud voice.', 'The soldier was standing on the wall in silence.', 'The soldier shouted to the man standing on the wall.'], { u: 1, g: [[3, ['stans', 'stantes', 'stantem', 'stanti']]] });
T(133, 'milites in muro stantes magna voce clamabant.', 'The soldiers standing on the wall were shouting in a loud voice.', 'm', ['The soldier standing on the wall was shouting in a loud voice.', 'The soldiers were shouting to the men standing on the wall.', 'The soldiers standing on the wall were silent.'], { u: 1, g: [[3, ['stantes', 'stans', 'stantem', 'stantium']]] });
T(133, 'servus in agris laborans multos equos vidit.', 'The slave, working in the fields, saw many horses.', 'm', ['The slave saw many horses working in the fields.', 'The slaves, working in the fields, saw many horses.', 'Many horses saw the slave working in the fields.'], { u: 1 });
T(133, 'pater filiam suam vinum bibentem conspexit.', 'The father caught sight of his daughter drinking wine.', 'm', ['The daughter caught sight of her father drinking wine.', 'The father, drinking wine, caught sight of his daughter.', 'The father caught sight of his daughters drinking wine.'], { u: 1 });
T(133, 'dominus ancillam cenam parantem laudavit.', 'The master praised the maidservant preparing dinner.', 'm', ['The maidservant praised the master preparing dinner.', 'The master, preparing dinner, praised the maidservant.', 'The master praised the maidservants preparing dinner.'], { u: 1, g: [[3, ['parantem', 'parantes', 'parans', 'paranti']]] });
T(133, 'dominus crudelis servum effugientem occidit.', 'The cruel master killed the slave who was escaping.', 'm', ['The slave killed the cruel master who was escaping.', 'The cruel master, escaping, killed the slave.', 'The cruel master killed the slaves who were escaping.'], { u: 1 });
T(135, 'venit ut pueros moneret.', 'He came to warn the boys.', 'n', ['He came because he warned the boys.', 'The boys came to warn him.', 'He came to warn the boy.'], { u: 1, g: [[3, ['moneret', 'monet', 'monebat', 'monerent']]] });
T(135, 'veni ut pecuniam caperem.', 'I came to take the money.', 'n', ['I came so as not to take the money.', 'He came to take the money.', 'I came and took the money.'], { u: 1 });
T(135, 'pugnaverunt ut urbem defenderent.', 'They fought to defend the city.', 'n', ['They fought so as not to defend the city.', 'He fought to defend the city.', 'They defended the city and fought.'], { u: 1, g: [[3, ['defenderent', 'defendunt', 'defenderet', 'defendebant']]] });
T(135, 'venit ut reginam videret.', 'He came to see the queen.', 'n', ['The queen came to see him.', 'He came so as not to see the queen.', 'He came to see the king.'], { u: 1 });
T(135, 'cucurri ut patrem servarem.', 'I ran to save my father.', 'n', ['My father ran to save me.', 'I ran so as not to save my father.', 'He ran to save his father.'], { u: 1 });
T(135, 'festinaverunt ut cibum consumerent.', 'They hurried to eat the food.', 'n', ['They hurried so as not to eat the food.', 'He hurried to eat the food.', 'They hurried because they had eaten the food.'], { u: 1, g: [[3, ['consumerent', 'consumunt', 'consumeret', 'consumebant']]] });
T(135, 'venerunt ut templum spectarent.', 'They came to look at the temple.', 'n', ['They came so as not to look at the temple.', 'He came to look at the temple.', 'They came to build the temple.'], { u: 1 });
T(135, 'veni ut murum aedificarem.', 'I came to build a wall.', 'n', ['I came so as not to build a wall.', 'He came to build a wall.', 'I came to destroy a wall.'], { u: 1 });
T(135, 'venit ut luderet.', 'He came to play.', 'n', ['He came so as not to play.', 'They came to play.', 'He came and played.'], { u: 1, g: [[2, ['luderet', 'ludit', 'luderent', 'ludebat']]] });
T(135, 'cucurrit ne videretur.', 'He ran so as not to be seen.', 'n', ['He ran so as to be seen.', 'He ran so as not to see.', 'They ran so as not to be seen.'], { u: 1, g: [[2, ['videretur', 'videret', 'viderentur', 'videtur']]] });
T(135, 'effugerunt ne punirentur.', 'They escaped so as not to be punished.', 'n f', ['They escaped so as to be punished.', 'They escaped so as not to punish.', 'He escaped so as not to be punished.'], { u: 1 });
T(135, 'festinavi ne necarer.', 'I hurried so as not to be killed.', 'n f', ['I hurried so as to kill.', 'I hurried so as not to kill.', 'He hurried so as not to be killed.'], { u: 1 });
T(135, 'bene laboravit ut laudaretur.', 'He worked well in order to be praised.', 'n f', ['He worked well in order to praise.', 'He worked well so as not to be praised.', 'They worked well in order to be praised.'], { u: 1 });
T(135, 'servi currebant ut effugerent.', 'The slaves were running to escape.', 'n', ['The slaves were running so as not to escape.', 'The slave was running to escape.', 'The slaves ran because they had escaped.'], { u: 1 });
T(135, 'servi currebant ne laborarent.', 'The slaves were running so as not to work.', 'n', ['The slaves were running in order to work.', 'The slave was running so as not to work.', 'The slaves were working so as not to run.'], { u: 1 });
T(135, 'viri celeriter effugerunt ne perirent.', 'The men escaped quickly so as not to die.', 'n', ['The men escaped quickly in order to die.', 'The man escaped quickly so as not to die.', 'The men died quickly so as not to escape.'], { u: 1 });
T(135, 'cives diu pugnabant ut urbem defenderent.', 'The citizens fought for a long time to defend the city.', 'n', ['The citizens fought for a long time so as not to defend the city.', 'The citizen fought for a long time to defend the city.', 'The citizens defended the city for a long time.'], { u: 1 });
T(135, 'magister multos libros legebat ut sapiens esset.', 'The teacher used to read many books to be wise.', 'n', ['The teacher used to read many books because he was wise.', 'The wise teacher used to write many books.', 'The teacher used to read one book to be wise.'], { u: 1 });
T(135, 'Graeci fortiter pugnaverunt ut urbem caperent.', 'The Greeks fought bravely to capture the city.', 'n', ['The Greeks fought bravely so as not to capture the city.', 'The Trojans fought bravely to capture the city.', 'The Greeks fought bravely to defend the city.'], { u: 1 });
T(135, 'Troiani fortiter pugnaverunt ut urbem servarent.', 'The Trojans fought bravely to save the city.', 'n', ['The Trojans fought bravely to capture the city.', 'The Greeks fought bravely to save the city.', 'The Trojans fought bravely so as not to save the city.'], { u: 1 });
T(135, 'Graeci Troiam oppugnaverunt ut Paridem punirent.', 'The Greeks attacked Troy to punish Paris.', 'n', ['The Greeks attacked Troy so as not to punish Paris.', 'Paris attacked Troy to punish the Greeks.', 'The Greeks attacked Troy because they had punished Paris.'], { u: 1 });
T(137, 'dux militibus imperavit ut bene pugnarent.', 'The leader ordered the soldiers to fight well.', 'o', ['The soldiers ordered the leader to fight well.', 'The leader ordered the soldiers not to fight.', 'The leader ordered the soldier to fight well.'], { u: 1, g: [[5, ['pugnarent', 'pugnant', 'pugnaret', 'pugnabant']]] });
T(137, 'dux militibus imperavit ne hostes timerent.', 'The leader ordered the soldiers not to fear the enemy.', 'o', ['The leader ordered the soldiers to fear the enemy.', 'The enemy ordered the soldiers not to fear the leader.', 'The leader ordered the soldier not to fear the enemy.'], { u: 1 });
T(137, 'dux militibus imperavit ne dormirent.', 'The leader ordered the soldiers not to sleep.', 'o', ['The leader ordered the soldiers to sleep.', 'The soldiers ordered the leader not to sleep.', 'The leader ordered the soldier not to sleep.'], { u: 1, g: [[4, ['dormirent', 'dormiunt', 'dormiret', 'dormiebant']]] });
T(137, 'dux militibus imperavit ne currerent.', 'The leader ordered the soldiers not to run.', 'o', ['The leader ordered the soldiers to run.', 'The leader ordered the soldiers not to fight.', 'The soldiers ordered the leader not to run.'], { u: 1 });
T(137, 'dominus servo persuasit ut laboraret.', 'The master persuaded the slave to work.', 'o', ['The slave persuaded the master to work.', 'The master persuaded the slave not to work.', 'The master persuaded the slaves to work.'], { u: 1, g: [[4, ['laboraret', 'laborat', 'laborarent', 'laborabat']]] });
T(137, 'dominus servo persuasit ne luderet.', 'The master persuaded the slave not to play.', 'o', ['The master persuaded the slave to play.', 'The slave persuaded the master not to play.', 'The master ordered the slave not to work.'], { u: 1 });
T(137, 'dominus servo persuasit ut cibum pararet.', 'The master persuaded the slave to prepare food.', 'o', ['The slave persuaded the master to prepare food.', 'The master persuaded the slave not to prepare food.', 'The master persuaded the slave to eat the food.'], { u: 1 });
T(137, 'dominus servo persuasit ut ad urbem iret.', 'The master persuaded the slave to go to the city.', 'o', ['The slave persuaded the master to go to the city.', 'The master persuaded the slave not to go to the city.', 'The master persuaded the slave to leave the city.'], { u: 1 });
T(137, 'dux nautis imperavit ut naves aedificarent.', 'The leader ordered the sailors to build ships.', 'o', ['The sailors ordered the leader to build ships.', 'The leader ordered the sailors to destroy the ships.', 'The leader ordered the sailor to build a ship.'], { u: 1 });
T(137, 'dominus servum monuit ne hoc faceret.', 'The master warned the slave not to do this.', 'o', ['The master warned the slave to do this.', 'The slave warned the master not to do this.', 'The master warned the slaves not to do this.'], { u: 1, g: [[5, ['faceret', 'facit', 'facerent', 'faciebat']]] });
T(137, 'magister discipulos saepe monebat ut laborarent.', 'The teacher often warned the pupils to work.', 'o', ['The pupils often warned the teacher to work.', 'The teacher often warned the pupils not to work.', 'The teacher often warned the pupil to work.'], { u: 1 });
T(137, 'pater me monuit ne illum librum legerem.', 'My father warned me not to read that book.', 'o', ['My father warned me to read that book.', 'I warned my father not to read that book.', 'My father warned me not to write that book.'], { u: 1 });
T(137, 'dominus mihi persuasit ut manerem.', 'The master persuaded me to stay.', 'o', ['I persuaded the master to stay.', 'The master persuaded me not to stay.', 'The master persuaded me to leave.'], { u: 1, g: [[4, ['manerem', 'manet', 'maneret', 'manebam']]] });
T(137, 'te monui ne superbus esses.', 'I warned you not to be proud.', 'o', ['I warned you to be proud.', 'You warned me not to be proud.', 'I warned you not to be lazy.'], { u: 1 });
T(137, 'mater filium rogavit ne ad urbem iret.', 'The mother asked her son not to go to the city.', 'o', ['The mother asked her son to go to the city.', 'The son asked his mother not to go to the city.', 'The mother asked her daughter not to go to the city.'], { u: 1 });
T(137, 'regina civibus persuasit ut bene laborarent.', 'The queen persuaded the citizens to work well.', 'o', ['The citizens persuaded the queen to work well.', 'The queen persuaded the citizens not to work.', 'The queen persuaded the citizen to work well.'], { u: 1 });
T(137, 'pater filiam monuit ne in media via luderet.', 'The father warned his daughter not to play in the middle of the road.', 'o', ['The father warned his daughter to play in the middle of the road.', 'The daughter warned her father not to play in the middle of the road.', 'The father warned his son not to play in the middle of the road.']);
T(137, 'magistrum rogavimus ut statim discederet.', 'We asked the teacher to leave at once.', 'o', ['The teacher asked us to leave at once.', 'We asked the teacher not to leave at once.', 'We asked the teacher to arrive at once.'], { u: 1 });
T(137, 'puero imperavi ut laboraret.', 'I ordered the boy to work.', 'o', ['The boy ordered me to work.', 'I ordered the boy not to work.', 'I ordered the boys to work.'], { u: 1 });
T(137, 'patri persuasi ut pecuniam mihi daret.', 'I persuaded my father to give me money.', 'o', ['My father persuaded me to give him money.', 'I persuaded my father not to give me money.', 'I persuaded my mother to give me money.'], { u: 1 });
T(137, 'uxor domino persuasit ut illum servum liberaret.', 'The wife persuaded the master to free that slave.', 'o', ['The master persuaded his wife to free that slave.', 'The wife persuaded the master to punish that slave.', 'The wife persuaded the master not to free that slave.'], { u: 1 });
T(139, 'oppidum captum deletum est.', 'The captured town was destroyed.', 'p g', ['The destroyed town was captured.', 'The captured towns were destroyed.', 'The town captured and destroyed them.'], { u: 1 });
T(139, 'puella, ab amicis relicta, flebat.', 'The girl, left by her friends, was weeping.', 'p', ['The girl left her friends and was weeping.', 'The girls, left by their friends, were weeping.', 'The friends, left by the girl, were weeping.'], { u: 1 });
T(139, 'milites, a duce laudati, magna praemia acceperunt.', 'The soldiers, praised by the leader, received great rewards.', 'p', ['The soldiers praised the leader and received great rewards.', 'The leader, praised by the soldiers, received great rewards.', 'The soldier, praised by the leader, received a great reward.'], { u: 1 });
T(139, 'cena, ab ancilla parata, ab omnibus laudata est.', 'The dinner, prepared by the maidservant, was praised by everyone.', 'p g', ['The maidservant prepared the dinner and praised everyone.', 'The dinner was prepared by everyone and praised by the maidservant.', 'The dinners, prepared by the maidservant, were praised by everyone.']);
T(139, 'multae naves paratae ad Menelaum missae sunt.', 'Many ships, having been prepared, were sent to Menelaus.', 'p g', ['Menelaus prepared many ships and sent them.', 'Many ships were prepared by Menelaus and sent.', 'One ship, having been prepared, was sent to Menelaus.'], { u: 1 });
T(139, 'urbs diu oppugnata, tandem capta est.', 'The city, attacked for a long time, was at last captured.', 'p g', ['The city attacked for a long time and at last captured them.', 'The cities, attacked for a long time, were at last captured.', 'The city was captured at once and attacked for a long time.'], { u: 1 });
T(139, 'multi cives, ab hostibus vulnerati, ex urbe fugerunt.', 'Many citizens, wounded by the enemy, fled from the city.', 'p', ['Many citizens wounded the enemy and fled from the city.', 'The enemy, wounded by many citizens, fled from the city.', 'One citizen, wounded by the enemy, fled from the city.']);
T(139, 'naves, tempestate deletae, numquam redierunt.', 'The ships, destroyed by a storm, never returned.', 'p', ['The ships destroyed the storm and never returned.', 'The ship, destroyed by a storm, never returned.', 'The ships, destroyed by a storm, soon returned.'], { u: 1 });
T(139, 'puer puellam visam amavit.', 'The boy loved the girl once he had seen her.', 'p', ['The girl loved the boy once she had seen him.', 'The boy, having been seen, loved the girl.', 'The boy saw the girl but did not love her.'], { u: 1, g: [[2, ['visam', 'visum', 'visa', 'visus']]] });
T(139, 'puella puerum visum amavit.', 'The girl loved the boy once she had seen him.', 'p', ['The boy loved the girl once he had seen her.', 'The girl, having been seen, loved the boy.', 'The girl saw the boy but did not love him.'], { u: 1, g: [[2, ['visum', 'visam', 'visus', 'visa']]] });
T(139, 'vir librum acceptum legit.', 'The man read the book he had received.', 'p', ['The man received the book he had read.', 'The men read the books they had received.', 'The man wrote the book he had received.'], { u: 1, g: [[2, ['acceptum', 'acceptam', 'acceptus', 'accepti']]] });
T(139, 'hostes urbem oppugnatam ceperunt.', 'The enemy captured the city they had attacked.', 'p', ['The enemy attacked the city they had captured.', 'The city captured the enemy who had attacked it.', 'The enemy captured the cities they had attacked.'], { u: 1, g: [[2, ['oppugnatam', 'oppugnatum', 'oppugnata', 'oppugnati']]] });
T(139, 'hostes urbem captam deleverunt.', 'The enemy destroyed the city they had captured.', 'p', ['The enemy captured the city they had destroyed.', 'The enemy destroyed the cities they had captured.', 'The city destroyed the enemy who had captured it.'], { u: 1 });
T(139, 'Romani Graecos vulneratos occiderunt.', 'The Romans killed the wounded Greeks.', 'p', ['The wounded Romans killed the Greeks.', 'The Greeks killed the wounded Romans.', 'The Romans wounded the Greeks they had killed.'], { u: 1, g: [[2, ['vulneratos', 'vulneratus', 'vulnerati', 'vulneratas']]] });
T(139, 'servus cibum captum consumpsit.', 'The slave ate the food he had taken.', 'p', ['The slave took the food he had eaten.', 'The slaves ate the food they had taken.', 'The slave took the food and did not eat it.'], { u: 1 });
T(139, 'Menelaus copias paratas ad urbem Troiam misit.', 'Menelaus sent the forces he had prepared to the city of Troy.', 'p', ['Menelaus prepared the forces he had sent to Troy.', 'The forces sent Menelaus to the city of Troy.', 'Menelaus sent the forces to the city of Troy unprepared.'], { u: 1 });
T(139, 'pater filium punitum ex oppido misit.', 'The father sent his punished son out of the town.', 'p', ['The father punished his son and kept him in the town.', 'The son sent his punished father out of the town.', 'The father sent his punished sons out of the town.'], { u: 1 });
T(140, 'omnes agricolae ruri habitant.', 'All farmers live in the country.', 'q', ['All farmers live in the city.', 'All farmers go to the country.', 'Every farmer lives in the country.'], { u: 1 });
T(140, 'dux Roma prima luce discessit.', 'The leader left Rome at dawn.', 'q j', ['The leader arrived at Rome at dawn.', 'The leader left Rome at dusk.', 'The leaders left Rome at dawn.'], { u: 1 });
T(140, 'rus cras ibimus.', 'We shall go to the country tomorrow.', 'q', ['We shall go from the country tomorrow.', 'We went to the country yesterday.', 'They will go to the country tomorrow.'], { u: 1 });
T(140, 'puer domo discessit et ad urbem festinavit.', 'The boy left home and hurried to the city.', 'q', ['The boy left the city and hurried home.', 'The boy stayed at home and did not hurry to the city.', 'The boys left home and hurried to the city.'], { u: 1 });
T(141, 'domino viso, servi fugerunt.', 'When the master had been seen, the slaves fled.', 'r', ['When the slaves had been seen, the master fled.', 'The slaves saw the master but did not flee.', 'When the master had been seen, the slave fled.'], { u: 1, g: [[1, ['viso', 'visus', 'visum', 'visi']]] });
T(141, 'hostibus visis, milites timebant.', 'When the enemy had been seen, the soldiers were afraid.', 'r', ['When the soldiers had been seen, the enemy were afraid.', 'The soldiers saw the enemy and were not afraid.', 'When the enemy had been seen, the soldier was afraid.'], { u: 1, g: [[1, ['visis', 'visos', 'visi', 'viso']]] });
T(142, 'magister, discipulo punito, risit.', 'When the pupil had been punished, the teacher laughed.', 'r', ['When the teacher had been punished, the pupil laughed.', 'The teacher punished the pupil and wept.', 'When the pupils had been punished, the teacher laughed.'], { u: 1, g: [[2, ['punito', 'punitus', 'punitum', 'puniti']]] });
T(142, 'multis servis liberatis, dominus laetus erat.', 'When many slaves had been set free, the master was happy.', 'r', ['When the master had been set free, the many slaves were happy.', 'The master set many slaves free and was sad.', 'When one slave had been set free, the master was happy.'], { u: 1 });
T(142, 'puella pulcherrima conspecta, puer laetissimus erat.', 'When the very beautiful girl had been caught sight of, the boy was very happy.', 'r', ['When the boy had been caught sight of, the very beautiful girl was very happy.', 'The very beautiful girl caught sight of the boy and was very happy.', 'The boy caught sight of the very beautiful girl and was very sad.'], { u: 1 });
T(142, 'hoc audito, puella magnopere timebat.', 'When this had been heard, the girl was very frightened.', 'r', ['When the girl had been heard, this frightened her greatly.', 'The girl heard this and was not afraid.', 'When these things had been heard, the girls were very frightened.'], { u: 1, g: [[1, ['audito', 'auditus', 'auditum', 'auditis']]] });
T(142, 'servi, domino saevo viso, timebant.', 'When the savage master had been seen, the slaves were afraid.', 'r', ['When the slaves had been seen, the savage master was afraid.', 'The slaves saw the savage master but were not afraid.', 'When the savage master had been seen, the slave was afraid.'], { u: 1 });
T(142, 'cibo consumpto, nautae dormiverunt.', 'When the food had been eaten, the sailors slept.', 'r', ['When the sailors had slept, they ate the food.', 'The sailors ate the food but did not sleep.', 'When the food had been eaten, the sailor slept.'], { u: 1, g: [[1, ['consumpto', 'consumptus', 'consumptum', 'consumptis']]] });
T(142, 'armis paratis, milites clamantes ruerunt.', 'When the weapons had been prepared, the soldiers charged, shouting.', 'r m', ['When the soldiers had been prepared, the weapons charged, shouting.', 'The soldiers prepared their weapons and did not charge.', 'When the weapons had been prepared, the soldier charged, shouting.'], { u: 1 });
T(142, 'hoc libro lecto, puella tristis erat.', 'When this book had been read, the girl was sad.', 'r', ['When this book had been written, the girl was sad.', 'The girl read this book and was happy.', 'When these books had been read, the girls were sad.'], { u: 1 });
T(142, 'hostibus victis, Romani discesserunt.', 'When the enemy had been conquered, the Romans left.', 'r', ['When the Romans had been conquered, the enemy left.', 'The Romans conquered the enemy and stayed.', 'When the enemy had been conquered, the Roman left.'], { u: 1, g: [[1, ['victis', 'victos', 'victi', 'victo']]] });
T(144, 'video puerum currere.', 'I see that the boy is running.', 's', ['I see the boy and run.', 'I see that the boys are running.', 'The boy sees that I am running.'], { u: 1, g: [[1, ['puerum', 'puer', 'pueri', 'puero']]] });
T(144, 'video pueros currere.', 'I see that the boys are running.', 's', ['I see that the boy is running.', 'The boys see that I am running.', 'I saw that the boys were running.'], { u: 1 });
T(144, 'vidi puerum currere.', 'I saw that the boy was running.', 's', ['I see that the boy is running.', 'The boy saw that I was running.', 'I saw that the boys were running.'], { u: 1 });
T(144, 'audio puellam clamare.', 'I hear that the girl is shouting.', 's', ['I hear that the girls are shouting.', 'The girl hears that I am shouting.', 'I heard that the girl was shouting.'], { u: 1 });
T(144, 'audivi puellas clamare.', 'I heard that the girls were shouting.', 's', ['I heard that the girl was shouting.', 'I hear that the girls are shouting.', 'The girls heard that I was shouting.'], { u: 1 });
T(144, 'scio milites venire.', 'I know that the soldiers are coming.', 's', ['I know that the soldier is coming.', 'The soldiers know that I am coming.', 'I knew that the soldiers were coming.'], { u: 1 });
T(144, 'sciebam milites venire.', 'I knew that the soldiers were coming.', 's', ['I know that the soldiers are coming.', 'The soldiers knew that I was coming.', 'I knew that the soldier was coming.'], { u: 1 });
T(144, 'scio agricolas laborare.', 'I know that the farmers are working.', 's', ['I know that the farmer is working.', 'The farmers know that I am working.', 'I knew that the farmers were working.'], { u: 1, g: [[1, ['agricolas', 'agricolae', 'agricola', 'agricolam']]] });
T(144, 'sciebam agricolam laborare.', 'I knew that the farmer was working.', 's', ['I know that the farmer is working.', 'I knew that the farmers were working.', 'The farmer knew that I was working.'], { u: 1 });
T(144, 'puer dicit hanc puellam pulchram esse.', 'The boy says that this girl is beautiful.', 's', ['The boy said that this girl was beautiful.', 'This girl says that the boy is beautiful.', 'The boy says that these girls are beautiful.'], { u: 1, g: [[4, ['pulchram', 'pulchra', 'pulchrae', 'pulchras']]] });
T(144, 'puer dixit hanc puellam pulchram esse.', 'The boy said that this girl was beautiful.', 's', ['The boy says that this girl is beautiful.', 'This girl said that the boy was beautiful.', 'The boy said that that girl was ugly.'], { u: 1 });
T(144, 'audio magistrum bonum esse.', 'I hear that the teacher is good.', 's', ['I hear that the teachers are good.', 'I heard that the teacher was good.', 'The teacher hears that I am good.'], { u: 1 });
T(144, 'scio hos servos effugere.', 'I know that these slaves are escaping.', 's', ['I know that this slave is escaping.', 'These slaves know that I am escaping.', 'I knew that these slaves were escaping.'], { u: 1, g: [[1, ['hos', 'hi', 'hunc', 'his']]] });
T(144, 'sciebam hunc servum effugere.', 'I knew that this slave was escaping.', 's', ['I know that this slave is escaping.', 'I knew that these slaves were escaping.', 'This slave knew that I was escaping.'], { u: 1 });
T(144, 'video omnes discipulos laborare.', 'I see that all the pupils are working.', 's', ['I see that all the pupils were working.', 'All the pupils see that I am working.', 'I see that one pupil is working.'], { u: 1 });
T(144, 'magister scit puerum non laborare.', 'The teacher knows that the boy is not working.', 's', ['The boy knows that the teacher is not working.', 'The teacher knew that the boy was not working.', 'The teacher knows that the boy is working.'], { u: 1 });
T(144, 'magister sciebat puerum non laborare.', 'The teacher knew that the boy was not working.', 's', ['The teacher knows that the boy is not working.', 'The boy knew that the teacher was not working.', 'The teacher knew that the boy was working.'], { u: 1 });
T(144, 'pater scit filium pecuniam amare.', 'The father knows that his son loves money.', 's', ['The son knows that his father loves money.', 'The father knew that his son loved money.', 'The father knows that his son loves the girl.'], { u: 1 });
T(144, 'pueri sciebant hunc magistrum bonum esse.', 'The boys knew that this teacher was good.', 's', ['The boys know that this teacher is good.', 'This teacher knew that the boys were good.', 'The boys knew that these teachers were good.'], { u: 1 });
T(144, 'scimus omnes magistros sapientes esse.', 'We know that all teachers are wise.', 's', ['We know that all teachers were wise.', 'All teachers know that we are wise.', 'We know that one teacher is wise.'], { u: 1, g: [[3, ['sapientes', 'sapiens', 'sapientem', 'sapientis']]] });
T(144, 'video te tandem bene laborare.', 'I see that you are working well at last.', 's', ['You see that I am working well at last.', 'I saw that you were working well at last.', 'I see that you are not working well at last.'], { u: 1 });
T(144, 'dicunt Romanos oppidum oppugnare.', 'They say that the Romans are attacking the town.', 's', ['They say that the Romans attacked the town.', 'The Romans say that they are attacking the town.', 'They say that the town is attacking the Romans.'], { u: 1 });
T(144, 'servi sciunt dominum iam appropinquare.', 'The slaves know that the master is already approaching.', 's', ['The master knows that the slaves are already approaching.', 'The slaves knew that the master was already approaching.', 'The slave knows that the master is already approaching.'], { u: 1 });
T(144, 'dux scit milites fortes esse.', 'The leader knows that the soldiers are brave.', 's', ['The soldiers know that the leader is brave.', 'The leader knew that the soldiers were brave.', 'The leader knows that the soldier is brave.'], { u: 1, g: [[3, ['fortes', 'fortis', 'fortem', 'forti']]] });
T(144, 'audio multos servos effugere.', 'I hear that many slaves are escaping.', 's', ['I hear that one slave is escaping.', 'Many slaves hear that I am escaping.', 'I heard that many slaves were escaping.'], { u: 1 });
T(144, 'rex vidit hostes muros delere.', 'The king saw that the enemy were destroying the walls.', 's', ['The king saw that the enemy had destroyed the walls.', 'The enemy saw that the king was destroying the walls.', 'The king sees that the enemy are destroying the walls.'], { u: 1 });
T(144, 'rex vidit cives urbem defendere.', 'The king saw that the citizens were defending the city.', 's', ['The citizens saw that the king was defending the city.', 'The king sees that the citizens are defending the city.', 'The king saw that the citizen was defending the city.'], { u: 1 });
T(144, 'Romani sciebant Graecos appropinquare.', 'The Romans knew that the Greeks were approaching.', 's', ['The Greeks knew that the Romans were approaching.', 'The Romans know that the Greeks are approaching.', 'The Romans knew that the Greek was approaching.'], { u: 1 });
T(144, 'sciebamus hunc senem ambulare non posse.', 'We knew that this old man was not able to walk.', 's', ['We knew that this old man was able to walk.', 'This old man knew that we were not able to walk.', 'We know that this old man is not able to walk.'], { u: 1 });
T(144, 'puer puniri non vult.', 'The boy does not want to be punished.', 't i', ['The boy does not want to punish.', 'The boy wants to be punished.', 'The boys do not want to be punished.'], { u: 1, g: [[1, ['puniri', 'punire', 'punit', 'punitur']]] });
T(145, 'dux multa tela iaci iussit.', 'The leader ordered many spears to be thrown.', 't', ['The leader ordered many spears to throw.', 'The leader threw many spears.', 'The leader ordered one spear to be thrown.'], { u: 1, g: [[3, ['iaci', 'iacere', 'iacit', 'iacitur']]] });
T(145, 'cives urbem bene defendi volebant.', 'The citizens wanted the city to be defended well.', 't i', ['The citizens wanted to defend the city well.', 'The city wanted the citizens to be defended well.', 'The citizens did not want the city to be defended.'], { u: 1, g: [[3, ['defendi', 'defendere', 'defendit', 'defenditur']]] });
T(145, 'ab hostibus capi nolumus.', 'We do not want to be captured by the enemy.', 't i', ['We do not want to capture the enemy.', 'We want to be captured by the enemy.', 'The enemy do not want to be captured by us.'], { u: 1, g: [[2, ['capi', 'capere', 'capit', 'capimur']]] });
T(145, 'dominus hunc servum interfici iussit.', 'The master ordered this slave to be killed.', 't', ['The master ordered this slave to kill.', 'This slave ordered the master to be killed.', 'The master killed this slave.'], { u: 1 });
T(145, 'Romani ab hostibus vinci numquam volebant.', 'The Romans never wanted to be conquered by the enemy.', 't i', ['The Romans never wanted to conquer the enemy.', 'The enemy never wanted to be conquered by the Romans.', 'The Romans always wanted to be conquered by the enemy.'], { u: 1 });
T(145, 'rex pecuniam hostibus tradi iussit.', 'The king ordered the money to be handed over to the enemy.', 't', ['The king ordered the enemy to hand over the money.', 'The enemy ordered the king to hand over the money.', 'The king handed over the money to the enemy.'], { u: 1 });
T(145, 'cives Troiani sciebant urbem capi.', 'The Trojan citizens knew that the city was being captured.', 't s', ['The Trojan citizens knew that the city had been captured.', 'The Trojan citizens knew that they were capturing the city.', 'The city knew that the Trojan citizens were being captured.'], { u: 1 });
T(145, 'rex vidit templa Troiae a Graecis deleri.', 'The king saw that the temples of Troy were being destroyed by the Greeks.', 't s', ['The king saw that the Greeks were being destroyed by the temples of Troy.', 'The king saw that the temples of Troy had been destroyed by the Greeks.', 'The Greeks saw that the temples of Troy were being destroyed by the king.'], { u: 1 });
T(145, 'rex vidit multos cives a Graecis occidi.', 'The king saw that many citizens were being killed by the Greeks.', 't s', ['The king saw that many citizens were killing the Greeks.', 'The Greeks saw that many citizens were being killed by the king.', 'The king saw that one citizen was being killed by the Greeks.'], { u: 1 });
T(145, 'cives nesciebant equum ingentem a Graecis aedificari.', 'The citizens did not know that a huge horse was being built by the Greeks.', 't s', ['The citizens knew that a huge horse was being built by the Greeks.', 'The Greeks did not know that a huge horse was being built by the citizens.', 'The citizens did not know that the Greeks had built a small horse.'], { u: 1 });
T(145, 'Ulixes vidit naves suas tempestate deleri.', 'Ulysses saw that his ships were being destroyed by a storm.', 't s', ['Ulysses saw that his ships were destroying the storm.', 'Ulysses saw that his ship had been destroyed by a storm.', 'His men saw that Ulysses\' ships were being destroyed by a storm.'], { u: 1 });
T(147, 'audio nuntium advenisse.', 'I hear that the messenger has arrived.', 'u', ['I hear that the messenger is arriving.', 'I hear that the messengers have arrived.', 'The messenger hears that I have arrived.'], { u: 1, g: [[2, ['advenisse', 'advenire', 'advenit', 'advenerat']]] });
T(147, 'audivi nuntios advenisse.', 'I heard that the messengers had arrived.', 'u', ['I heard that the messengers were arriving.', 'I hear that the messengers have arrived.', 'I heard that the messenger had arrived.'], { u: 1 });
T(147, 'scio illum puerum hoc fecisse.', 'I know that that boy has done this.', 'u', ['I know that that boy is doing this.', 'That boy knows that I have done this.', 'I know that those boys have done this.'], { u: 1, g: [[4, ['fecisse', 'facere', 'fecit', 'facit']]] });
T(147, 'sciebam pueros hoc fecisse.', 'I knew that the boys had done this.', 'u', ['I knew that the boys were doing this.', 'I know that the boys have done this.', 'I knew that the boy had done this.'], { u: 1 });
T(147, 'sciebamus hos milites bene pugnavisse.', 'We knew that these soldiers had fought well.', 'u', ['We knew that these soldiers were fighting well.', 'These soldiers knew that we had fought well.', 'We knew that this soldier had fought well.'], { u: 1 });
T(147, 'video Graecos tandem Troiam cepisse.', 'I see that the Greeks have at last captured Troy.', 'u', ['I see that the Greeks are at last capturing Troy.', 'I see that Troy has at last captured the Greeks.', 'I saw that the Greeks had at last captured Troy.'], { u: 1 });
T(147, 'nuntius dicit hostes urbem cepisse.', 'The messenger says that the enemy have captured the city.', 'u', ['The messenger says that the enemy are capturing the city.', 'The enemy say that the messenger has captured the city.', 'The messenger said that the enemy had captured the city.'], { u: 1, g: [[4, ['cepisse', 'capere', 'ceperunt', 'capiunt']]] });
T(147, 'nuntius dixit hostes urbem cepisse.', 'The messenger said that the enemy had captured the city.', 'u', ['The messenger said that the enemy were capturing the city.', 'The messenger says that the enemy have captured the city.', 'The enemy said that the messenger had captured the city.'], { u: 1 });
T(147, 'nuntius dicit urbem ab hostibus captam esse.', 'The messenger says that the city has been captured by the enemy.', 'u', ['The messenger says that the city has captured the enemy.', 'The messenger said that the city had been captured by the enemy.', 'The messenger says that the city is being captured by the enemy.'], { u: 1 });
T(147, 'nuntius dixit urbem ab hostibus captam esse.', 'The messenger said that the city had been captured by the enemy.', 'u', ['The messenger said that the city was being captured by the enemy.', 'The messenger said that the city had captured the enemy.', 'The messenger says that the city has been captured by the enemy.'], { u: 1 });
T(147, 'magister scit omnes discipulos bene laboravisse.', 'The teacher knows that all the pupils have worked well.', 'u', ['The teacher knows that all the pupils are working well.', 'All the pupils know that the teacher has worked well.', 'The teacher knew that all the pupils had worked well.'], { u: 1 });
T(147, 'dux scit militem multa vulnera accepisse.', 'The leader knows that the soldier has received many wounds.', 'u', ['The leader knows that the soldier is receiving many wounds.', 'The soldier knows that the leader has received many wounds.', 'The leader knows that the soldiers have received many wounds.'], { u: 1 });
T(147, 'scio Romanos multas gentes vicisse.', 'I know that the Romans have conquered many peoples.', 'u', ['I know that the Romans are conquering many peoples.', 'I know that many peoples have conquered the Romans.', 'I knew that the Romans had conquered many peoples.'], { u: 1 });
T(147, 'audio te hunc librum legisse.', 'I hear that you have read this book.', 'u', ['I hear that you are reading this book.', 'You hear that I have read this book.', 'I hear that you have written this book.'], { u: 1 });
T(147, 'ille puer dixit se multos libros legisse.', 'That boy said that he had read many books.', 'u', ['That boy said that he was reading many books.', 'That boy said that I had read many books.', 'Those boys said that they had read many books.'], { u: 1 });
T(147, 'Troiani viderunt Graecos multas naves paravisse.', 'The Trojans saw that the Greeks had prepared many ships.', 'u', ['The Trojans saw that the Greeks were preparing many ships.', 'The Greeks saw that the Trojans had prepared many ships.', 'The Trojans saw that the Greeks had destroyed many ships.'], { u: 1 });
T(147, 'Graeci sciebant Troianos urbem bene defendisse.', 'The Greeks knew that the Trojans had defended the city well.', 'u', ['The Greeks knew that the Trojans were defending the city well.', 'The Trojans knew that the Greeks had defended the city well.', 'The Greeks knew that the Trojans had not defended the city.'], { u: 1 });
T(147, 'Troiani nesciebant Graecos equum ingentem aedificavisse.', 'The Trojans did not know that the Greeks had built a huge horse.', 'u', ['The Trojans knew that the Greeks had built a huge horse.', 'The Greeks did not know that the Trojans had built a huge horse.', 'The Trojans did not know that the Greeks were building a small horse.'], { u: 1 });
T(147, 'Graeci sciebant se Troianos vicisse.', 'The Greeks knew that they had conquered the Trojans.', 'u', ['The Greeks knew that the Trojans had conquered them.', 'The Trojans knew that they had conquered the Greeks.', 'The Greeks knew that they were conquering the Trojans.'], { u: 1 });
T(147, 'cives viderunt multa templa a Graecis deleta esse.', 'The citizens saw that many temples had been destroyed by the Greeks.', 'u', ['The citizens saw that the Greeks had been destroyed by many temples.', 'The Greeks saw that many temples had been destroyed by the citizens.', 'The citizens saw that many temples were being destroyed by the Greeks.']);
T(147, 'Ulixes sciebat se uxorem suam diu non vidisse.', 'Ulysses knew that he had not seen his wife for a long time.', 'u', ['Ulysses knew that his wife had not seen him for a long time.', 'Ulysses knew that he would soon see his wife.', 'Ulysses knew that he had seen his wife recently.']);
T(147, 'Polyphemus vidit Graecos cibum suum cepisse.', 'Polyphemus saw that the Greeks had taken his food.', 'u', ['The Greeks saw that Polyphemus had taken their food.', 'Polyphemus saw that the Greeks were taking his food.', 'Polyphemus saw that the Greeks had given him food.'], { u: 1 });
T(147, 'comites Ulixis sciebant se malos fuisse.', 'The companions of Ulysses knew that they had been bad.', 'u', ['The companions of Ulysses knew that he had been bad.', 'Ulysses knew that his companions had been bad.', 'The companions of Ulysses knew that they had been good.'], { u: 1 });
T(147, 'Eurylochus dixit se deam timuisse.', 'Eurylochus said that he had feared the goddess.', 'u', ['Eurylochus said that the goddess had feared him.', 'The goddess said that she had feared Eurylochus.', 'Eurylochus said that he feared the goddess.'], { u: 1 });
T(147, 'vir dixit se multas feminas pulchras amavisse.', 'The man said that he had loved many beautiful women.', 'u', ['The man said that many beautiful women had loved him.', 'The man said that he loved many beautiful women.', 'The woman said that she had loved many handsome men.'], { u: 1 });
T(147, 'scio me discipulum optimum esse.', 'I know that I am a very good pupil.', 's', ['I know that he is a very good pupil.', 'I knew that I was a very good pupil.', 'I know that I am a very bad pupil.'], { u: 1 });
T(147, 'puella dixit se timere.', 'The girl said that she was afraid.', 's', ['The girl said that he was afraid.', 'The girls said that they were afraid.', 'The girl says that she is afraid.'], { u: 1, g: [[2, ['se', 'eam', 'sui', 'sibi']]] });
T(147, 'Iulius Caesar sciebat se ducem bonum esse.', 'Julius Caesar knew that he was a good leader.', 's', ['Julius Caesar knew that he was a bad leader.', 'Julius Caesar knows that he is a good leader.', 'The leader knew that Julius Caesar was good.'], { u: 1 });
T(147, 'milites dixerunt se pugnare velle.', 'The soldiers said that they wanted to fight.', 's i', ['The soldiers said that they did not want to fight.', 'The soldier said that he wanted to fight.', 'The soldiers say that they want to fight.'], { u: 1 });
T(147, 'omnes puellae sciunt se meliores quam pueros esse.', 'All girls know that they are better than boys.', 's', ['All boys know that they are better than girls.', 'All girls know that they are worse than boys.', 'All girls knew that they were better than boys.']);
T(147, 'regina credebat se mulierem pulcherrimam esse.', 'The queen believed that she was a very beautiful woman.', 's', ['The queen believed that she was a very wise woman.', 'The queen believes that she is a very beautiful woman.', 'The woman believed that the queen was very beautiful.'], { u: 1 });
T(147, 'Polyphemus dixit se vinum amare.', 'Polyphemus said that he loved wine.', 's', ['Polyphemus said that he hated wine.', 'Polyphemus says that he loves wine.', 'Ulysses said that Polyphemus loved wine.'], { u: 1 });
T(147, 'Graeci credebant se Troiam capere non posse.', 'The Greeks believed that they could not capture Troy.', 's', ['The Greeks believed that they could capture Troy.', 'The Trojans believed that they could not capture Greece.', 'The Greeks believe that they cannot capture Troy.'], { u: 1 });
T(149, 'conatur.', 'He tries.', 'v', ['He is tried.', 'They try.', 'He tried.'], { p: [[0, 'pn', '3s'], [0, 'tense', 'pres']] });
T(149, 'hortatur.', 'He encourages.', 'v', ['He is encouraged.', 'They encourage.', 'He encouraged.'], { p: [[0, 'pn', '3s']] });
T(149, 'ingrederis.', 'You (sg) enter.', 'v', ['You (sg) are entered.', 'You (pl) enter.', 'He enters.'], { p: [[0, 'pn', '2s']] });
T(149, 'proficiscimur.', 'We set out.', 'v', ['We are set out.', 'They set out.', 'We were setting out.'], { p: [[0, 'pn', '1p'], [0, 'tense', 'pres']] });
T(149, 'loquuntur.', 'They speak.', 'v', ['They are spoken.', 'He speaks.', 'They spoke.'], { g: [[0, ['loquuntur', 'loquitur', 'loquimur', 'locuti']]], p: [[0, 'pn', '3p']] });
T(149, 'sequuntur.', 'They follow.', 'v', ['They are followed.', 'He follows.', 'They will follow.'], { p: [[0, 'pn', '3p']] });
T(149, 'conor.', 'I try.', 'v', ['I am tried.', 'He tries.', 'I shall try.'], { p: [[0, 'pn', '1s']] });
T(149, 'sequor.', 'I follow.', 'v', ['I am followed.', 'He follows.', 'I shall follow.'], { p: [[0, 'pn', '1s']] });
T(149, 'sequebar.', 'I was following.', 'v', ['I was being followed.', 'I follow.', 'He was following.'], { p: [[0, 'pn', '1s'], [0, 'tense', 'impf']] });
T(149, 'loquebantur.', 'They were speaking.', 'v', ['They were being spoken.', 'They speak.', 'He was speaking.'], { p: [[0, 'pn', '3p'], [0, 'tense', 'impf']] });
T(149, 'proficiscebatur.', 'He was setting out.', 'v', ['He was being set out.', 'He sets out.', 'They were setting out.'], { p: [[0, 'pn', '3s'], [0, 'tense', 'impf']] });
T(149, 'sequemur.', 'We shall follow.', 'v', ['We shall be followed.', 'We follow.', 'They will follow.'], { g: [[0, ['sequemur', 'sequimur', 'sequebamur', 'sequentur']]], p: [[0, 'pn', '1p'], [0, 'tense', 'fut']] });
T(149, 'ingredientur.', 'They will enter.', 'v', ['They will be entered.', 'They enter.', 'He will enter.'], { p: [[0, 'pn', '3p'], [0, 'tense', 'fut']] });
T(149, 'conabitur.', 'He will try.', 'v', ['He will be tried.', 'He tries.', 'They will try.'], { p: [[0, 'pn', '3s'], [0, 'tense', 'fut']] });
T(149, 'conatus est.', 'He tried.', 'v', ['He was tried.', 'He tries.', 'She tried.'], { p: [[0, 'tense', 'perf', null, 'phrase']] });
T(149, 'locuta est.', 'She spoke.', 'v', ['She was spoken.', 'He spoke.', 'She had spoken.']);
T(149, 'conati sunt.', 'They tried.', 'v', ['They were tried.', 'He tried.', 'They had tried.'], { p: [[1, 'pn', '3p'], [0, 'tense', 'perf', null, 'phrase']] });
T(149, 'profecti erant.', 'They had set out.', 'v', ['They had been set out.', 'They set out.', 'He had set out.'], { p: [[1, 'pn', '3p'], [0, 'tense', 'plupf', null, 'phrase']] });
T(149, 'secutus est.', 'He followed.', 'v', ['He was followed.', 'He follows.', 'They followed.']);
T(149, 'locuti sumus.', 'We spoke.', 'v', ['We were spoken.', 'They spoke.', 'We had spoken.'], { p: [[1, 'pn', '1p']] });
T(149, 'dux bonus milites suos semper hortatur.', 'A good leader always encourages his soldiers.', 'v', ['A good leader is always encouraged by his soldiers.', 'The soldiers always encourage their good leader.', 'A good leader never encourages his soldiers.'], { u: 1, g: [[5, ['hortatur', 'hortantur', 'hortatus', 'hortari']]] });
T(149, 'hoc facere cras conabor.', 'I shall try to do this tomorrow.', 'v', ['I tried to do this yesterday.', 'He will try to do this tomorrow.', 'I shall not try to do this tomorrow.'], { u: 1, g: [[3, ['conabor', 'conatur', 'conor', 'conati']]] });
T(149, 'rex multa verba civibus locutus est.', 'The king spoke many words to the citizens.', 'v', ['The citizens spoke many words to the king.', 'The king heard many words from the citizens.', 'The king will speak many words to the citizens.'], { u: 1 });
T(149, 'mater filium hortata est ut bene laboraret.', 'The mother encouraged her son to work well.', 'v o', ['The son encouraged his mother to work well.', 'The mother encouraged her son not to work.', 'The mother encouraged her daughter to work well.'], { u: 1 });
T(149, 'servi ex urbe effugere conati sunt.', 'The slaves tried to escape from the city.', 'v', ['The slaves escaped from the city.', 'The slave tried to escape from the city.', 'The slaves tried to enter the city.'], { u: 1 });
T(149, 'ille puer hanc puellam sequebatur.', 'That boy was following this girl.', 'v', ['This girl was following that boy.', 'That boy is following this girl.', 'Those boys were following this girl.'], { u: 1, g: [[4, ['sequebatur', 'sequebantur', 'sequitur', 'sequetur']]] });
T(149, 'milites ex oppido capto profecti sunt.', 'The soldiers set out from the captured town.', 'v p', ['The soldiers captured the town and stayed.', 'The soldier set out from the captured town.', 'The soldiers set out for the captured town.'], { u: 1 });
T(149, 'Menelaus ad urbem Troiam profectus est.', 'Menelaus set out for the city of Troy.', 'v', ['Menelaus set out from the city of Troy.', 'Menelaus will set out for the city of Troy.', 'Paris set out for the city of Troy.'], { u: 1 });
T(149, 'multae naves eum secutae sunt.', 'Many ships followed him.', 'v', ['He followed many ships.', 'One ship followed him.', 'Many ships will follow him.'], { u: 1 });
T(149, 'Graeci Troiam celeriter capere conati sunt.', 'The Greeks tried to capture Troy quickly.', 'v', ['The Greeks captured Troy quickly.', 'The Trojans tried to capture Greece quickly.', 'The Greeks tried to capture Troy slowly.'], { u: 1 });
T(149, 'dux multa verba amicis locutus est.', 'The leader spoke many words to his friends.', 'v', ['His friends spoke many words to the leader.', 'The leader heard many words from his friends.', 'The leader will speak many words to his friends.'], { u: 1 });
T(149, 'Graeci domum redire conabantur.', 'The Greeks were trying to return home.', 'v q', ['The Greeks were trying to leave home.', 'The Greeks returned home.', 'The Trojans were trying to return home.'], { u: 1 });
T(150, 'puella loquitur.', 'The girl speaks.', 'v', ['The girl is spoken to.', 'The girls speak.', 'The girl spoke.'], { g: [[1, ['loquitur', 'loquuntur', 'loquor', 'locuta']]] });
T(150, 'senex ambulare conatus est.', 'The old man tried to walk.', 'v', ['The old man walked.', 'The old men tried to walk.', 'The old man tries to walk.'], { u: 1 });
T(150, 'mater filiam secuta est.', 'The mother followed her daughter.', 'v', ['The daughter followed her mother.', 'The mother was followed by her daughter.', 'The mother will follow her daughter.'], { u: 1 });
T(150, 'nautae proficiscuntur.', 'The sailors set out.', 'v', ['The sailor sets out.', 'The sailors are set out.', 'The sailors set out yesterday.']);
T(150, 'duces milites hortabantur.', 'The leaders were encouraging the soldiers.', 'v', ['The soldiers were encouraging the leaders.', 'The leader was encouraging the soldiers.', 'The leaders encourage the soldiers.'], { u: 1 });
T(150, 'custodes servos secuti sunt.', 'The guards followed the slaves.', 'v', ['The slaves followed the guards.', 'The guard followed the slaves.', 'The guards were followed by the slaves.'], { u: 1 });
T(150, 'naves ex insula profectae sunt.', 'The ships set out from the island.', 'v', ['The ships set out for the island.', 'The ship set out from the island.', 'The ships will set out from the island.'], { u: 1 });
T(150, 'nolite loqui, discipuli! me audite!', 'Do not speak, pupils! Listen to me!', 'v c', ['Speak, pupils! Listen to me!', 'Do not listen, pupils! Speak to me!', 'Do not speak, pupil! Listen to me!'], { u: 1 });
T(150, 'hic puer laborare numquam conatur.', 'This boy never tries to work.', 'v', ['This boy always tries to work.', 'These boys never try to work.', 'This boy never tried to work.'], { u: 1 });
T(150, 'dux civibus persuasit ut se sequerentur.', 'The leader persuaded the citizens to follow him.', 'v o', ['The citizens persuaded the leader to follow them.', 'The leader persuaded the citizens not to follow him.', 'The leader persuaded the citizen to follow him.'], { u: 1 });
T(150, 'dominus servo imperavit ut in villam ingrederetur.', 'The master ordered the slave to go into the villa.', 'v o', ['The slave ordered the master to go into the villa.', 'The master ordered the slave to leave the villa.', 'The master ordered the slaves to go into the villa.'], { u: 1 });
T(150, 'Menelaus Graecos hortatus est ut ad urbem statim proficiscerentur.', 'Menelaus encouraged the Greeks to set out for the city at once.', 'v o', ['The Greeks encouraged Menelaus to set out for the city at once.', 'Menelaus encouraged the Greeks not to set out for the city.', 'Menelaus encouraged the Trojans to set out for the city at once.']);
T(150, 'Graeci ex urbe mox proficisci volebant.', 'The Greeks wanted to set out from the city soon.', 'v i', ['The Greeks did not want to set out from the city.', 'The Greeks set out from the city soon.', 'The Trojans wanted to set out from the city soon.'], { u: 1 });
T(150, 'viri mortui numquam loquuntur.', 'Dead men never speak.', 'v', ['Dead men always speak.', 'A dead man never speaks.', 'Dead men are never spoken about.'], { u: 1 });
T(152, 'pueri, cum magistrum vidissent, fugerunt.', 'When the boys had seen the teacher, they fled.', 'w', ['When the teacher had seen the boys, he fled.', 'The boys fled with the teacher.', 'When the boy had seen the teacher, he fled.'], { u: 1, g: [[3, ['vidissent', 'viderunt', 'vident', 'videbant']]] });
T(152, 'magister, cum puerum punivisset, risit.', 'When the teacher had punished the boy, he laughed.', 'w', ['When the boy had punished the teacher, he laughed.', 'The teacher laughed with the boy.', 'When the teacher had punished the boy, he wept.'], { u: 1, g: [[3, ['punivisset', 'punivit', 'punit', 'puniebat']]] });
T(152, 'milites, cum multos viros occidissent, urbem ceperunt.', 'When the soldiers had killed many men, they captured the city.', 'w', ['When many men had killed the soldiers, they captured the city.', 'The soldiers captured the city with many men.', 'When the soldiers had captured the city, they killed many men.'], { u: 1 });
T(152, 'Romani, cum urbem cepissent, eam deleverunt.', 'When the Romans had captured the city, they destroyed it.', 'w', ['When the Romans had destroyed the city, they captured it.', 'The Romans captured the city with them.', 'When the city had captured the Romans, it destroyed them.'], { u: 1 });
T(152, 'poeta, cum librum scripsisset, laetus erat.', 'When the poet had written the book, he was happy.', 'w', ['When the poet had read the book, he was happy.', 'The poet was happy with the book.', 'When the poet had written the book, he was sad.'], { u: 1 });
T(152, 'servi, cum opus fecissent, laeti erant.', 'When the slaves had done the work, they were happy.', 'w', ['When the slaves had done the work, they were sad.', 'The slaves were happy with the work.', 'When the slave had done the work, he was happy.'], { u: 1 });
T(152, 'milites, cum bene pugnavissent, multa praemia acceperunt.', 'When the soldiers had fought well, they received many rewards.', 'w', ['When the soldiers had fought badly, they received many rewards.', 'The soldiers received many rewards with which they had fought well.', 'When the soldier had fought well, he received many rewards.'], { u: 1 });
T(152, 'milites, cum hostes vidissent, timebant.', 'When the soldiers had seen the enemy, they were afraid.', 'w', ['When the enemy had seen the soldiers, they were afraid.', 'The soldiers were afraid with the enemy.', 'When the soldiers had seen the enemy, they were not afraid.'], { u: 1 });
T(152, 'cum Romani hostes conspexissent, statim oppugnaverunt.', 'When the Romans had caught sight of the enemy, they attacked at once.', 'w', ['When the enemy had caught sight of the Romans, they attacked at once.', 'The Romans attacked at once with the enemy.', 'When the Romans had caught sight of the enemy, they fled at once.'], { u: 1 });
T(152, 'Paris, cum Helenam vidisset, eam statim amavit.', 'When Paris had seen Helen, he loved her at once.', 'w', ['When Helen had seen Paris, she loved him at once.', 'Paris loved Helen at once, with her.', 'When Paris had seen Helen, he hated her at once.'], { u: 1 });
T(152, 'Menelaus, cum Paris Helenam cepisset, iratus erat.', 'Since Paris had taken Helen, Menelaus was angry.', 'w', ['Since Menelaus had taken Helen, Paris was angry.', 'Menelaus was angry with Paris and Helen.', 'Since Paris had taken Helen, Menelaus was happy.'], { u: 1 });
T(152, 'milites, cum omnia paravissent, profecti sunt.', 'When the soldiers had prepared everything, they set out.', 'w v', ['When the soldiers had set out, they prepared everything.', 'The soldiers set out with everything.', 'When the soldier had prepared everything, he set out.'], { u: 1 });
T(152, 'cives, cum equum conspexissent, eum in urbem duxerunt.', 'When the citizens had caught sight of the horse, they led it into the city.', 'w', ['When the horse had caught sight of the citizens, it led them into the city.', 'The citizens led the horse out of the city.', 'When the citizens had caught sight of the horse, they burned it.']);
T(152, 'Graeci, cum Troiam delevissent, ad Graeciam redierunt.', 'When the Greeks had destroyed Troy, they returned to Greece.', 'w', ['When the Trojans had destroyed Greece, they returned to Troy.', 'The Greeks returned to Greece with Troy.', 'When the Greeks had captured Troy, they stayed there.'], { u: 1 });
T(152, 'agricola, cum in agris laboraret, multos equos vidit.', 'While the farmer was working in the fields, he saw many horses.', 'w', ['While the horses were working in the fields, they saw the farmer.', 'The farmer worked in the fields with many horses.', 'While the farmer was working in the fields, he saw one horse.']);
T(152, 'milites, cum fessi essent, non bene pugnaverunt.', 'Since the soldiers were tired, they did not fight well.', 'w', ['Since the soldiers were tired, they fought well.', 'The soldiers fought well with the tired men.', 'Since the soldier was tired, he did not fight well.'], { u: 1, g: [[3, ['essent', 'erant', 'sunt', 'esset']]] });
T(152, 'dux, cum dormiret, a servo occisus est.', 'While the leader was sleeping, he was killed by a slave.', 'w g', ['While the slave was sleeping, he was killed by the leader.', 'The leader slept with a slave and was killed.', 'While the leader was sleeping, he killed a slave.'], { u: 1 });
T(152, 'milites, cum hostes timerent, pugnare nolebant.', 'Since the soldiers feared the enemy, they did not want to fight.', 'w i', ['Since the enemy feared the soldiers, they did not want to fight.', 'Since the soldiers feared the enemy, they wanted to fight.', 'The soldiers did not want to fight with the enemy.'], { u: 1 });
T(152, 'dominus, cum servum non amaret, eum interfecit.', 'Since the master did not like the slave, he killed him.', 'w', ['Since the slave did not like the master, he killed him.', 'Since the master liked the slave, he set him free.', 'The master killed the slave with whom he did not live.'], { u: 1 });
T(152, 'pueri, cum magistrum non amarent, non laborabant.', 'Since the boys did not like the teacher, they were not working.', 'w', ['Since the teacher did not like the boys, he was not working.', 'Since the boys liked the teacher, they were working.', 'The boys were not working with the teacher.'], { u: 1 });
T(152, 'magister, cum pueri non laborarent, iratus erat.', 'Since the boys were not working, the teacher was angry.', 'w', ['Since the teacher was not working, the boys were angry.', 'Since the boys were working, the teacher was happy.', 'The teacher was angry with the boy who was not working.'], { u: 1 });
T(152, 'magister, cum iratus esset, puerum punivit.', 'Since the teacher was angry, he punished the boy.', 'w', ['Since the boy was angry, he punished the teacher.', 'Since the teacher was happy, he praised the boy.', 'The teacher punished the boy with anger.'], { u: 1 });
T(152, 'cum magister puerum punivisset, puer tristis erat.', 'When the teacher had punished the boy, the boy was sad.', 'w', ['When the boy had punished the teacher, the teacher was sad.', 'When the teacher had punished the boy, the boy was happy.', 'The boy was sad with the teacher.'], { u: 1 });
T(152, 'puer, cum tristis esset, flevit.', 'Since the boy was sad, he wept.', 'w', ['Since the boy was happy, he laughed.', 'The boy wept with sadness.', 'Since the boys were sad, they wept.'], { u: 1, g: [[3, ['esset', 'erat', 'est', 'essent']]] });
T(152, 'magister, cum perterritus esset, fugit.', 'Since the teacher was terrified, he fled.', 'w', ['Since the teacher was terrified, he stayed.', 'The teacher fled with the terrified boy.', 'Since the teachers were terrified, they fled.'], { u: 1 });
T(152, 'pueri, cum magister fugisset, non laboraverunt.', 'When the teacher had fled, the boys did not work.', 'w', ['When the boys had fled, the teacher did not work.', 'When the teacher had fled, the boys worked hard.', 'The boys did not work with the teacher who had fled.'], { u: 1 });
T(152, 'cum servus celeriter curreret, nemo eum capere poterat.', 'Since the slave was running quickly, no one could catch him.', 'w', ['Since the slave was running slowly, everyone could catch him.', 'When no one was running quickly, the slave could catch them.', 'Since the slaves were running quickly, no one could catch them.']);
T(154, 'servus, effugere conatus, a domino captus est.', 'The slave, having tried to escape, was captured by the master.', 'x', ['The slave, having been captured by the master, tried to escape.', 'The master, having tried to escape, was captured by the slave.', 'The slaves, having tried to escape, were captured by the master.'], { u: 1 });
T(154, 'puellae, prima luce profectae, ad urbem mox advenerunt.', 'The girls, having set out at dawn, soon arrived at the city.', 'x j', ['The girls, having set out at dusk, soon arrived at the city.', 'The girl, having set out at dawn, soon arrived at the city.', 'The girls soon set out from the city at dawn.']);
T(154, 'dux, milites suos hortatus, in proelium ruit.', 'The leader, having encouraged his soldiers, charged into battle.', 'x', ['The leader, encouraged by his soldiers, charged into battle.', 'The soldiers, having encouraged their leader, charged into battle.', 'The leader, having encouraged his soldiers, fled from battle.'], { u: 1 });
T(154, 'miles, multa vulnera passus, mortuus est.', 'The soldier, having suffered many wounds, died.', 'x', ['The soldier, having given many wounds, died.', 'The soldiers, having suffered many wounds, died.', 'The soldier suffered many wounds but did not die.'], { u: 1 });
T(154, 'servi, e templo egressi, domum festinaverunt.', 'The slaves, having gone out of the temple, hurried home.', 'x q', ['The slaves, having gone into the temple, hurried home.', 'The slave, having gone out of the temple, hurried home.', 'The slaves hurried from home into the temple.'], { u: 1 });
T(154, 'milites, ducem diu secuti, contra hostes tandem pugnaverunt.', 'The soldiers, having followed the leader for a long time, at last fought against the enemy.', 'x j', ['The leader, having followed the soldiers for a long time, at last fought against the enemy.', 'The soldiers, having been followed by the leader for a long time, at last fought.', 'The soldiers followed the enemy for a long time and did not fight.']);
T(154, 'milites Graeci, e Graecia profecti, ad urbem Troiam navigaverunt.', 'The Greek soldiers, having set out from Greece, sailed to the city of Troy.', 'x', ['The Greek soldiers, having set out from Troy, sailed to Greece.', 'The Trojan soldiers, having set out from Greece, sailed to Troy.', 'The Greek soldier, having set out from Greece, sailed to the city of Troy.']);
T(154, 'Menelaus, omnes Graecos hortatus, eos naves parare iussit.', 'Menelaus, having encouraged all the Greeks, ordered them to prepare ships.', 'x', ['Menelaus, encouraged by all the Greeks, ordered them to prepare ships.', 'All the Greeks, having encouraged Menelaus, ordered him to prepare ships.', 'Menelaus, having encouraged all the Greeks, ordered them to destroy the ships.']);
T(154, 'Graeci, ex equo egressi, multos Troianos occiderunt.', 'The Greeks, having come out of the horse, killed many Trojans.', 'x', ['The Greeks, having gone into the horse, killed many Trojans.', 'The Trojans, having come out of the horse, killed many Greeks.', 'The Greeks came out of the horse but killed no Trojans.'], { u: 1 });
T(154, 'cives, multa vulnera passi, a Graecis occisi sunt.', 'The citizens, having suffered many wounds, were killed by the Greeks.', 'x', ['The citizens, having given many wounds, killed the Greeks.', 'The Greeks, having suffered many wounds, were killed by the citizens.', 'The citizen, having suffered many wounds, was killed by the Greeks.']);
T(154, 'ceteri Graeci, in urbem ingressi, multos Troianos interfecerunt.', 'The other Greeks, having entered the city, killed many Trojans.', 'x', ['The other Greeks, having left the city, killed many Trojans.', 'The other Trojans, having entered the city, killed many Greeks.', 'The other Greeks entered the city but killed no Trojans.']);
T(154, 'naves, e portu profectae, ad urbem Troiam mox advenerunt.', 'The ships, having set out from the harbour, soon arrived at the city of Troy.', 'x', ['The ships, having set out from Troy, soon arrived at the harbour.', 'The ship, having set out from the harbour, soon arrived at the city of Troy.', 'The ships soon set out from the harbour for Troy.']);
T(154, 'multi Troiani, in proelio mortui, ab omnibus civibus laudati sunt.', 'Many Trojans, having died in the battle, were praised by all the citizens.', 'x g', ['Many Trojans, having died in the battle, praised all the citizens.', 'All the citizens, having died in the battle, were praised by many Trojans.', 'One Trojan, having died in the battle, was praised by all the citizens.']);


// ════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
// Split a Latin sentence into words (punctuation stripped) — indices match the bank
const words = s => s.replace(/[.,?!;:‘’"]/g, ' ').trim().split(/\s+/);
const lc = s => s.toLowerCase();
const subset = (need, have) => need.every(k => have.has(k));
const extraTags = s => (s || '').split(' ').filter(Boolean);

const PN_LABEL = { '1s': '1st person singular', '2s': '2nd person singular', '3s': '3rd person singular', '1p': '1st person plural', '2p': '2nd person plural', '3p': '3rd person plural' };
const CASE_NAME = { nom: 'nominative', voc: 'vocative', acc: 'accusative', gen: 'genitive', dat: 'dative', abl: 'ablative' };
const NUM_NAME = { sg: 'singular', pl: 'plural' };
const caseLabel = c => { const [cs, n] = c.split(' '); return CASE_NAME[cs] + ' ' + NUM_NAME[n]; };
const TENSE_NAME = { pres: 'present', impf: 'imperfect', perf: 'perfect', fut: 'future', plupf: 'pluperfect' };
const GLUE = new Set(['ad', 'a', 'ab', 'e', 'ex', 'in', 'cum', 'contra', 'per', 'prope', 'trans', 'de', 'non']);

// ════════════════════════════════════════════════════════════════
// QUESTION BUILDING
// ════════════════════════════════════════════════════════════════
function tensesAllowed() { if (topLevel() >= 3) return ['pres', 'impf', 'fut', 'perf', 'plupf']; const t = ['pres'], l2 = hasL2(); if (l2 || ticked.has('Q')) t.push('impf'); if (l2 || ticked.has('R')) t.push('perf'); if (ticked.has('T')) t.push('fut'); if (ticked.has('Y')) t.push('plupf'); return t; }
function casesAllowed() { return ticked.has('H') || hasL2() ? ['nom', 'voc', 'acc', 'gen', 'dat', 'abl'] : ['nom', 'acc']; }

// Which question types this sentence can make with the current ticks
function itemTypes(it) {
  const out = [];
  if (types.has('tr')) out.push('tr');
  if (types.has('un') && it.u) { const n = words(it.lat).length; if (n >= 3 && n <= 7) out.push('un'); }
  if (types.has('gap') && (it.g || []).some(g => subset(extraTags(g[2]), effTicked()))) out.push('gap');
  if (types.has('parse') && (it.p || []).some(p => p[1] !== 'tense' || tensesAllowed().length > 1)) out.push('parse');
  return out;
}
function availableItems() {
  const eff = effTicked();
  return BANK.filter(it => subset(it.t, eff) && itemTypes(it).length);
}

function makeQuestion(it, type) {
  const w = words(it.lat);
  const q = { it, type, tags: it.t };
  if (type === 'tr') {
    q.prompt = 'Choose the correct English translation.';
    q.opts = shuffle([{ text: it.en, ok: true }, ...it.d.map(d => ({ text: d, ok: false }))]);
    q.hint = topTable(it.t);
    q.answer = it.en;
  } else if (type === 'gap') {
    const g = pick(it.g.filter(g => subset(extraTags(g[2]), effTicked())));
    q.gapIdx = g[0];
    q.prompt = 'Choose the Latin word that fits the gap.';
    q.opts = shuffle(g[1].map((o, i) => ({ text: o, ok: i === 0, latin: true })));
    q.hint = g[3] || verbTable(it.t);
    q.answer = g[1][0];
  } else if (type === 'parse') {
    const ps = it.p.filter(p => p[1] !== 'tense' || tensesAllowed().length > 1);
    const p = pick(ps);
    q.target = p[0];
    const word = p[4] === 'phrase' ? it.lat.replace(/[.!?]$/, '') : w[p[0]];
    let opts = [];
    if (p[1] === 'pn') {
      q.prompt = `Give the person and number of ${word}.`;
      const wrong = shuffle(Object.keys(PN_LABEL).filter(k => k !== p[2])).slice(0, 3);
      opts = [p[2], ...wrong].map(k => ({ text: PN_LABEL[k], ok: k === p[2] }));
      q.hint = p[3] || verbTable(it.t);
      q.answer = PN_LABEL[p[2]];
    } else if (p[1] === 'case') {
      q.prompt = `Give the case and number of ${word}.`;
      const [cs, nm] = p[2].split(' ');
      const all = [];
      casesAllowed().forEach(c => ['sg', 'pl'].forEach(n => all.push(c + ' ' + n)));
      const near = shuffle(all.filter(c => c !== p[2] && (c.startsWith(cs + ' ') || c.endsWith(' ' + nm))));
      const rest = shuffle(all.filter(c => c !== p[2] && !near.includes(c)));
      const wrong = [...near.slice(0, 2), ...rest, ...near.slice(2)].slice(0, 3);
      opts = [p[2], ...wrong].map(c => ({ text: caseLabel(c), ok: c === p[2] }));
      q.hint = p[3] || (ticked.has('H') || hasL2() ? 'puella' : 'puellaNA');
      q.answer = caseLabel(p[2]);
    } else {
      q.prompt = `What tense is ${word}?`;
      opts = tensesAllowed().map(t => ({ text: TENSE_NAME[t], ok: t === p[2] }));
      q.hint = p[2] === 'fut' ? 'fut' : p[2] === 'plupf' ? 'plupf' : 'tenses';
      q.answer = TENSE_NAME[p[2]];
    }
    q.opts = shuffle(opts);
  } else if (type === 'un') {
    q.prompt = 'Put the Latin words in order to match the English. You will not need every word.';
    q.tokens = w;
    let decoys = [];
    const g = (it.g || []).find(g => subset(extraTags(g[2]), effTicked()));
    if (g) decoys = shuffle(g[1].slice(1)).filter(d => !w.map(lc).includes(lc(d))).slice(0, 2);
    q.bank = shuffle([...w, ...decoys]);
    q.hint = topTable(it.t);
    q.answer = w.join(' ');
  }
  if (q.hint === 'pres' && !it.t.includes('F')) q.hint = 'amo';
  q.focus = focusTag(q);
  return q;
}
// The one grammar point a question tests (used for the revision list at the end)
const HINT_TAG = { deppart: 'x', cumsubj: 'w', deponent: 'v', perfinf: 'u', infpass: 't', indst: 's', ablabs: 'r', place: 'q', ppp: 'p', indcmd: 'o', purpose: 'n', prespart: 'm', qui: 'l', fero: 'k', time: 'j', volo: 'i', perfpass: 'g', passive: 'f', decl3: 'S', fut: 'T', eo: 'U', que: 'V', hic: 'W', ille: 'W', is: 'X', pron: 'X', plupf: 'Y', adj3: 'Z', comp: 'a', irrcomp: 'a', possum: 'b', noli: 'c', nonne: 'd', se: 'e', amo: 'A', pres: 'F', sum: 'D', puellaNA: 'B', puella: 'H', servus: 'I', ager: 'I', bellum: 'L', bonus: 'E', miser: 'P', prep: 'J', ego: 'K', imp: 'M', inf: 'O', impf: 'Q', perf: 'R' };
function topTag(tags) { for (const k of TAG_ORDER) if (tags.includes(k)) return k; return tags[0]; }
function focusTag(q) {
  const t = q.it.t;
  let f = null;
  if (q.type === 'gap' || (q.type === 'parse' && q.hint !== 'tenses')) {
    f = HINT_TAG[q.hint];
    if (q.type === 'parse' && q.hint === 'puella' && /^(nominative|accusative)/.test(q.answer)) f = 'B';
  } else if (q.type === 'parse') {
    f = q.answer === 'future' ? 'T' : q.answer === 'pluperfect' ? 'Y' : q.answer === 'imperfect' ? 'Q' : q.answer === 'perfect' ? 'R' : (t.includes('F') ? 'F' : 'A');
  }
  return f && t.includes(f) ? f : topTag(t);
}
function topTable(tags) { for (const k of TAG_ORDER) if (tags.includes(k)) return TAG_TABLE[k]; return 'amo'; }
function verbTable(tags) {
  for (const k of 'xwvutsrqponmlkjihgf') if (tags.includes(k)) return TAG_TABLE[k];
  if (tags.includes('b')) return 'possum';
  if (tags.includes('Y')) return 'plupf';
  if (tags.includes('U')) return 'eo';
  if (tags.includes('T')) return 'fut';
  if (tags.includes('R')) return 'perf';
  if (tags.includes('Q')) return 'impf';
  if (tags.includes('F')) return 'pres';
  if (tags.includes('A')) return 'amo';
  if (tags.includes('D')) return 'sum';
  return 'pres';
}

// Pick 15 sentences: spread across the ticked grammar and the ticked question types.
// Sentences used earlier this session are skipped while enough fresh ones remain,
// so Level 2 does not repeat Level 1.
let sessionUsed = new Set();
function buildGame() {
  let pool = availableItems();
  const fresh = pool.filter(it => !sessionUsed.has(it));
  if (fresh.length >= 15) pool = fresh; else sessionUsed = new Set();
  const qs = buildFrom(pool);
  qs.forEach(q => sessionUsed.add(q.it));
  return qs;
}
function buildFrom(pool) {
  const used = new Set();
  const qs = [];
  const tagCycle = [];
  const typeCycle = [];
  while (qs.length < 15) {
    if (!tagCycle.length) tagCycle.push(...shuffle([...ticked]));
    if (!typeCycle.length) typeCycle.push(...shuffle([...types]));
    const tag = tagCycle.shift();
    const type = typeCycle[0];
    let cands = pool.filter(it => !used.has(it) && it.t.includes(tag) && itemTypes(it).includes(type));
    let chosenType = type;
    if (!cands.length) cands = pool.filter(it => !used.has(it) && it.t.some(k => ticked.has(k)) && itemTypes(it).includes(type));
    if (!cands.length) cands = pool.filter(it => !used.has(it) && itemTypes(it).includes(type));
    if (!cands.length) {
      cands = pool.filter(it => !used.has(it) && it.t.includes(tag));
      if (!cands.length) cands = pool.filter(it => !used.has(it));
      if (!cands.length) break;
      const it = pick(cands);
      chosenType = pick(itemTypes(it));
      used.add(it);
      qs.push(makeQuestion(it, chosenType));
      continue;
    }
    typeCycle.shift();
    const it = pick(cands);
    used.add(it);
    qs.push(makeQuestion(it, chosenType));
  }
  // Easier chapters first
  return qs.sort((a, b) => a.it.ch - b.it.ch);
}
