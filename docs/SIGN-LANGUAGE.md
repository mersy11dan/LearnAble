# Sign language panel

The sign panel sits beside the video and stacks under it when the page is narrow, including a 200 percent zoom of a laptop window. It is not a window dragged over the lesson.

## What is realistic

Generating a sign-language video from text is still research. Ethiopian Sign Language has very little public training data. A search of the Hugging Face Hub on 14 November 2026 found no EthSL text-to-sign model.

What did turn up, and why none of it is called from this app:

| Repository | What it actually is | Verdict |
| --- | --- | --- |
| [Hemg/Indian-sign-language-classification](https://hf.co/Hemg/Indian-sign-language-classification) | Still-image classifier, Apache-2.0 | Sign-to-label, not text-to-sign. Not used. |
| [prithivMLmods/Alphabet-Sign-Language-Detection](https://hf.co/prithivMLmods/Alphabet-Sign-Language-Detection) | Alphabet stills, Apache-2.0 | Recognition, not production. Not used. |
| [ihsanahakiim/videomae-base-finetuned-signlanguage](https://hf.co/ihsanahakiim/videomae-base-finetuned-signlanguage) | Video classifier, CC-BY-NC-4.0 | Non-commercial and the wrong direction. Not used. |
| [simplyyousef/American-Sign-Language-Dataset](https://hf.co/datasets/simplyyousef/American-Sign-Language-Dataset) | Large ASL video set, MIT | ASL, not EthSL, and too large to ship. Not used. |
| [fhswf/sign-language-avatar-gloss-dgs](https://hf.co/datasets/fhswf/sign-language-avatar-gloss-dgs) | German Sign Language avatar data, CC-BY-NC-SA-4.0 | Non-commercial and the wrong language. Not used. |

No How2Sign or SignWriting checkpoint on the Hub was small enough, openly licensed for this public repo, and able to render EthSL from a caption cue without a paid GPU API.

## What the panel does

English caption cues use gloss precomputed by [Suyash2205/signbridge-t5-base-asl-gloss](https://huggingface.co/Suyash2205/signbridge-t5-base-asl-gloss). The lines live in `src/content/asl-gloss.json`. The panel heading is “ASL gloss (English → ASL), not Ethiopian Sign Language”. Amharic captions are not glossed, and the panel says so.

The model card says Apache-2.0. The training set `achrafothman/aslg_pc12` is CC-BY-NC-4.0, so running the weights is opt-in (`LEARNABLE_GLOSS_LOCAL` on the Flask machine, or `HF_GLOSS_REMOTE` with consent). The browser never downloads the 892 MB fp32 file. There is no ONNX export in the model repo.

Each gloss token is then looked up in `src/content/signs.json` (the same list is at `public/signs/dictionary.json`). `X-` and `DESC-` prefixes are removed first, so `DESC-OPEN` looks up `OPEN`. If that entry has a `clip`, the panel plays it. If `clip` is null, that token is fingerspelled. Swap the JSON, or call `LearnAble.setSignDictionary(entries)`, to plug in another dictionary. Do not label an ASL clip as Ethiopian Sign Language.

```json
{ "gloss": "OPEN", "clip": "/media/signs/open.mp4" }
```

A caption that is not in the shipped file, while the model is off, shows the English words and says they are not model output.

The six sample outputs, run on a 4-thread Intel Xeon with no GPU, are usable as a gloss line and not usable as sign. Word order stays English. `Addis Ababa` became `ADDUS ABRAHAM`, and `Amharic captions` became `AMHARAC` and `CAPTEXT`. Cold generate was 0.786 s after a 9.94 s load. Warm cues were 0.699–0.945 s.

## Limits

- The shipped dictionary has no video files.
- Fingerspelling here is Latin letters, not an EthSL fingerspelling font or avatar.
- Timing follows the caption cue. It is not a motion-capture retarget.
- A voice agent with Pinecone, Voyage, Gemini, or Addis AI is not built. Those are paid services, and the rubric penalises a lock-in. A later design can keep retrieval on the device, with an open embedding model, and still leave the screen reader in charge.
