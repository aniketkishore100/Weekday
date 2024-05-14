import { useState } from 'react';
import { isNonEmptyString } from '../helpers';

function Card({ jobData }) {
  return (
    <>
      <div className='card'>
        <div className='chip'>
          <div className='icon' />
          <p>Posted 10 days ago</p>
        </div>
        <div className='flex marginTop10'>
          <img src={jobData?.logoUrl} style={{ width: '60px', height: '60px', marginRight: '20px' }} />
          <div className=''>
            <p>{jobData?.companyName}</p>
            <p>{jobData?.jobRole}</p>
            <p>{jobData?.location}</p>
          </div>
        </div>
        <div className='marginTop10'>
          <p>Estimiated Salary: ₹{jobData?.minJdSalary && `${jobData?.minJdSalary} - `}{jobData?.maxJdSalary}LPA</p>
        </div>
        <div className='marginTop10'>
          <p>About Company</p>
          <p style={{ fontWeight: 600, fontSize: 'small' }}>About Us</p>
          <p>{jobData?.jobDetailsFromCompany}</p>
        </div>

        <div className='marginTop10'>
          <p>Minimum Experience</p>
          <p>
            {jobData?.minExp} years
          </p>
        </div>
        <button onClick={() => console.log('Easy Apply')} className='btn easyApplyBtn'>
          Easy Apply
        </button>
        <button onClick={() => console.log('Easy Apply')} className='btn applyReferralBtn'>
          Unlock referral asks
        </button>
      </div>
    </>
  );
}

export default Card;
