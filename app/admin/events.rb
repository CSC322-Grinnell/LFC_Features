ActiveAdmin.register Event do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :event_name, :time, :location, :recurring, :summary
  #
  # or
  #
  # permit_params do
  #   permitted = [:event_name, :time, :location, :recurring, :summary]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  menu if: proc { current_farm.admin? }

  ## Add strong parameters for admin to be able to edit these fields
  permit_params :event_name, :time, :location, :recurring, :summary

  # Specifies how the farms should be presented to the admin on the page /admin/farms
  # (this is the main table on the left)
  index do
    # selectable_column # commented out because there doesn't seem to be any purpose in selecting multiple farms
    id_column
    column :event_name
    column :time
    column :location
    column :recurring
    column :summary
    actions
  end

  # Adds name and email options to the filter box at the right side of the page
  # The filter box is used to filter the table defined above in `index do ...`
  filter :event_name
  filter :time
  filter :location
  filter :recurring

  # Specifies the format of the view/edit farm page
  # eg /admin/farms/7 or/admin/farms/7/edit
  form do |f|
    f.inputs "Event" do
      f.input :event_name
      f.input :time
      f.input :location
      f.input :recurring
      f.input :summary
    end
    f.actions
  end
end
