desc "Forces a save on all stories to refresh stats and scores"
task :score => :environment do
  Story.find_each do |s|
    s.save
  end
end
