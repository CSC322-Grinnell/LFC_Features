# LFC_Features
### Local Food Connection Application

LFC is a Grinnell farm directory service. It contains basic information of farms that are connected to Local Food Connection Organization. The goal of the app is to allow user to easily search for Grinnell's sustainable food system.

You can obtain the source with the following command:
```shell
git clone https://github.com/CSC322-Grinnell/LFC_Features.git
```

## Authors and Contributors

### Current Builds

- [Joshua Cussen](https://github.com/nomadicTree)
- [Siyu Zhang](https://github.com/zhangsiyu1103)
- [Nolan Schoenle]()
- [Hoang Cao]()
- [Ryan Rosol]()

### Previous Builds

- Matt Murphy
- Thu Nguyen
- Minh Tran
- Alexandar Hrusanov
- Nick Roberson
- Sara Marku
- Linh Pham
- Pratik Karki
- Elise Brod
- James Msekela


### Project Structure

The UI for the main page is in /app/views/ui/home.html.erb. The CSS and JS are in /app/assets/javascripts/application.js and /app/assets/stylesheets/application.css. All images and icons are stored in /app/assets/icon folder. The admin page is contained in /app/admin folder. /app/admin/farm.rb generates the UI of the Edit farm from admin page.

### How to build

The project can be installed on Cloud 9. The current Heroku website for the project is http://localfoodsconnection.herokuapp.com

Next, to set up the database, run the commands:

```
bundle install
rake db:create
rake db:migrate
rake db:seed
rake db:seed:seed_farm
rake db:seed:seed_growing_method
rake db:seed:seed_selling_method
rake db:seed:seed_operation
```

After successfully seeding the database, you can start the app and get to the main page. 
Note: In order to check if the the seeding of farms was successful in the Rails console type: Farm.count and the result should yield 7. The information for all farms will be in the admin page. You can go to this page by clicking the Sign In link of the main website and the credentials of the admin are:
```
Email: admin@example.com
Password: password
```
After successfully signing in to the admin page you can navigate to look and edit the farms currently in the database. You can add Operations, Selling Methods, Primary Operation and Growing Methods for each farm and the map on the main page will update accordingly. 

To Sign In as a registered farm, you can find the credentials of the registered farms in the /db/seed/seed_farm. 


### Current state
- The program can be run from Cloud 9 and deployable to Heroku
- Given a list of farms and addresses, we can search for a farm by name or address and have it show up on the map
- Each farm has a “primary operation” that determines which icon shows up on the map.
- If you click on a combination of checkboxes for the farm search, you get a narrowed down set of farms that have at least one of the checked properties
- Using the Edamam API, we can search for a recipe by title or ingredients used (“peas”, “steak”). The filtering by dietary restrictions work but it returned the same result. (Might need more research into the API documentation)
- If you click on a combination of checkboxes for the recipe search, you get a narrowed down list of recipes that match those dietary restrictions.
You can create new farm accounts and fill out the form to say what “operations” (this means anything that they produce or do) they have.
- You can log in as an admin and edit the farms in the database.

### Tasks for the future

- Finish making a way for farmers to sign up. It will probably need some information depending on what Melissa wants (“Upload your logo”, “Tell us a little bit about your farm”, etc.)
- When a farmer signs up for an account, Melissa should get an email that asks for admin approval (to avoid spam farms).
- Farms/farmers should be sent an email once a year asking them to update their information if anything has changed (maybe each year starting from when they got admin approval).
- Augment the search function to include autocomplete suggestions. This is mainly for the farm search, not the recipe search.
- Add the ability to filter recipes based on amount of time and number of ingredients. Read the Edamam API documentation to see how to do this. You can use the current recipe filtering as an example of how to filter these. Number of ingredients should be “X or fewer,” and time should be “No more than Xhrs/min”
- On the pop-up card for each farm that appears on the right side, add slideshows or videos provided by Melissa. She may decide she doesn’t want this feature.
- Melissa had an idea about making the farm cards on the right be a rotating carousel style, so that one farm isn’t favored over another. You could try to make this happen, or suggest an alternative. 
- You could consider adding Farmer’s Markets and Farm's Events to the types of resources/farms, and then include their dates/times
- The end goal is for this project to look very similar to the Local Foods website. There will be a link to the project on the Local Foods site.

### Other tips
- Make sure you all are using GitHub properly at the start of your project
- Make sure everyone can run the project during week 1 of work
- Talk with your mentor! (Alex was our mentor) They can help with coding problems, team structure, how to work with a client, and more.


### Relevant links

- https://www.localfoodsconnection.com/
- https://developer.edamam.com/edamam-docs-recipe-api
- https://www.dsmpartnership.com/desmoinesfarmersmarket/
- https://www.grinnell.edu/academics/centers/prairie-studies/guides-publications


## License
```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
