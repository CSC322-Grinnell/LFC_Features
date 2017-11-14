Rails.application.routes.draw do
  resources :farms
  root :to => redirect('/farms')
  get 'farms/jsonData'
  get 'farms/show'

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        get '/' => 'farms#jsonData'
      end
    end
  end

end
