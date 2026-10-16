# Urbs Sepulta

A first-person Latin mystery for Common Entrance Level 1. Two levels:

1. **The Buried City.** A Roman city under Vesuvius lives the same day over and over. Find who will put out Vulcan's fire.
2. **The Rubicon.** Caesar's camp, the night of 10 January 49 BC. Find who will steal the eagle of the Thirteenth Legion.

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
js/game/                   state, audio, HUD, dialogue, Latin tasks, journal, time loop, player, setup screen
js/game/levels.js          the list of levels and the text that changes between them
js/main.js                 the main loop and start-up
assets/textures/           photo textures (stone, plaster, marble, wood, roof tiles, bronze)
assets/portraits/          portraits shown in the dialogue panel, named after each character's id
vendor/three/              a local copy of Three.js 0.160, so school networks that block CDNs still work
```

The scripts are ordinary (non-module) scripts loaded one after another, so they share one global scope. Load order matters: it is the list in `js/boot.js`.

## Adding a level

1. Write `js/levels/<name>.js` with a build function, five people (`PEOPLE`), their dialogue (`D`), and ground functions. `js/levels/rubicon.js` is the model to copy.
2. Add the file to the `SCRIPTS` list in `js/boot.js`, before `js/game/levels.js`.
3. Register it in `LEVELS` in `js/game/levels.js` and add a button with `data-level="3"` to the title screen in `index.html`.

## Backups

Before every push, the version that is live gets saved as a branch named `backup/<date>-<label>`. To go back to one, check out that branch, or open it on GitHub and copy its files over `main`.

## Credits

- Latin sentences: *Prep School Latin*, R. C. Bass, CC BY-NC-SA.
- [Three.js](https://threejs.org), MIT licence (see `vendor/three/LICENSE`).
- Fonts: Cinzel and EB Garamond from Google Fonts.
