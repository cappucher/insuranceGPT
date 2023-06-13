import Link from "next/link";
import { FC } from "react";


export const SystemPromptsLink: FC = () => {
    return (
        <div className="flex flex-row items-center">
            <button
                className="text-sm sm:text-base text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300">
                <Link href="/prompts">System Prompts</Link>
            </button>
        </div>
    );
};