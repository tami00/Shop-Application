import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // services

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTitle, setSearchTitle] = useState(true);
//   const [searchCatergory, setSearchCatergory] = useState('');
//   const [searchMan, setSearchMan] = useState('');
  const history = useHistory();

  const onTextChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  //call function when submitting
  const onStockSearch = async (event) => {
    event.preventDefault();
    try {
      // passing result to callback function retrieved from parent (App.js)
      if (searchTitle) history.push(`/stock/title/${searchQuery}`);
      else history.push(`/stock/catergory/${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

    // //call function when submitting
    // const onStockSearch = async (event) => {
    //     event.preventDefault();
    //       history.push(`/stock/${searchQuery}`);
    //   };

  return (
    <div>
      <form class="d-flex" onSubmit={onStockSearch}>
        <select
          value={searchTitle ? 0 : 1}
          onChange={() => setSearchTitle(!searchTitle)}
        >
          <option value={0}>Title</option>
          <option value={1}>Catergory</option>
        </select>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={onTextChange}
        />
        <button class="btn btn-outline-success ml-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;