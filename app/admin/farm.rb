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

  permit_params do
    permitted = [:name, :address, :phone, :email, :url, :facebook, :instagram, :twitter, :password, :password_confirmation]
    #if params[:action] == 'edit'
      #puts "params[:action] == edit"
    #end
    #if current_user.admin?
      #puts "current_user.admin?"
    #end
    permitted << :approved if params[:action] == 'edit' && current_user.admin?
    permitted
  end

  index do
    column :name
    column :email
    column :current_sign_in_at
    column :last_sign_in_at
    column :sign_in_count
    actions
  end

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
      

      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end
