# English33

A Bengali-first 33-day English learning companion: practical lessons, browser speech, active recall, and an optional GPT coach.

**Website:** https://nomansibly.github.io/english33/

## What works without an API

- 33 daily 40-minute lesson routines and five weekly/final milestones, with revision days.
- 20 essential vocabulary items with part of speech, Bengali meaning, British-style IPA, pronunciation hints and examples.
- Active-recall vocabulary quiz; misses return after 10 minutes, successes after 1, 3, 7 and 14 days.
- Pronunciation drills for v/w, p/f, voiced/unvoiced th, short/long i, rhythm; ten listenable phrases and local recording/playback.
- One-question-at-a-time guided speaking and six roleplay scenarios. **This is scripted practice, not an AI model.** Only a few common errors are checked; unflagged answers are not necessarily correct.
- Nine grammar topics with five examples and three exercises each. Exercises must pass before advancing.
- Four A2 listening dialogues with five comprehension questions each; Bengali notes after submission.
- Five sentence frames, five examples per frame, five Bengali prompts and comparison answers.
- Ten-question tests for all 33 days with progressively harder grammar, 100-point scoring, weakness diagnosis and micro-drills. Fixed short-answer matching is not a semantic grader.
- Five final speaking tasks, saved answers, reflection checklist and a next-30-day plan. No fake CEFR score or official exam claim.
- Browser-local progress, JSON backup/restore, speech speed and voice settings.

A2 is an aspiration, not a promise after 16.5–24.75 study hours. Repeat days as needed. No official certification is issued.

## Run locally

Requires Node.js 22 or newer. No npm dependencies.

```sh
npm start
```

Open http://localhost:8787. `npm test` runs content, recall, scoring and backend security tests.

## GitHub Pages

The static app is in `docs/` (an exact copy of `dist/`). In repository Settings → Pages, deploy from branch `main`, folder `/docs`. It uses relative asset URLs, so project-subpath hosting works. Changes to `dist/` must be copied into `docs/` before committing (`cp dist/* docs/`). The optional backend must be hosted separately; GitHub Pages serves static files only.

## Optional GPT coach

There is no promise of an unlimited free GPT API. OpenAI API calls have usage pricing; any test access or promotional/subscription credits depend on the API account. Check [official pricing](https://developers.openai.com/api/docs/pricing) and the [quickstart](https://developers.openai.com/api/docs/quickstart).

1. Deploy `server/index.js` to a trusted Node.js HTTPS hosting environment, or run locally. For a single-user deployment, use one instance. The application is dependency-free; start command: `node server/index.js`.
2. Set server environment variables from `.env.example`. `OPENAI_API_KEY` is the actual secret; `OPENAI_MODEL` is a text model available to your API account. Generate a random `COACH_ACCESS_TOKEN` of at least 24 characters (for example, `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`). Configure hosting secrets without committing them.
3. Set `ALLOWED_ORIGINS` to the exact website origin, e.g. `https://nomansibly.github.io`. Origins do not include `/english33/`. Restart after changing variables. Use a provider HTTPS URL for the backend; do not expose an HTTP service to the public internet.
4. On the website, open Settings. Enter `https://YOUR-BACKEND/api/chat` and the separate coach access code. The OpenAI key NEVER goes in the web UI or browser storage. The access code stays only in tab memory, so enter it again after a reload.
5. Start any coach session. Browser speech recognition transcribes your answer; review it, then send. The server uses OpenAI's Responses API and the appropriate one of ten coaching prompts. Listen reads the reply with the browser voice. This is turn-based voice interaction, not OpenAI Realtime voice.

The proxy validates roles and message sizes, requires a private access code, restricts origins, sets `store:false`, limits output, applies timeouts, and allows 10 requests/minute and 100/day **per server process**. The counters reset on restart and do not coordinate replicas. For shared/public AI access, replace the shared code with proper user authentication and durable per-user rate/budget limits before wider deployment. Configure API-account spending limits as appropriate. CORS alone is not authentication.

### Privacy and limits

- Progress and written practice stay in this browser’s localStorage. Clearing site data removes them; export backups.
- Recording uses MediaRecorder; audio is temporary, stays in the current page, and is never uploaded by the app.
- Speech recognition availability differs by browser. It may send audio to the browser vendor’s speech service. A typing fallback always exists. No automatic pronunciation scoring is claimed.
- GPT mode sends conversation text, the selected day and lesson context to your configured backend and OpenAI. The frontend keeps up to 24 recent turns per request; start a new session if it grows too long.
- GPT feedback is model-generated and may be incorrect. Text-only transcripts cannot establish spoken fluency or pronunciation; any CEFR estimate is informal and limited to text evidence.
- No live OpenAI request was tested during initial creation because no API key/model configuration was provided. The adapter was tested with mocked responses, error paths and authentication checks.
- Google Fonts is optional; system-font fallbacks are included. Network access is needed for loaded fonts and browser/cloud speech services.

## Structure

- `dist/` — canonical frontend source, no build step.
- `docs/` — GitHub Pages deployment copy.
- `server/` — optional authenticated OpenAI proxy + local static server.
- `tests/` — Node built-in test suite.

Keep personal learning data and credentials out of this public repository.
