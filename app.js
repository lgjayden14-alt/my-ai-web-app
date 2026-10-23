// Generic text stats and transformation handlers
const textInput = document.getElementById('textInput');
if (textInput) {
  textInput.addEventListener('input', updateStats);
}

function updateStats() {
  const text = textInput.value;
  const charElem = document.getElementById('charCount');
  const wordElem = document.getElementById('wordCount');
  const sentenceElem = document.getElementById('sentenceCount');
  const readElem = document.getElementById('readingTime');

  if (charElem) charElem.textContent = text.length;
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  if (wordElem) wordElem.textContent = words;
  
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  if (sentenceElem) sentenceElem.textContent = sentences;
  
  if (readElem) readElem.textContent = Math.ceil(words / 200) + 'm';
}

function transformText(type) {
  if (!textInput) return;
  let text = textInput.value;
  if (type === 'upper') text = text.toUpperCase();
  if (type === 'lower') text = text.toLowerCase();
  if (type === 'title') text = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  if (type === 'stripMarkdown') text = text.replace(/[*_~`>#+\-[\]()!|]/g, '');
  if (type === 'cleanSpaces') text = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
  textInput.value = text;
  updateStats();
}

function copyText() {
  if (!textInput) return;
  navigator.clipboard.writeText(textInput.value);
  const btn = document.getElementById('copyBtn');
  btn.textContent = '✅ Copied!';
  setTimeout(() => btn.textContent = '📋 Copy Clean Text', 2000);
}

// Dedicated SERP Simulator Logic
const metaTitle = document.getElementById('metaTitle');
const metaDesc = document.getElementById('metaDesc');
if (metaTitle && metaDesc) {
  const previewTitle = document.getElementById('previewTitle');
  const previewDesc = document.getElementById('previewDesc');
  const titleCount = document.getElementById('titleCount');
  const descCount = document.getElementById('descCount');

  function updateSerp() {
    const tVal = metaTitle.value;
    const dVal = metaDesc.value;
    
    titleCount.textContent = tVal.length;
    descCount.textContent = dVal.length;

    previewTitle.textContent = tVal ? tVal : 'Your Page Title Will Appear Here...';
    previewDesc.textContent = dVal ? dVal : 'Your meta description preview will display right here based on the fields above.';
  }

  metaTitle.addEventListener('input', updateSerp);
  metaDesc.addEventListener('input', updateSerp);
}

// Fancy Text / Font Generator Logic
const fontInput = document.getElementById('fontInput');
const fontResults = document.getElementById('fontResults');

if (fontInput && fontResults) {
  const fontStyles = [
    { name: "Monospace", map: char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F670 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F68A + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7F6 + code - 48);
      return char;
    }},
    { name: "Double Struck (Outline)", map: char => {
      const maps = { 'C': 'ℂ', 'H': 'ℍ', 'N': 'ℕ', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'Z': 'ℤ' };
      if (maps[char]) return maps[char];
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D538 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7D8 + code - 48);
      return char;
    }},
    { name: "Bold Serif", map: char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7CE + code - 48);
      return char;
    }},
    { name: "Script / Cursive", map: char => {
      const maps = { 'B': 'ℬ', 'E': 'ℰ', 'F': 'ℱ', 'H': 'ℋ', 'I': 'ℐ', 'L': 'ℒ', 'M': 'ℳ', 'R': 'ℛ', 'e': 'ℯ', 'g': 'ℊ', 'o': 'ℴ' };
      if (maps[char]) return maps[char];
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + code - 97);
      return char;
    }},
    { name: "Circled Text", map: char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97);
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
      if (code === 48) return '⓪';
      return char;
    }}
  ];

  fontInput.addEventListener('input', () => {
    const val = fontInput.value;
    if (!val.trim()) {
      fontResults.innerHTML = '<div class="font-placeholder">Start typing above to see custom Unicode fonts...</div>';
      return;
    }

    fontResults.innerHTML = fontStyles.map((style, idx) => {
      const converted = val.split('').map(style.map).join('');
      return `
        <div class="font-row">
          <div>
            <span class="font-name">${style.name}</span>
            <div class="font-output" id="fontOut_${idx}">${converted}</div>
          </div>
          <button onclick="copyFontResult('fontOut_${idx}', this)" class="primary">📋 Copy</button>
        </div>
      `;
    }).join('');
  });
}

function copyFontResult(elemId, btn) {
  const target = document.getElementById(elemId);
  if (target) {
    navigator.clipboard.writeText(target.textContent);
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  }
}

// Theme Toggle Handler across all pages
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}