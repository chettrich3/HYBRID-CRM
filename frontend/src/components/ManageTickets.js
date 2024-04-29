import React, { useState, useEffect } from 'react';
import TicketService from '../services/TicketService';
import TicketForm from './TicketForm'; 

// manages tickets
const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // fetch tickets
    useEffect(() => {
        fetchTickets();
    }, []);

    // function that fethces all tickets and updates state
    const fetchTickets = () => {
        TicketService.fetchAllTickets().then(response => {
            setTickets(response.data);
        }).catch(error => console.error('Error fetching tickets:', error));
    };

    //function to select a ticket for editing
    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setIsEditing(true);
    };

    // function for deleting a ticket
    const handleDeleteTicket = (ticketID) => {
        TicketService.deleteTicket(ticketID).then(() => {
            fetchTickets(); // Refreshes list after deletion
        }).catch(error => console.error('Error deleting ticket:', error));
    };

    //function to submit changes to a ticket for updating or adding
    const handleSubmitChanges = (ticket) => {
        console.log("Ticket received in handleSubmitChanges:", ticket);
        // If ticketID is present, we're updating; if not, we're adding a new ticket
        if (ticket.ticketID) {
            TicketService.updateTicket(ticket.ticketID, ticket)
                .then(() => {
                    fetchTickets(); // Refreshes list after update
                    setIsEditing(false);
                    setSelectedTicket(null);
                })
                .catch(error => console.error('Error updating ticket:', error));
        } else {
            // Add new ticket
            TicketService.addTicket(ticket)
                .then(() => {
                    fetchTickets(); // Refreshes list after adding
                    setIsEditing(false);
                    setSelectedTicket(null);
                })
                .catch(error => console.error('Error adding ticket:', error));
        }
    };
    
    
    return (
        <div>
            <h1>Manage Tickets</h1>
            {isEditing ? (
                // display form to edit ticket
                <TicketForm ticket={selectedTicket} onSubmit={handleSubmitChanges} onCancel={() => setIsEditing(false)} />
            ) : (
                //
                <>
                    <button onClick={() => handleSelectTicket({})}>Add New Ticket</button>
                    <ul>
                        {tickets.map(ticket => (
                            <li key={ticket.ticketID}>
                                <div>{ticket.customerName} - {ticket.product}</div>
                                <button onClick={() => handleSelectTicket(ticket)}>Edit</button>
                                <button onClick={() => handleDeleteTicket(ticket.ticketID)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ManageTickets;

