import { Prompt } from '@/types';
import React, { useRef, FormEvent, MouseEvent, useState, useEffect } from 'react';


const MyComponent = () => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [showOverlay, setShowOverlay] = useState<string>("hidden");
    const [name, setName] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [key, setKey] = useState<number>(-1);
    const [currentItems, setCurrentItems] = useState<Prompt[] | null>(null);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        setCurrentItems(null ? localStorage.getItem("items") === null : JSON.parse(localStorage.getItem("items")!))
    }, [])

    const handleCreateProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // Log the product
        console.log(name, prompt);
        if (localStorage.getItem("items")) {
            if (updating) {
                const items = JSON.parse(localStorage.getItem("items")!);
                items[key] = {
                    name: name,
                    prompt: prompt
                }
                localStorage.setItem("items", JSON.stringify(items));
                setUpdating(false);
            } else {
                const items = JSON.parse(localStorage.getItem("items")!);
                items.push({
                    name: name,
                    prompt: prompt
                })
                localStorage.setItem("items", JSON.stringify(items));
            }
        } else {
            localStorage.setItem("items", JSON.stringify([{
                name: name,
                prompt: prompt
            }]))
        }
        setName("");
        setPrompt("");
        setCurrentItems(JSON.parse(localStorage.getItem("items")!));

        // Close the drawer after product creation
        handleCloseDrawer();
    };

    const handleCloseDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.style.transform = 'translateX(-100%)';
            setShowOverlay("hidden");
        }
    };
    let allItems;
    if (currentItems) {
        allItems = currentItems!.map((prompt, index) =>
            <div key={index} className="flex flex-col pb-3 items-center">
                <dt className="mb-1 text-lg font-semibold">{prompt.name}</dt>
                <button
                    className="text-sm sm:text-base text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                    onClick={() => {
                        if (drawerRef.current) {
                            drawerRef.current.style.transform = 'translateX(0)';
                            setShowOverlay("");
                            setName(prompt.name);
                            setPrompt(prompt.prompt);
                            setUpdating(true);
                            setKey(index);
                        }
                    }}
                >
                    Update System Prompt
                </button>
            </div>
        )
    } else {
        allItems = <div></div>
    }

    return (
        <>
            {/* Drawer init and show */}
            <div className="text-center m-5">
                <button
                    className="text-sm sm:text-base mb-10 text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                    onClick={() => {
                        if (drawerRef.current) {
                            drawerRef.current.style.transform = 'translateX(0)';
                            setName("");
                            setPrompt("");
                            if (updating){
                                setUpdating(false);
                            }
                            setShowOverlay("")
                        }
                    }}
                >
                    Create System Prompt
                </button>
                <h2 className="text-4xl mb-5">Current System Prompts</h2>
                <dl className=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    {allItems}
                </dl>

            </div>

            <div
                className={`fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-50 ${showOverlay}`}
                onClick={() => {
                    if (showOverlay == "" && drawerRef.current) {
                        setShowOverlay("hidden");
                        drawerRef.current.style.transform = 'translateX(-100%)';
                    }
                }}
            >

            </div>

            {/* Drawer component */}
            <div
                ref={drawerRef}
                id="drawer-create-product-default"
                className="fixed top-0 left-0 z-40 w-full h-screen max-w-xl p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
                tabIndex={-1}
                aria-labelledby="drawer-label"
                aria-hidden="true"
            >
                <h5
                    id="drawer-label"
                    className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    New System Prompt
                </h5>
                <button
                    type="button"
                    data-drawer-dismiss="drawer-create-product-default"
                    aria-controls="drawer-create-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseDrawer}
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form action="#" onSubmit={handleCreateProduct}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type the system prompt's name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Prompt
                            </label>
                            <textarea
                                id="description"
                                rows={12}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter system prompt here"
                            ></textarea>
                        </div>
                        <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
                            <button
                                type="submit"
                                className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Add System Prompt
                            </button>
                            <button
                                type="button"
                                data-drawer-dismiss="drawer-create-product-default"
                                aria-controls="drawer-create-product-default"
                                className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={handleCloseDrawer}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 -ml-1 sm:mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MyComponent;
