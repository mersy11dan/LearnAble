export type PlayerCommand =
  | { type: "toggle-play" }
  | { type: "cycle-captions" }
  | { type: "toggle-ad" }
  | { type: "toggle-sign" }
  | { type: "seek"; by: number }
  | { type: "seek-to"; to: "start" | "end" }
  | { type: "volume"; by: number }
  | { type: "mute" }
  | { type: "fullscreen" }
  | { type: "help" };

type KeyInfo = {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
};

export function commandForKey(event: KeyInfo): PlayerCommand | null {
  if (event.metaKey || event.ctrlKey || event.altKey) return null;
  switch (event.key) {
    case " ":
    case "k":
    case "K":
      return { type: "toggle-play" };
    case "c":
    case "C":
      return { type: "cycle-captions" };
    case "d":
    case "D":
      return { type: "toggle-ad" };
    case "s":
    case "S":
      return { type: "toggle-sign" };
    case "ArrowLeft":
      return { type: "seek", by: -5 };
    case "ArrowRight":
      return { type: "seek", by: 5 };
    case "j":
    case "J":
      return { type: "seek", by: -10 };
    case "l":
    case "L":
      return { type: "seek", by: 10 };
    case "ArrowUp":
      return { type: "volume", by: 0.1 };
    case "ArrowDown":
      return { type: "volume", by: -0.1 };
    case "m":
    case "M":
      return { type: "mute" };
    case "f":
    case "F":
      return { type: "fullscreen" };
    case "Home":
      return { type: "seek-to", to: "start" };
    case "End":
      return { type: "seek-to", to: "end" };
    case "?":
      return { type: "help" };
    default:
      return null;
  }
}
