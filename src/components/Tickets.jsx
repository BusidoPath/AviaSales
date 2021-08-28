import React from 'react'
import dayjs from 'dayjs'

function Tickets({ elem }) {


    const { price } = elem
    let stringPrice = String(price)
    const priceSpace = stringPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    const iata = elem.carrier


    const stopLength0 = elem.segments[0].stops.length
    const stopLength1 = elem.segments[1].stops.length
    const stops0 = elem.segments[0].stops.toString()
    const stops1 = elem.segments[1].stops.toString()
    const { origin: origin0, destination: destination0, date: date0, duration: duration0 } = elem.segments[0]
    const { origin: origin1, destination: destination1, date: date1, duration: duration1 } = elem.segments[1]


    const transformedDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = Math.floor(duration) - (hours * 60);
        return `${hours}ч ${minutes}м`
    }

    const transformedDate = (inputDate) => {
        return dayjs(inputDate).format('HH:mm')
    }

    const endTime = (inputDate, duration) => {
        return dayjs(inputDate).add(duration, 'minute').format('HH:mm')
    }


    return (
        <div className="ticket-block">
            <div className="ticket-top">
                <span className="price">{priceSpace} ₽</span>
                <span><img src={`http://pics.avs.io/99/36/${iata}.png`} alt="" /></span>
            </div>
            <div className="ticket-bottom">
                <div className="ticket-item">
                    <span className="ticket-item-info-top">{origin0}-{destination0}</span>
                    <span className="ticket-item-info-bottom">{transformedDate(date0)}-{endTime(date0, duration0)}</span>
                </div>
                <div className="ticket-item">
                    <span className="ticket-item-info-top">В ПУТИ</span>
                    <span className="ticket-item-info-bottom">{transformedDuration(duration0)}</span>
                </div>
                <div className="ticket-item">
                    <span className="ticket-item-info-top">{stopLength0} ПЕРЕСАДКИ</span>
                    <span className="ticket-item-info-bottom">{stops0}</span>
                </div>
                <div className="ticket-item">
                    <span className="ticket-item-info-top">{origin1}-{destination1}</span>
                    <span className="ticket-item-info-bottom">{transformedDate(date1)}-{endTime(date1, duration1)}</span>
                </div>
                <div className="ticket-item">
                    <span className="ticket-item-info-top">В ПУТИ</span>
                    <span className="ticket-item-info-bottom">{transformedDuration(duration1)}</span>
                </div>
                <div className="ticket-item">
                    <span className="ticket-item-info-top">{stopLength1} ПЕРЕСАДКИ</span>
                    <span className="ticket-item-info-bottom">{stops1}</span>
                </div>
            </div>
        </div>
    )
}

export default Tickets
