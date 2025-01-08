import {experiences, projects, skills} from "@/lib/portfolio/data";

export class PromptEnhancer {
    static enhancePrompt(prompt: string): string {
        // Add context about portfolio data to the prompt
        return `
      As an AI portfolio assistant, I have access to the following information:
      
      Projects: ${projects.map(p => p.title).join(', ')}
      Skills: ${skills.map(s => s.name).join(', ')}
      Experience: ${experiences.map(e => e.title + ' at ' + e.company).join(', ')}
      
      User Query: ${prompt}
    `.trim();
    }
}