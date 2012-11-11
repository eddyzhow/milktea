class ApplicationController < ActionController::Base
  protect_from_forgery
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
  	render 'index'
  end

  private

  def record_not_found(exception)
  	respond_to do |format|
      format.json { render :json => { :message => exception.message }.to_json.html_safe , :status => :not_found }
    end
  end
end
