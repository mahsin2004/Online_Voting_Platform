import React from 'react';
import './FeedbackCard.css'
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const FeedbackCard = ({ details }) => {
    return (
        <div className='project-card'>
            <div className="avatar flex justify-center items-center">
                <div className="w-24  border-2  border-gray-200 rounded-full">
                    <Image className='' src={details.feedback.img} alt='img' height={200} width={200}></Image>
                </div>
            </div>
            <div className=" text-center mb-2">
                <h2 className=" text-center mt-2 mb-1 text-gray-400">{details.feedback.email}</h2>
                <div style={{ display: 'inline-block' }}>
                    <Rating style={{ maxWidth: 150 }} isDisabled={true} value={details.ratings} />
                </div>
            </div>
            <p className='mb-1 font-medium text-2xl text-gray-200'>{details.feedback.name}</p>
            <p className=' text-gray-300'>{details.feedback.message}</p>
        </div>
    );
};

export default FeedbackCard;