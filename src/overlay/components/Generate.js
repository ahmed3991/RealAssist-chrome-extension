import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

const Generate = ({ generate, setPreview, typeActive, toneActive, lengthActive, handleGenerate, setStringResponse }) => {
    // const [generateState, setGenerate] = useState(false);
    // const handleGenerateFunc = () => {
    //     setGenerate(true);
    //     setStringResponse("");
    //     // some api calls
    //     setTimeout(() => {
    //         // as callback function
    //         const res = {
    //             type: typeActive,
    //             tone: toneActive,
    //             length: lengthActive
    //         }
    //         setPreview(true);
    //         setGenerate(false);
    //         setStringResponse("Thank you for choosing our real estate agency! It was a pleasure assisting you in finding your dream home. Your trust means the world to us, and we're here for any future needs.")
    //     }, 2000);
    // }
    return (
        <>
            <button className={`bg-blue-700 hover:bg-blue-600 text-white p-3 rounded gap-2 w-full block text-center text-sm ${generate ? "cursor-not-allowed" : null}`} disabled={generate} onClick={handleGenerate}>
                {generate ? (
                    <ClipLoader
                        color="#fff"
                        size={22}
                        cssOverride={{ margin: "0 50px" }}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <>
                        <span>Generate Draft</span>
                    </>
                )}
            </button>
            <hr className="h-1 border-0 dark:bg-gray-700" />
        </>
    )
}

export default Generate