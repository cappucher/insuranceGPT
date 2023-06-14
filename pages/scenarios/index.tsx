import Form from '@/components/Chat/Form'
import { Navbar } from '@/components/Layout/Navbar'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { FC } from 'react'

interface promptsProps {

}

const prompts: FC<promptsProps> = ({ }) => {
    return <>
        <div className="flex flex-col h-screen">
            <Navbar />
            <Form />
        </div>
    </>
}

export default prompts