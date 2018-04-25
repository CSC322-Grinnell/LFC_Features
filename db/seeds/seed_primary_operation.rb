
operation_list = ["fruit", "vegetables", "dairy", "pork", "chicken", "turkey", "lamb", "duck", "agritourism", "hay", "row crop", "food pantry"]

operation_list.each do |food|
    PrimaryOperation.create!(food: food)
end