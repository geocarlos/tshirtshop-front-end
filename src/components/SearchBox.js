import React from 'react';

const SearchBox = ({ term, handleSubmit, doSearch }) => {
    return (
        <form onSubmit={handleSubmit} >
            <input type="text" value={term} name='term' onChange={(event) => doSearch(event)} />
            <input type="submit" value='Search'/>
        </form>
    )
}

export default SearchBox;