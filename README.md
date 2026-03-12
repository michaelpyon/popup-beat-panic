# Popup Beat Panic

Retro browser-popup rhythm game inspired by early 2000s Internet Explorer chaos.

## Play Locally

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Open `http://127.0.0.1:5173`.

## Gameplay

- Popups spawn on beat.
- Click the top-right `X` when the approach ring closes.
- `PERFECT`, `GREAT`, `GOOD`, and `MISS` judgments affect combo, score, and XP.
- Songs unlock through XP and best-score progression.

## Files

- `index.html` - UI and overlays
- `style.css` - styling and animation
- `game.js` - game loop, audio engine, progression, leaderboard
