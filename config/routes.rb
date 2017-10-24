Rails.application.routes.draw do
  resources :farms

  root :to => redirect('/farms')
end
