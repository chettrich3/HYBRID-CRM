# HYBRID-CRM
Names: Taylor Doering, Charlotte Hettrich, Amanda Lee, Joanita Nandaula

## File Descriptions
### backend
#### everything.js
- Contains all our code on running the server and our functionalities: CRUD, Ticket Prioritization, and Compound Indexing.
#### node_modules
- Generated by running "npm install" in the terminal.
#### package-lock.json
- Automatically intalled based on "npm install".
#### package.json
- Automatically intalled based on "npm install".
#### visualization.html
- The visualization funtionality file.

### frontend
#### node_modules
- Generated by running "npm install" in the terminal.
#### package-lock.json
- Automatically intalled based on "npm install".
#### package.json
- Automatically intalled based on "npm install".
#### public
- Automatically intalled based on "npm install".
#### src
- **components**
  - Contains the actual code files created to update the GUI.
- **services**
  - Contains the TicketService.js file which handles requests and responses between the frontend and backend related to ticket handling.
 
### Data Files
#### customer_support_tickets.csv
- CSV file with all the data.
#### customer_support_tickets_mongo.csv
- CSV file with just the data included in MongoDB.
#### customer_support_tickets_sql.csv
- CSV file with just the data included in MySQL.

## Loading the Data
- We used the Customer Support Ticket Dataset from Kaggle.
  - https://www.kaggle.com/datasets/suraj520/customer-support-ticket-dataset
- **Data Files**
  - customer_support_tickets.csv
  - customer_support_tickets_sql.csv
  - customer_support_tickets_mongo.csv
- **Connecting to the Servers**
  - MySQL
    - Download MySQL Workbench 8.0 and remember your password for the localhost instance, usually 3306.
      - https://www.mysql.com/products/workbench/
    - Create a schema with the name "support_tickets".
    - In the new schema, create a table with the name "tickets".
    - Right click on the table and click on "Table Data Import Wizard".
      - Navigate to the file "customer_support_tickets_sql.csv" and click Next.
      - Make sure the delimiter is a comma and the data types are correct based on their name.
    - Follow the prompts by clicking Next.
    - Once completed, it should show 8,469 records imported.
    - Input the following in the "everything.js" file:
      - host: 'localhost'
      - user: 'root'
      - password: 'your_password'
      - database: 'support_ticket'
    - Once you run the "everything.js" file in the terminal by typing "node everything.js" you should get back:
      - Server running on port 3000
      - Connected to MySQL database
  - MongoDB
    - Create an account for MongoDB Atlas, and it should prompt you to create a computing cluster, and it should be "Cluster0".
      - https://www.mongodb.com/
    - To connect to the server click on Database under DEPLOYMENT on the far left.
    - Under "Cluster0" click on Connect.
    - Click on Drivers.
      - The Driver should be Node.js.
      - Make sure to install the driver by running "npm install mongodb".
      - Copy the connection string.
    - Paste the connection string into the "everything.js" file replacing the username and password with the username and password of a database user.
    - To create a Database User:
      - Navigate to the homepage of MongoDB Atlas.
      - Under SECURITY click Database Access.
      - Click ADD NEW DATABASE USER.
      - Follow the prompts and use Password as the Authentication Method.
    - To see the data and upload the data download MongoDB Compass.
      - Connect to MongoDB compass the same way with the connection string except instead of clicking Drivers, click on Compass.
      - Create a new database with the name "CS4440" by pressing the "+" button next to Databases, and you can generate a new collection by providing the name "tickets". Otherwise, hover over the new CS4440 database and click on the "+" to create a new collection and name it "tickets".
      - To upload the data, click on the tickets collection and click on ADD DATA and then click on Import JSON or CSV file.
      - Navigate to the "customer_support_tickets_mongo.csv" file and make sure the delimiter is a comma and change the data types of the date/time fields to Date and click Import.
      - 8,469 records should import.
    - Once you run the "everything.js" file in the terminal by typing "node everything.js" you should get back:
      - Connected to MongoDB database
- **Columns and Their Names**
  - MySQL
    - Ticket ID: ticketID
    - Customer Name: customerName
    - Customer Email: customerEmail
    - Customer Age: customerAge
    - Customer Gender: customerGender
    - Product Purchased: product
  - MongoDB
    - Date of Purchase: dateOfPurchase
    - Ticket Type: ticketType
    - Ticket Subject: ticketSubject
    - Ticket Description: ticketDescription
    - Ticket Status: ticketStatus
    - Ticket Priority: ticketPriority
    - Ticket Channel: ticketChannel
    - First Response Time: firstResponseTime
    - Time To Resolution: timeToResolution

## Third-Party Libraries
These are the libraries used in our project the command lines to install them. Make sure to run these commands in your project directory with the 'package.json' file.
### backend
These commands must be run inside the backend directory.
- Express: npm install express
- MySQL: npm install mysql
- Mongoose: npm install mongoose
- Body Parser: npm install body-parser
- CORS: npm install cors

### frontend
This must be run inside the frontend directory.
- To install all packages needed: npm install

## How to Run the Backend
### Running "everything.js" Through the Terminal
- Open two terminals:
  - In one terminal, run "everything.js" by typing "node everything.js".
  - In the second terminal, you will be running the curl commands.

#### CRUD Functionality
Below are examples of curls, the fields can be changed. In the first terminal where the server is shown as running, based on which curl is run the console will have information about what function was selected. 
- **Create a Ticket**
  - To create a ticket type the following curl:
    - curl -X POST -H "Content-Type: application/json" -d "{\"customerName\": \"John Doe\", \"customerEmail\": \"john.doe@example.com\", \"customerAge\": 30, \"customerGender\": \"Male\", \"product\": \"Product X\", \"satisfactionRating\": 5, \"ticketType\": \"Technical Issue\", \"ticketSubject\": \"Issue with Product X\", \"ticketDescription\": \"I am experiencing some technical difficulties with Product X. It's not functioning as expected.\", \"ticketStatus\": \"Open\", \"ticketPriority\": \"High\", \"ticketChannel\": \"Email\", \"firstResponseTime\": \"2024-04-16T12:00:00Z\", \"timeToResolution\": \"2024-04-17T12:00:00Z\"}" http://localhost:3000/tickets
- **Read a Ticket**
  - To read a specific ticket, use the following curl:
    - curl -X GET http://localhost:3000/tickets/<ticketID\>
  - To read all tickets, use either curl:
    - curl -X GET http://localhost:3000/tickets
    - curl -X GET http://localhost:3000/tickets/all
- **Update a Ticket**
  - To update a ticket, type the following curl:
    - curl -X PUT \
        -H "Content-Type: application/json" \
        -d '{
            "ticketID": 123, // Replace with the actual ticket ID
            "productPurchased": "Updated Product A",
            "dateOfPurchase": "2024-04-16",
            "ticketType": "Updated Issue",
            "ticketSubject": "Updated Subject of the ticket",
            "ticketDescription": "Updated Description of the ticket",
            "ticketStatus": "Updated Open",
            "ticketPriority": "Updated High",
            "ticketChannel": "Updated Web",
            "firstResponseTime": "2024-04-16T10:00:00.000Z",
            "timeToResolution": "2024-04-17T10:00:00.000Z"
        }' \
        http://localhost:3000/tickets/<ticketID\>
- **Delete a Ticket**
  - To delete a ticket, type the following curl:
    - curl -X DELETE http://localhost:3000/tickets/<ticketID>

#### Ticket Prioritization
- Ticket Prioritization sorts open tickets first by ticketPriority and then by the dateOfPurchase.
- Run the following curl command:
  - curl http://localhost:3000/tickets_prioritization
- The output will be the sorted tickets in JSON format.

#### Compound Indexing
- Compound indexing gives the user the ability to query the data based on two fields.
- This is an example where the ticketID is 3 and the ticketSubject is "Network problem".
  - To put a space, use "%20" as shown in the curl.
- Run the following curl below:
  - curl -X GET 'http://localhost:3000/createIndex?field1=3&field2=Network%20problem'
- The output will be the resulting ticket in JSON format based on the query output.

#### Real-Time Analytics
- Run "npm install chart.js" in the terminal.
- Once the server is running, right click on the "visualization.html" and open it in a browser.
- It should populate a graph showing the open tickets colored by the ticketStatus attribute.

## Running the GUI
### Through the Terminal
- Make sure all the dependencies and libraries have been properly installed
- Open two terminals
  - One for running the backend
    - The backend server must be started before running the frontend
    - Once you're in the backend directory, run the command 'node everything.js'
    - Wait until 'Connected to MySQL database' and 'Connected to MongoDB database' have been printed out in the terminal
  - One for running the frontend
    - Once you're in the frontend folder directory, run the command 'npm start'
### GUI Demo
[![YouTube Video](https://img.youtube.com/vi/Yy1EhLsPoAVw&ab_channel=AmandaLee/0.jpg)](https://www.youtube.com/watch?v=y1EhLsPoAVw&ab_channel=AmandaLee)

## Figma
Below is the link to the Figma that we created to portray a potential future state of the CRM.
https://www.figma.com/file/ZNb2dgNlMoFKO4AdTQz7o7/CS-4440-Project?type=design&node-id=0-1&mode=design
