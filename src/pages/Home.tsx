import { useState, useEffect } from 'react'
import '../App.css'
import mockData from '../data/MOCK_DATA.json';
import { Pagination } from '@mui/material';
import convertToDate from '../utils/helpers';
import { Link } from 'react-router-dom';

type UserData = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  date_of_birth: string | null;
  industry: string | null;
  salary: number | null;
  years_of_experience: number | null;
}

function Home() {
  const [userData, setUserData] = useState<UserData[]>(mockData);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    setUserData(userData.slice(0, 20))
  }, []);

   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const fromIndex = (value - 1) * 20;
    const toIndex = fromIndex + 20;
    setUserData(mockData.slice(fromIndex, toIndex));
  };

  const handleSortClick = (sortType: string) => {
    let sortedData;

    if(sortType === 'dob'){
      sortedData = userData.sort((a,b)=>convertToDate(a.date_of_birth!).getTime() - convertToDate(b.date_of_birth!).getTime());
    }
    if(sortType === 'salary'){
      sortedData = userData.sort((a,b)=> a.salary! - b.salary!);
    }
    if(sortType === 'industry'){
      sortedData = userData.sort((a,b)=> (a.industry || 'n/a').localeCompare(b.industry || 'n/a'));
    }

    setUserData([...sortedData as UserData[]])
  }

  const filterUserDataByFirstName = (inputText: string, name: 'first_name' | 'last_name') => {
    const filteredData = userData.filter((user) =>
      (user[name] || 'n/a').toLowerCase().includes(inputText.toLowerCase())
    );
  
    return filteredData;
  };
  
  const handleFilterSearch = (searchType: 'first_name' | 'last_name', e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.trim();

    if (inputText === '') {
      setUserData(mockData.slice(0, 20));
      setPage(1);
    } else {
      const filteredUsers = filterUserDataByFirstName(inputText, searchType);
      setUserData(filteredUsers);
    }
  };

  return (
    <>
      <div className='filters-section'>
        <div className='filter-buttons'>
          <span>Sort By:</span>
          <br/>
          <button onClick={() => handleSortClick('dob')}>DOB</button>
          <button onClick={() => handleSortClick('industry')}>Industry</button>
          <button onClick={() => handleSortClick('salary')}>Salary</button>
        </div>
        <div className='search-filters'>
          <label>
            First Name
            <input autoComplete='on' onChange={(e) => handleFilterSearch('first_name', e)} />
          </label> 
          <label>
            Last Name
            <input autoComplete='on' onChange={(e) => handleFilterSearch('last_name', e)} />
          </label> 
        </div>
        <div>
        <Link to='/chart'>Show Chart</Link>
        </div>
      </div>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>D.O.B</th>
          <th>Industry</th>
          <th>Salary</th>
          <th>Years Experience</th>
        </tr>
        {userData.map(data => {
          const { id, first_name, last_name, email, date_of_birth, industry, salary, years_of_experience } = data;
          return (
            <tr key={`${id}-${date_of_birth}`}>
              <td>{first_name || 'n/a'}</td>
              <td>{last_name || 'n/a'}</td>
              <td>{email || 'n/a'}</td>
              <td>{date_of_birth || 'n/a'}</td>
              <td>{industry || 'n/a'}</td>
              <td>{salary || 'n/a'}</td>
              <td>{years_of_experience || 'n/a'}</td>
            </tr>
          )
        })}
      </table>
      <Pagination count={Math.ceil(mockData.length / 20)} page={page} onChange={handleChange} />
    </>
  )
}

export default Home
