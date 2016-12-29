Rails.application.routes.draw do
  resources :shifts
	resource :users, except: []

  scope '/api', defaults: { format: :json } do
    resources :users, except: []
  end
end