# Documentation for Running the Email Inspirational Quote Project


## Project Overview

This project is designed to send a random inspirational quote via email. It uses Nodemailer to send emails through a Brevo SMTP server and includes functionality for reading quotes from a collection and selecting one at random for sending.

### Prerequisites

Before you can run the project, make sure you have the following installed:

    •	Node.js (v14 or later)
    •	An SMTP server (Brevo)
    •	A valid email account and SMTP credentials for sending emails

### Project Structure

📂 email-inspirational-quote/
├── 📄 quotes.json – Contains the JSON object of inspirational quotes
├── 📄 email-service.js – Handles sending emails via Nodemailer
├── 📄 smtp_secrets.sh – Stores your SMTP credentials (environment variables)
├── 📄 email-random.js – Main entry point to send the email
├── 📄 package.json – Project dependencies and scripts
└── 📄 README.md – Documentation file

### Steps to Run the Project

#### 1. Clone the Repository

First, clone the repository to your local machine.

```
git clone https://github.com/yourusername/email-inspirational-quote.git
cd email-inspirational-quote
```

#### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```
npm install
```

Dependencies include:

    •	nodemailer: For sending emails.
    •	dotenv: For loading environment variables from a file (if preferred).

#### 3. Set Up SMTP Credentials

The project uses environment variables for SMTP credentials stored in a file named smtp_secrets.sh.

    •	Create a file called smtp_secrets.sh in the root of your project directory.
    •	Add your SMTP settings:

```
#!/bin/sh
export SMTP_SERVER=smtp-relay.brevo.com # Replace with your SMTP server
export SMTP_PORT=587 # SMTP port (default for Brevo is 587)
export SMTP_LOGIN=your-email@example.com # Replace with your SMTP login email
export SMTP_PASS=your-smtp-password # Replace with your SMTP password
```

#### 4. Modify Email Sender

The default recipient is set to user@umuzi.org in smtp_secrets.sh. To change the sender, modify the SMTP_EMAIL field to your own email.

#### 5. Source the smtp_secrets.sh File

Before running the project, source the smtp_secrets.sh file to load your SMTP credentials as environment variables:

```
source ./smtp_secrets.sh
```

#### 6. Run the Project

You can now run the project using Node.js. It will fetch a random quote and send it to the email specified in the code.

```
npm run send_inspiration someone@email.com  # replace with the receiving email
```

If everything is configured correctly, the email will be sent and a success message will appear in the console.

#### License

This project is open-source and licensed under the MIT License.
