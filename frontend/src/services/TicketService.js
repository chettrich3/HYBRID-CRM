
import axios from 'axios';

const fetchTickets = (ticketID) => {
    //fetches single ticket or all ticketsif no ID provided
    return axios.get(`/tickets/${ticketID || ''}`);
};

//fetches all 
const fetchAllTickets = () => {
    return axios.get('/tickets');
};

const fetchPrioritizedTickets = () => {
    return axios.get('/tickets_prioritization');
};

const updateTicket = (ticketID, ticketData) => {
    console.log(`Requesting PUT on /tickets/${ticketID}`);
    return axios.put(`/tickets/${ticketID}`, ticketData);
};

const deleteTicket = (ticketID) => {
    return axios.delete(`/tickets/${ticketID}`);
};

const addTicket = (ticketData) => {
    return axios.post('/tickets', ticketData);
};

const ticketService = {
    fetchTickets,
    fetchAllTickets,
    fetchPrioritizedTickets,
    updateTicket,
    deleteTicket,
    addTicket
};

export default ticketService;
