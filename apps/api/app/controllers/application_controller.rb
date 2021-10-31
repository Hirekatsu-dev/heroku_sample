class ApplicationController < ActionController::API
  def render_success(list: nil, data: nil)
    hash = {
      result_code: '00101'
    }

    hash[:list] = list unless list.nil?
    hash[:data] = data unless data.nil?

    render json: hash, status: 200
  end
end
