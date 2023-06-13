import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from '../Layout/Navbar';
import { Footer } from '../Layout/Footer';

type LayoutProps = {
    children: ReactNode;
    title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10 border-gray-700">
                    <div className="max-w-[800px] mx-auto mt-4 sm:mt-12 flex items-center justify-between space-x-6">
                        <div className="left max-w-full">{children}</div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;