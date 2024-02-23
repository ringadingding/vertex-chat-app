import React, { useState } from 'react';

interface MessageType {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const initialChatData: MessageType[] = [
  {
    role: 'user',
    parts: [{ text: 'Explain quantum computing in simple terms' }],
  },
  {
    role: 'model',
    parts: [
      {
        text: 'Certainly! Quantum computing is a new type of computing that relies on the principles of quantum physics...', // Add your full response here
      },
    ],
  },
  // ... Add more initial messages if needed
];

const ChatComponent: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<MessageType[]>(initialChatData);

  const handleNewMessage = (newMessage: MessageType) => {
    setChatMessages([...chatMessages, newMessage]);
  };

  return (
    <div className="flex h-[97vh] w-full flex-col">
      {/* Prompt Messages Container */}
      <div
        className="flex-1 overflow-y-auto bg-slate-300 text-sm leading-6 text-slate-900 shadow-md dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'bg-slate-100 dark:bg-slate-900' : ''
            } px-4 py-8 sm:px-6`}
          >
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src={`https://dummyimage.com/256x256/354ea1/ffffff&text=${
                message.role === 'user' ? 'U' : 'G'
              }`}
              alt={`${message.role} avatar`}
            />
            <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
              <p className="max-w-3xl">{message.parts[0].text}</p>
              <div className="mt-4 flex flex-row justify-start gap-x-2 text-slate-500 lg:mt-0">
                {/* Add your reaction buttons here */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt message input */}
      <form
        className="flex w-full items-center rounded-b-md border-t border-slate-300 bg-slate-200 p-2 dark:border-slate-700 dark:bg-slate-900"
        onSubmit={(e) => {
          e.preventDefault();
          const inputText = document.getElementById('chat-input')!.value;
          document.getElementById('chat-input')!.value = '';

          const newMessage = { role: 'user', parts: [{ text: inputText }] };
          handleNewMessage(newMessage);
        }}
      >
        <label htmlFor="chat" className="sr-only">Enter your prompt</label>
        {/* ... Add your add button here */}
        <textarea
          id="chat-input"
          rows="1"
          className="mx-2 flex min-h-full w-full rounded-md border border-slate-300 bg-slate-50 p-2 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder-slate-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
          placeholder="Enter your prompt"
        ></textarea>
        {/* ... Add your send button here */}
      </form>
    </div>
  );
};

export default ChatComponent;