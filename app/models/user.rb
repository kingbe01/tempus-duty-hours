class User < ApplicationRecord
	has_many :shifts, dependent: :destroy
end
