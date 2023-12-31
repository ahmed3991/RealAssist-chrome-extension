import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react';


const User = ({ setClose, imgSrc, customerName }) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <img src={imgSrc} alt="User" className="border-circle h-12 w-12 object-cover" />
                    <p className="text-white leading-normal text-sm">{customerName}</p>
                </div>
                <div className="h-8 aspect-square flex justify-center rounded-md text-2xl cursor-pointer items-center bg-slate-600 text-white" onClick={() => setClose(true)}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <hr className="h-px border-0 dark:bg-gray-500" />
        </div>
    )
}

export default User