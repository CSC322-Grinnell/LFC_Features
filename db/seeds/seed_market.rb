market_list = ["Grinnell-Thursday", "Grinnell-Saturday", "Des Moines Downtown-Saturday", "Cedar Rapids Downtown-Select Saturdays", "Iowa City-Saturday", "Tama-Toledo", "Brooklyn"]

market_list.each do |market|
    Market.create!(location: market)
end