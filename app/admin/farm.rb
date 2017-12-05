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
      f.input :address
      f.input :phone
      f.input :email
      f.input :url

      f.input :facebook
      f.input :instagram
      f.input :twitter

      f.input :password
      f.input :password_confirmation

      if current_farm.admin?
        f.input :approved
      end

    end
    f.actions
  end
end
