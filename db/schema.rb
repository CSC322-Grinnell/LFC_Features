# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171128164855) do

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "farms", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.string   "url"
    t.string   "phone"
    t.string   "facebook"
    t.string   "instagram"
    t.string   "twitter"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "approved",               default: false
    t.boolean  "original_id"
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.index ["email"], name: "index_farms_on_email", unique: true
    t.index ["reset_password_token"], name: "index_farms_on_reset_password_token", unique: true
  end

  create_table "farms_growing_methods", id: false, force: :cascade do |t|
    t.integer "farm_id",           null: false
    t.integer "growing_method_id", null: false
    t.index ["farm_id", "growing_method_id"], name: "index_farms_growing_methods_on_farm_id_and_growing_method_id"
    t.index ["growing_method_id", "farm_id"], name: "index_farms_growing_methods_on_growing_method_id_and_farm_id"
  end

  create_table "farms_markets", id: false, force: :cascade do |t|
    t.integer "farm_id",   null: false
    t.integer "market_id", null: false
  end

  create_table "farms_operations", id: false, force: :cascade do |t|
    t.integer "farm_id",      null: false
    t.integer "operation_id", null: false
  end

  create_table "farms_selling_methods", id: false, force: :cascade do |t|
    t.integer "farm_id",           null: false
    t.integer "selling_method_id", null: false
  end

  create_table "growing_methods", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "grow_method"
  end

  create_table "markets", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "location"
  end

  create_table "operations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "food"
  end

  create_table "selling_methods", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "sell_method"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
