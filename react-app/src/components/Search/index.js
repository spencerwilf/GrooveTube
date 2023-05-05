import React, {useEffect, useState} from 'react'
import { loadSearchVideosThunk } from '../../store/videos';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Search.css'
import Suggestions from './Suggestions';
import { loadSearchSuggestionsThunk } from '../../store/videos';

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const suggestions = useSelector(state => state.videos.searchSuggestions)
    

    async function handleQueryChange(e) {
        setQuery(e.target.value);
        dispatch(loadSearchSuggestionsThunk(query))
    }

    // useEffect(() => {
    //     dispatch(loadSearchSuggestionsThunk(query))
    // }, [dispatch, query])



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loadSearchVideosThunk(query))
        setQuery('')
        history.push(`/results?query=${query}`)
    }

    return (
        <>
        <div className='search-container-div'>
            <form className='search-bar-form' onSubmit={handleSubmit}>

               
                    <input className='search-bar-input' type="text" value={query} onChange={handleQueryChange} placeholder='Search'/>
                <button disabled={!query} className='search-button' type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
         
            </form>
            
                {query.length >= 3 && (
                    <div className='search-suggestion-container'>
                        {Object.values(suggestions).map((suggestion => (
                            <Link to={`/videos/${suggestion.id}`} key={suggestion.id}>
                                <p className='search-bar-results'>{suggestion.title}</p>
                            </Link>

                        )))}
                    </div>
                )}
        </div>

        </>
    );
}

export default SearchBar