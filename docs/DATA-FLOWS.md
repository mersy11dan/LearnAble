# Data flows

LearnAble does not add analytics, cookies for tracking, or a call home. Nothing is sent to a third party unless a server key is set and the person has turned consent on.

| Data | Where it goes | When |
| --- | --- | --- |
| Display settings, sign-window position, audio-description choice, lesson-complete flag | `localStorage` on this browser | When the person changes those controls. Storage failures are ignored |
| Lesson media and the 3G pack | Stays in the browser. The pack is built from files already on the site | When the person downloads it |
| Text sent for translation or transcription | Hasab or Hugging Face, from the Flask process only | Only if that key is set and the person has checked the consent box. The request then includes `X-LearnAble-Consent: yes`. Default is no key and no consent |
| Image sent for a description | Hugging Face, from the Flask process only | Same consent rule. Default is off |
| Speech synthesis audio | Hasab, from the Flask process only | Same consent rule. With no key, the page uses the device voice and sends nothing |
| Support chat text | Nowhere. Answers are chosen in the browser from built-in sentences | The chat is not mounted unless `VITE_ENABLE_CHAT=true`. There is no browser API key |
| Certificate proof | Checked in the browser against the published public key. The private key is not in the repository | When an employer opens the certificate page |
| Experimental FastAPI app | Not running. Not in Docker Compose | Not used by the demo |

If consent is missing, the API returns the bundled sample or says the provider was not called. NLLB is not used unless `HF_MT_MODEL` is set. Its weights are CC-BY-NC-4.0, so it is optional and off by default.
