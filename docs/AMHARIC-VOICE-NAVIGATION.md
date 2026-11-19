# Amharic Voice Navigation Agent

## Overview

The Amharic Voice Navigation Agent is an accessibility feature designed to help blind and visually impaired users navigate through LearnAble courses using voice commands in Amharic or English.

## Features

### Core Capabilities

1. **Voice-Based Navigation**
   - Navigate to any course page using natural voice commands
   - Support for both Amharic and English languages
   - Real-time speech recognition and synthesis

2. **Bilingual Support**
   - Switch between Amharic (አማርኛ) and English at any time
   - All commands and responses available in both languages
   - Automatic language detection for voice input

3. **Accessibility First**
   - Fully keyboard accessible (Alt+Shift+V shortcut)
   - Screen reader friendly with ARIA labels
   - High contrast visual design
   - Clear audio feedback for all states

## How to Use

### Activating the Agent

1. **Click the Voice Button**: Look for the circular button with a microphone icon in the bottom-left corner of the page
2. **Keyboard Shortcut**: Press `Alt+Shift+V` to activate the agent
3. **Initial Greeting**: The agent will announce itself and tell you where you are

### Basic Commands

#### Navigation Commands

**In English:**
- "Go to lesson" - Opens the video lesson page
- "Go to jobs" - View career opportunities
- "Go to verify" - Check certificates
- "Go to home" - Return to home page
- "Go to offline" - Download offline pack

**In Amharic:**
- "ወደ ትምህርት" - Opens the video lesson page
- "ወደ ስራዎች" - View career opportunities
- "ወደ ምስክር ወረቀት" - Check certificates
- "ወደ መነሻ" - Return to home page
- "ወደ ከመስመር ውጭ" - Download offline pack

#### Information Commands

**In English:**
- "Where am I" - Repeat current location
- "Help" - List all available commands

**In Amharic:**
- "የት ነኝ" - Repeat current location
- "እገዛ" - List all available commands

### Switching Languages

1. Click the globe icon in the agent header
2. The interface will switch between English and Amharic
3. All subsequent commands and responses will use the selected language

### Visual States

The agent provides clear visual feedback:

- **Listening** 🎙️: Animated pulse ring around microphone, "Listening..." text
- **Speaking** 🔊: Speaker icon with audio waves, "Speaking..." text
- **Ready** ✅: Instructions and ready message

### Keyboard Shortcuts

- `Alt+Shift+V` - Toggle voice input listening
- `Escape` - Close the agent
- `Tab` - Navigate between controls
- `Enter/Space` - Activate focused button

## Technical Details

### Speech Recognition

- Uses browser Web Speech API for voice input
- Supports continuous listening with automatic silence detection
- Configurable language: `am-ET` for Amharic, `en-US` for English

### Speech Synthesis

Two-tier approach for optimal Amharic support:

1. **Primary: Hasab API**
   - High-quality Amharic text-to-speech
   - Requires API key configuration
   - Automatically falls back if unavailable

2. **Fallback: Browser TTS**
   - Uses built-in browser speech synthesis
   - Works offline
   - Supports multiple languages and voices

### Supported Pages

The agent recognizes and can navigate to:

| Page | English | Amharic |
|------|---------|---------|
| Home | home, start | መነሻ, ጀምር |
| Lesson | lesson, video | ትምህርት, ቪዲዮ |
| Text Version | read, text | አንብብ, ጽሁፍ |
| Offline Pack | offline, pack | ከመስመር ውጭ, ፓኬት |
| Sessions | session, class | ክፍለ ጊዜ, ክፍል |
| Jobs | jobs, careers | ስራዎች, ሙያ |
| Verify | verify, certificate | አረጋግጥ, ምስክር ወረቀት |

## Configuration

### Environment Variables

The agent uses the existing LearnAble configuration:

```env
# Optional: Hasab API for high-quality Amharic TTS
HASAB_API_KEY=your_hasab_api_key
HASAB_API_BASE=https://api.hasab.ai

# API base URL (defaults to /api)
VITE_API_BASE=/api
```

### Browser Requirements

- Modern browser with Web Speech API support
- Microphone access permission
- JavaScript enabled

**Supported Browsers:**
- ✅ Chrome/Edge (desktop and mobile)
- ✅ Safari (desktop and mobile)
- ⚠️ Firefox (limited speech synthesis support)

## Examples

### Example Session 1: English Navigation

```
User: [Clicks voice button]
Agent: "Voice navigation activated. Say 'lesson' to go to the lesson, or 'help' for assistance."

User: "Go to lesson"
Agent: "Navigating to Lesson. This is the lesson page with video player. Press C for captions, D for description, Space to play."

User: "Where am I"
Agent: "You are currently on the Lesson page. This is the lesson page with video player. Press C for captions, D for description, Space to play."
```

### Example Session 2: Amharic Navigation

```
User: [የድምፅ ቁልፍን ጠቅ ያድርጉ]
Agent: "የድምፅ አሁኑ ጀምሯል። ወደ ትምህርቱ ለመሄድ፣ 'ትምህርት' ይበሉ። ለእገዛ፣ 'እገዛ' ይበሉ።"

User: "ወደ ትምህርት"
Agent: "ወደ ትምህርት እየሄድኩ ነው። ይህ የቪዲዮ ማጫወቻ ያለው የትምህርት ገጽ ነው። C ለክፍሎች፣ D ለመግለጫ፣ Space ለማጫወት ይጫኑ።"

User: "የት ነኝ"
Agent: "እርስዎ አሁን ትምህርት ገጽ ላይ ነዎት። ይህ የቪዲዮ ማጫወቻ ያለው የትምህርት ገጽ ነው። C ለክፍሎች፣ D ለመግለጫ፣ Space ለማጫወት ይጫኑ።"
```

## Troubleshooting

### Microphone Not Working

1. Check browser permissions for microphone access
2. Ensure microphone is properly connected
3. Try refreshing the page
4. Check browser console for errors

### Voice Not Recognized

1. Speak clearly and at a moderate pace
2. Ensure you're using supported commands
3. Try switching between English and Amharic
4. Check that your microphone is picking up sound

### Speech Not Playing

1. Check device volume settings
2. Ensure audio output is working
3. If Hasab API fails, browser TTS will be used as fallback
4. Try refreshing the page

### Browser Compatibility

If voice features don't work:
1. Update to the latest browser version
2. Try Chrome/Edge for best compatibility
3. Check if Web Speech API is supported in your browser

## Accessibility Compliance

The Amharic Voice Navigation Agent meets:

- ✅ WCAG 2.2 Level AA standards
- ✅ Keyboard-only navigation
- ✅ Screen reader compatibility
- ✅ High contrast ratios (14.3:1 on paper, 12.2:1 on navy)
- ✅ Minimum 44px touch targets
- ✅ Focus indicators (3px visible)
- ✅ Reduced motion support

## Privacy

- Voice commands are processed locally in the browser
- Hasab API is only called with user consent header
- No voice data is stored or logged
- Microphone access is only active when listening
- All data stays within the LearnAble ecosystem

## Future Enhancements

Planned improvements:

1. **Enhanced Commands**
   - More natural language variations
   - Context-aware suggestions
   - Video player control commands

2. **Additional Languages**
   - Oromo language support
   - Tigrinya language support
   - Other Ethiopian languages

3. **Personalization**
   - Custom voice preferences
   - Speech rate adjustment
   - Favorite commands

4. **Advanced Features**
   - Lesson content navigation
   - Quiz interaction via voice
   - Note-taking by voice

## Contributing

To contribute to the voice navigation feature:

1. Review the code in:
   - `src/components/AmharicVoiceAgent/`
   - `src/utils/amharicSpeech.ts`
   - `src/utils/courseNavigator.ts`

2. Test with:
   - Screen readers (NVDA, JAWS, VoiceOver)
   - Keyboard-only navigation
   - Both English and Amharic commands

3. Follow accessibility guidelines:
   - Add ARIA labels to all interactive elements
   - Ensure keyboard accessibility
   - Maintain high contrast ratios

## Support

For issues or questions about the Amharic Voice Navigation Agent:

1. Check this documentation
2. Review the troubleshooting section
3. Open an issue on GitHub
4. Contact the LearnAble team

## Credits

Developed as part of LearnAble's commitment to making education accessible to all Ethiopian learners, regardless of visual ability.

Special thanks to:
- Hasab AI for Amharic speech synthesis support
- The Web Speech API community
- Accessibility advocates and testers
