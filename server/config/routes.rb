# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :tasks
      resources :users, only: %i[show create]
      resources :profiles, only: %i[show update] do
        member do
          patch :complete_onboarding
        end
      end
      resources :smart_goals
      post :ai, to: 'ai#create'
      post 'ai/suggested_tasks', to: 'ai#suggested_tasks'
    end
  end
end
