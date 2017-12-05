growing_method_list = ["Certified Natural Grown", "USDA Certified Organic", "100% Grass Fed", "Grass Finished", "Non-GMO", "Regenerative Organic Certified", "Integrated Pest Management", "Pasture Raised", "Corn Fed", "Conventional"]
growing_method_list.each do |method|
    GrowingMethod.create!(grow_method: method)
end