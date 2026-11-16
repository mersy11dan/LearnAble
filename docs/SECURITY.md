# Security notes for the embed

LearnAble is a script a host pastes into a page. The repository is public. Nothing in a `VITE_` variable is a secret. `VITE_API_BASE` is only the public address of this site’s own transcript service. `VITE_ENABLE_CHAT=false` hides the support chat. Do not put a model key in any `VITE_` name.

## What this pass fixes

- Shortcut help and the lesson gateway used to put text into `innerHTML`. Key names and lesson strings are escaped before they are inserted. Caption cues, gloss lines, and status text are set with `textContent`.
- Settings loaded from `localStorage`, and options passed to `LearnAble.init`, are copied key by key. `__proto__`, `constructor`, and `prototype` are dropped. Only known fields with the expected types are kept.
- There is no `eval`, no `new Function`, and no timer built from a string.
- The embed does not add inline event-handler attributes. Listeners are added from script.
- `safeFetch` allows the page’s own origin and the origin of `data-learnable-base` or `VITE_API_BASE`. Any other origin throws before `fetch` runs.
- Calls that would leave the machine for Hasab or Hugging Face still require `X-LearnAble-Consent: yes`.
- An embedded video iframe gets a `sandbox` (`allow-scripts allow-same-origin allow-presentation`) and a title.
- The integrate snippet pins version `0.4.0` and includes a `sha384` integrity value for `dist/learnable.js`. Replace the hash when that file changes.
- A sample content-security policy is below. `public/.well-known/security.txt` says where to report a problem.

## Sample content-security policy

```
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
media-src 'self';
font-src 'self';
connect-src 'self';
frame-src https://www.youtube-nocookie.com https://player.vimeo.com;
object-src 'none';
base-uri 'self';
```

The plug-in does not need `unsafe-inline` for its own script. A host who adds a bookmarklet is choosing to run a `javascript:` URL; the bookmarklet is documented as a convenience, not as the locked-down install. The locked-down install is the script tag with `integrity` and `crossorigin="anonymous"`.
