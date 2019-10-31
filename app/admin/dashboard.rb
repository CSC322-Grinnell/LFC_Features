# This file specifies what shows up on ActiveAdmin's dashboard page

ActiveAdmin.register_page "Dashboard" do
  def index
    authorize :dashboards, :index?
  end

  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    div class: "blank_slate_container", id: "dashboard_default_message" do
      span class: "blank_slate" do
        if current_farm.admin?
          span I18n.t("active_admin.dashboard_welcome.welcome")
        else
          link_to "View/Edit Your Farm", "/admin/farms/" + current_farm.id.to_s
        end
      end
    end

    columns do
      column do
        panel "Farms" do
          table_for Farm.order(:name) do
            column :name
            column :email
          end
        end
      end
    end
  end # content
end
