import { apiClient } from '@/config/aws';

export interface CodeGenerationRequest {
  prompt: string;
  framework: 'react-native' | 'flutter';
  projectName: string;
}

export interface GeneratedCode {
  files: Array<{
    path: string;
    content: string;
    language: string;
  }>;
  dependencies: string[];
  instructions: string;
}

export class GeminiCodeGenerator {
  private readonly apiKey: string;
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  async generateCode(request: CodeGenerationRequest): Promise<GeneratedCode> {
    const systemPrompt = this.getSystemPrompt(request.framework);
    const userPrompt = `Project Name: ${request.projectName}\n\nUser Request: ${request.prompt}\n\nGenerate a complete ${request.framework} project with all necessary files, dependencies, and setup instructions.`;

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\n${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      return this.parseGeneratedCode(generatedText);
    } catch (error) {
      console.error('Code generation error:', error);
      throw error;
    }
  }

  private getSystemPrompt(framework: 'react-native' | 'flutter'): string {
    if (framework === 'react-native') {
      return `You are an expert React Native developer. Generate complete, production-ready React Native code based on user requirements.

Your response must be in the following JSON format:
{
  "files": [
    {
      "path": "src/App.tsx",
      "content": "// React Native code here",
      "language": "typescript"
    }
  ],
  "dependencies": ["react-native-paper", "react-navigation"],
  "instructions": "Setup instructions and notes"
}

Include:
- TypeScript code
- React Native best practices
- Navigation setup (React Navigation)
- State management (Context/Redux if needed)
- Styling with StyleSheet
- All necessary components
- Complete file structure`;
    } else {
      return `You are an expert Flutter developer. Generate complete, production-ready Flutter/Dart code based on user requirements.

Your response must be in the following JSON format:
{
  "files": [
    {
      "path": "lib/main.dart",
      "content": "// Flutter code here",
      "language": "dart"
    }
  ],
  "dependencies": ["provider", "http"],
  "instructions": "Setup instructions and notes"
}

Include:
- Dart code following Flutter best practices
- Material Design components
- State management (Provider/Bloc)
- Complete widget structure
- Routing setup
- All necessary files (main.dart, pubspec.yaml, etc.)`;
    }
  }

  private parseGeneratedCode(text: string): GeneratedCode {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Try to parse the entire text as JSON
      return JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse generated code:', error);
      
      // Fallback: create a basic structure
      return {
        files: [
          {
            path: 'README.md',
            content: text,
            language: 'markdown'
          }
        ],
        dependencies: [],
        instructions: 'Code generated but needs manual parsing. See README.md for details.'
      };
    }
  }

  async generateWithStreaming(
    request: CodeGenerationRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const systemPrompt = this.getSystemPrompt(request.framework);
    const userPrompt = `Project Name: ${request.projectName}\n\nUser Request: ${request.prompt}`;

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}&alt=sse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\n${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                onChunk(text);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }
}

export const geminiCodeGenerator = new GeminiCodeGenerator();
