require 'rails_helper'

RSpec.describe Admin::FarmsController, type: :controller do

  # this lets us inspect the rendered results
  render_views

  let(:page) { Capybara::Node::Simple.new(response.body)}
  before do
    @test_Admin = Farm.create!(name: 'admin', email: 'admin@example.com', password: 'password',
                               password_confirmation: 'password', role: 1)
    sign_in @test_Admin
  end

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
    it 'assigns the person' do
      get :index
      expect(assigns(:farms)).to include(@test_Admin)
    end
    it "should render the expected columns" do
      get :index
      expect(page).to have_content(@test_Admin.name)
      expect(page).to have_content(@test_Admin.email)
      expect(page).to have_content(@test_Admin.role)
    end

  describe "GET new" do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end

    it 'assigns the farms' do
      get :new
      expect(assigns(:farm)).to be_a_new(Farm)
    end

    it "should render the form elements" do
      get :new
      expect(page).to have_field('Name')
      #expect(page).to have_field('Contact_name')
      expect(page).to have_field('Year')
      expect(page).to have_field('Address')
      expect(page).to have_field('Phone')
      #expect(page).to have_field('email')
      expect(page).to have_field('url')
      #expect(page).to have_field('statement')
      #expect(page).to have_field('image_url')
      #expect(page).to have_field('facebook')
      #expect(page).to have_field('instagram')
      #expect(page).to have_field('twitter')
      #expect(page).to have_field('other_media')
      #expect(page).to have_field('operations')
      #expect(page).to have_field('primary_operation')
      #expect(page).to have_field('growing_methods')
      #expect(page).to have_field('link_to_cert')
      #expect(page).to have_field('selling_methods')
      #expect(page).to have_field('markets')
    end
  end

  describe "GET edit" do
    before do
      get :edit, params: { id:@test_Admin.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'assigns the farm' do
      expect(assigns(:farm)).to eq(@test_Admin)
    end

    it 'should render the form elements' do
      #expect(page).to have_field('name', with: @test_Admin.name)
      #expect(page).to have_field('email', with: @test_Admin.email)
      #expect(page).to have_field('role', with: @test_Admin.role)
      #expect(page).to have_field('created_at', with: @test_Admin.created_at)
    end
  end

end
