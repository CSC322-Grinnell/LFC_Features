# The goal of this file is to change which page the user is redirected to when they logout.
# Without this file, logging out makes the user end up at the default activeadmin
# login page, which is problematic because the user has no easy way to return to
# the main page of the site from there.
# from https://stackoverflow.com/questions/10935085/redirect-after-signing-out-of-activeadmin

ActiveAdmin::Devise::SessionsController.class_eval do
  def after_sign_out_path_for(resource_or_scope)
    "/"
  end
end
