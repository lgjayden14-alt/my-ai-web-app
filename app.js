const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const serpTitle = document.getElementById('serpTitle');
const serpDesc = document.getElementById('serpDesc');

textInput.addEventListener('input', updateStats);

function updateStats() {
  const text = textInput.value;
  charCount.textContent = text.length;
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  wordCount.textContent = words;
  
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  sentenceCount.textContent = sentences;
  
  readingTime.textContent = Math.ceil(words / 200) + 'm';

  // SERP Preview Logic (Line 1 = Title, Rest = Description)
  const lines = text.split('\n').filter(l => l.trim() !== '');
  serpTitle.textContent = lines[0] ? lines[0].substring(0, 60) : 'Your Page Title Will Appear Here...';
  serpDesc.textContent = lines[1] ? lines.slice(1).join(' ').substring(0, 160) : (text.substring(0, 160) || 'Your meta description preview will display right here.');
}

function transformText(type) {
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
  navigator.clipboard.writeText(textInput.value);
  const btn = document.getElementById('copyBtn');
  btn.textContent = '✅ Copied!';
  setTimeout(() => btn.textContent = '📋 Copy Clean Text', 2000);
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});