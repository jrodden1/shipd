Rails.application.routes.draw do
  scope '/api' do 
    resources :packages
  end
  # Currently no routes for Sender or Reciever models in MVP
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
