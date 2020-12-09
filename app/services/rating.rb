module Rating

	class S_m_l_rating
		def initialize(story)
			# recovering story data by any identifier
			if story.class.name == "Story" 
				@s = story.story_stat
			elsif story.class.name == "Integer"
				if Story.exists?(id: story)
					@s = Story.find(story).story_stat
				end
			elsif story.class.name == "String"
				if Story.exists?(id: story.to_i)
					@s = Story.find(story.to_i).story_stat
				end
			elsif story.class.name == "Hash"
				@s = story.story_stat
			else
				@s = 'unprocessable'
			end

			@pi_square = 2.5066282746310005024157652848110452530069867406099
			puts "#{@s}"
		end



		def get_pdf(x, mean, variance)
		    Math.exp( -0.5 * ( ( (x-mean) / variance ) **2 ) ) / ( @pi_square * variance )
		end

		def prob( x,m,s)
		  p1 = ( x - m)**2;
		  p2 = 2 *  s**2;
		  return  Math.exp(-( p1/p2 ))
		  #puts "p1:#{p1} p2:#{p2} p3:#{p3}"	  
		end

		def calc
		    # Calculate indice: stitches / words
		    if @s.total_words == 0
		      angle =  0
		      indice_angle = 0
		    else
		      angle = Math.atan(20 * Float(@s.stitches) / @s.total_words)
		      indice_angle  = get_pdf( angle, 0.7853981634, 0.3926990817) # pi/4, pi/8
		    end

		    # Calculate indice: branching quality
		    if @s.stitches == 0
		      indice_branching = 0
		    else
		      indice_branching = Float( 2*@s.with_choice + @s.with_end + @s.with_divert - 2*@s.with_fake_choice - 2*@s.with_end ) / @s.stitches
		    end

		    # Calculate indice; size
		    indice_size = 1/(1+Math.exp( Float(-@s.stitches)/25))

		    # Calculate indice: syntax quality
		    indice_syntax = 1 / (@s.with_flag > 0 ? 1 : 1.5)/ ( @s.advanced_syntax > 0 ? 1 : 1.5) / (@s.with_condition > 0 ? 1 : 1.5)

		    # Calculate global score
		    score = Float(indice_angle * indice_branching * indice_size * indice_syntax)

		    # Calculate short / medium / long score
		    # 0 -> 10K
		    # short_score = prob( @s.total_words, 2000, 800 ) * score

		    # 10K -> 30 K
		    # medium_score = prob( @s.total_words, 20000, 8000 ) * score

		    # 30K -> 250k
		    # long_score = prob( @s.total_words, 200000, 80000 ) * score

		    return { score_short: prob( @s.total_words, 2000, 800 ) * score, score_medium: prob( @s.total_words, 20000, 8000 ) * score, score_long: prob( @s.total_words, 200000, 80000 ) * score}

		end
    
  	end  	

# angle = atan( y / x)
# size indice = gauss( angle, pi/4, pi/4)
# quality indice = ( choice + divert - end - fake ) / stitches
end