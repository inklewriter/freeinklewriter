desc "Verify that sanitizing does not alter stories JSON"
task :verify_sanitizing => :environment do
	mismatches = []
	  Story.find_each do |s|
	    unless s.sanitize_s == s.data
	       	mismatches << s.id
	    end
	  end
	  if mismatches.present? 
	  	p "These stories show some mismatches"
	  	p mismatches
	  	p "Now let's check all our stories include string <script>"
	  	treated_mismatches = mismatches.map {|s| Story.find(s).data.to_s.include?("<script>").to_s+" on #{s}"}
	  	p treated_mismatches
	  	p "If everything is true, All is ok (the mismatch in returned JSON is because of the presence of script tags)"
	  	p "If you see some 'false' then our Sanitizing method breaks something :( "
	  else
	  	p "All stories OK"
	  end
end