selling_method_list = ["CSA", "Farmers' Market", "Wholesale", "Grocery Stores", "Grinnell Area Local Food Source", "On-Farm", "Iowa Food Coop", "Institutions", "Restaurants"]

selling_method_list.each do |method|
    SellingMethod.create!(sell_method: method)
end