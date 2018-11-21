Rails.application.routes.draw do

  get 'ui/view2'

  Rails.application.routes.draw do
  root 'ui#view2'
  end

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


  root :to => redirect('/admin')

  get 'farms/review' #This seems to be a globally acessible page.
  get 'farms/submission'
  get 'farms/approved'

  post 'approve/(:item_id)', to: 'farms#approve', as: :approve
  post 'reject/(:item_id)', to: "farms#reject", as: :reject

end
