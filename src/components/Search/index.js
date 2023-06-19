import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

Search.propTypes = {};

function Search({ history }) {
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.pushState(`/search/${keyword}`);
        } else {
            history.pushState('/');
        }
    };
    return (
        <div>
            <form onSubmit={searchHandler}>
                <div>
                    <input
                        className="search-contact"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search contact"
                    ></input>

                    <button>
                        {' '}
                        <FontAwesomeIcon icon={faMagnifyingGlass}> </FontAwesomeIcon>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;
