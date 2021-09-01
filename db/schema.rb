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

ActiveRecord::Schema.define(version: 2021_09_01_133914) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "stories", force: :cascade do |t|
    t.bigint "user_id"
    t.json "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.integer "url_key"
    t.index ["user_id"], name: "index_stories_on_user_id"
  end

  create_table "story_privacies", force: :cascade do |t|
    t.boolean "user_private"
    t.boolean "flagged_for_privacy"
    t.boolean "admin_private"
    t.bigint "story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_story_privacies_on_story_id"
  end

  create_table "story_stats", force: :cascade do |t|
    t.integer "stitches"
    t.integer "with_choice"
    t.integer "with_condition"
    t.integer "with_flag"
    t.float "avg_words"
    t.integer "total_words"
    t.integer "advanced_syntax"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "story_id"
    t.integer "with_end"
    t.integer "with_image"
    t.integer "with_divert"
    t.integer "with_fake_choice"
    t.float "score"
    t.index ["story_id"], name: "index_story_stats_on_story_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authentication_token"
    t.index ["authentication_token"], name: "index_users_on_authentication_token"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "admins", "users"
  add_foreign_key "stories", "users"
  add_foreign_key "story_privacies", "stories"
  add_foreign_key "story_stats", "stories"
end
