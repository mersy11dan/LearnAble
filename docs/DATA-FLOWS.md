# Data flows

LearnAble does not add analytics, cookies for tracking, or a call home.

| Data | Where it goes | When |
| --- | --- | --- |
| Display settings | `localStorage` key `learnable-widget` on the host, and `learnable-display` on the demo site | When the person changes larger text, contrast, motion, or caption style |
| Lesson media | Stays in the browser. The 3G pack is built from files already on the site | When the person downloads it |
| Text sent for translation or transcription | Hasab or Hugging Face | Only if a key is configured and the person has checked the consent box. The request then includes `X-LearnAble-Consent: yes` |
| Image sent for a description | Hugging Face | Same consent rule |
| Certificate proof | Checked in the browser against the published public key. The private key is not in the repository | When an employer opens the certificate page |

If consent is missing, the API returns the bundled sample or says the provider was not called. NLLB is not used unless `HF_MT_MODEL` is set. Its weights are CC-BY-NC-4.0, so it is optional and off by default.
