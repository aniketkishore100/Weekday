import { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { isNonEmptyArray } from './helpers';
import { getSampleJdJSON } from './data.js';

function App() {
  const jsonData = getSampleJdJSON();
  // const [inputFilter, setInputFilter] = useState('')

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
    fetchData(page); // Fetch initial data when component mounts
  }, [page]); // Fetch data whenever the page state changes


  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options)
    if (loadingDivRef.current) observer.observe(loadingDivRef.current)
    return () => { if (loadingDivRef.current) observer.observe(loadingDivRef.current) }
  }, [])


  // Function to fetch data for a given page
  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      // Simulating data loading from a JSON file
      const startIndex = (pageNum - 1) * 10;
      const endIndex = startIndex + 10;
      const newData = jsonData.slice(startIndex, endIndex);
      setCards(prevCards => [...prevCards, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // const handleScroll = () => {
  //   if (
  //     (window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight)
  //   ) {
  //     setPage(prevPage => prevPage + 1); // Increment page number to fetch more data
  //   }

  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []); // Add scroll event listener when component mounts
  // const logicFn = () =>{

  // }

  // function jobFilter(job, location) {
  //   return job.location.toLowerCase().includes(location.toLowerCase())
  // }
  // function filterJobsByLocation(jobs, searchQuery) {
  //   return jobs.filter(job => {
  //     return jobFilter(job, searchQuery)
  //   });
  // }

  // useEffect(() => {
  //   const filteredJobs = filterJobsByLocation(cards, inputFilter);
  //   setCards(filteredJobs)
  //   setPage(1);
  // }, [inputFilter])


  return (
    <>
      {/* <input onChange={(e) => {
        setInputFilter(e.target.value)
      }} /> */}
      <div className='cardSection'>
        {
          isNonEmptyArray(cards) && cards.map(cardObj => (
            <Card jobData={cardObj} />
          ))
        }
      </div>
      <div ref={loadingDivRef}>Loading...</div>
    </>
  );
}

export default App;
