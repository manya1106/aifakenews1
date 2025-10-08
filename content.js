// Content script - runs on every page
// Currently minimal, but you can add features like:
// - Auto-detect news articles
// - Add overlay badges to links
// - Highlight suspicious text

console.log('Fake News Detector: Content script loaded');

// Example: Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightConcerns') {
    // Future feature: highlight concerning text on the page
    // For now, just acknowledge
    sendResponse({ success: true });
  }
});

// Future enhancement: Auto-detect if current page is a news article
function isNewsArticle() {
  const articleSelectors = ['article', '[role="article"]', '.article-content'];
  return articleSelectors.some(selector => document.querySelector(selector) !== null);
}

// You can add more advanced features here later:
// - Real-time fact checking as user reads
// - Warning overlays on suspicious content
// - Link preview with credibility scores