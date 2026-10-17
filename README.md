# Urbs Sepulta

A first-person Latin mystery for Common Entrance Level 1. Two levels:

1. **The Buried City.** A Roman city under Vesuvius lives the same day over and over. Find who will put out Vulcan's fire.
2. **The Rubicon.** Caesar's camp, the night of 10 January 49 BC. Find who will steal the eagle of the Thirteenth Legion.
3. **The Ides of March.** The house of Brutus, the night of 14 March 44 BC. Find who murdered Felix the scribe, and uncover the plot against Caesar.

Each level has five people with three Latin tasks each: 15 questions per level. The questions come from *Prep School Latin* by R. C. Bass (CC BY-NC-SA).

## Playing it

The game is hosted on GitHub Pages. Open the Pages address for this repository.

To test on your own computer you need a small local web server, because browsers block the game's scripts when you double-click `index.html`. Either:

- open the folder in VS Code and use the **Live Server** extension, or
- run `python3 -m http.server` in this folder, then visit `http://localhost:8000`.

## How the files fit together

```
index.html                 the page: screens, panels and buttons
css/style.css              all the styling
js/boot.js                 loads Three.js, the photo textures, then the scripts below in order
js/data/latin-bank.js      the Latin sentences, grammar tables and question builder
js/engine/                 renderer, textures and materials, lights and fire, buildings, people
js/levels/sepulta/         Level 1: ground, world, people and dialogue
js/levels/rubicon.js       Level 2: the camp, people and dialogue
js/levels/ides.js          Level 3: the house of Brutus, people and dialogue
js/game/                   state, audio, HUD, dialogue, Latin tasks, journal, time loop, player, setup screen
js/game/levels.js          the list of levels and the text that changes between them
js/main.js                 the main loop and start-up
assets/textures/           photo textures (stone, plaster, marble, wood, roof tiles, bronze), WebP
assets/portraits/          portraits shown in the dialogue panel, named after each character's id, WebP
assets/models/             scanned props from Poly Haven (CC0), one compressed .glb file each
vendor/three/              a local copy of Three.js 0.160, so school networks that block CDNs still work
```

The scripts are ordinary (non-module) scripts loaded one after another, so they share one global scope. Load order matters: it is the list in `js/boot.js`.

## Graphics settings

The title screen offers three settings. The game remembers the choice on each computer.

- **School PC** (the default): no shadows or post-processing, three moving lights, a slightly lower resolution. Built for school PCs, Chromebooks and tablets.
- **Standard**: full resolution with smoothing and five lights.
- **High**: shadows, ambient occlusion, glow and eight lights. Needs a proper graphics card.

If the game drops below about 27 frames a second for a few seconds, it steps down a setting on its own and says so.

Only a few real lights exist (the light pool in `js/engine/lights-and-fire.js`). They move to the fires and lamps nearest the player, so a level can have any number of fires at no extra cost.

## Adding a model

Models are compressed with [glTF-Transform](https://gltf-transform.dev):

```
npx @gltf-transform/cli optimize in.gltf assets/models/<id>.glb --compress meshopt --texture-compress webp --texture-size 512 --simplify true --simplify-ratio 0.5
```

Then place it in a level with `prop('<id>', x, y, z, { rot, scale, solid })`.

## Adding a level

1. Write `js/levels/<name>.js` with a build function, five people (`PEOPLE`), their dialogue (`D`), and ground functions. `js/levels/rubicon.js` is the model to copy.
2. Add the file to the `SCRIPTS` list in `js/boot.js`, before `js/game/levels.js`.
3. Register it in `LEVELS` in `js/game/levels.js` and add a button with `data-level="3"` to the title screen in `index.html`.

## Backups

Before every push, the version that is live gets saved as a branch named `backup/<date>-<label>`. To go back to one, check out that branch, or open it on GitHub and copy its files over `main`.

## Credits

- Latin sentences: *Prep School Latin*, R. C. Bass, CC BY-NC-SA.
- [Three.js](https://threejs.org), MIT licence (see `vendor/three/LICENSE`).
- 3D props: [Poly Haven](https://polyhaven.com), CC0.
- Fonts: Cinzel and EB Garamond from Google Fonts.
