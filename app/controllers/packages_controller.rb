class PackagesController < ApplicationController
  before_action :set_package, only: [:show, :update, :destroy]

  # GET /packages
  def index
    @packages = Package.all

    render json: @packages, include: [:sender, :receiver]
  end

  # GET /packages/1
  def show
    render json: @package, 
      include: [:sender, :receiver],
      except: [:created_at, :updated_at]
  end

  # POST /packages
  def create
    @package = Package.new(package_params)
    
    if @package.save
      render json: @package, 
        include: [:sender, :receiver],
        status: :created, 
        location: @package
    else
      render json: @package.errors, 
        status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packages/1
  def update
    if @package.update(package_params)
      render json: @package, 
        include: [:sender, :receiver],
        except: [:created_at, :updated_at]
    else
      render json: @package.errors, 
        status: :unprocessable_entity
    end
  end

  # DELETE /packages/1
  def destroy
    @package.destroy
    render json: {message: 'package deleted'}, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_package
      @package = Package.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    # I have a feeling this is going to break -- I need to be able to intercept the params first, find_or_create sender and reciever, then add their IDs to the params, then do strong params??? 
    def package_params
      params.require(:package).permit(:weight, :service_provider, :service, :cost, :tracking_num, :note, 
        sender_attributes: 
          [
            :firstname, 
            :lastname, 
            :company, 
            :street1, 
            :street2, 
            :city, 
            :state, 
            :zip,
            :phone
          ], 
        receiver_attributes: 
        [
          :firstname, 
          :lastname, 
          :company, 
          :street1, 
          :street2, 
          :city, 
          :state, 
          :zip,
          :phone,
        ])
    end
end
