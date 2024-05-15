import { useState } from 'react';
import { isNonEmptyString } from '../helpers';


function Card({ jobData }) {
  return (
    <>
      <div className='card'>
        <div style={{ flex: 1 }}>
          <div className='chip'>
            <img src={'/hourglass.png'} style={{ width: '12px', height: '12px', marginRight: '4px' }} />
            <p style={{ fontSize: '12px' }}>Posted 10 days ago</p>
          </div>
          <div className='flex marginTop10'>
            <img src={jobData?.logoUrl} style={{ width: '60px', height: '60px', marginRight: '20px' }} />
            <div className=''>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'GrayText' }}>{jobData?.companyName}</p>
              <p style={{ fontSize: '16px', fontWeight: 400 }}>{jobData?.jobRole}</p>
              <p style={{ fontSize: '13px', fontWeight: 500 }}>{jobData?.location}</p>
            </div>
          </div>
          <div className='marginTop10'>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'GrayText' }}>Estimiated Salary: {jobData?.minJdSalary && `${jobData?.minJdSalary} - `}{jobData?.maxJdSalary}</p>
          </div>
          <div className='marginTop10'>
            <p style={{ fontSize: '16px', fontWeight: 500 }}>About Company</p>
            <p style={{ fontWeight: 600, fontSize: '14px' }}>About Us</p>
            <p style={{ fontWeight: 400, fontSize: '14px' }}>{jobData?.jobDetailsFromCompany}</p>
          </div>


          <div className='marginTop10'>
            {jobData?.minExp ?
              <>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'GrayText' }}>Minimum Experience</p><p style={{ fontSize: '16px', fontWeight: 500 }}>
                  {jobData?.minExp} years
                </p>
              </>
              : <div />
            }
          </div>
        </div>

        <div>
          <a href={jobData?.jdLink} className='btn easyApplyBtn flex'>
            <img src={'/lightening.png'} style={{ width: '16px', height: '16px', marginRight: '4px' }} />Easy Apply
          </a>
          <a href={jobData?.jdLink} className='btn applyReferralBtn '>
            Unlock referral asks
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
