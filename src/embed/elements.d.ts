import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LearnAblePlayerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  "captions-en"?: string;
  "captions-am"?: string;
  sign?: string;
  describe?: string;
  offline?: string;
  braille?: string;
  docs?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "learnable-player": LearnAblePlayerProps;
      "learnable-toolbar": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
