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

farm_list = [
    ["Uncle Bill's Farm", "123 Broad St.", "unclebill.com", "515123456", \
     "Uncle Bill's Farm", "uncle_bill_farm", "uncle_bill_farm", true, \
     "unclebill@example.com", "ubpassword", "ubpassword", 0],
    ["Uncle Joe's Farm", "1205 Main St.", "unclejoe.com", "641234123", "", \
     "uncle_joe_farm", "", true, "unclejoe@example.com", "ujpassword", \
     "ujpassword", 0],
    ["Aunt Maria's Farm", "1641 Park St.", "auntmaria.com", "5150009999", \
     "Aunt Maria's Farm", "auntmaria_farm", "auntmaria_farm", false, \
     "auntmaria@example.com", "awpassword", "awpassword", 0],
     ["Aunt Maria's Farm", "1641 Park St.", "auntmaria.com", "5150009999", \
     "Aunt Maria's Farm", "auntmaria_farm", "auntmaria_farm", true, \
     "auntmaria1@example.com", "awpassword", "awpassword", 0]

]

farm_list.each do |name, address, url, phone, facebook, instagram, twitter, approved, email, password, password_confirmation|
  Farm.create!( name: name, address: address, url: url, phone: phone,
                facebook: facebook, instagram: instagram, twitter: twitter,
                approved: approved, email: email, password: password,
                password_confirmation: password_confirmation)
end
