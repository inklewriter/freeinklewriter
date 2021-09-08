class StoryPolicy < ApplicationPolicy
	def story_params?
		record.user.id == user.id
	end

	def update_story_params?
		record.user.id == user.id
	end

	def show?
		record.story_privacy.user_private == "public" ||
		record.story_privacy.user_private == "public and searchabl"
	end
end