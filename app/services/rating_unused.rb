module RatingUnused


	class Interest
		def initialize(target, loss_of_interest_further_from = 0.10, speed_of_disinterest = 2)
			# target value is the desired value for the criteria studied: number of words in story etc ..
			@t = target
			# speed_of_disinterest is includeed between 1 and 3. 3 showing a faster disinterest
			if speed_of_disinterest < 1
	    		@s = 1
	    	elsif speed_of_disinterest > 2
	    		@s = 2
	    	else
	    		@s = speed_of_disinterest.to_i
	    	end
	    	# loss_of_interest_further_from is the pourcentage of the target value from which rating decrease faster 
	    	@d = loss_of_interest_further_from.to_f    	
	  	end

	  	def calc(value, best_mark = 10)
	  		rating = best_mark.to_i
	  		safe_range = @t * @d
	  		target_miss = (@t - value).abs
	  		if target_miss < safe_range
	  			rating = rating - (rating * (target_miss / safe_range) / @t)
	  		else
	  			further_from_limit = target_miss - safe_range
	  			prerating = rating * (1-@d)  			
	  			rating = prerating - (further_from_limit / safe_range)**(1+0.3*@s)  
	  			return rating < 0 ? 0 : rating
	  		end 
	  	end
	end

	# usage 
	# Interest.new(2000, 0.1, 1).calc(xxx, 10)

	class Gauss
	  def initialize(avg, std)
	    @mean = avg.to_f
	    @standard_deviation = std.to_f
	    @variance = std.to_f**2
	  end

	  def density(value)
	    return 0 if @standard_deviation <= 0

	    up_right = (value - @mean)**2.0
	    down_right = 2.0 * @variance
	    right = Math.exp(-(up_right/down_right))
	    left_down = Math.sqrt(2.0 * Math::PI * @variance)
	    left_up = 1.0

	    (left_up/(left_down) * right)
	  end

	  def cumulative(value)
	    (1/2.0) * (1.0 + Math.erf((value - @mean)/(@standard_deviation * Math.sqrt(2.0))))
	  end
	  
	end

	# inspired from estebanz01/ruby-statistics
	# Under Mit License !!
	# licenses may mismatch

	# usage
	# Gauss.new(2000, 500).cumulative(2550)
	# Gauss.new(2000, 500).density(2550)
end