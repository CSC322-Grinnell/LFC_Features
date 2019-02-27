operation_list = ["Egg", "Beef", "Fruit", "Vegetables", "Dairy", "Pork", "Chicken", "Turkey", "Lamb", "Duck", "Agritourism", "Hay", "Row crop", "Food pantry"]

operation_list.each do |food|
    Operation.create!(food: food)
end