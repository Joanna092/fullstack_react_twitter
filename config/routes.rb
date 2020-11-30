Rails.application.routes.draw do
  root to: "static_pages#home"

  get '/login' => 'static_pages#login'
  get '/myfeeds' => 'static_pages#myfeeds'

 # get  '/auth'          => 'application#auth'
  get '/authorize'      =>  'static_pages#authorize' #Do I need that here? 

 namespace :api do

  # USERS
 post '/users' => 'users#create'
 get '/users/:username/tweets' => 'tweets#index_by_user' 

  # SESSIONS
 get '/authenticated' => 'sessions#authenticated'
 post '/sessions' => 'sessions#create'
 delete '/sessions' => 'sessions#destroy'
 delete '/logout' => 'sessions#destroy'

 # just testing 
 get '/logout' => 'sessions#destroy'
 #resources :sessions

  # TWEETS
 get 'tweets' => 'tweets#index'
 get '/tweets/search/:keyword' => 'tweets#search' 
 post '/tweets' => 'tweets#create'
 delete '/tweets/:id' => 'tweets#destroy'

  end
  
end

