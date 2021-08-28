import React from 'react';
import PropTypes from 'prop-types';

Filter.propTypes = {
    activeItem: PropTypes.shape({
        name: PropTypes.string,
        checked: PropTypes.bool,
        id: PropTypes.number
    }),
    setActiveItem: PropTypes.func,
    FilterAll: PropTypes.bool,
    setFilterAll: PropTypes.func
}

function Filter({ activeItem, setActiveItem, FilterAll, setFilterAll }) {

    const onAllFlterChange = (arr) => {
        let arrCopy = [];
        arrCopy = arrCopy.concat(arr);
        setFilterAll(!FilterAll)
        arrCopy.map((item) => {
            return item.checked = !FilterAll
        })
        setActiveItem(arrCopy)
    }

    const allFilterCheck = (arr) => {
        const dispatch = arr.every((elem) => {
            return elem.checked === true
        })
        setFilterAll(dispatch)

    }

    const onChangeItem = (index) => {
        let arrCopy = [];
        arrCopy = arrCopy.concat(activeItem);
        arrCopy.map((item) => {
            return item.id === index && (item.checked = !item.checked)
        })
        setActiveItem(arrCopy)
        allFilterCheck(arrCopy)
    }

    return (
        <div className="filter-block">
            <div className="filter-block-flex">
                <span className="filter-header">Количество пересадок</span>
                <ul >
                    <li>
                        <input
                            id={`filter__all`}
                            onChange={() => onAllFlterChange(activeItem)}
                            checked={FilterAll}
                            type="checkbox"
                        />
                        <label htmlFor={`filter__all`} />
                        <p>Все</p>
                    </li>
                    {activeItem.map((item, index) => {
                        return <li key={`item_${index}`}>
                            <input
                                id={`item_${index}`}
                                onChange={() => onChangeItem(activeItem[index].id)}
                                checked={activeItem[index].checked}
                                type="checkbox" />
                            <label htmlFor={`item_${index}`} />
                            <p>{item.name}</p>
                        </li>
                    })}
                </ul>

            </div>


        </div>
    )
}

export default Filter