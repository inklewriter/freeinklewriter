class NilClassPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      raise Pundit::NotDefinedError, "Cannot scope NilClass"
    end
  end

  def story_params?
    false # Nobody can see nothing
  end

  
end