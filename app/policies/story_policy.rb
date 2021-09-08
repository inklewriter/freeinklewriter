class StoryPolicy < ApplicationPolicy
	def story_params?
		record.user.id == user.id
	end

	def update_story_params?
		record.user.id == user.id
	end
end