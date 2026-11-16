import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpeechRecognition } from "../utils/speechRecognition";

type Handler = ((event: unknown) => void) | null;

class FakeRecognition {
  static instance: FakeRecognition | null = null;
  continuous = false;
  interimResults = false;
  lang = "";
  maxAlternatives = 1;
  onstart: Handler = null;
  onresult: Handler = null;
  onerror: Handler = null;
  onend: Handler = null;
  started = false;

  start() {
    this.started = true;
    FakeRecognition.instance = this;
    this.onstart?.({});
  }

  stop() {
    this.started = false;
    this.onend?.({});
  }

  abort() {
    this.started = false;
    this.onend?.({});
  }
}

function resultList(items: { transcript: string; isFinal: boolean }[]) {
  const results = items.map((item) => {
    const row = {
      isFinal: item.isFinal,
      length: 1,
      0: { transcript: item.transcript },
      item: () => ({ transcript: item.transcript }),
    };
    return row;
  });
  return {
    resultIndex: 0,
    results: Object.assign(results, { length: results.length, item: (i: number) => results[i] }),
  };
}

describe("useSpeechRecognition", () => {
  beforeEach(() => {
    FakeRecognition.instance = null;
    vi.useFakeTimers();
    vi.stubGlobal("SpeechRecognition", FakeRecognition);
    vi.stubGlobal("webkitSpeechRecognition", FakeRecognition);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function startHook() {
    const onFinal = vi.fn();
    const onInterim = vi.fn();
    const hook = renderHook(() => useSpeechRecognition({ onFinal, onInterim }));
    act(() => {
      hook.result.current.startListening();
    });
    return { ...hook, onFinal, onInterim };
  }

  it("starts listening in the click", () => {
    const { result } = startHook();
    expect(result.current.isListening).toBe(true);
    expect(FakeRecognition.instance?.continuous).toBe(true);
    expect(FakeRecognition.instance?.interimResults).toBe(true);
  });

  it("fills in words as they are spoken, then sends after a pause", () => {
    const { onFinal, onInterim } = startHook();
    const engine = FakeRecognition.instance!;
    act(() => {
      engine.onresult?.(resultList([{ transcript: "sessions", isFinal: false }]));
    });
    expect(onInterim).toHaveBeenCalledWith("sessions");
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(onFinal).toHaveBeenCalledWith("sessions");
  });
});
