class Score < ApplicationRecord
  default_scope { order("centiseconds ASC") }

  def time
    cseconds = pad(centiseconds % 100)
    seconds = pad((centiseconds/100).to_i % 60)
    minutes = pad((centiseconds/100).to_i / 60)

    "#{minutes}:#{seconds}:#{cseconds}"
  end

  def pad(num)
    num.to_s.rjust(2, '0')
  end
end
