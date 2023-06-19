import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit: null,
};
function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);
    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        if (!onSubmit) return;
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: e.target.value,
            };
            onSubmit(formValues);
        }, 300);
    }

    return (
        <div>
            <form>
                <input type="text" value={searchTerm} onChange={handleSearchTermChange}></input>
            </form>
        </div>
    );
}

export default PostFilterForm;
