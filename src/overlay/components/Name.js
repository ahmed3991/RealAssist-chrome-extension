import React from 'react';

const Name = ({ logoSrc }) => {
    return (
        <div className="flex justify-end items-center gap-2">
            <img src={logoSrc} alt="RealAssist.AI" />
            <p className='text-405974 text-sm'>RealAssist.AI</p>
        </div>
    )
}

export default Name