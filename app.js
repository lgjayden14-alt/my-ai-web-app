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

// Theme Toggle Handler across all pages
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}