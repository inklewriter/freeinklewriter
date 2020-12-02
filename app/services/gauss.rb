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