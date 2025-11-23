interface CodeGenerationRequest {
  prompt: string;
  framework: 'react-native' | 'flutter';
  projectName?: string;
}

interface GeneratedCode {
  files: { path: string; content: string }[];
  dependencies: string[];
  instructions: string;
}

class ClaudeCodeGenerator {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
  }

  async generateCode(request: CodeGenerationRequest): Promise<GeneratedCode> {
    const { prompt, framework, projectName = 'MyApp' } = request;

    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }

    const systemPrompt = this.getSystemPrompt(framework);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: `${systemPrompt}\n\nProject Name: ${projectName}\n\nUser Request: ${prompt}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Claude API error: ${error}`);
      }

      const data = await response.json();
      const generatedText = data.content[0].text;

      return this.parseGeneratedCode(generatedText);
    } catch (error) {
      console.error('Error generating code with Claude:', error);
      throw error;
    }
  }

  private getSystemPrompt(framework: 'react-native' | 'flutter'): string {
    if (framework === 'react-native') {
      return `You are an expert React Native developer. Generate complete, production-ready React Native code based on user requirements.

Your response must include:
1. All necessary component files with complete code
2. Required dependencies (npm packages)
3. Setup and implementation instructions

Format your response as follows:

FILES:
--- path/to/file.js ---
[complete file content]
--- end ---

DEPENDENCIES:
- package-name@version

INSTRUCTIONS:
[step by step setup instructions]

Guidelines:
- Use functional components with hooks
- Follow React Native best practices
- Include proper TypeScript types if applicable
- Use popular libraries when appropriate (react-navigation, react-native-paper, etc.)
- Include proper error handling
- Add comments for complex logic`;
    } else {
      return `You are an expert Flutter developer. Generate complete, production-ready Flutter code based on user requirements.

Your response must include:
1. All necessary Dart files with complete code
2. Required dependencies (pub packages)
3. Setup and implementation instructions

Format your response as follows:

FILES:
--- path/to/file.dart ---
[complete file content]
--- end ---

DEPENDENCIES:
- package_name: ^version

INSTRUCTIONS:
[step by step setup instructions]

Guidelines:
- Use modern Flutter patterns and widgets
- Follow Flutter best practices
- Include proper null safety
- Use popular packages when appropriate (provider, http, etc.)
- Include proper error handling
- Add comments for complex logic`;
    }
  }

  private parseGeneratedCode(text: string): GeneratedCode {
    const files: { path: string; content: string }[] = [];
    const dependencies: string[] = [];
    let instructions = '';

    try {
      // Parse FILES section
      const filesMatch = text.match(/FILES:(.*?)(?=DEPENDENCIES:|INSTRUCTIONS:|$)/s);
      if (filesMatch) {
        const filesContent = filesMatch[1];
        const fileRegex = /---\s*(.+?)\s*---(.*?)---\s*end\s*---/gs;
        let match;
        while ((match = fileRegex.exec(filesContent)) !== null) {
          files.push({
            path: match[1].trim(),
            content: match[2].trim(),
          });
        }
      }

      // Parse DEPENDENCIES section
      const depsMatch = text.match(/DEPENDENCIES:(.*?)(?=INSTRUCTIONS:|$)/s);
      if (depsMatch) {
        const depsContent = depsMatch[1];
        const depLines = depsContent.split('\n').filter(line => line.trim().startsWith('-'));
        dependencies.push(...depLines.map(line => line.replace(/^-\s*/, '').trim()));
      }

      // Parse INSTRUCTIONS section
      const instructionsMatch = text.match(/INSTRUCTIONS:(.*?)$/s);
      if (instructionsMatch) {
        instructions = instructionsMatch[1].trim();
      }

      // Fallback if parsing fails
      if (files.length === 0) {
        files.push({
          path: 'App.tsx',
          content: text,
        });
        instructions = 'Generated code. Please review and integrate into your project.';
      }
    } catch (error) {
      console.error('Error parsing generated code:', error);
      files.push({
        path: 'App.tsx',
        content: text,
      });
      instructions = 'Generated code. Please review and integrate into your project.';
    }

    return { files, dependencies, instructions };
  }

  async generateWithStreaming(
    request: CodeGenerationRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const { prompt, framework, projectName = 'MyApp' } = request;

    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }

    const systemPrompt = this.getSystemPrompt(framework);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 4096,
          stream: true,
          messages: [
            {
              role: 'user',
              content: `${systemPrompt}\n\nProject Name: ${projectName}\n\nUser Request: ${prompt}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Claude API error: ${error}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta') {
                const text = parsed.delta?.text;
                if (text) onChunk(text);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming code with Claude:', error);
      throw error;
    }
  }
}

export const claudeCodeGenerator = new ClaudeCodeGenerator();
export type { CodeGenerationRequest, GeneratedCode };
