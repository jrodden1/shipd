Rails.application.routes.draw do
  resources :packages
  # Currently no routes for Sender or Reciever models in MVP
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
