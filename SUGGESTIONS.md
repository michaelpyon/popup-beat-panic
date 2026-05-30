# Popup Beat Panic: Suggestions

## Evangelist Persona

The ideal sharer is a web developer in their late 20s or early 30s who grew up with IE6 popup hell and now hangs out in r/webdev, the Frontend devs Discord, and follows game-jam Twitter. They already know rhythm games (Clone Hero, osu!) but have never seen one themed around browser nostalgia. What makes them screenshot it: hitting a 30x combo streak with "PERFECT" flashing and immediately thinking "I need to post this." What makes them bounce in 5 seconds: arriving on mobile and seeing the game is locked behind a "requires desktop" gate. They use osu! or rhythm games on mobile instead, so the desktop-only constraint is a real drop-off point for casual sharers. The share text format ("Popup Beat Panic [Hard] | Score: 18240 | 91.2% acc | 22x combo") is exactly the kind of copy-pasteable flex they will drop in a Discord channel.

## Ground Truth (Repo HEAD vs Live)

### Repo HEAD state (commit 9c06e36)

All 6 prior canonical-URL fixes confirmed in HEAD:
- `index.html` og:url: `https://popup-beat-panic.vercel.app/` (correct)
- `index.html` og:image: `https://popup-beat-panic.vercel.app/og.png` (correct)
- `index.html` twitter:image: `https://popup-beat-panic.vercel.app/og.png` (correct)
- `index.html` rel=canonical: `https://popup-beat-panic.vercel.app/` (correct)
- `index.html` mobile-gate copy link: `https://popup-beat-panic.vercel.app/` (correct)
- `game.js` share/copy URLs: `https://popup-beat-panic.vercel.app/` (correct)

No fabricated data. No stale "as of" date claims. No example.com links. No false claims about real APIs or real-time data. Game logic is self-contained with Web Audio API synthesis (no external data calls). Leaderboard is local-storage only. All clear.

### Live site state (as of 2026-05-30)

Live build at https://popup-beat-panic.vercel.app/ still serves the PRE-FIX build:
- og:url still points to `michaelpyon.github.io/popup-beat-panic/`
- og:image and twitter:image still point to `michaelpyon.github.io/`
- rel=canonical still points to `michaelpyon.github.io/`

This is a DEPLOY-NEEDED situation. The repo HEAD is correct, but it has never been deployed. The fix is already in main. A Vercel flush will resolve it.

## Prioritized Plan

### Quick Wins (S effort, minimal risk)

1. **New Personal Best callout on result screen** (IMPLEMENTED, this pass)
   Files: `game.js`, `style.css`
   When a player beats their previous high score, show "New Personal Best!" in gold on the result screen instead of the plain rank line, and update the toast. This is the highest-share-trigger moment in any score game. Effort: S. No deploy needed to verify locally; deploy needed for users to see it.

2. **Deploy HEAD to Vercel** (NEEDS DECISION, not a code change)
   The canonical-URL and share-link fixes from commit 9c06e36 are in main but the live CDN still serves the old github.io build. Michael needs to trigger a Vercel redeploy (push a trivial change, or re-deploy via dashboard). Effort: S. Deploy required.

3. **Share text: add song name** (S effort)
   File: `game.js`, `buildShareText()`
   Current share text omits which song was played. "Popup Beat Panic [Hard] | Neon Cache | Score: 18240 | ..." is more specific and signals progression to readers. One line change.

4. **First-run personal best skip logic** (S effort, bug/feel)
   File: `game.js`
   Currently `isNewBest` is only true when `previousBestScore > 0`. On the very first run, the player scores their personal best by definition but sees nothing special. Consider showing "First Run Complete!" or surfacing the score prominently instead of a silent result. Low risk.

### Medium Bets (M effort)

5. **Mobile-friendly spectator mode** (M effort)
   Files: `index.html`, `style.css`
   The mobile gate is correct (game requires mouse), but the gate page is minimal. Adding a short animated preview (CSS-only, looping popup animation using existing styles) would turn the bounce into engagement and increase link share from mobile readers. No gameplay changes.

6. **Keyboard shortcut to restart from result screen** (S-M effort)
   File: `game.js`, `attachEvents()`
   After a run ends, pressing Enter or R should trigger restart. Currently users must click "Restart Run." This is a natural reflex for rhythm-game players and reduces friction for repeat attempts.

7. **Difficulty-based score highlight in share text** (S effort)
   File: `game.js`, `buildShareText()`
   Add a flame emoji or [HARD] marker in the share text only when the user played Hard mode, to amplify the social signal for high-difficulty clears.

### Bigger Bets (L effort)

8. **Audio unlock prompt improvement** (M-L effort)
   Files: `index.html`, `game.js`
   Safari and some Chromium browsers lock the AudioContext until a user gesture. The current "Test Sound" button is correct but not prominent. A brief animated "tap to unlock audio" nudge before the start button could reduce the "silent mode" surprise for new players.

9. **OG image with dynamic score card** (L effort)
   Replace the static `og.png` with a server-side rendered image (Vercel OG) that shows a live score card. This is a large infrastructure change (Edge Function or external service) but would make every shared link a unique preview. Currently out of scope for a static app.
