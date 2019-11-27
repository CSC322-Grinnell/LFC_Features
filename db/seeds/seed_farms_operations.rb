farms_operations_list = [["farm_id": 2, "operation_id": 3],
["farm_id": 3, "operation_id": 10],
["farm_id": 4, "operation_id": 9],
["farm_id": 5, "operation_id": 8],
["farm_id": 2, "operation_id": 6]]

farms_operations.each do |farm_id, farms_operations|
  FarmsOperations.create!( farm_id: farm_id, farms_operations: farms_operations )
end
