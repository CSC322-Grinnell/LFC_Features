ActiveAdmin.register Farm do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  controller do
    before_filter :authorize_index, only: :index
    def authorize_index
      policy_scope(Farm)
    end

    # before_filter :authorize_show_edit_destroy, only: [:show, :edit, :destroy]
    # def authorize_show_edit_destroy
    #   authorize resource
    # end
  end

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

  permit_params do
    permitted = [:name, :address, :phone, :email, :url, :facebook, :instagram,\
                 :twitter, :password, :password_confirmation]
    permitted << :approved if current_farm.admin?
    permitted
  end

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

      @ops = ['Fruit', 'Vegetables', 'Dairy', 'Pork', 'Chicken', 'Turkey', 'Lamb', 'Duck', 'Agitourism', 'Hay', 'Row Crop']
      @grow = ['Certified Natural Grown', 'USDA Certified Organic', '100% Grass Fed', 'Grass Finished', 'Non-GMO', 'Regenerative Organic Certified', 'Integrated Pest Management', 'Pasture Raised', 'Corn Fed', 'Conventional']
      @sell = ['CSA', 'Farmers Market', 'Wholesale', 'Grocery Stores', 'Grinnell Area Local Food Source', 'On-Farm', 'Iowa Food Coop', 'Institutions', 'Restaurants']
      @market = ['Grinnell-Thursday', 'Grinnell-Saturday', "Des Moines Downtown-Saturday", "Cedar Rapids Downtown-Select Saturdays", "Iowa City-Saturday", "Tama-Toledo", "Brooklyn"]
      f.input :operations, as: :check_boxes, collection: @ops
      f.input :growing_methods, as: :check_boxes, collection: @grow
      f.input :link_to_cert
      f.input :selling_methods, as: :check_boxes, collection: @sell
      f.input :markets, as: :check_boxes, collection: @market

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
