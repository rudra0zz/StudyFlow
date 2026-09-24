'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='min-h-screen flex flex-col gap-4 items-center justify-center'>
            <h2>⚠️</h2>

            <h2 className='text-3xl font-bold'>
                Something went wrong!
            </h2>

            <div>
                <p>An unexpected error occurred.</p>

                <p>Please try again.</p>
            </div>

            <button
                className='px-4 py-2 rounded-lg text-white bg-black hover:bg-white hover:text-black border-2 border-black transition'
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}