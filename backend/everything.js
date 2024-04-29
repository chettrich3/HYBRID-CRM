const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());  // This allows all domains by setting Access-Control-Allow-Origin to '*'


// Middleware
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); 



// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

const { MongoClient } = require('mongodb');

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD',
    database: 'support_tickets'
  });


mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// MongoDB Connection
mongoose.connect('mongodb+srv://USERNAME:PASSWORD@cluster0.okllo0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Ticket Schema
const ticketSchema = new mongoose.Schema({
  ticketID: Number,
  dateOfPurchase: Date,
  ticketType: String,
  ticketSubject: String,
  ticketDescription: String,
  ticketStatus: String,
  ticketPriority: String,
  ticketChannel: String,
  firstResponseTime: Date,
  timeToResolution: Date
});

//this is important for compound indexing
ticketSchema.index({ ticketID: 1, ticketSubject: 1 });

// Use the default connection to retrieve the Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);


// MONGODB
// Manually increment ticketID
let latestTicketID = 0;


// Fetch a Ticket by ticketID from both MySQL and MongoDB or Fetch All Tickets from both MySQL and MongoDB
app.get('/tickets/:ticketID?', async (req, res) => {
    const ticketID = req.params.ticketID;
    console.log('Ticket ID:', ticketID); // Log the ticketID inputted by the user

    try {
        if (ticketID && ticketID.toLowerCase() !== 'all') {
            // Fetch a specific ticket by ticketID from both MySQL and MongoDB

            // Fetch ticket from MySQL
            const mysqlQuery = 'SELECT * FROM tickets WHERE ticketID = ?';
            const mysqlTicket = await new Promise((resolve, reject) => {
                mysqlConnection.query(mysqlQuery, [ticketID], (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(results[0]);
                    }
                });
            });

            // Fetch ticket from MongoDB
            const db = mongoose.connection.useDb('CS4440');
            const Ticket = db.model('Ticket', ticketSchema, 'tickets');
            const mongoTicket = await Ticket.findOne({ ticketID: ticketID });

            // If ticket is found in both MySQL and MongoDB, merge them
            let mergedTicket = {};
            if (mysqlTicket && mongoTicket) {
                mergedTicket = {
                    ...mysqlTicket,
                    ...mongoTicket.toObject()
                };
            } else if (mysqlTicket) {
                mergedTicket = mysqlTicket;
            } else if (mongoTicket) {
                mergedTicket = mongoTicket.toObject();
            }

            if (Object.keys(mergedTicket).length === 0) {
                res.status(404).send('Ticket not found');
            } else {
                res.status(200).json(mergedTicket);
            }
        } else {
            // fetch all tickets from both MySQL and MongoDB

            // Fetch tickets from MySQL
            const mysqlQuery = 'SELECT * FROM tickets';
            const mysqlTickets = await new Promise((resolve, reject) => {
                mysqlConnection.query(mysqlQuery, (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });

            // Fetch tickets from MongoDB
            const db = mongoose.connection.useDb('CS4440');
            const Ticket = db.model('Ticket', ticketSchema, 'tickets');
            const mongoTickets = await Ticket.find();

            // merge the tickets based on ticketID
            const allTickets = mysqlTickets.map(mysqlTicket => {
                const correspondingMongoTicket = mongoTickets.find(mongoTicket => mongoTicket.ticketID === mysqlTicket.ticketID);
                return {
                    ...mysqlTicket,
                    ...(correspondingMongoTicket ? correspondingMongoTicket.toObject() : {})
                };
            });

            res.status(200).json(allTickets);
            console.log('All tickets printed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving tickets');
    }
});


// Update Ticket
app.put('/tickets/:ticketID', async (req, res) => {
    console.log("Received data:", req.body);
    const ticketID = req.params.ticketID;
    const { customerName, customerEmail, customerAge, customerGender, product, satisfactionRating } = req.body;

    try {
        // Update ticket in MySQL
        const mysqlQuery = 'UPDATE tickets SET customerName = ?, customerEmail = ?, customerAge = ?, customerGender = ?, product = ?, satisfactionRating = ? WHERE ticketID = ?';
        mysqlConnection.query(mysqlQuery, [customerName, customerEmail, customerAge, customerGender, product, satisfactionRating, ticketID], (mysqlErr, mysqlResults) => {
            if (mysqlErr) {
                console.error(mysqlErr);
                res.status(500).send('Error updating ticket in MySQL');
            } else {
                // Update ticket in MongoDB
                const db = mongoose.connection.useDb('CS4440');
                const Ticket = db.model('Ticket', ticketSchema, 'tickets');
                
                Ticket.updateOne({ ticketID: ticketID }, req.body)
                    .then(() => {
                        res.status(200).send(`Ticket ${ticketID} updated successfully`);
                        console.log(`Ticket ${ticketID} updated successfully`);
                    })
                    .catch((mongoErr) => {
                        console.error(mongoErr);
                        res.status(500).send('Error updating ticket in MongoDB');
                    });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating ticket');
    }
});


// Delete a Ticket
app.delete('/tickets/:ticketID', async (req, res) => {
    console.log("Received data:", req.body);
    const ticketID = req.params.ticketID;
  
    try {
        // delete ticket from MySQL
        const mysqlQuery = 'DELETE FROM tickets WHERE ticketID = ?';
        mysqlConnection.query(mysqlQuery, [ticketID], async (mysqlErr, mysqlResults) => {
            if (mysqlErr) {
                console.error(mysqlErr);
                res.status(500).send(`Error deleting ticket with ID ${ticketID} from MySQL`);
            } else {
                // delete ticket from MongoDB
                const db = mongoose.connection.useDb('CS4440');
                const Ticket = db.model('Ticket', ticketSchema, 'tickets');
                await Ticket.deleteOne({ ticketID: ticketID });

                res.status(200).send(`Ticket ${ticketID} deleted successfully`);
                console.log(`Ticket ${ticketID} deleted successfully`);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting ticket');
    }
});


// Add a Ticket
app.post('/tickets', async (req, res) => {
    console.log("Received data:", req.body);
    const ticketData = req.body;

    try {
        // fetch maximum previous ticketID from MySQL
        const mysqlMaxTicket = await new Promise((resolve, reject) => {
            const mysqlQuery = 'SELECT MAX(ticketID) AS maxTicketID FROM tickets';
            mysqlConnection.query(mysqlQuery, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results[0].maxTicketID);
                }
            });
        });

        // increment ticketID manually
        const latestTicketID = mysqlMaxTicket ? mysqlMaxTicket + 1 : 1;

        // assign the incremented ticketID to the new ticket
        ticketData.ticketID = latestTicketID;

        // save ticket to MySQL
        const mysqlTicketData = {
            ticketID: latestTicketID,
            customerName: ticketData.customerName,
            customerEmail: ticketData.customerEmail,
            customerAge: ticketData.customerAge,
            customerGender: ticketData.customerGender,
            product: ticketData.product,
            satisfactionRating: ticketData.satisfactionRating
        };

        const mysqlQuery = 'INSERT INTO tickets SET ?';
        mysqlConnection.query(mysqlQuery, mysqlTicketData, async (mysqlErr, mysqlResults) => {
            if (mysqlErr) {
                console.error(mysqlErr);
                res.status(500).send('Error adding ticket to MySQL');
            } else {
                console.log("Ticket added successfully to MySQL");
                
                // save ticket to MongoDB
                const db = mongoose.connection.useDb('CS4440');
                const Ticket = db.model('Ticket', ticketSchema, 'tickets');

                // save the ticket to the MongoDB collection
                const ticket = new Ticket(ticketData);
                await ticket.save();
                
                console.log("Ticket added successfully to MongoDB");

                res.status(200).send('Ticket added successfully');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding ticket');
    }
});


// Compound Indexing
app.get('/createIndex', async (req, res) => {
    try {
        // Access the "CS4440" database and the "tickets" collection
        const db = mongoose.connection.useDb('CS4440');
        const Ticket = db.model('Ticket', ticketSchema, 'tickets');

        // Get the fields from the request query parameters
        const field1 = req.query.field1;
        const field2 = req.query.field2;

        // Create a compound index on the specified fields
        const index = {};
        index[field1] = 1;
        index[field2] = 1;
        await Ticket.createIndexes(index);

        // Fetch all tickets
        const tickets = await Ticket.find({ ticketID: field1, ticketSubject: field2 });

        res.status(200).json(tickets);
        console.log("Index created successfully and tickets fetched");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating index and fetching tickets');
}
});


// Ticket Prioritization
app.get('/tickets_prioritization', async (req, res) => {
    try {
        // step 1 - filter for open tickets
        const db = mongoose.connection.useDb('CS4440');
        const Ticket = db.model('Ticket', ticketSchema, 'tickets');
        const openMongoTickets = await Ticket.find({ ticketStatus: 'Open'});
        
        openMongoTickets.sort((b,a) => b.dateOfPurchase - a.dateOfPurchase);

        // step 2 - sort by ticket priority
        const prioritizedTickets = openMongoTickets.sort((a, b) => {
          const priorityOrder = ['Low','Medium','High','Critical'];
          return priorityOrder.indexOf(b.ticketPriority) - priorityOrder.indexOf(a.ticketPriority);
        });

        // step 3 - sort by date of purchase

  
        // step 4 - respond with sorted tickets
        const outputTickets = prioritizedTickets.map(ticket => ({
            ticketID: ticket.ticketID,
            dateOfPurchase: ticket.dateOfPurchase,
            ticketType: ticket.ticketType,
            ticketSubject: ticket.ticketSubject,
            ticketDescription: ticket.ticketDescription,
            ticketStatus: ticket.ticketStatus,
            ticketPriority: ticket.ticketPriority,
            ticketChannel: ticket.ticketChannel,
            firstResponseTime: ticket.firstResponseTime,
            timeToResolution: ticket.timeToResolution
        }));
        res.status(200).json(outputTickets);
        console.log('Ticket prioritization successful.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error prioritizing customers');
    }
  });
