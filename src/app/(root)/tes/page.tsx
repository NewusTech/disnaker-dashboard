import React from 'react'

const Tes = () => {
    return (
        <div>
            <div className="flex justify-center">
                <div className="flex flex-col w-full h-[550px] bg-neutral-50 shadow-md rounded-xl">
                    <iframe
                        allowFullScreen
                        src="https://arxiv.org/pdf/2105.06740"
                        title="Manual Book"
                        className="rounded-xl w-full h-full"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Tes