export class CourseKnowledgeBase {
  static getContext(query: string): string {
    const queryLower = query.toLowerCase();
    
    const contexts = {
      navigation: `
LearnAble Navigation:
- Home (/): Opening page with course introduction
- Lesson (/lesson/slow-connection): Main video lesson page with player
- Read (/lesson/slow-connection/read): Text version with PDF and Braille downloads
- Pack (/offline): 3G offline pack download
- Sessions (/sessions/studio): Recorded session viewer with chat log
- Jobs (/careers): Career opportunities and job cards
- Verify (/verify): Certificate verification system
- Pipeline (/pipeline): Transcript service interface
- Savanna (/savanna): Links to reference platform pages
- Accessibility (/accessibility): Accessibility features documentation
`,

      features: `
LearnAble Core Features:
1. Multilingual Support: English and Amharic captions and UI
2. Video Player: Accessible player with keyboard controls
3. Captions: Toggle with 'C' key, customizable size and color
4. Sign Window: Toggle with 'S' key, repositionable with arrow keys
5. Audio Description: Toggle with 'D' key for visual content narration
6. Accessibility Toolbar: Larger text (125%), high contrast, reduced motion
7. Keyboard Navigation: Full keyboard support, no mouse required
8. Offline Mode: Downloadable packs for low-bandwidth access
9. Braille: .brf file downloads
10. Tagged PDFs: Accessible PDF versions with structure
`,

      accessibility: `
Accessibility Features:
- WCAG 2.2 AA compliant with high contrast ratios
- Screen reader friendly with ARIA labels
- Keyboard-only navigation support
- Focus indicators (3px blue on paper, yellow on navy)
- Minimum 44px touch targets for mobile
- Reduced motion support (prefers-reduced-motion)
- Larger text option (125% font size)
- High contrast mode (black, white, yellow)
- Sign language interpretation window
- Audio descriptions for visual content
- Multiple caption languages
- Braille file exports (.brf)
- Tagged PDF structure for assistive technology
`,

      keyboard: `
Keyboard Shortcuts:
- Tab/Shift+Tab: Navigate between elements
- Space or K: Play/Pause video
- C: Toggle captions
- D: Toggle audio description
- S: Toggle sign window
- Arrow keys: Seek in video or move sign window
- L: Seek (alternative when in frame)
- H/Shift+H: Navigate headings
- Question mark (?): Show keyboard shortcuts dialog
- Escape: Close dialogs
- Alt+Shift+S: LearnAble voice command
`,

      offline: `
Offline Features:
- Service worker for app shell caching
- 3G optimized packs with audio, text, and light HTML
- Works after one online visit
- No API keys required for offline mode
- Bundled sample captions available offline
- Local storage for user preferences
- Download options: Video, Audio, PDF, Braille
`,

      certificates: `
Certificate System:
- Open Badges 3.0 standard
- Cryptographic signature verification
- Browser-based verification (no server needed)
- Dual calendar dates (Gregorian and Ethiopian)
- Verifiable credentials
- Certificate check page at /verify
- Individual certificate codes
- Audio summary included
`,
    };

    if (queryLower.includes("navigate") || queryLower.includes("where") || queryLower.includes("find") || queryLower.includes("page")) {
      return contexts.navigation;
    }
    if (queryLower.includes("feature") || queryLower.includes("what can") || queryLower.includes("capability")) {
      return contexts.features;
    }
    if (queryLower.includes("accessible") || queryLower.includes("blind") || queryLower.includes("deaf") || queryLower.includes("disability")) {
      return contexts.accessibility;
    }
    if (queryLower.includes("keyboard") || queryLower.includes("shortcut") || queryLower.includes("key")) {
      return contexts.keyboard;
    }
    if (queryLower.includes("offline") || queryLower.includes("download") || queryLower.includes("3g")) {
      return contexts.offline;
    }
    if (queryLower.includes("certificate") || queryLower.includes("verify") || queryLower.includes("badge")) {
      return contexts.certificates;
    }

    return `${contexts.features}\n\n${contexts.accessibility}`;
  }
}
