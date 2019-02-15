# LFC_Features
### Local Food Connection Application

LFC is a Grinnell farm directory service. It contains basic information of farms that are connected to Local Food Connection Organization. The goal of the app is to allow user to easily search for Grinnell's sustainable food system.

You can obtain the source with the following command:
```shell
git clone https://github.com/CSC322-Grinnell/LFC_Features.git
```

## Authors and Contributors

### Current Builds
- [Yuya Kawakami](https://github.com/yuya737)
- [Hongyuan Zhang]()
- [Martin Chamberlin]()
- [Albert Ford]()
- [Priyanka Dangol]()


### Previous Builds

- [Joshua Cussen](https://github.com/nomadicTree)
- [Siyu Zhang](https://github.com/zhangsiyu1103)
- [Nolan Schoenle](https://github.com/NSchoenle)
- [Hoang Cao]()
- [Ryan Rosol]()
- [Linh Pham](https://github.com/linhpha)
- [Pratik Karki](https://github.com/karkipra)
- [Elise Brod](https://github.com/brodelis)
- [James Msekela]()
- [Sara Marku](https://github.com/saramarku)

### Project Structure

The view for the main page is in /app/views/ui/view2.html.erb.
The CSS and JavaScript files are in /app/assets/javascripts/ and /app/assets/stylesheets/ respectively.
All images and icons are stored in /app/assets/images.
The admin page is contained in /app/admin folder.
/app/admin/farm.rb generates the UI of the Edit farm from admin page.

### How to build

The project can be installed on Cloud 9.
The Heroku website for the previous group's work on the project is http://localfoodsconnection.herokuapp.com
We do not have access to this Heroku.
You need to make a new Heroku to deploy the site.

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
rake db:seed:seed_market
```

After successfully seeding the database, you can start the app and get to the main page.
Note: In order to check if the the seeding of farms was successful in the Rails console type: Farm.count and the result should yield 7. The information for all farms will be in the admin page. You can go to this page by clicking the Sign In link of the main website and the credentials of the admin are:
```
Email: admin@example.com
Password: password
```
After successfully signing in to the admin page you can navigate to look and edit the farms currently in the database. You can add Operations, Selling Methods, Primary Operation and Growing Methods for each farm and the map on the main page will update accordingly.

To Sign In as a registered farm, you can would use "password" for passwords


### Current state, future tasks, and tips
Please see `Instructions and Resources for the Next Team.docx`, also located in the Microsoft Teams Team for this project.


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
