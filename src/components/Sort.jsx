import React from 'react'

import PropTypes from 'prop-types';

Sort.propTypes = {
    items: PropTypes.shape({
        name: PropTypes.string
    }),
    sortType: PropTypes.number,
    setsortType: PropTypes.func,
}

function Sort({ items, sortType, setsortType }) {



    return (
        <div className="sort-block">
            <div className="sort-buttons">
                {items.map((item, index) => {
                    return <button
                        onClick={() => setsortType(index)}
                        className={index === sortType ? "active" : ""}
                        key={index}
                    >{item.name}</button>
                })}
            </div>
        </div>
    )
}

export default Sort
