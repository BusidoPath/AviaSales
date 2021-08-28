import React from 'react'
import Filter from './Filter'
import Tickets from './Tickets'
import Sort from './Sort'
import MyLoader from './MyLoader'
import '../scss/index.scss'

import { useState, useEffect } from 'react'



const FilterItems = [
    { name: 'Без пересадок', checked: true, id: 1 },
    { name: '1 пересадка', checked: true, id: 2 },
    { name: '2 пересадки', checked: true, id: 3 },
    { name: '3 пересадки', checked: true, id: 4 }]

const SortItems = [
    { name: 'САМЫЙ ДЕШЕВЫЙ' },
    { name: 'САМЫЙ БЫСТРЫЙ' },
    { name: 'ОПТИМАЛЬНЫЙ' },]


function Main({ ticketsPerPage, tickets, ticketsLength, setticketsPerPage, firstTicketIndex, lastTicketIndex }) {


    const pageNumber = []
    for (let i = 1; i <= Math.ceil(ticketsLength / ticketsPerPage); i++) {
        pageNumber.push(i)
    }

    const [activeItem, setActiveItem] = useState(FilterItems)
    const [FilterAll, setFilterAll] = useState(true)
    const [sortType, setsortType] = useState(0)
    const [sortedTickets, setsortedTickets] = useState(tickets)
    const [filteredTickets, setfilteredTickets] = useState([])

    useEffect(() => {
        const copiedTickets = [...tickets]

        switch (sortType) {
            case 0: {
                copiedTickets.sort((a, b) => {
                    return a.price - b.price
                })
                break
            }
            case 1: {

                copiedTickets.sort((a, b) => {
                    return a.segments.reduce((acc, elem) => (acc += elem.duration), 0) - b.segments.reduce((acc, elem) => (acc += elem.duration), 0)
                })
                break
            }
            case 2: {
                copiedTickets.sort((a, b) => {
                    return a.segments.reduce((acc, elem) => (acc += elem.duration), 0) / a.price - b.segments.reduce((acc, elem) => (acc += elem.duration), 0) / b.price
                })
                break
            }
            default: {
                return 0
            }
        }

        setsortedTickets(copiedTickets)

    }, [sortType, tickets])

    useEffect(() => {
        setfilteredTickets(sortedTickets.filter((elem) => {
            if (activeItem[0].checked === true &&
                elem.segments.reduce((acc, elem) => (acc += elem.stops.length), 0) === 0) {
                return 1
            }
            if (activeItem[1].checked === true &&
                elem.segments.reduce((acc, elem) => (acc += elem.stops.length), 0) === 1) {
                return 1
            }
            if (activeItem[2].checked === true &&
                elem.segments.reduce((acc, elem) => (acc += elem.stops.length), 0) === 2) {
                return 1
            }
            if (activeItem[3].checked === true &&
                elem.segments.reduce((acc, elem) => (acc += elem.stops.length), 0) === 3) {
                return 1
            }
            if (FilterAll === true) {
                return 1
            }
            return false
        }))

    }, [activeItem, sortedTickets, FilterAll])

    const trimmedTickets = filteredTickets.slice(firstTicketIndex, lastTicketIndex)
    console.log()

    return (
        <div className="main">
            <Filter
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                FilterAll={FilterAll}
                setFilterAll={setFilterAll}
            />
            <div className="right-side">
                <Sort
                    items={SortItems}
                    sortType={sortType}
                    setsortType={setsortType}
                />
                {trimmedTickets.length !== 0 ? trimmedTickets.map((elem, id) => {
                    return <Tickets
                        key={`elem_${id}`}
                        elem={elem}
                    />
                }) : Array(5).fill(0).map((_, index) => <MyLoader key={index} />)}
                <button className='showMore' onClick={() => setticketsPerPage(ticketsPerPage + 5)}> показать еще 5 билетов!</button>
            </div>

        </div>
    )
}

export default Main