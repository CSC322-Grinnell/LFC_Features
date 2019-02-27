
operation_list = ["Fruit", "Vegetables", "Dairy", "Pork", "Chicken", "Turkey", "Lamb", "Duck", "Agritourism", "Hay", "Row crop", "Food pantry"]

operation_list.each do |food|
    PrimaryOperation.create!(food: food)
end