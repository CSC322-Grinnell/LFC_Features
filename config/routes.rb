Rails.application.routes.draw do
  get 'farms/farm_json', to: 'farms#farm_json', as: :farm_json

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        get '/' => 'farms#farm_json'
      end
    end
  end

  resources :farms
  
  get 'farms/review'
  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

  root :to => redirect('/farms')
end
