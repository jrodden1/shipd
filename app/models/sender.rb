class Sender < ApplicationRecord
   has_many :packages 
   has_many :receivers, through: :packages
end
