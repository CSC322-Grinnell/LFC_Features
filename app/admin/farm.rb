ActiveAdmin.register Farm do
  controller do
    before_filter :authorize_index, only: :index
    def authorize_index
      # FarmPolicy::Scope.new(current_farm, Farm).resolve
      Farm
    end

    # before_filter :authorize_show_edit_destroy, only: [:show, :edit, :destroy]
    # def authorize_show_edit_destroy
    #   authorize resource
    # end
  end

  # scope_to :current_farm, unless: proc{ :current_farm }
  ## Add strong parameters for admin to be able to edit these fields
  permit_params :name, :address, :phone, :email, :url, :facebook, :instagram, :password, :password_confirmation, :growth_promoter, :antibiotic, :why_farm, :fav_activity, :twitter, :approved, 
  operation_ids: [], selling_method_ids: [], growing_method_ids: [], market_ids: []

  index do
    selectable_column
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

  filter :name
  filter :email

  form do |f|
    f.inputs "Farm Details" do
      f.input :name
      f.input :contact_name
      f.input :year
      f.input :address
      f.input :phone
      f.input :email
      f.input :url
      f.input :statement


      f.input :facebook
      f.input :instagram
      f.input :twitter
      f.input :other_media


      f.input :operations, as: :check_boxes, collection: Operation.all
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
