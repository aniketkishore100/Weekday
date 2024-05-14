import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { isNonEmptyArray } from './helpers';
import { getSampleJdJSON } from './data.js';

function App() {
  const jsonData = getSampleJdJSON();

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


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

  useEffect(() => {
    fetchData(page); // Fetch initial data when component mounts
  }, [page]); // Fetch data whenever the page state changes

  const handleScroll = () => {
    if (
      (window.innerHeight + window.scrollY >=
        document.body.offsetHeight)
    ) {
      setPage(prevPage => prevPage + 1); // Increment page number to fetch more data
    }

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Add scroll event listener when component mounts

  console.log('cards', cards.length, page, loading)
  return (
    <>
      <div className='cardSection'>
        {
          isNonEmptyArray(cards) && cards.map(cardObj => (
            <Card jobData={cardObj} />
          ))
        }
      </div>
    </>
  );
}

export default App;
