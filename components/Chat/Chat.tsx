import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";
import { SystemPromptsLink } from "./Links";
import SystemPrompts from "./SystemPrompts";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="flex justify-start space-x-4">
        <div className="flex flex-row  mb-4 sm:mb-8">
          <ResetChat onReset={onReset} />
        </div>
        <div className="flex flex-row  mb-4 sm:mb-8">
          <SystemPromptsLink />
        </div>
        <div className="flex flex-row  mb-4 sm:mb-8">
          <SystemPrompts />
        </div>

      </div>
      

      <div className="card-text w-full flex flex-col  rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 sm:my-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
