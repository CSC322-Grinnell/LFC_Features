# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Farm.create(email: 'admin@example.com', password: 'password',
             password_confirmation: 'password', role: 1) 
            # if Rails.env.development?

# farm_list = [
#     ["Uncle Bill's Farm", "123 Broad St.", "unclebill.com", "515123456", \
#      "Uncle Bill's Farm", "uncle_bill_farm", "uncle_bill_farm", true, \
#      "unclebill@example.com", "ubpassword", "ubpassword", 0],
#     ["Uncle Joe's Farm", "1205 Main St.", "unclejoe.com", "641234123", "", \
#      "uncle_joe_farm", "", true, "unclejoe@example.com", "ujpassword", \
#      "ujpassword", 0],
#     ["Aunt Maria's Farm", "1641 Park St.", "auntmaria.com", "5150009999", \
#      "Aunt Maria's Farm", "auntmaria_farm", "auntmaria_farm", false, \
#      "auntmaria@example.com", "awpassword", "awpassword", 0],
#      ["Aunt Maria's Farm", "1641 Park St.", "auntmaria.com", "5150009999", \
#      "Aunt Maria's Farm", "auntmaria_farm", "auntmaria_farm", true, \
#      "auntmaria1@example.com", "awpassword", "awpassword", 0]

# ]

# farm_list.each do |name, address, url, phone, facebook, instagram, twitter, approved, email, password, password_confirmation|
#   Farm.create!( name: name, address: address, url: url, phone: phone,
#                 facebook: facebook, instagram: instagram, twitter: twitter,
#                 approved: approved, email: email, password: password,
#                 password_confirmation: password_confirmation)
# end

farm_list = [
["Compass Plant CSA", "2039 N. Penrose Street. Grinnell, IA 50112", "",  \
<<<<<<< HEAD
  "641-990-6832",  "ladunham@wildblue.net", "cspassword", "cspassword", true, 
  "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/5a61f813f9619a8d2c044cf6/1516369944922/csa.jpg?format=500w"],
["Doty Angus Cattle Co", "304 Chapman Street, Malcom, IA", \
    "www.beefforyourfreezer.com", "641-528-4049",  "dotyangus@yahoo.com", 
    "dapassword", "dapassword", true, "http://www.beefforyourfreezer.com/beef/wp-content/uploads/2016/04/doty_fam_front_cows.jpg"],
["Grinnell Heritage Farm, Inc.", "1933 Penrose St. Grinnell, IA 50112", \
    "www.grinnellheritagefarm.com", "641-990-0018",  \
    "grinnellheritagefarm@gmail.com", "ghpassword","ghpassword", true,
    "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/5a5cfed7ec212d764f175bc0/1516046666276/22405409_10159344143265177_674221442246360347_n.jpg?format=500w"],
["Middle Way Farm", "3633 Hwy. 146, Grinnell, IA 50112", \
    "www.middlewayfarm.com", "641-821-0753",  \
    "middlewayfarmer@gmail.com", "mypassword", "mypassword", true,
    "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/59a580a503596ef2c225d1ff/1504018601048/middle.jpg?format=500w"],
["Olson Garden Market", "5809 Hwy. T38N, Grinnell, IA 50112", \
    "", "641-990-6605",  \
    "kerriolson56@gmail.com", "ogpassword", "ogpassword", true,
    "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/59a5816237c5810f8dc3f5c2/1504018789539/olson.jpg?format=500w"],
["Uncle Bill’s Farm", "244 400th Ave Grinnell, IA 50112", \
    "www.unclebillsfarm.com", "641-236-7043",  \
    "unclebillsfarm@hotmail.com", "ubpassword", "ubpassword", true,
    "http://www.unclebillsfarm.com/images/bill.png"]]



farm_list.each do |name, address, url, phone,  email,  password, password_confirmation, approved, image_url|
  Farm.create!( name: name, address: address, url: url, phone: phone,
                 email: email,  password: password, password_confirmation: password_confirmation, approved: approved, image_url: image_url)
=======
  "641-990-6832",  "ladunham@wildblue.net", "cspassword", "cspassword", "", true ],
["Doty Angus Cattle Co1", "304 Chapman Street, Malcom, IA", \
    "www.beefforyourfreezer.com", "641-528-4049",  "dotyangus@yahoo.com", "dapassword", "dapassword", "", true],
["Grinnell Heritage Farm1, Inc.", "1933 Penrose St. Grinnell, IA 50112", \
    "www.grinnellheritagefarm.com", "641-990-0018",  \
    "grinnellheritagefarm@gmail.com", "ghpassword","ghpassword", 
    "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/5a5cfed7ec212d764f175bc0/1516046666276/22405409_10159344143265177_674221442246360347_n.jpg?format=500w", 
    true],
["Middle Way Farm", "3633 Hwy. 146, Grinnell, IA 50112", \
    "www.middlewayfarm.com", "641-821-0753",  \
    "middlewayfarmer@gmail.com", "mypassword", "mypassword", "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/59a580a503596ef2c225d1ff/1504018601048/middle.jpg?format=500w", true],
["Olson Garden Market", "5809 Hwy. T38N, Grinnell, IA 50112", \
    "", "641-990-6605",  \
    "kerriolson56@gmail.com", "ogpassword", "ogpassword", "https://static1.squarespace.com/static/5964ed38414fb5997eb39f05/t/59a5816237c5810f8dc3f5c2/1504018789539/olson.jpg?format=500w", true],
["Uncle Bill’s Farm", "244 400th Ave Grinnell, IA 50112", \
    "www.unclebillsfarm.com", "641-236-7043",  \
    "unclebillsfarm@hotmail.com", "ubpassword", "ubpassword", "", true]]



farm_list.each do |name, address, url, phone,  email,  password, password_confirmation, image_url, approved|
  Farm.create!( name: name, address: address, url: url, phone: phone,
                 email: email,  password: password, password_confirmation: password_confirmation, image_url: image_url, approved: approved, )
>>>>>>> martin
end
