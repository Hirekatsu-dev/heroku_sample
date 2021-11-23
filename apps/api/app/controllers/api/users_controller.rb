class ::Api::UsersController < ApplicationController
  def index
    users = User.all
    render_success(data: users)
  end
end
