# Testing the Chat Support Feature

## Quick Test Guide

### Prerequisites
```bash
npm install
npm run dev
```

Optional, in a second terminal, for Gemini and the gloss model: `python server/app.py` with keys in `.env`.

Open http://127.0.0.1:5173 in your browser.

## Test Scenarios

### 1. Basic Chat Functionality ✅

**Test Steps:**
1. Look for the chat button in the bottom-right corner (green circle with message icon)
2. Click the button to open the chat
3. Verify the welcome message appears
4. Type "How do I use captions?" in the input field
5. Press Enter or click Send button
6. Verify you receive a helpful response about captions
7. Verify the answer carries a source line

**Expected Result:**
- Chat opens smoothly
- Welcome message explains available features
- Response explains how to use captions (press C key, toggle in player controls)
- With no key the source line reads "Saved answer. No model is running."
- With `GEMINI_API_KEY` set on the service and the consent box ticked, the source line names the model

### 2. Voice Input 🎤

**Test Steps:**
1. Open the chat
2. Click the microphone button
3. When it turns red and shows "listening" indicator, speak: "Where can I download offline content?"
4. Stop speaking and wait for transcription
5. Verify your spoken question appears as text
6. Verify you receive a response about offline packs

**Expected Result:**
- Microphone button turns red when listening
- Visual "listening" indicator appears
- Speech is transcribed accurately
- Question is sent automatically
- Response explains offline pack features

**Note:** Voice input requires browser permission for microphone access.

### 3. Track 2 sign language (player, not chat)

Sign language is a Track 2 player control, not a chat panel.

**Test Steps:**
1. Open `/lesson/slow-connection`
2. Press `S` or use the sign control
3. Confirm the sign window, captions, audio description, and player stay usable together

**Expected Result:**
- The chat has no ASL button
- The sign window is ASL gloss, not Ethiopian Sign Language
- Captions, audio description, the offline pack, and tagged documents remain available from the rest of the site

### 4. Keyboard Navigation ⌨️

**Test Steps:**
1. Close the chat if open
2. Press Tab multiple times until chat button is focused
3. Press Enter to open chat
4. Press Tab to navigate through: microphone → input field → send button
5. Type a question and press Enter
6. Press Escape to close chat

**Expected Result:**
- All interactive elements are reachable via Tab
- Focus indicators are clearly visible (3px blue outline)
- Enter key sends messages
- Escape key closes chat

### 5. Mobile Responsiveness 📱

**Test Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select iPhone or Android device
4. Verify chat button is visible
5. Click to open chat
6. Verify chat takes full width at bottom
7. Test scrolling messages
8. Test input field and buttons

**Expected Result:**
- Chat button positioned correctly on mobile
- Chat interface uses full width
- Bottom sheet style on mobile (rounded top corners)
- Touch targets are large enough (44px minimum)
- Keyboard doesn't cover input field

### 6. Accessibility Features ♿

**Test Steps:**

#### Screen Reader Test:
1. Enable screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
2. Navigate to chat button
3. Verify button is announced as "Open support chat"
4. Open chat and verify "Support chat" dialog is announced
5. Navigate through messages
6. Verify messages are announced properly

#### High Contrast Test:
1. Click "High contrast" button in top navigation
2. Verify chat button color changes appropriately
3. Open chat
4. Verify all text is readable with high contrast
5. Verify borders are visible

#### Reduced Motion Test:
1. Click "Stop motion" button in top navigation
2. Open/close chat
3. Verify animations are disabled or reduced
4. Messages should appear without slide animation

**Expected Results:**
- All elements have proper ARIA labels
- Screen reader announces all interactions
- High contrast mode maintains readability
- Reduced motion removes animations
- Focus indicators remain visible

### 7. Knowledge Base Questions 📚

**Test these common questions:**

1. "How do I turn on captions?"
   - Should explain C key and caption controls

2. "Where is the sign language window?"
   - Should explain S key and sign window features

3. "What keyboard shortcuts are available?"
   - Should list common shortcuts

4. "How do I download offline content?"
   - Should explain offline pack feature

5. "How do I verify my certificate?"
   - Should explain certificate verification

6. "What accessibility features do you have?"
   - Should list accessibility toolbar options

7. "How do I navigate the course?"
   - Should list main sections and navigation

**Expected Result:**
All questions receive relevant saved answers without a Gemini key, each labelled as saved.

### 8. Minimize/Expand 📐

**Test Steps:**
1. Open the chat
2. Click the minimize button (down arrow in header)
3. Verify only header is visible
4. Click expand button (up arrow)
5. Verify full chat interface returns

**Expected Result:**
- Chat minimizes smoothly to header only
- State is preserved when minimized
- Expand button works to restore full view

### 9. Multiple Questions 🔄

**Test Steps:**
1. Open chat
2. Ask: "How do I use captions?"
3. Wait for response
4. Ask: "What about audio descriptions?"
5. Wait for response
6. Ask: "Where can I find keyboard shortcuts?"
7. Scroll up to see all messages

**Expected Result:**
- Messages stack in chronological order
- Scroll works smoothly
- All messages remain visible
- Timestamps show on each message

### 10. Error Handling 🛡️

**Test Steps:**
1. Open browser DevTools → Network tab
2. Enable "Offline" mode
3. Open chat
4. Ask a question
5. Verify fallback response works

**Expected Result:**
- Chat still works offline
- Fallback knowledge base provides responses
- No error messages shown to user
- Graceful degradation

## Browser Compatibility Test Matrix

Test in these browsers if available:

| Browser | Version | Chat | Voice |
|---------|---------|------|-------|
| Chrome  | Latest  | ✅   | ✅    |
| Firefox | Latest  | ✅   | ⚠️*   |
| Safari  | Latest  | ✅   | ✅    |
| Edge    | Latest  | ✅   | ✅    |

*Firefox voice input requires `media.webspeech.recognition.enable` to be set to `true` in about:config

## Performance Checks

### Load Time
- [ ] Chat button appears immediately on page load
- [ ] Opening chat is instant (<100ms)
- [ ] Messages render quickly (<50ms)

### Model Loading
- [ ] No model is downloaded by the browser at any point
- [ ] Lesson captions gloss instantly from the shipped file

### Memory Usage
- [ ] Open DevTools → Performance → Memory
- [ ] Use chat for several minutes
- [ ] Verify no memory leaks
- [ ] Memory usage should stabilize

## Issue Reporting

If you find any issues:

1. **Describe the issue:** What went wrong?
2. **Steps to reproduce:** How can we recreate it?
3. **Expected behavior:** What should happen?
4. **Actual behavior:** What actually happened?
5. **Browser/Device:** What are you using?
6. **Screenshots:** If visual, include screenshots
7. **Console errors:** Check browser console (F12)

## Automated Tests

Run the full test suite:
```bash
npm test
```

Run only the chat tests:
```bash
npm test -- chat-support.test.tsx
```

Server side:
```bash
pytest server/test_app.py -k chat
```

## Success Criteria

Chat support is working correctly if:

- ✅ All manual tests pass
- ✅ All automated tests pass
- ✅ No console errors
- ✅ Keyboard navigation works completely
- ✅ Screen reader compatible
- ✅ Mobile responsive
- ✅ Accessible (WCAG 2.2 AA)
- ✅ Works without API keys
- ✅ Follows LearnAble design system

## Known Limitations

1. **Voice Input:**
   - Not available in all browsers
   - Requires microphone permission
   - May not work on older mobile devices

2. **Sign language:**
   - Lives on the lesson player, not in chat
   - ASL gloss, not Ethiopian Sign Language, and not a recorded signer

3. **Gemini:**
   - Optional. Saved answers are shown without it
   - The key lives on the transcript service, never in the browser
   - Nothing is sent until the consent box is ticked

## Support

For questions or issues:
- Check `docs/CHAT-SUPPORT.md` for detailed documentation
- Review `README.md` for setup instructions
- Check browser console for error messages
