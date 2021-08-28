import React, { useEffect, useState } from 'react';
import Main from './components/Main'

import axios from 'axios'
import axiosRetry from 'axios-retry';


function App() {

  const [ticketsId, setticketsId] = useState()
  const [tickets, settickets] = useState([])
  const [ticketsPerPage, setticketsPerPage] = useState(5)
  const client = axios.create();
  axiosRetry(client, { retries: 3 })



  useEffect(() => {

    axios.get('https://front-test.beta.aviasales.ru/search').then(({ data }) => {
      setticketsId(data.searchId)
    })

  }, [])

  useEffect(() => {
    const getData = async (ticketsId, savedData) => {
      const result = await client.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${ticketsId}`);
      if (!result.data.stop) {
        return getData(ticketsId, [...savedData, ...result.data.tickets])
      }
      else return [...savedData, ...result.data.tickets]
    }
    ticketsId && getData(ticketsId, []).then((data) => {
      settickets(data)

    })
  }, [ticketsId])


  const lastTicketIndex = ticketsPerPage
  const firstTicketIndex = lastTicketIndex - ticketsPerPage


  return (
    <Main
      className="main"
      ticketsPerPage={ticketsPerPage}
      setticketsPerPage={setticketsPerPage}
      ticketsLength={tickets.length}
      tickets={tickets}
      firstTicketIndex={firstTicketIndex}
      lastTicketIndex={lastTicketIndex}
    ></Main>
  );
}



export default App;

