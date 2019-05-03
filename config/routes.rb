Rails.application.routes.draw do

  root 'static_pages#home'
  get '/map', to: 'static_pages#map'
  get '/calendar', to: 'static_pages#calendar'

  devise_for :farms, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  get 'farms/review', to: 'farms#review'
  # the approved page html currently doesn't exist. The approved page is from an
  # earlier group, and it isn't clear what it should do or why it should exist
  # outside of activeadmin
  get 'farms/approved', to: 'farms#approved'
  resources :farms

  # The v1 APIs don't seem to be used--testing needed

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        post '/' => 'farms#farm_json'
        post '/farm_by_operation' => 'farms#farm_by_operation'
      end
    end
  end
  
  scope '/api' do
    scope '/v2' do
      get '/farms', to: 'farms#farm_json'
    end
  end

  get '/signup', to: 'farms#new'
  
  #post '/farms/new', to: 'farms#create'
  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

end