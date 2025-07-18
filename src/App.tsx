import {type FormEvent, useState} from 'react'
import './App.css'
import {index, type Match, search, upload} from "./api/aws-service.ts";

function App() {
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [searchFile, setSearchFile] = useState<File | null>(null)
    const [matches, setMatches] = useState<Match[]>([])

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!uploadFile) return
        await upload(uploadFile)
            .then(res => index(uploadFile, res.objectKey))
            .then(res => alert(res))
            .catch(err => alert(err))
    }

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!searchFile) return
        await search(searchFile)
            .then(res => setMatches(res.matches))
            .catch(err => alert(err))
    }

    return (
        <main className='container mx-auto flex flex-col flex-1'>
            <div className='flex flex-col gap-12'>
                <div>
                    <span className='font-medium text-xl'>Загрузить фото</span>
                    <form onSubmit={handleUpload} className='flex flex-col'>
                        <input type='file'
                               className='border border-gradient p-3 m-5'
                               onChange={(e) => {
                                   if (e.target.files)
                                       setUploadFile(e.target.files[0])
                               }}/>
                        {uploadFile && <img src={window.URL.createObjectURL(uploadFile)} alt=''
                                            className='max-h-[500px] object-contain m-3'/>}
                        <button type='submit'
                                className='p-1 border rounded-md hover:bg-neutral-200 disabled:border-neutral disabled:bg-none'
                                disabled={!uploadFile}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
                <div>
                    <span className='font-medium text-xl'>Найти</span>
                    <form onSubmit={handleSearch} className='flex flex-col'>
                        <input type='file' accept='.jpg,.jpeg,.png' onChange={(e) => {
                            if (e.target.files)
                                setSearchFile(e.target.files[0])
                        }}/>
                        {searchFile && <img src={window.URL.createObjectURL(searchFile)} alt=''
                                            className='max-h-[500px] object-contain m-3'/>}
                        <button type='submit'
                                className='p-1 border rounded-md hover:bg-neutral-200'
                                disabled={!searchFile}
                        >
                            Отправить
                        </button>
                    </form>
                </div>

                {matches.length > 0 && (<span className='font-semibold text-2xl'>Результаты поиска</span>)}
                <div className='grid grid-cols-4 gap-4'>
                    {matches.map((item, index) => (
                        <>
                            <div key={index}>
                                <span className='font-mono text-pink-300'>{item.similarity}%</span>
                                <img src={item.imageUrl} alt={'res'}/>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default App
