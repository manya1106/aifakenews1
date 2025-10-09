chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeArticle') {
    analyzeWithAI(request.articleData, request.apiKey)
      .then(analysis => sendResponse({ analysis }))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep channel open for async response
  }
});

async function analyzeWithAI(articleData, apiKey) {
  const prompt = `You are a fact-checking and credibility analysis expert. Analyze the following article for credibility, potential misinformation, and bias.

Article Headline: ${articleData.headline}
Author: ${articleData.author}
URL: ${articleData.url}

Article Content:
${articleData.text}

Provide your analysis in the following JSON format:
{
  "credibilityScore": <number 0-100>,
  "assessment": "<brief overall assessment in 2-3 sentences>",
  "concerns": "<list of red flags, concerning claims, or bias indicators>",
  "positive": "<positive credibility indicators like sources, balanced reporting, etc>"
}

Consider:
1. Source credibility and author expertise
2. Presence of verifiable facts vs opinions
3. Emotional language or sensationalism
4. Logical consistency
5. Citation of sources
6. Signs of bias or propaganda techniques
7. Factual accuracy (if you can verify)

Respond ONLY with the JSON, no other text.`;

  try {
    // Using Groq API (FREE & FAST)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a fact-checking expert who analyzes articles for credibility and misinformation. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    // Validate response structure
    if (!analysis.credibilityScore || !analysis.assessment) {
      throw new Error('Incomplete analysis from AI');
    }
    
    return analysis;
    
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`Analysis failed: ${error.message}`);
  }
}