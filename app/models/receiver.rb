class Receiver < ApplicationRecord
   has_many :packages 
   has_many :senders, through: :packages
end
