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
];

const PRESETS = [
  { label: 'Ch 1–8', keys: 'A' },
  { label: 'Ch 1–19', keys: 'ABC' },
  { label: 'Ch 1–38', keys: 'ABCDEFGHIJ' },
  { label: 'Ch 1–56', keys: 'ABCDEFGHIJKLMNOP' },
  { label: 'Whole of Level 1', keys: 'ABCDEFGHIJKLMNOPQR' },
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
};
// Hint shown for translate / unscramble questions: the table for the most advanced point in the sentence
const TAG_TABLE = { R: 'perf', Q: 'impf', O: 'inf', M: 'imp', P: 'miser', N: 'num', L: 'bellum', K: 'ego', J: 'prep', I: 'servus', H: 'puella', G: 'ne', F: 'pres', E: 'bonus', D: 'sum', C: 'qw', B: 'puellaNA', A: 'amo' };
const TAG_ORDER = 'RQOMPNLKJIHGFEDCBA';
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
const TENSE_NAME = { pres: 'present', impf: 'imperfect', perf: 'perfect' };
const GLUE = new Set(['ad', 'a', 'ab', 'e', 'ex', 'in', 'cum', 'contra', 'per', 'prope', 'trans', 'de', 'non']);

// ════════════════════════════════════════════════════════════════
// QUESTION BUILDING
// ════════════════════════════════════════════════════════════════
function tensesAllowed() { const t = ['pres']; if (ticked.has('Q')) t.push('impf'); if (ticked.has('R')) t.push('perf'); return t; }
function casesAllowed() { return ticked.has('H') ? ['nom', 'voc', 'acc', 'gen', 'dat', 'abl'] : ['nom', 'acc']; }

// Which question types this sentence can make with the current ticks
function itemTypes(it) {
  const out = [];
  if (types.has('tr')) out.push('tr');
  if (types.has('un') && it.u) { const n = words(it.lat).length; if (n >= 3 && n <= 7) out.push('un'); }
  if (types.has('gap') && (it.g || []).some(g => subset(extraTags(g[2]), ticked))) out.push('gap');
  if (types.has('parse') && (it.p || []).some(p => p[1] !== 'tense' || tensesAllowed().length > 1)) out.push('parse');
  return out;
}
function availableItems() {
  return BANK.filter(it => subset(it.t, ticked) && itemTypes(it).length);
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
    const g = pick(it.g.filter(g => subset(extraTags(g[2]), ticked)));
    q.gapIdx = g[0];
    q.prompt = 'Choose the Latin word that fits the gap.';
    q.opts = shuffle(g[1].map((o, i) => ({ text: o, ok: i === 0, latin: true })));
    q.hint = g[3] || verbTable(it.t);
    q.answer = g[1][0];
  } else if (type === 'parse') {
    const ps = it.p.filter(p => p[1] !== 'tense' || tensesAllowed().length > 1);
    const p = pick(ps);
    q.target = p[0];
    const word = w[p[0]];
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
      q.hint = p[3] || (ticked.has('H') ? 'puella' : 'puellaNA');
      q.answer = caseLabel(p[2]);
    } else {
      q.prompt = `What tense is ${word}?`;
      opts = tensesAllowed().map(t => ({ text: TENSE_NAME[t], ok: t === p[2] }));
      q.hint = 'tenses';
      q.answer = TENSE_NAME[p[2]];
    }
    q.opts = shuffle(opts);
  } else if (type === 'un') {
    q.prompt = 'Put the Latin words in order to match the English. You will not need every word.';
    q.tokens = w;
    let decoys = [];
    const g = (it.g || []).find(g => subset(extraTags(g[2]), ticked));
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
const HINT_TAG = { amo: 'A', pres: 'F', sum: 'D', puellaNA: 'B', puella: 'H', servus: 'I', ager: 'I', bellum: 'L', bonus: 'E', miser: 'P', prep: 'J', ego: 'K', imp: 'M', inf: 'O', impf: 'Q', perf: 'R' };
function topTag(tags) { for (const k of TAG_ORDER) if (tags.includes(k)) return k; return tags[0]; }
function focusTag(q) {
  const t = q.it.t;
  let f = null;
  if (q.type === 'gap' || (q.type === 'parse' && q.hint !== 'tenses')) {
    f = HINT_TAG[q.hint];
    if (q.type === 'parse' && q.hint === 'puella' && /^(nominative|accusative)/.test(q.answer)) f = 'B';
  } else if (q.type === 'parse') {
    f = q.answer === 'imperfect' ? 'Q' : q.answer === 'perfect' ? 'R' : (t.includes('F') ? 'F' : 'A');
  }
  return f && t.includes(f) ? f : topTag(t);
}
function topTable(tags) { for (const k of TAG_ORDER) if (tags.includes(k)) return TAG_TABLE[k]; return 'amo'; }
function verbTable(tags) {
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
