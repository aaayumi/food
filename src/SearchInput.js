import React from 'react';

const SearchInput = React.forwardRef((props, ref) => {
    const handleChange = (e) => {
        props.searchChange(e.target.value)
        e.preventDefault();
    }
    return (
        <input type='text'
               ref={ref}
               onChange={handleChange}
              />
    )
});

export default SearchInput