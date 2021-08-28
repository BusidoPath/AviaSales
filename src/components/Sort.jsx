import React from 'react'



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
