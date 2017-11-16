Rails.application.routes.draw do
  resources :farms
  root :to => redirect('/farms')
  get 'farms/review'
  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        get '/' => 'farms#apiJson'
      end
    end
  end

end
