Rails.application.routes.draw do
  resources :farms
  root :to => redirect('/farms')
  get 'farms/review'
  post 'approve' => 'farms#approve', as: :approve
  post 'reject' => 'farms#reject', as: :reject

  # define api get for json data
  scope '/api' do
    scope '/v1' do
      scope '/farms' do
        get '/' => 'farms#jsonData'
      end
    end
  end

end
