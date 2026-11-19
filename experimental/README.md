# Experimental code

This folder is not part of the LearnAble submission.

- It is not imported by the demo site or by `dist/learnable.js`.
- It is not started by Docker Compose.
- `npm run build` and `npm test` do not compile it.

`ASLInterpreter/` is an unused American Sign Language panel. It is not Ethiopian Sign Language. Nothing in it has been checked with a screen reader, a Deaf reviewer, or a switch device. The Material UI packages it names are not installed.

`pocket-sign/api.ts` is an unused client for the experimental FastAPI process. The demo does not call it.

`backend/` is a separate FastAPI app. See `backend/README.md`.
