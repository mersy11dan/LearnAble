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

## What you see

The pictures are the panel. Each letter is a public-domain ASL fingerspelling drawing (`public/signs/fingerspell/`). The corrected gloss sits under the pictures in smaller type. The long explanation, the raw model line, and the attribution are inside “About this ASL”.

No lexical sign picture is shipped. ASL-LEX is CC BY-NC 4.0. Lifeprint and Handspeak are not openly licensed. A word that is not a fingerspelling drawing is still shown letter by letter, and the panel says the pictures are fingerspelling, not recorded signs.

The player sits in normal flow beside its video, about 38 percent of the player and at least 16rem wide. It stacks under the video when the player is narrower than 46rem, which includes a phone and a 200 percent zoom of a laptop. It is not a fixed layer over the host page.

## Video file

`public/media/lesson-en.mp4` and `lesson-am.mp4` are H.264 Constrained Baseline, yuv420p, AAC, with the `moov` atom at the front. A static host must send `Content-Type: video/mp4`, `Accept-Ranges: bytes`, and a `206` response for a `Range` request. Nginx does this by default. A host that only returns `200` for the whole file can still play these short files, because the index is at the start, but range requests are what browsers use when seeking.

## What the panel does

English caption cues show two lines. “Model output (Suyash2205/signbridge-t5-base-asl-gloss)” is the raw string from [Suyash2205/signbridge-t5-base-asl-gloss](https://huggingface.co/Suyash2205/signbridge-t5-base-asl-gloss). “Corrected by hand” is an edit of that string for the six sample captions: names and broken words are repaired, copulas such as BE are dropped, and `X-` and `DESC-` prefixes are removed. The lines live in `src/content/asl-gloss.json`. The panel heading is “ASL gloss (English → ASL), not Ethiopian Sign Language”. Amharic captions are not glossed, and the panel says so.

A Deaf ASL signer should review the corrections before anyone treats them as a translation. They are still American Sign Language gloss, not Ethiopian Sign Language. Clip lookup and fingerspelling use the corrected line when one exists.

The model card says Apache-2.0. The training set `achrafothman/aslg_pc12` is CC-BY-NC-4.0, so running the weights is opt-in (`LEARNABLE_GLOSS_LOCAL` on the Flask machine, or `HF_GLOSS_REMOTE` with consent). The browser never downloads the 892 MB fp32 file. There is no ONNX export in the model repo.

Each token of the corrected line is then looked up in `src/content/signs.json` (the same list is at `public/signs/dictionary.json`). A token marked `fs-` is fingerspelled. `IX-3` is a point, not fingerspelled. Other tokens are matched after punctuation is removed. If that entry has a `clip`, the panel plays it. If `clip` is null, that token is fingerspelled. Swap the JSON, or call `LearnAble.setSignDictionary(entries)`, to plug in another dictionary. Do not label an ASL clip as Ethiopian Sign Language.

```json
{ "gloss": "OPEN", "clip": "/media/signs/open.mp4" }
```

A caption that is not in the shipped file, while the model is off, shows the English words and says they are not model output.

The six sample outputs, run on a 4-thread Intel Xeon with no GPU, are usable as a gloss line and not usable as sign. Word order stays English. `Addis Ababa` became `ADDUS ABRAHAM`, and `Amharic captions` became `AMHARAC` and `CAPTEXT`. Cold generate was 0.786 s after a 9.94 s load. Warm cues were 0.699–0.945 s.

## How to add a real ESL recording

The panel does not invent a signer. A recording appears only when you point `sign` at a file you host yourself.

1. Record the lesson in Ethiopian Sign Language. Export H.264 Constrained Baseline, `yuv420p`, with no audio track (AAC-less is fine). Keep it muted. Match the lesson duration. Put the index at the front of the file (`-movflags +faststart`).
2. Serve the file as `video/mp4` and answer `Range` requests with `206` and `Accept-Ranges: bytes`.
3. Point both players at it. On the embed:

```html
<learnable-player
  src="/media/lesson-en.mp4"
  sign="/media/esl/lesson-1.mp4"
  sign-lang="ethiopian"
  sign-offset="0.0">
</learnable-player>
```

`sign-offset` is seconds added to the lesson clock to find the matching frame. Use `0.0` when the recording starts with the lesson. A positive value plays further into the sign file.

Set `sign-lang="ethiopian"` only for an Ethiopian Sign Language recording. If the attribute is empty, or the file is `esl-placeholder.mp4`, the panel says "Placeholder, not a sign language recording" and keeps the ASL gloss and fingerspelling as a labelled fallback. A missing or broken file shows "No Ethiopian Sign Language recording is available for this lesson yet" and does not stop the lesson audio or captions.

The React lesson passes the same values as `signVideo`, `signLang`, and `signOffset` on `AccessiblePlayer`.

The window can be dragged, or moved from the keyboard: Move, then arrow keys (20 pixels, Shift for 80), then Enter or Escape. Smaller, Larger, and Reset change the size. A corner grip resizes it with a pointer. The size stays inside the player, and the choice is stored in `localStorage` when storage works. On a narrow or stacked layout the Move control is hidden, because the panel is in normal flow there.

## Limits

- The shipped dictionary has no video files.
- Fingerspelling here is Latin letters, not an EthSL fingerspelling font or avatar.
- Timing follows the caption cue. It is not a motion-capture retarget.
- A voice agent with Pinecone, Voyage, Gemini, or Addis AI is not built. Those are paid services, and the rubric penalises a lock-in. A later design can keep retrieval on the device, with an open embedding model, and still leave the screen reader in charge.
