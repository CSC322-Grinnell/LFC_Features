operation_list = ["egg", "beef", "fruit", "vegetables", "dairy", "pork", "chicken", "turkey", "lamb", "duck", "agritourism", "hay", "row crop", "food pantry"]

operation_list.each do |food|
    Operation.create!(food: food)
end