class ::Api::HellosController < ApplicationController
  def show
    render_success(data: 'hello hogehoge')
  end
end
