# This file controls how ActiveAdmin deals with Farm objects.

ActiveAdmin.register Farm do
  ## This stuff apparently has to do with pundit (commit 6c2e09934d237b7e678df8a75ac9bba8df205c3f)
  # controller do
  #   # before_action :authorize_index, only: :index #Deprecated in Rails 5.1
  #   before_action :authorize_index, only: :index #
  #   def authorize_index
  #     # FarmPolicy::Scope.new(current_farm, Farm).resolve
  #     Farm
  #   end

  #   # before_action :authorize_show_edit_destroy, only: [:show, :edit, :destroy]
  #   # def authorize_show_edit_destroy
  #   #   authorize resource
  #   # end
  # end

  controller do
    
    # Allow users to update farm information without updating their password
    def update
      if params[:farm][:password].blank?
        params[:farm].delete("password")
        params[:farm].delete("password_confirmation")
      end
      super
    end
  end

  # scope_to :current_farm, unless: proc{ :current_farm }
  ## Add strong parameters for admin to be able to edit these fields
  permit_params :name, :address, :phone, :email, :url, :facebook, :instagram, :password, 
  :password_confirmation, :primary_operation_id, :growth_promoter, :antibiotic, :why_farm, 
  :fav_activity, :twitter, :approved, :image_url, operation_ids: [], selling_method_ids: [], 
  growing_method_ids: [], market_ids: []

  # Specifies how the farms should be presented to the admin on the page /admin/farms
  # (this is the main table on the left)
  index do
    # selectable_column # commented out because there doesn't seem to be any purpose in selecting multiple farms
    id_column
    column :name
    column :email
    column :role
    column :created_at

    if current_farm.admin?
      column :approved
    end

    actions
  end

  # Adds name and email options to the filter box at the right side of the page
  # The filter box is used to filter the table defined above in `index do ...`
  filter :name
  filter :email

  # Specifies the format of the view/edit farm page
  # eg /admin/farms/7 or/admin/farms/7/edit
  form do |f|
    f.inputs "Farm Details" do
      f.input :name
      f.input :contact_name #Not sure if we ever do anything with this
      f.input :year
      f.input :address
      f.input :phone
      f.input :email
      f.input :url
      f.input :statement

      f.input :image_url
      f.input :facebook
      f.input :instagram
      f.input :twitter
      f.input :other_media


      f.input :operations, as: :check_boxes, collection: Operation.all
      f.input :primary_operation, as: :select, collection: Operation.all
      f.input :growing_methods, as: :check_boxes, collection: GrowingMethod.all
      f.input :link_to_cert
      f.input :selling_methods, as: :check_boxes, collection: SellingMethod.all
      f.input :markets, as: :check_boxes, collection: Market.all

      f.input :growth_promoter, as: :boolean, checked_value: true, unchecked_value: false
      f.input :antibiotic, as: :boolean, checked_value: true, unchecked_value: false

      f.input :fav_activity
      f.input :why_farm


      #unless current_farm.admin?
      f.input :password
      f.input :password_confirmation
      #end

      if current_farm.admin?
        f.input :approved
      end

    end
    f.actions
  end
  
end
