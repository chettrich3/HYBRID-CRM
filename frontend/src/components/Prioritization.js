import React, { useState, useEffect } from 'react';
import TicketService from '../services/TicketService';

const PrioritizedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        TicketService.fetchPrioritizedTickets()
            .then(response => {
                setTickets(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Something went wrong');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Prioritized Tickets</h2>
            {tickets.length > 0 ? (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.ticketID}>
                            <div><strong>Ticket ID:</strong> {ticket.ticketID}</div>
                            <div><strong>Date of Purchase:</strong> {new Date(ticket.dateOfPurchase).toLocaleDateString()}</div>
                            <div><strong>Ticket Type:</strong> {ticket.ticketType}</div>
                            <div><strong>Subject:</strong> {ticket.ticketSubject}</div>
                            <div><strong>Description:</strong> {ticket.ticketDescription}</div>
                            <div><strong>Status:</strong> {ticket.ticketStatus}</div>
                            <div><strong>Priority:</strong> {ticket.ticketPriority}</div>
                            <div><strong>Channel:</strong> {ticket.ticketChannel}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No prioritized tickets found.</p>
            )}
        </div>
    );
};

export default PrioritizedTickets;
