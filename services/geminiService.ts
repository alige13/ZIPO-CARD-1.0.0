import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

// Fix: Per coding guidelines, instantiate GoogleGenAI with process.env.API_KEY directly and remove manual API key checks.
// The API key is assumed to be pre-configured and available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (prompt: string, transactions: Transaction[]): Promise<string> => {
  try {
    const transactionSummary = transactions
      .filter(t => t.type === 'payment')
      .map(t => `- Gastou ${t.amount.toFixed(2)} MZN em ${t.merchant} em ${t.date}`)
      .join('\n');
    
    const fullPrompt = `
      Você é um assistente financeiro amigável e prestável para o Zipo Card.
      Um utilizador está a pedir conselhos com base nas suas transações recentes.
      Seja conciso e forneça informações úteis. Não dê sermões ao utilizador.

      Aqui está um resumo dos seus gastos recentes:
      ${transactionSummary}

      Pergunta do utilizador: "${prompt}"

      A sua resposta:
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text ?? "Desculpe, não consegui gerar uma resposta. Por favor, tente novamente.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Ocorreu um erro ao contactar o assistente de IA: ${error.message}`;
    }
    return "Ocorreu um erro desconhecido ao contactar o assistente de IA.";
  }
};