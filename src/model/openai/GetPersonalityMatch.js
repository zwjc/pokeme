import OpenAI from "openai";
import { getOpenAIKey } from "../firebaseModel";

export const callChatGPT = async (formattedResponses) => {
  let requestPrompt = `Questions are answered using a Likert scale, where 7 is agree, 1 is disagree, and 4 is neutral. These questions are designed to test the responder’s personality. Please match the responder’s personality to a Pokemon based on the answer provided below. Reply in this JSON structure: {"pokemon": …, "reason": …}. Here is the questions asked and the user's response: ${formattedResponses}`;

  let openai = new OpenAI({
    apiKey: await getOpenAIKey(),
    dangerouslyAllowBrowser: true,
  });

  try {
    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: requestPrompt }],
    });

    console.log("OpenAI response:", response);

    let content = response.choices[0].message.content;

    console.log("GPT response content:", content);

    const parsedResponse = JSON.parse(content);

    console.log("Parsed response:", parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
};
