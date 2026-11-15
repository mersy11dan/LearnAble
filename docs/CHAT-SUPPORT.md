# Chat Support Feature

The LearnAble Chat Support feature provides an intelligent, accessible support assistant that helps users navigate the course and understand accessibility features.

## Features

### 🤖 AI-Powered Responses
- **Gemini Integration**: Uses Google's Gemini API for intelligent responses
- **Fallback Responses**: Works without API key using comprehensive fallback knowledge base
- **Course Context**: Understands LearnAble features, navigation, and accessibility options

### 🎤 Voice Support
- **Voice Input**: Click the microphone button to speak your question
- **Speech Recognition**: Uses Web Speech API for real-time transcription
- **Browser Support**: Works in modern browsers that support Speech Recognition
- **Accessibility**: Full keyboard navigation and screen reader support

### 🤟 ASL Translation
- **T5-Based Model**: Uses HuggingFace's Suyash2205/signbridge-t5-base-asl-gloss model
- **English to ASL Gloss**: Translates English text to American Sign Language gloss notation
- **Fallback Support**: Includes common phrase translations for offline use
- **Interactive Panel**: Easy-to-use translation interface

### 📱 Mobile Optimized
- **Responsive Design**: Full-screen on mobile devices
- **Touch Targets**: 44px minimum touch targets for accessibility
- **Swipe Support**: Easy to open, minimize, and close
- **Fixed Positioning**: Bottom-right corner on desktop, full-width on mobile

### ♿ Accessibility Features
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Escape
- **Screen Reader Support**: Proper ARIA labels and live regions
- **High Contrast Mode**: Follows LearnAble's high contrast settings
- **Reduced Motion**: Respects prefers-reduced-motion setting
- **Focus Indicators**: Clear 3px focus outlines matching LearnAble design

## Usage

### Basic Usage

The chat support button appears in the bottom-right corner of every page. Click it to open the chat interface.

**Common Questions:**
- "How do I turn on captions?"
- "Where can I download offline content?"
- "How do I use keyboard shortcuts?"
- "What accessibility features are available?"
- "How do I verify my certificate?"

### Voice Input

1. Click the microphone button in the chat interface
2. Speak your question clearly
3. The question will be automatically sent when you stop speaking

**Supported in:**
- Chrome/Edge (desktop and mobile)
- Safari (iOS 14.5+)
- Firefox (requires preference enabled)

### ASL Translation

1. Click the "ASL" button in the chat interface
2. Enter English text in the text area
3. Click "Translate to ASL"
4. View the ASL gloss notation

**Example:**
- Input: "The doctor will help you now"
- Output: "DOCTOR WILL HELP YOU NOW"

## Configuration

### Environment Variables

Add to your `.env` file:

```bash
# Optional: Gemini API Key for enhanced AI responses
VITE_GEMINI_API_KEY=your_api_key_here
```

**Getting a Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key (free tier available)
4. Add to `.env` file

**Note:** The chat works without an API key using intelligent fallback responses.

## Design System

The chat support follows LearnAble's design system:

### Colors
- **Primary**: Moss green (`#0e5a42`) for user messages and actions
- **Background**: Paper (`#f2f0ea`) for messages area
- **Accent**: Navy (`#1b3048`) for header
- **Highlight**: Caption yellow (`#ffee00`) for header bar

### Typography
- **Headings**: Literata (display font)
- **Body**: Atkinson Hyperlegible (accessibility-focused)
- **Size**: Responsive from 0.875rem to 1.125rem

### Spacing
- Uses LearnAble's `--space-*` tokens (0.25rem to 5rem scale)
- Consistent padding and margins throughout

### Motion
- **Fast**: 120ms transitions
- **Ease**: ease-out easing
- **Respects**: prefers-reduced-motion
- **Animations**: Subtle slide-in effects

## Technical Details

### Components

```
src/components/ChatSupport/
├── index.tsx              # Main chat container
├── ChatMessage.tsx        # Individual message component
├── ChatInput.tsx          # Text input form
├── VoiceControl.tsx       # Voice input button and indicator
├── ASLTranslator.tsx      # ASL translation panel
├── useChatSupport.ts      # Chat state management hook
└── styles.css             # Component styles
```

### Utilities

```
src/utils/
├── gemini.ts              # Gemini API integration
├── courseKnowledge.ts     # Fallback knowledge base
├── speechRecognition.ts   # Web Speech API wrapper
├── speechSynthesis.ts     # Text-to-speech wrapper
└── aslTranslation.ts      # ASL translation with T5 model
```

### Dependencies

- `@google/generative-ai`: Gemini API client
- `@xenova/transformers`: HuggingFace Transformers.js for ASL
- Web Speech API (native browser support)

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Chat UI | ✅ | ✅ | ✅ | ✅ |
| Gemini AI | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ⚠️* | ✅** | ✅ |
| ASL Translation | ✅ | ✅ | ✅ | ✅ |

*Firefox requires `media.webspeech.recognition.enable` preference
**Safari iOS 14.5+ only

## Performance

### Bundle Size
- Main chat component: ~15KB (gzipped)
- Gemini SDK: ~45KB (gzipped)
- Transformers.js: Loaded on-demand (~200KB)

### Loading Strategy
- Chat button: Loaded immediately
- ASL model: Lazy-loaded on first use
- Gemini API: Only when API key is present

## Accessibility Compliance

The chat support meets WCAG 2.2 AA standards:

- ✅ 4.5:1 color contrast ratios
- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ Focus indicators
- ✅ Touch target size (44px minimum)
- ✅ Semantic HTML
- ✅ ARIA labels and live regions
- ✅ Skip links and landmarks

## Testing

### Manual Testing
1. Open http://127.0.0.1:5173
2. Click the chat support button (bottom-right)
3. Type a question and press Enter
4. Try voice input (microphone button)
5. Open ASL translator and translate text
6. Test keyboard navigation (Tab, Enter, Escape)
7. Test on mobile device or responsive mode
8. Test with screen reader
9. Test high contrast mode
10. Test with reduced motion enabled

### Automated Tests
```bash
npm test  # Runs all existing tests
```

## Troubleshooting

### Chat button doesn't appear
- Check browser console for errors
- Ensure React app is running
- Verify ChatSupport component is mounted in App.tsx

### Voice input not working
- Check browser permissions for microphone
- Verify browser supports Web Speech API
- Check console for recognition errors

### ASL translation shows "Translation unavailable"
- Model may still be loading (first use takes ~10 seconds)
- Check internet connection (model downloaded on first use)
- Verify @xenova/transformers is installed

### Gemini API not responding
- Verify API key is correct in `.env`
- Check API key has not exceeded quota
- Fallback responses will be used automatically

## Future Enhancements

Planned features for future releases:

- [ ] Multi-language support (Amharic voice input)
- [ ] Voice output for responses (text-to-speech)
- [ ] Chat history persistence
- [ ] Export chat transcript
- [ ] Video ASL translation integration
- [ ] Custom training on course content
- [ ] Real-time caption translation
- [ ] Braille output support

## Contributing

When contributing to the chat support feature:

1. Follow LearnAble's design system tokens
2. Ensure WCAG 2.2 AA compliance
3. Add proper TypeScript types
4. Include ARIA labels for new elements
5. Test with keyboard navigation
6. Test with screen readers
7. Test on mobile devices
8. Update this documentation

## License

Same as LearnAble project (see LICENSE file in root).

## Credits

- **Gemini API**: Google AI
- **ASL Model**: Suyash2205/signbridge-t5-base-asl-gloss
- **Transformers.js**: Xenova
- **Design System**: LearnAble team
