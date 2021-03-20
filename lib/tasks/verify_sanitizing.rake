desc "Verify that sanitizing does not alter stories JSON"
task :verify_sanitizing => :environment do
	mismatches = []
	  Story.all.each do |s|
	    unless s.sanitize_s == s.data
	       	mismatches << s.id
	    end
	  end
	  if mismatches.present? 
	  	p mismatches
	  else
	  	p "All stories OK"
	  end
end