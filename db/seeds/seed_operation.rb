operation_list = ["fruit", "vegetables", "dairy", "pork", "chicken", "turkey", "lamb", "duck", "agritourism", "hay", "row crop"]

operation_list.each do |food|
    Operation.create!(food: food)
end