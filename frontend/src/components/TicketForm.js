import React, { useState, useEffect } from 'react';

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
    // Initialize state for all fields in tikcet form, with ticket data if available
    const [customerName, setCustomerName] = useState(ticket.customerName || '');
    const [customerEmail, setCustomerEmail] = useState(ticket.customerEmail || '');
    const [customerAge, setCustomerAge] = useState(ticket.customerAge || '');
    const [customerGender, setCustomerGender] = useState(ticket.customerGender || '');
    const [product, setProduct] = useState(ticket.product || '');
    const [satisfactionRating, setSatisfactionRating] = useState(ticket.satisfactionRating || '');
    const [ticketType, setTicketType] = useState(ticket.ticketType || '');
    const [ticketSubject, setTicketSubject] = useState(ticket.ticketSubject || '');
    const [ticketDescription, setTicketDescription] = useState(ticket.ticketDescription || '');
    const [ticketStatus, setTicketStatus] = useState(ticket.ticketStatus || '');
    const [ticketPriority, setTicketPriority] = useState(ticket.ticketPriority || '');
    const [ticketChannel, setTicketChannel] = useState(ticket.ticketChannel || '');
    const [dateOfPurchase, setDateOfPurchase] = useState(ticket.dateOfPurchase ? ticket.dateOfPurchase.substring(0, 10) : '');
    const [firstResponseTime, setFirstResponseTime] = useState(ticket.firstResponseTime ? ticket.firstResponseTime.substring(0, 16) : '');
    const [timeToResolution, setTimeToResolution] = useState(ticket.timeToResolution ? ticket.timeToResolution.substring(0, 16) : '');


    useEffect(() => {
        // Update all states when the ticket prop changes
        if (ticket) {
            setCustomerName(ticket.customerName || '');
            setCustomerEmail(ticket.customerEmail || '');
            setCustomerAge(ticket.customerAge || '');
            setCustomerGender(ticket.customerGender || '');
            setProduct(ticket.product || '');
            setSatisfactionRating(ticket.satisfactionRating || '');
            setTicketType(ticket.ticketType || '');
            setTicketSubject(ticket.ticketSubject || '');
            setTicketDescription(ticket.ticketDescription || '');
            setTicketStatus(ticket.ticketStatus || '');
            setTicketPriority(ticket.ticketPriority || '');
            setTicketChannel(ticket.ticketChannel || '');
            setDateOfPurchase(ticket.dateOfPurchase || '');
            setFirstResponseTime(ticket.firstResponseTime ? ticket.firstResponseTime.substring(0, 16) : '');
            setTimeToResolution(ticket.timeToResolution ? ticket.timeToResolution.substring(0, 16) : '');
        }
    }, [ticket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct a complete ticket object from state
        const updatedTicket = {
            ...ticket,
            customerName,
            customerEmail,
            customerAge: Number(customerAge),
            customerGender,
            product,
            satisfactionRating,
            ticketType,
            ticketSubject,
            ticketDescription,
            ticketStatus,
            ticketPriority,
            ticketChannel,
            dateOfPurchase, 
            firstResponseTime,
            timeToResolution
        };
        console.log("Submitting ticket:", updatedTicket);  // Debug log
        onSubmit(updatedTicket);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer Name:</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Customer Email:</label>
                <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Customer Age:</label>
                <input
                    type="number"
                    value={customerAge}
                    onChange={(e) => setCustomerAge(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Customer Gender:</label>
                <select
                    value={customerGender}
                    onChange={(e) => setCustomerGender(e.target.value)}
                    // required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label>Product:</label>
                <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Satisfaction Rating:</label>
                <select
                    value={satisfactionRating}
                    onChange={(e) => setSatisfactionRating(e.target.value)}
                    // required
                >
                    <option value="">Select Rating</option>
                    <option value="Very Unsatisfied">Very Unsatisfied</option>
                    <option value="Unsatisfied">Unsatisfied</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Satisfied">Satisfied</option>
                    <option value="Very Satisfied">Very Satisfied</option>
                </select>
            </div>
            <div>
                <label>Ticket Type:</label>
                <input
                    type="text"
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value)}
                />
            </div>
            <div>
                <label>Ticket Subject:</label>
                <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                />
            </div>
            <div>
                <label>Ticket Description:</label>
                <textarea
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Ticket Status:</label>
                <select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div>
                <label>Ticket Priority:</label>
                <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>
            <div>
                <label>Ticket Channel:</label>
                <input
                    type="text"
                    value={ticketChannel}
                    onChange={(e) => setTicketChannel(e.target.value)}
                />
            </div>
            <div>
                <label>Date of Purchase:</label>
                <input
                    type="date"
                    value={dateOfPurchase}
                    onChange={(e) => setDateOfPurchase(e.target.value)}
                />
            </div>
            <div>
                <label>First Response Time:</label>
                <input
                    type="datetime-local"
                    value={firstResponseTime}
                    onChange={(e) => setFirstResponseTime(e.target.value)}
                />
            </div>
            <div>
                <label>Time to Resolution:</label>
                <input
                    type="datetime-local"
                    value={timeToResolution}
                    onChange={(e) => setTimeToResolution(e.target.value)}
                />
            </div>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default TicketForm;

