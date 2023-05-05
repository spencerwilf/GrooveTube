import React, {useEffect, useState} from 'react'
import { loadSearchVideosThunk } from '../../store/videos';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Search.css'
import { loadSearchSuggestionsThunk } from '../../store/videos';

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const suggestions = useSelector(state => state.videos.searchSuggestions)

    async function handleQueryChange(e) {
        setQuery(e.target.value);
    }

    useEffect(() => {
        dispatch(loadSearchSuggestionsThunk(query))
    }, [dispatch, query])



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loadSearchVideosThunk(query))
        history.push(`/results?query=${query}`)
    }

    return (
        <>
        <div className='search-container-div'>
            <form className='search-bar-form' onSubmit={handleSubmit}>

               
                    <input className='search-bar-input' type="text" value={query} onChange={handleQueryChange} placeholder='Search'/>
                <button disabled={!query} className='search-button' type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
         
            </form>
            
        
        </div>
            <div>
                {Object.values(suggestions).map((suggestion => (
                    <Link to={`/videos/${suggestion.id}`} key={suggestion.id}>
                        <p>{suggestion.title}</p>
                    </Link>
                    
                )))}
            </div>
        </>
    );
}

export default SearchBar