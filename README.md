To run this app locally, follow these steps.

- fork and clone the app down to your local environment
- run npm install to install dependencies
- To start of the backend server enter 'npm run server' into your terminal
   * I've added the ports already so need to worry about things running on the same port. :)
- To run the frontend enter 'npm start' into your terminal

This app:
1. Allows a user to sign up with an email and password
2. Only allows authenticated users to perform CRUD operations on Owners and Land Holdings
 - Deletes an Owner and all related Land Holdings
3. Prevents users from creating Owners with the same Name and Address of an existing
Owner