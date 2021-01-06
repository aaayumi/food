import React from 'react';

const SearchInput = React.forwardRef((props, ref) => {
    return (
        <input type='text'
               ref={ref}
              />
    )
})

export default SearchInput