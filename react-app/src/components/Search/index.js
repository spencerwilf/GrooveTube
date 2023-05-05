import React, {useState} from 'react'
import { loadSearchVideosThunk } from '../../store/videos';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Search.css'

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    async function handleQueryChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loadSearchVideosThunk(query))
        history.push(`/results?query=${query}`)
    }

    return (
        <div className='search-container-div'>
            <form className='search-bar-form' onSubmit={handleSubmit}>

               
                    <input className='search-bar-input' type="text" value={query} onChange={handleQueryChange} placeholder='Search'/>
                <button disabled={!query} className='search-button' type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
         
            </form>
        </div>
    );
}

export default SearchBar