Rails.application.routes.draw do
  	resources :shifts, except: []
	resource :users, except: []

  	scope '/api', defaults: { format: :json } do
    	resources :users, except: []
    	resources :shifts, except: []
  end
end