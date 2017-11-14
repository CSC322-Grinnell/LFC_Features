Rails.application.routes.draw do
  resources :farms
  root :to => redirect('/farms')
  get 'farms/review'

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        get '/' => 'farms#apiJson'
      end
    end
  end

end
