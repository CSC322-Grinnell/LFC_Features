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
    if params[:action] == 'edit'
      puts "params[:action] == edit"
    end
    if current_user.admin?
      puts "current_user.admin?"
    end
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
      f.input :address
      f.input :phone
      f.input :email
      f.input :url

      f.input :facebook
      f.input :instagram
      f.input :twitter

      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end
