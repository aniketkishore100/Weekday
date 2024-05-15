import { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { isNonEmptyArray, isNonEmptyString } from './helpers';
import { getSampleJdJSON } from './data.js';

function App() {
  const jsonData = getSampleJdJSON();
  const [locationFilter, setLocationFilter] = useState('')
  const [jobRoleFilter, setJobRoleFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [remoteFilter, setRemoteFilter] = useState('')
  const [basePayFilter, setBasePayFilter] = useState('')
  const [companyNameFilter, setCompanyNameFilter] = useState('')

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadingDivRef = useRef(null);

  const options = {
    root: null,
    rootMargin: '0px',
    thresholds: 1

  }
  const callbackFunc = (entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    fetchData(page);
  }, [page, locationFilter, jobRoleFilter, experienceFilter, remoteFilter, basePayFilter, companyNameFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options)
    if (loadingDivRef.current) observer.observe(loadingDivRef.current)
    return () => { if (loadingDivRef.current) observer.observe(loadingDivRef.current) }
  }, [])


  const applyFilters = (data, location, jobRole, experience, remote, minBasePay, companyName) => {
    let filteredData = [...data];
    if (isNonEmptyString(location)) {
      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (isNonEmptyString(jobRole)) {
      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.jobRole.toLowerCase().includes(jobRole.toLowerCase()));
    }
    if (experience) {

      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.minExp <= experience && job.maxExp >= experience);
    }
    if (isNonEmptyString(remote)) {
      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.remote.toLowerCase().includes(remote.toLowerCase()));
    }
    if (minBasePay) {
      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.minJdSalary >= Number(minBasePay));
    }
    if (isNonEmptyString(companyName)) {
      setCards([])
      setPage(1)
      filteredData = filteredData.filter(job => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
    }
    return filteredData;
  };

  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      // Simulating data loading from a JSON file
      const startIndex = (pageNum - 1) * 10;
      const endIndex = startIndex + 10;
      const filteredData = applyFilters(jsonData, locationFilter, jobRoleFilter, experienceFilter, remoteFilter, basePayFilter, companyNameFilter);

      const newData = filteredData.slice(startIndex, endIndex);
      setCards(prevCards => [...prevCards, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <>
      <div className='flex inputContainer'>
        <input
          placeholder='Job Location'
          onChange={(e) => {
            setLocationFilter(e.target.value)
          }} />
        <input
          placeholder='Roles' onChange={(e) => {
            setJobRoleFilter(e.target.value)
          }} />
        <input
          placeholder='Experience' onChange={(e) => {
            setExperienceFilter(e.target.value)
          }} />
        <input
          placeholder='Remote' onChange={(e) => {
            setRemoteFilter(e.target.value)
          }} />
        <input
          placeholder='Minimum Base Pay' onChange={(e) => {
            setBasePayFilter(e.target.value)
          }} />
        <input
          placeholder='Search Company Name' onChange={(e) => {
            setCompanyNameFilter(e.target.value)
          }} />

      </div>
      <div className='cardSection'>
        {
          isNonEmptyArray(cards) && cards.map(cardObj => (
            <Card jobData={cardObj} />
          ))
        }
      </div>

      <div ref={loadingDivRef}>{loading && 'Loading...'}</div>
    </>
  );
}

export default App;
