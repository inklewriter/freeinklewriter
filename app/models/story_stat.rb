class StoryStat < ApplicationRecord
	belongs_to :story, optional: true
end
