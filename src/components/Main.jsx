import React, { useState } from 'react';
import { HfInference } from "@huggingface/inference";
import { textGeneration } from "@huggingface/inference";
import Groq from "groq-sdk";

const Main = () => {
  const [goal, setGoal] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [healthIssue, setHealthIssue] = useState('');
  const [data, setData] = useState('');

  const hf = new HfInference('your access token')
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("The VITE_GROQ_API_KEY environment variable is missing or empty; either provide it, or instantiate the Groq client with an apiKey option, like new Groq({ apiKey: 'My API Key' }).");
  }

  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  const handleSubmit = async () => {
    const obj = { goal, age, gender, weight, height, healthIssue };

    console.log(obj);

    const messages = [
      {
        role: 'system',
        content: `You are an AI personal trainer. Your goal is to assist the user in reaching their fitness goals by providing customized diet plans and exercise routines. You should analyze the user's details such as their fitness ${obj.goal},  ${obj.age},  ${obj.gender},  ${obj.weight},  ${obj.height}, and any ${obj.healthIssue}, and generate a plan tailored to their needs. Offer specific and actionable advice, monitor progress, and adjust recommendations over time.`,
      },
      {
        role: 'user',
        content: `A complete beginner with no experience (0-1 year) generate an output`,
      },
    ];
      
    try {
      const response = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: messages,
      });

      renderReport(response.choices[0].message.content);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  function renderReport(output) {
    console.log(output);
    setData(output);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">ArogyaAI</h1>
        
        <input
          type="text"
          placeholder="Describe your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <input
          type="text"
          placeholder="Any health issue / medication"
          value={healthIssue}
          onChange={(e) => setHealthIssue(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
        >
          Generate Plan
        </button>
        
        {data && (
          <div className="mt-8 p-6 bg-gray-700 border-l-4 border-blue-500 rounded-md">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Your Personalized Plan:</h2>
            <p className="text-gray-300 leading-relaxed">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;