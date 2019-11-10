# README

## Description
Shipd is a web app with a React & Redux frontend and Ruby on Rails API backend.  Shipd can be used for your small ebay business or your mail & printing business to track and report over the packages that you have prepared for shipment.

## Install Instructions
After forking and cloning the repo to your local machine, make sure you have `cd`ed into the `shipd` folder.

If you haven't already, run `bundle install`

In a separate terminal window, fire up the Rails server using port 3001:
`rails s -p 3001`

This will start the Rails backend on your machine at `localhost:3001`

Next, we will need to start the frontend server.  Navigate to the `client` directory (inside of the `shipd` directory), then run `yarn start`.

This should automatically open a browser window and show you the Shipd homepage.  If not, manually open your internet browser (Chrome recommended), then type in the following in the address bar:  `localhost:3000`.  You should now be presented with the Shipd app.

## Database Creation
You may need to create the database first if you encounter issues after following the steps above.  

Use `Ctrl - C` on the rails server terminal to stop the rails server.  

Next, run `rails db:create && rails db:migrate`.  This should set you up with a squeaky clean new database.  

Go ahead and restart the rails server by typing in: `rails s -p 3001` and you should be good to use the app!

## Contributors Guide
Please reach out to me at `jrodden1.github@gmail.com` if you'd like to contribute to this repo. 

## License
MIT License - See the License file for more details. 