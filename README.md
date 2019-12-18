# LFC_Features
### Local Foods Connection Application

LFC is a Grinnell farm directory service. It contains basic information of farms that are connected to Local Food Connection Organization. The goal of the app is to allow user to easily search for Grinnell's sustainable food system.  The temp staging app is at: https://localfoodssearch.herokuapp.com/

You can obtain the source with the following command:
```shell
git clone https://github.com/CSC322-Grinnell/LFC_Features.git
```

## Authors and Contributors

### Current Builds
- [Nate Williams](https://github.com/NateWilliams2)
- [Shuyi Qi](https://github.com/qishuyi)
- [Carter Markegard](https://github.com/carterMarkegard)
- [James Msekela](https://github.com/jamesalexmsekela)
- [Liam Li](https://github.com/liamlhy)


### Previous Builds

- [Yuya Kawakami](https://github.com/yuya737)
- [Hongyuan Zhang]()
- [Martin Chamberlin]()
- [Albert Ford]()
- [Priyanka Dangol]()
- [Joshua Cussen](https://github.com/nomadicTree)
- [Siyu Zhang](https://github.com/zhangsiyu1103)
- [Nolan Schoenle](https://github.com/NSchoenle)
- [Hoang Cao]()
- [Ryan Rosol]()
- [Linh Pham](https://github.com/linhpha)
- [Pratik Karki](https://github.com/karkipra)
- [Elise Brod](https://github.com/brodelis)
- [James Msekela](https://github.com/jamesalexmsekela)
- [Sara Marku](https://github.com/saramarku)

### Project Structure

The view for the main page is in /app/views/static_pages/home.html.erb.
The CSS and JavaScript files are in /app/assets/javascripts/ and /app/assets/stylesheets/ respectively.
All images and icons are stored in /app/assets/images.
The admin page is contained in /app/admin folder.
/app/admin/farm.rb generates the UI of the Edit farm from admin page.

### How to build

The project can be run locally on a server or pushed to a heroku application.

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
rake db:seed:seed_events
```
Alternatively seed the database with one command:
```
rake db:seed db:seed:seed_farm db:seed:seed_growing_method db:seed:seed_selling_method db:seed:seed_operation db:seed:seed_market db:seed:seed_events
```

After successfully seeding the database, you can start the app and get to the main page.
Note: In order to check if the the seeding of farms was successful in the Rails console (open by calling `rails console` on your terminal) type: Farm.count and the result should yield 7. The information for all farms will be in the admin page. You can go to this page by clicking the Sign In link of the main website and the credentials of the admin are:
```
Email: admin@example.com
Password: password
```
After successfully signing in to the admin page you can navigate to look and edit the farms currently in the database. You can add Operations, Selling Methods, Primary Operations and Growing Methods for each farm and the map on the main page will update accordingly. You can also edit the set of valid Operations, Selling Methods, Primary Operations, and Growing Methods. You can also view and edit any Events displayed on the Calendar page.

To Sign In as a registered farm, you can would use "password" for passwords


### Current state, future tasks, and tips
Please see `Final Team Report.txt`.


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
