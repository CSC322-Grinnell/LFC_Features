ActiveAdmin.register GrowingMethod do
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
  # This diable the display for farmers' login
  menu if:proc{current_farm.admin?}
  ## Add strong parameters for admin to be able to edit these fields
  permit_params :grow_method

  # Specifies how the farms should be presented to the admin on the page /admin/farms
  # (this is the main table on the left)
  index do
    # selectable_column # commented out because there doesn't seem to be any purpose in selecting multiple farms
    id_column
    column :grow_method
    actions
  end

  # Adds name and email options to the filter box at the right side of the page
  # The filter box is used to filter the table defined above in `index do ...`
  filter :grow_method

  # Specifies the format of the view/edit farm page
  # eg /admin/farms/7 or/admin/farms/7/edit
  form do |f|
    f.inputs "Growing Method" do
      f.input :grow_method
    end
    f.actions
  end
end
