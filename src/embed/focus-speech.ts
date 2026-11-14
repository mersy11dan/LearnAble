import { imageDescription } from "./images";

const WORDS = {
  en: {
    button: "Button",
    link: "Link",
    heading: "Heading",
    level: "level",
    image: "Image",
    paragraph: "Paragraph",
    navigation: "Navigation",
    main: "Main",
    banner: "Banner",
    contentinfo: "Content info",
    region: "Region",
    search: "Search",
    complementary: "Complementary",
    checkbox: "Checkbox",
    slider: "Slider",
    combobox: "List",
    textbox: "Text field",
    pressed: "pressed",
    notPressed: "not pressed",
    checked: "checked",
    notChecked: "not checked",
    expanded: "expanded",
    collapsed: "collapsed",
    disabled: "disabled",
    current: "current",
  },
  am: {
    button: "ቁልፍ",
    link: "ማገናኛ",
    heading: "ርዕስ",
    level: "ደረጃ",
    image: "ምስል",
    paragraph: "አንቀጽ",
    navigation: "አሰሳ",
    main: "ዋና",
    banner: "ራስጌ",
    contentinfo: "ግርጌ",
    region: "ክልል",
    search: "ፍለጋ",
    complementary: "ተጨማሪ",
    checkbox: "ሳጥን",
    slider: "ተንሸራታች",
    combobox: "ዝርዝር",
    textbox: "የጽሑፍ ሳጥን",
    pressed: "ተጭኗል",
    notPressed: "አልተጫነም",
    checked: "ተመርጧል",
    notChecked: "አልተመረጠም",
    expanded: "ተከፍቷል",
    collapsed: "ተዘግቷል",
    disabled: "ተሰናክሏል",
    current: "የአሁኑ",
  },
} as const;

export function elementLang(element: HTMLElement): "en" | "am" {
  const lang = element.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang || "en";
  return lang.toLowerCase().startsWith("am") ? "am" : "en";
}

function roleOf(element: HTMLElement): string {
  const explicit = element.getAttribute("role");
  if (explicit) return explicit;
  const tag = element.tagName;
  if (tag === "A" && element.hasAttribute("href")) return "link";
  if (tag === "BUTTON") return "button";
  if (/^H[1-6]$/.test(tag)) return "heading";
  if (tag === "IMG") return "image";
  if (tag === "NAV") return "navigation";
  if (tag === "MAIN") return "main";
  if (tag === "HEADER") return "banner";
  if (tag === "FOOTER") return "contentinfo";
  if (tag === "ASIDE") return "complementary";
  if (tag === "P") return "paragraph";
  if (tag === "SELECT") return "combobox";
  if (tag === "TEXTAREA") return "textbox";
  if (tag === "SECTION" && (element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby"))) return "region";
  if (element instanceof HTMLInputElement) {
    if (element.type === "checkbox" || element.type === "radio") return "checkbox";
    if (element.type === "range") return "slider";
    if (element.type === "button" || element.type === "submit") return "button";
    return "textbox";
  }
  return "";
}

function labelledText(element: HTMLElement): string {
  const labelledby = element.getAttribute("aria-labelledby");
  if (labelledby) {
    const text = labelledby
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text) return text;
  }
  const label = element.getAttribute("aria-label")?.trim();
  if (label) return label;
  if (element instanceof HTMLImageElement) {
    return imageDescription(element) || element.alt.trim();
  }
  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
    const id = element.id;
    const explicit = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
    const wrapped = element.closest("label");
    const fromLabel = (explicit?.textContent || wrapped?.textContent || "").replace(/\s+/g, " ").trim();
    if (fromLabel) return fromLabel;
  }
  const text = (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 280);
  return element.getAttribute("title")?.trim() || "";
}

function withImages(element: HTMLElement, name: string): string {
  const images = [...element.querySelectorAll("img")];
  const extras = images
    .map((img) => imageDescription(img))
    .filter((item): item is string => Boolean(item && !name.includes(item)));
  if (extras.length === 0) return name;
  return [name, ...extras].filter(Boolean).join(". ");
}

export function utteranceFor(element: HTMLElement): { text: string; lang: "en" | "am" } | null {
  if (element === document.body || element === document.documentElement) return null;
  const role = roleOf(element);
  if (!role && element.tagName !== "P") return null;
  const lang = elementLang(element);
  const words = WORDS[lang];
  const spokenRole = words[role as keyof typeof words] || role;
  let name = withImages(element, labelledText(element));
  if (role === "heading") {
    const level = element.getAttribute("aria-level") || element.tagName.slice(1);
    name = `${words.level} ${level}, ${name}`.trim();
  }
  const states: string[] = [];
  const pressed = element.getAttribute("aria-pressed");
  if (pressed === "true") states.push(words.pressed);
  if (pressed === "false") states.push(words.notPressed);
  const checked = element.getAttribute("aria-checked") ?? (element instanceof HTMLInputElement && element.type === "checkbox" ? String(element.checked) : null);
  if (checked === "true") states.push(words.checked);
  if (checked === "false") states.push(words.notChecked);
  const expanded = element.getAttribute("aria-expanded");
  if (expanded === "true") states.push(words.expanded);
  if (expanded === "false") states.push(words.collapsed);
  if (element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") states.push(words.disabled);
  if (element.hasAttribute("aria-current") && element.getAttribute("aria-current") !== "false") states.push(words.current);
  const text = [spokenRole, name, ...states].filter(Boolean).join(", ");
  if (!text.trim()) return null;
  return { text, lang };
}
