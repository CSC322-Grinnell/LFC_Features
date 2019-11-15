require 'rails_helper'

RSpec.describe Admin::FarmsController, type: :controller do

  # this lets us inspect the rendered results
  render_views

  let(:page) { Capybara::Node::Simple.new(response.body)}
  before do
    farm = {name: "Test",
            address: "123 St",
            password: "123456",
            phone: 123456,
            email: "123test@example.com"}
    @testFarm = Farm.create!(farm)
  end

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
    it 'assigns the person' do
      get :index
      expect(assigns(:farms)).to include(@testFarm)
    end
    it "should render the expected columns" do
      get :index
      expect(page).to have_content(@testFarm.name)
      expect(page).to have_content(@testFarm.email)
      expect(page).to have_content(@testFarm.role)
      expect(page).to have_content(@testFarm.created_at)
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
      expect(page).to have_field('name')
      expect(page).to have_field('email')
      expect(page).to have_field('role')
      expect(page).to have_field('created_at')
    end
  end

  describe "GET edit" do
    before do
      get :edit, params: { id:@testFarm.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'assigns the farm' do
      expect(assigns(:farm)).to eq(@testFarm)
    end

    it 'should render the form elements' do
      expect(page).to have_field('name', with: @testFarm.name)
      expect(page).to have_field('email', with: @testFarm.email)
      expect(page).to have_field('role', with: @testFarm.role)
      expect(page).to have_field('created_at', with: @testFarm.created_at)
    end
  end

end
