import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='space-y-4 mb-4'>
            <p className='text-yellow-500'>---{subHeading}---</p>
            <h3 className='uppercase text-4xl border-y-4 p-4 mt-2 w-1/2 mx-auto'>{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;