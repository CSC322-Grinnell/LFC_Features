Rails.application.routes.draw do

  resources :farms

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        post '/' => 'farms#farm_json'
      end
    end
  end

  root :to => redirect('/farms')
  get 'farms/review'
  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

end
