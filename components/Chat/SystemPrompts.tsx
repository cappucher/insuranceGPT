import { Prompt } from '@/types';
import { FC, useEffect, useState } from 'react';

interface SystemPromptsProps {}

const SystemPrompts: FC<SystemPromptsProps> = ({}) => {
  const [currentItems, setCurrentItems] = useState<Prompt[] | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  useEffect(() => {
    console.log(selectedPrompt)
    setCurrentItems(null ? localStorage.getItem('items') === null : JSON.parse(localStorage.getItem('items')!));
    localStorage.setItem('prompt', selectedPrompt);
  }, [selectedPrompt]);

  let allItems;
  if (currentItems) {
    allItems = currentItems.map((prompt, index) => (
      <option key={index} value={prompt.prompt}>
        {prompt.name}
      </option>
    ));
  } else {
    allItems = <option>No prompts available</option>;
  }

  return (
    <div className="flex flex-row items-center">
      <label className="font-semibold mr-4" htmlFor="prompts">
        Select Prompt Option:
      </label>
      <select
        name="prompts"
        className="text-sm sm:text-base text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
        value={selectedPrompt}
        onChange={(e) => setSelectedPrompt(e.target.value)}
      >
        <option value={`You are a helpful, friendly, assistant.`}>Friendly Chatbot</option>
        {allItems}
      </select>
    </div>
  );
};

export default SystemPrompts;
