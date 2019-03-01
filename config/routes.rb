Rails.application.routes.draw do

  root 'static_pages#view2'
  get '/map', to: 'static_pages#map'
<<<<<<< HEAD
  get '/recipes', to: 'static_pages#recipes'
  get '/farmer', to: 'static_pages#farmer'
  get '/calendar', to: 'static_pages#calendar'
# to here
=======
>>>>>>> a0374e1555f52c018911e8656af5ff5454775ba2

  devise_for :farms, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :farms

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        post '/' => 'farms#farm_json'

      end
    end
  end

  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        post '/farm_by_operation' => 'farms#farm_by_operation'
      end
    end
  end

  get 'farms/review'
  get 'farms/approved'
  get '/signup', to: 'farms#new'
  
  post '/farms/new', to: 'farms#create'
  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

end