desc "generate the privacy record for each story"
task :generate_privacy => :environment do
  Story.find_each(batch_size: 100) do |s|
    s.build_story_privacy(user_private: false, flagged_for_privacy:false, admin_private: false)
    s.story_privacy.save
 end
end