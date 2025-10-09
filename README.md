# Fake News Detector Chrome Extension

An AI-powered Chrome extension that analyzes news articles for credibility, bias, and potential misinformation using **FREE** AI APIs.

## ✨ Features

- 🆓 **100% Free** - Uses free AI APIs (no credit card required)
- 🎯 **Multi-Provider Support** - Choose between Gemini, Groq, or HuggingFace
- ⚡ **Fast Analysis** - Get results in 5-10 seconds
- 💾 **Smart Caching** - Saves results to avoid re-analyzing
- 🔒 **Privacy First** - API keys stored locally, no tracking
- 🎨 **Clean Interface** - Simple, intuitive design

## 🚀 Quick Start

### Prerequisites
- Google Chrome browser
- A free API key from one of these providers (no credit card needed):
  - **Google Gemini** (Recommended): https://makersuite.google.com/app/apikey
  - **Groq** (Fastest): https://console.groq.com/keys
  - **HuggingFace**: https://huggingface.co/settings/tokens

### Installation

1. **Download/Clone this project**
   ```bash
   git clone <your-repo-url>
   cd fake-news-detector
   ```

2. **Create icon images** (or use placeholders):
   - Create three PNG files: `icon16.png`, `icon48.png`, `icon128.png`
   - You can use any icon generator or create simple colored squares for now
   - Recommended: Use a magnifying glass or shield icon
   - Place them in the project root folder

3. **Load the extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension icon should appear in your browser toolbar

4. **Configure your API**:
   - Click the extension icon
   - Select your preferred AI provider from the dropdown
   - Click the link to get your free API key
   - Paste the key in the input field (it saves automatically)

### Usage

1. Navigate to any news article or blog post
2. Click the extension icon in your toolbar
3. Click "Analyze This Article"
4. Wait 5-10 seconds for the AI analysis
5. Review the credibility score (0-100) and detailed assessment

## 📊 Free AI Provider Comparison

| Provider | Model | Free Limit | Speed | Quality | Sign-up |
|----------|-------|-----------|-------|---------|---------|
| **Gemini** | gemini-1.5-flash | 1,500/day | Fast | ⭐⭐⭐⭐⭐ | Google account |
| **Groq** | llama-3.3-70b | Very High | Super Fast | ⭐⭐⭐⭐ | Email only |
| **HuggingFace** | Mixtral-8x7B | Moderate | Slower | ⭐⭐⭐ | Email only |

**Recommendation**: Start with **Gemini** for the best balance of quality and generous free limits.

## 📁 Project Structure

```
fake-news-detector/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic, UI handling, provider selection
├── background.js         # Background service worker, API calls
├── content.js            # Content script (runs on web pages)
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
└── README.md            # This file
```

## 🔧 How It Works

1. **Content Extraction**: 
   - Extracts article text using common HTML selectors
   - Captures headline, author, and URL
   - Limits content to 8,000 characters for API efficiency

2. **AI Analysis**: 
   - Sends article to your chosen AI provider
   - Uses specialized prompt for fact-checking and credibility assessment
   - Evaluates 7 key factors (see below)

3. **Credibility Scoring**: 
   - Returns 0-100 score based on:
     - Source credibility and author expertise
     - Verifiable facts vs opinions
     - Emotional/sensational language
     - Logical consistency
     - Citation of sources
     - Bias indicators
     - Factual accuracy

4. **Results Display**: 
   - Color-coded score (Green: 70+, Orange: 40-69, Red: 0-39)
   - Overall assessment summary
   - Key concerns and red flags
   - Positive credibility indicators

5. **Smart Caching**: 
   - Results cached locally to save API calls
   - Same article won't be analyzed twice

## 🎯 What Gets Analyzed

The AI evaluates articles based on:

- ✅ **Source Credibility**: Is the publisher reputable?
- ✅ **Author Expertise**: Does the author have relevant credentials?
- ✅ **Fact vs Opinion**: Are claims backed by evidence?
- ✅ **Emotional Language**: Is the tone sensational or manipulative?
- ✅ **Logic & Consistency**: Do the arguments make sense?
- ✅ **Source Citations**: Are claims properly sourced?
- ✅ **Bias Detection**: Is there political or ideological bias?
- ✅ **Factual Accuracy**: Can claims be verified?

## 🛠️ Advanced Configuration

### Switching AI Providers

The extension supports three providers. You can switch anytime in the settings:

1. **Gemini** (Best for reliability)
2. **Groq** (Best for speed) 
3. **HuggingFace** (Best for privacy)

Your API key is saved separately for each provider.

### Trying Different Models

Want to experiment? Edit `background.js`:

**Groq alternatives:**
```javascript
model: 'llama-3.3-70b-versatile',  // Best quality (default)
model: 'llama-3.1-8b-instant',     // Fastest
model: 'mixtral-8x7b-32768',       // Good balance
```

**Gemini alternatives:**
```javascript
gemini-1.5-flash      // Fast (default)
gemini-1.5-pro        // More accurate but slower
```

## 🐛 Troubleshooting

### "No article content found"
- The page might not use standard article HTML
- Try clicking directly on the article text before analyzing
- Some paywalled or heavily styled sites may not work

### "API request failed"
- **Gemini**: Check if key starts with "AIza..."
- **Groq**: Check if key starts with "gsk_"
- **HuggingFace**: Check if key starts with "hf_"
- Verify you have free credits remaining
- Check browser console (F12) for detailed errors

### Extension not loading
- Ensure all files are in the same folder
- Check that icon files exist (or comment out icon references in manifest.json)
- Look for syntax errors in browser console at `chrome://extensions/`

### Slow responses
- **Groq** is fastest (try switching to it)
- **HuggingFace** can be slow on free tier
- **Gemini** is a good middle ground

### Rate limit errors
- **Gemini**: 1,500 requests/day, wait 24 hours or use another provider
- **Groq**: Very high limits, rarely an issue
- **HuggingFace**: May need to wait a few minutes between requests

## 🚧 Known Limitations

- ❌ Requires internet connection
- ❌ May not work on all websites (especially paywalled content)
- ❌ AI analysis is not 100% accurate (use as a guide, not absolute truth)
- ❌ Limited to 8,000 characters per article
- ❌ Cannot verify very recent events (depends on AI training data)
- ❌ May struggle with non-English content

## 🔮 Future Enhancements

Planned features for future versions:

- [ ] Support for more AI providers (Claude, local models)
- [ ] Automatic analysis on page load
- [ ] Browser notifications for suspicious content
- [ ] Fact-checking against known databases (Snopes, PolitiFact)
- [ ] User feedback system and community ratings
- [ ] Source reputation tracking
- [ ] Highlight concerning text directly on the page
- [ ] Multi-language support
- [ ] Export reports as PDF
- [ ] Comparison mode (analyze multiple articles)
- [ ] Historical tracking of analyzed articles

## 💰 Cost Analysis

All providers are **completely FREE**:

| Provider | Cost per Analysis | Daily Limit | Monthly Cost |
|----------|------------------|-------------|--------------|
| Gemini | $0.00 | 1,500 | $0.00 |
| Groq | $0.00 | ~10,000+ | $0.00 |
| HuggingFace | $0.00 | Variable | $0.00 |

**No credit card required for any provider!**

## 🔒 Privacy & Security

- ✅ API keys stored **only** in your browser's local storage
- ✅ No data sent to any server except your chosen AI provider
- ✅ No tracking, analytics, or telemetry
- ✅ No user accounts or sign-ups
- ✅ Article content not stored permanently (only hash for caching)
- ✅ Open source - audit the code yourself

**What data leaves your browser:**
- Article text, headline, author, URL → Sent to your chosen AI provider
- Nothing else

## 🛠️ Development

### Making Changes

1. Edit the code files
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test your changes

### Adding a New AI Provider

Edit `background.js` and add a new function:

```javascript
async function callYourProvider(apiKey, prompt) {
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // Your API payload
    })
  });
  
  const data = await response.json();
  return parseAIResponse(data.your_response_field);
}
```

Then add it to the switch statement in `analyzeWithAI()`.

### Testing

Test on these types of sites:
- Major news outlets (CNN, BBC, NYTimes)
- Blogs and medium articles
- Social media posts
- Fact-checking sites
- Known misinformation sites

## 📝 Contributing

Contributions welcome! Areas that need improvement:
1. Better article text extraction for more websites
2. More AI providers
3. Improved prompt engineering
4. UI/UX enhancements
5. Multi-language support

## ⚖️ License

MIT License - Feel free to modify and distribute

## ⚠️ Disclaimer

This tool is for **educational and research purposes**. 

**Important Notes:**
- AI-based fact-checking is NOT perfect
- Credibility scores are estimates, not absolute truth
- Always verify important information through multiple reliable sources
- This tool should supplement, not replace, critical thinking
- The developers are not responsible for decisions made based on this tool's analysis

**Remember**: No automated system can fully determine truth or credibility. Use this as one tool among many in your media literacy toolkit.

## 🙏 Acknowledgments

Built with:
- Chrome Extension Manifest V3
- Google Gemini API
- Groq API
- HuggingFace Inference API

Inspired by the need for accessible fact-checking tools in the digital age.

## 📧 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console errors (F12)
3. Check AI provider documentation
4. Open an issue on GitHub (if applicable)

---

**Built in 12 hours as a learning project. Not affiliated with any fact-checking organization.**
