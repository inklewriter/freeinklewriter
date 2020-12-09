module Stats
	# The 4 methods below help to recursively build the story preview in show action
	class Story

		def initialize(story)

			# recovering story data by any identifier
			if story.class.name == "Story" 
				@story = story.data
			elsif story.class.name == "Integer"
				if Story.exists?(id: story)
					@story = Story.find(story).data
				end
			elsif story.class.name == "String"
				if Story.exists?(id: story.to_i)
					@story = Story.find(story.to_i).data
				end
			elsif story.class.name == "Hash"
				@story = story
			else
				@story = 'unprocessable'
			end

			@stitches = 0
			@words = []
			@stitchesWithImage = 0
    		@stitchesWithChoices = 0
    		@stitchesWithFakeChoices = 0
    		@stitchesWithCondition = 0
    		@averageContentSize = 0
    		@stitchesWithDiverts = 0
    		@advancedSyntax = 0
    		@stitchesWithEnd = 0
    		@totalContentSize = 0
   			# @useCondition = false
    		# @useFlag = false
		end
			

		def stats
			unless @story == 'unprocessable'
				@story["stitches"].each do |stitchkey, stitchval|
					@stitches += 1
					choices = 0
					has_condition = false
					has_flag = false
					has_divert = false
					has_choice = false
					

					stitchval["content"].each do |arrayval|
						if arrayval.is_a?String
							@words << arrayval.split(" ").count
							if hasAdvancedSyntax(arrayval)
          						@advancedSyntax = 1
        					end
						else 
							if arrayval.is_a?Hash
								if arrayval.has_key?("image")
			        				@stitchesWithImage += 1
			        			elsif arrayval.has_key?("divert")
			        				@stitchesWithDiverts += 1
			        				has_divert = true
								elsif arrayval.has_key?("flagName")
			        				has_flag = true	
			        			elsif arrayval.has_key?("option")
			        				choices +=1	
			        				has_choice = true
			        			elsif arrayval.has_key?("ifCondition") || arrayval.has_key?("NotIfCondition") || arrayval.has_key?("ifConditions") || arrayval.has_key?("NotIfConditions")
			        				has_condition = true
			        			end	
		        			end
	      				end
					end

					if has_condition == true
	        			@stitchesWithCondition += 1 
	      			end

	      			if has_flag == true
	        			@stitchesWithFlag += 1
	      			end	      			

	    			if choices > 1 
	    				@stitchesWithChoices += 1
	    			elsif choices == 1
	    				@stitchesWithFakeChoices +=1
	    			end

	    			unless has_divert == true or has_choice == true
	    				@stitchesWithEnd += 1
	    			end

				end


				if @words.length != 0
	      			@averageContentSize = @words.inject(0, :+)  / @stitches;
	      			@totalContentSize = @words.inject(0, :+)
	    		else
	      			@averageContentSize = 0
	      			@totalContentSize = 0
	    		end

				return {stitches: @stitches, total_words: @totalContentSize, with_choice: @stitchesWithChoices, with_condition: @stitchesWithCondition, avg_words: @averageContentSize, with_flag: @stitchesWithFlag, advanced_syntax: @advancedSyntax, with_end: @stitchesWithEnd, with_image: @stitchesWithImage, with_divert: @stitchesWithDiverts, with_fake_choice: @stitchesWithFakeChoices }

			end	
		end	


		def hasAdvancedSyntax(value)
		  if value.match(/\{[^:]*:.*\}/)
		    return true
		  elsif value.match(/\[[^:]*:.*\]/)
		    return true
		  end
		  return false
		end


	end	

end