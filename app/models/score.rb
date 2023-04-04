class Score < ApplicationRecord
  default_scope { order("centiseconds ASC") }

  after_create_commit { refresh_leaderboard }
  after_destroy_commit { refresh_leaderboard }

  def refresh_leaderboard
    leaderboard = Score.first(5)

    if leaderboard.include? self
      place = leaderboard.find_index(self) + 1
      msg = "#{self.name} is in #{place.ordinalize} place with #{self.time}"
      broadcast_append_to("notifications", target: "notification_list", partial: "notification", locals: {message: msg})
    end

    broadcast_update_to("scores", target: "leaderboard", partial: "leaderboard", locals: {scores: leaderboard})
  end

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
