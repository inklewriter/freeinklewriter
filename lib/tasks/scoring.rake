desc "Forces a save on all stories to refresh stats and scores"
task :score => :environment do
  Story.all.each do |s|
    s.save
  end
end
