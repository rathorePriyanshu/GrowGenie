function enrichCareerData(careers) {
  return {
    career_id: careers.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, ""),
    career_name: careers.title,
    career_source: "ai"
  }
}

function userRoadmapPrompt(career_name, country) {
  return `
Generate a career roadmap with the following details:

Career Name: ${career_name}
Country: ${country}
Audience Level: Beginner
Time Horizon: 3–5 years

You MUST return the output in the following JSON schema:

{
  "career_name": "",
  "overview": {
    "description": "",
    "difficulty": "",
    "time_required": "",
    "salary_range": ""
  },
  "steps": [
    {
      "step_number": 1,
      "title": "",
      "description": ""
    }
  ],
  "skills": [
    {
      "category": "",
      "items": []
    }
  ],
  "projects": [
    {
      "level": "Beginner | Intermediate | Advanced",
      "title": "",
      "description": ""
    }
  ],
  "exams": [],
  "colleges": [],
  "salary_growth": [
    {
      "role": "",
      "experience": "",
      "salary_range": ""
    }
  ],
  "future_scope": ""
}

ALL of the following rules are MANDATORY and must be satisfied together:
- overview.description MUST be 3–4 complete sentences (not bullet points)
- skills.items MUST contain 3–4 items in EACH category
- exams MUST contain 3–4 relevant exam names (strings)
- colleges MUST contain 3–4 well-known institutions relevant to the country
- future_scope MUST be 2–3 complete sentences

ADDITIONAL MANDATORY CONSTRAINTS:
- Steps: minimum 4, maximum 7
- Skills categories: minimum 2, maximum 4
- Projects: exactly 3 projects (Beginner, Intermediate, Advanced)
- Salary growth stages: minimum 2, maximum 4
- Do NOT include pros or cons
- Do NOT include emojis, markdown, or formatting
- Do NOT leave any array empty`;
}

const SYSTEM_PROMPT = `You are an AI system that generates career roadmaps.

Your task is to generate a roadmap STRICTLY following the given JSON schema.
You are NOT allowed to add, remove, rename, or reorder any fields.

Rules you MUST follow:
- Output ONLY valid JSON
- No explanations, no markdown, no comments
- Follow the schema exactly
- Keep all lists concise (maximum 3–4 items per list)
- Use neutral, factual, professional language
- Do NOT exaggerate, guarantee jobs, or promise outcomes
- Do NOT leave required arrays empty
- Content must be relevant to the specified country
- If unsure, choose the safest, most common option

If you break any rule, the output is invalid.`;

module.exports.enrichCareerData = enrichCareerData;
module.exports.userRoadmapPrompt = userRoadmapPrompt;
module.exports.SYSTEM_PROMPT = SYSTEM_PROMPT;