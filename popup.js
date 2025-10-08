document.addEventListener('DOMContentLoaded', async () => {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const error = document.getElementById('error');
  const apiKeyInput = document.getElementById('apiKey');
  
  // Load saved API key
  chrome.storage.local.get(['apiKey'], (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });
  
  // Save API key on change
  apiKeyInput.addEventListener('change', () => {
    chrome.storage.local.set({ apiKey: apiKeyInput.value });
  });
  
  analyzeBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value;
    
    if (!apiKey) {
      showError('Please enter your OpenAI API key first');
      return;
    }
    
    // Show loading state
    analyzeBtn.disabled = true;
    loading.style.display = 'block';
    result.style.display = 'none';
    error.style.display = 'none';
    
    try {
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Inject content script and extract article
      const [response] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractArticleContent
      });
      
      const articleData = response.result;
      
      if (!articleData || !articleData.text) {
        showError('No article content found on this page');
        return;
      }
      
      // Check cache first
      const cacheKey = `analysis_${hashCode(articleData.text)}`;
      const cached = await chrome.storage.local.get([cacheKey]);
      
      if (cached[cacheKey]) {
        displayResults(cached[cacheKey]);
        return;
      }
      
      // Send to background script for API call
      chrome.runtime.sendMessage({
        action: 'analyzeArticle',
        articleData: articleData,
        apiKey: apiKey
      }, (response) => {
        if (response.error) {
          showError(response.error);
        } else {
          // Cache the result
          chrome.storage.local.set({ [cacheKey]: response.analysis });
          displayResults(response.analysis);
        }
      });
      
    } catch (err) {
      showError('Error: ' + err.message);
    } finally {
      analyzeBtn.disabled = false;
      loading.style.display = 'none';
    }
  });
  
  function displayResults(analysis) {
    result.style.display = 'block';
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const score = analysis.credibilityScore;
    scoreDisplay.textContent = score + '/100';
    
    if (score >= 70) {
      scoreDisplay.className = 'score high';
    } else if (score >= 40) {
      scoreDisplay.className = 'score medium';
    } else {
      scoreDisplay.className = 'score low';
    }
    
    document.getElementById('assessment').textContent = analysis.assessment;
    document.getElementById('concerns').textContent = analysis.concerns || 'None identified';
    document.getElementById('positive').textContent = analysis.positive || 'None identified';
  }
  
  function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    analyzeBtn.disabled = false;
    loading.style.display = 'none';
  }
  
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
});

// This function runs in the context of the web page
function extractArticleContent() {
  // Try to find article content using common selectors
  const selectors = [
    'article',
    '[role="article"]',
    '.article-content',
    '.post-content',
    '.entry-content',
    'main article',
    '.story-body'
  ];
  
  let articleElement = null;
  for (const selector of selectors) {
    articleElement = document.querySelector(selector);
    if (articleElement) break;
  }
  
  // Fallback to body if no article found
  if (!articleElement) {
    articleElement = document.body;
  }
  
  // Extract text content
  const text = articleElement.innerText.slice(0, 8000); // Limit to 8000 chars
  
  // Try to find headline
  const headline = document.querySelector('h1')?.innerText || 
                   document.querySelector('title')?.innerText || 
                   'Unknown';
  
  // Try to find author
  const authorSelectors = [
    '[rel="author"]',
    '.author',
    '.byline',
    '[class*="author"]'
  ];
  
  let author = 'Unknown';
  for (const selector of authorSelectors) {
    const authorElement = document.querySelector(selector);
    if (authorElement) {
      author = authorElement.innerText;
      break;
    }
  }
  
  return {
    text: text,
    headline: headline,
    author: author,
    url: window.location.href
  };
}