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