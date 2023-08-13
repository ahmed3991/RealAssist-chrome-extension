import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react';


const User = ({ setClose }) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <img src="user.png" alt="User" className="border-circle" />
                    <p className="text-white leading-normal text-sm">Dan Corkill</p>
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