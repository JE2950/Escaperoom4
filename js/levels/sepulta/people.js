"use strict";
// ════════════════════════════════════════════════════════════════
// THE PEOPLE OF SEPULTA
// Each of the five has three Latin tasks (15 questions in all) and
// one clue they will share once you have helped them.
// ════════════════════════════════════════════════════════════════
const PEOPLE1 = [
  { id: 'gaius', name: 'Gaius', role: 'the ferryman', at: [-30, 0.25, 40.6], face: Math.PI,
    look: { tunic: 0x4e4234, skin: 0xc49470, hair: 0x9c9890, beard: '#8a8680', old: true, belt: true } },
  { id: 'fabia', name: 'Fabia', role: 'the baker', at: [-5.5, 0, 17.6], face: Math.PI,
    look: { tunic: 0xcab48a, skin: 0xe2b28e, hair: 0x3a2214, female: true, apron: 0xf2ecdc, eye: '#4a3020' } },
  { id: 'marcus', name: 'Marcus', role: 'the smith', at: [17.8, 0, 1.5], face: -Math.PI / 2, pose: 'hammer',
    look: { tunic: 0x6a3a26, skin: 0x8e5e40, hair: 0x15100c, beard: '#1d1510', belt: true, hammer: true, scale: 1.07 } },
  { id: 'aulus', name: 'Aulus', role: 'the magistrate', at: [-14.3, 1.4, 0], face: Math.PI / 2,
    look: { tunic: 0xf0ebe0, toga: 0xf4f0e6, border: 0x6a1a5a, skin: 0xe6bc98, hair: 0x6a645c, old: true } },
  { id: 'livia', name: 'Livia', role: 'priestess of Vulcan', at: [3.2, 3, -42.2], face: 0.3,
    look: { tunic: 0xece4d4, palla: 0x7a1a14, veil: 0x7a1a14, skin: 0xd8a888, hair: 0x1a120c, female: true, eye: '#2a1a10' } },
];
const SUSPECTS1 = ['gaius', 'fabia', 'marcus', 'aulus', 'livia'];
// Dialogue. Plain English with a little Latin, for Years 5 to 8.
const D1 = {
  gaius: {
    greet: 'Ah. You are awake. You fell from the sky with the ash. Salve, stranger.',
    again: 'Ah. You are awake. You fell from the sky with... wait. Have we done this before?',
    who: 'Gaius. I row the boat on this river. I have rowed it for longer than I can remember. Longer than anyone can remember.',
    extra: [
      { label: 'What is this place?', text: 'This is Sepulta, the buried city. Two hundred years ago the mountain swallowed our town, and Vulcan let us live down here. One law keeps us alive. It is carved on the temple steps.' },
      { label: 'Is there a way out?', text: 'Out? There is the river, the city and the temple. Nothing else. Ask Aulus the magistrate if you like. He talks about nothing else these days.' },
    ],
    intros: ['My boat has words carved on its side. My eyes are not what they were. Can you help me read them?', 'A passenger left this scrap of papyrus in my boat. Help me with it.', 'My father taught me some Latin when I was a boy. I have muddled it. Help an old man.'],
    thanks: ['Bene! You read like a priest.', 'Gratias. Two hundred years, and I still learn something new.', 'Optime! I will not forget this, even if the day does.'],
    clue: 'Strange? Yes. Today someone paid me to row them to the temple steps at the eleventh hour. They paid with a silver coin. Look: the owl of the city treasury is stamped on it.',
    clueShort: 'Gaius: someone paid him to row them to the temple at the eleventh hour, with a silver coin stamped with the owl of the city treasury.',
  },
  fabia: {
    greet: 'Careful, the oven is hot. You are new. Nobody is new down here.',
    again: 'Careful, the oven is... Have I said this to you already? I have the oddest feeling.',
    who: 'Fabia. I bake the bread for the whole city. Every morning the same loaves, the same customers, the same jokes.',
    extra: [
      { label: 'Why so much water?', text: 'I bought six extra jars of water this week. Bread needs water, before you ask. I am a baker, not a criminal.' },
    ],
    intros: ['Aulus sends his orders on a wax tablet. I cannot make sense of this one.', 'My daughter wrote this for practice. Is her Latin right?', 'This old recipe tablet is half rubbed out. Help me with it.'],
    thanks: ['Thank you! Now I know how many loaves to bake.', 'Good. I will tell her she did well. Or that you did.', 'Wonderful. Take a loaf. You look hungry.'],
    clue: 'Aulus the magistrate cancelled tomorrow’s bread. All of it. He said, “There will be no tomorrow for this city.” Then he laughed, as if it was a joke.',
    clueShort: 'Fabia: Aulus cancelled tomorrow’s bread. He said, “There will be no tomorrow for this city.”',
  },
  marcus: {
    greet: 'Stand back from the forge, unless you want new eyebrows.',
    again: 'Stand back from the... Hm. You look familiar. Have you been in my shop before?',
    who: 'Marcus, smith to the city and servant of Vulcan. The god of fire is my god too. Though I tell you, this heat is enough to make a man wish the fire would go out.',
    extra: [
      { label: 'You want the fire to go out?', text: 'Ha! I complain. Every smith complains. I would never touch the sacred fire. I like breathing.' },
    ],
    intros: ['A customer scratched this order on a roof tile. Read it for me.', 'My apprentice wrote a sentence for practice. Is it right?', 'The words for this new bronze plaque have a mistake somewhere. Help me fix it.'],
    thanks: ['Good. Now I know what to make.', 'Right. I will tell the boy to try harder.', 'Excellent. Vulcan himself would be pleased with that.'],
    clue: 'Yesterday someone left a wax mould on my bench and paid me to copy a key from it. The key to the inner door of the temple. Pressed into the wax was the mark of a seal ring: an owl.',
    clueShort: 'Marcus: someone paid him to copy the key to the temple’s inner door. The wax mould carried the mark of an owl seal ring.',
  },
  aulus: {
    greet: 'You! The stranger who fell with the ash. Have you come to see the magistrate?',
    again: 'You! The stranger who... I have seen your face before. In a dream, perhaps.',
    who: 'Aulus Vettius, magistrate of Sepulta and keeper of the city treasury. I keep order down here. Someone has to.',
    extra: [
      { label: 'Is there a way out of the city?', text: 'There are old tunnels under the city. Some say they lead to the sky. The priestess says that is a lie. Priestesses always say that.' },
      { label: 'Where will you be tonight?', text: 'At home, asleep, like every honest citizen. Why do you ask?' },
    ],
    intros: ['Read this petition to me. My secretary has a cold.', 'This new law tablet needs checking before I nail it up.', 'A citizen has written to complain. Help me with it.'],
    thanks: ['Good. That will do.', 'Hm. Correct. You are useful, stranger.', 'Excellent. Rome lost a fine clerk when you fell down here.'],
    clueLabel: 'What are you planning?',
    locked: 'Planning? I am planning nothing. Make yourself useful, and perhaps I will have time for questions.',
    clue: 'Aulus waves you away and hurries off. A wax tablet slips from his toga. Scratched on it is a map of old tunnels and four words: <em>ignis mortuus, porta aperta</em>. The fire dead, the gate open.',
    clueShort: 'Aulus dropped a wax tablet: a map of old tunnels and the words “ignis mortuus, porta aperta” (the fire dead, the gate open).',
    narrate: true,
  },
  livia: {
    greet: 'Step softly. This is the house of Vulcan. While his fire burns, the city lives.',
    again: 'Step softly. This is the house of... You. I have seen you here before, and I do not know how.',
    who: 'Livia, priestess of Vulcan. I tend the sacred fire day and night. Tonight I have sent the temple guard home to sleep. I can manage alone.',
    extra: [
      { label: 'Tell me about the law.', text: 'Two hundred years ago Vulcan made a promise. As long as his fire burns, the mountain will not crush us. If the fire ever goes out, the mountain wakes.' },
    ],
    intros: ['Vulcan’s hymn is carved on the altar. Read it with me.', 'A worshipper left this prayer by the fire. Help me read it.', 'The inscription on the temple door is worn. Help me restore it.'],
    thanks: ['The god hears you.', 'Bene. Vulcan will remember your help.', 'You have a gift for words, stranger.'],
    clue: 'Behind the inner door is the cistern of water that keeps the fire from spreading. Only two keys open it. Mine is marked with a flame. The other belongs to the city treasury, and it is marked with an owl.',
    clueShort: 'Livia: two keys open the temple’s inner door. Hers carries a flame. The other belongs to the city treasury and carries an owl.',
  },
};
const AMBIENT1 = ['Another day. The same as the last.', 'Have you seen my brother? He went to the river. Or will go. I forget.', 'Salve. I am sorry, I am busy. I am always busy.', 'The fire is warm today. It is always warm today.'];
let PEOPLE = PEOPLE1, SUSPECTS = SUSPECTS1, D = D1, AMBIENT_LINES = AMBIENT1;
