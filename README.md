# aifakenews1
# Fake News Detector Chrome Extension

An AI-powered Chrome extension that analyzes news articles for credibility, bias, and potential misinformation.

## Quick Start

### Prerequisites
- Google Chrome browser
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. **Download/Clone this project**

2. **Create icon images** (or use placeholders):
   - Create three PNG files: `icon16.png`, `icon48.png`, `icon128.png`
   - You can use any icon generator or create simple colored squares for now
   - Place them in the project root folder

3. **Load the extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension icon should appear in your browser toolbar

4. **Add your API key**:
   - Click the extension icon
   - Enter your OpenAI API key in the text field
   - It will be saved locally in your browser

### Usage

1. Navigate to any news article or blog post
2. Click the extension icon in your toolbar
3. Click "Analyze This Article"
4. Wait 5-10 seconds for the AI analysis
5. Review the credibility score and detailed assessment

### Project Structure

```
fake-news-detector/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic and UI handling
├── background.js         # Background service worker (API calls)
├── content.js            # Content script (runs on web pages)
├── icon16.png           # Extension icons
├── icon48.png
├── icon128.png
└── README.md
```

### How It Works

1. **Content Extraction**: When you click analyze, the extension extracts text from the current page using common article selectors
2. **AI Analysis**: The article text is sent to OpenAI's GPT-4o-mini model with a specialized prompt
3. **Credibility Scoring**: The AI evaluates the article based on:
   - Source credibility
   - Presence of verifiable facts
   - Emotional/sensational language
   - Logical consistency
   - Citation of sources
   - Bias indicators
4. **Results Display**: Shows a 0-100 credibility score plus detailed concerns and positive indicators
5. **Caching**: Results are cached locally to avoid re-analyzing the same article

### Features

- ✅ AI-powered credibility analysis
- ✅ Local caching to save API costs
- ✅ Works on most news websites
- ✅ Privacy-focused (API key stored locally)
- ✅ Simple, clean interface

### Limitations & Known Issues

- Requires an OpenAI API key (costs ~$0.01-0.05 per analysis)
- May not extract content correctly on all websites
- AI analysis is not perfect and should be used as a guide, not absolute truth
- Limited to 8000 characters per article
- No offline mode

### Future Enhancements

- [ ] Support for more AI providers (Anthropic Claude, local models)
- [ ] Automatic analysis on page load
- [ ] Browser notification for suspicious content
- [ ] Fact-checking against known databases
- [ ] User feedback and community ratings
- [ ] Source reputation tracking
- [ ] Highlight concerning text directly on the page

### Cost Estimates

Using GPT-4o-mini:
- ~$0.01-0.05 per article analysis
- ~$0.50-2.00 for 100 articles
- Caching reduces repeat analysis costs

### Privacy & Security

- Your API key is stored only in your browser's local storage
- No data is sent to any server except OpenAI
- No tracking or analytics
- Article content is not stored (except hash for caching)

### Development

To modify the extension:

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test your changes

### Troubleshooting

**"No article content found"**
- The page might not be a standard article format
- Try clicking directly on the article text area before analyzing

**"API request failed"**
- Check that your API key is correct
- Verify you have credits in your OpenAI account
- Check browser console for detailed errors

**Extension not loading**
- Make sure all files are in the same folder
- Verify icon files exist (or comment out icon references in manifest.json)
- Check for syntax errors in browser console

### License

MIT License - Feel free to modify and distribute

### Disclaimer

This tool is for educational purposes. AI-based fact-checking is not perfect. Always verify important information through multiple reliable sources. The credibility scores should be used as guidance, not absolute truth.