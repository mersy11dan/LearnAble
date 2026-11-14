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

Each caption cue is matched to a gloss in `src/content/signs.json` (the same list is copied at `public/signs/dictionary.json`). If a Deaf teacher adds a `clip` URL, the panel plays that file in time with the cue. If `clip` is null, the panel shows the gloss and a fingerspelling row, and it says in the interface that this is a placeholder, not a recorded signer.

To add a real clip, put the file where the page can fetch it and set `clip` to that URL:

```json
{ "match": "Hana opens", "gloss": "OPEN", "clip": "/media/signs/open.mp4" }
```

The match is a piece of the English caption. The clip should be a recording made with a Deaf EthSL teacher. Do not swap in an ASL clip and call it EthSL.

## Limits

- The shipped dictionary has no video files.
- Fingerspelling here is Latin letters, not an EthSL fingerspelling font or avatar.
- Timing follows the caption cue. It is not a motion-capture retarget.
- A voice agent with Pinecone, Voyage, Gemini, or Addis AI is not built. Those are paid services, and the rubric penalises a lock-in. A later design can keep retrieval on the device, with an open embedding model, and still leave the screen reader in charge.
