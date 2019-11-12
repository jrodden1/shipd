class Package < ApplicationRecord
   belongs_to :receiver
   belongs_to :sender

   validates :weight, presence: true
   validates_numericality_of :weight, only_integer: true, greater_than: 0
   validates :service_provider, presence: true
   validates_inclusion_of :service_provider, in: ["UPS", "FedEx", "USPS"]
   validates :service, presence: true

   # These methods below allow for finding or creating of sender/receiver.
   def sender_attributes=(attributes)
      existing_sender = Sender.find_by(attributes)
      self.sender = existing_sender ? existing_sender : Sender.create(attributes)
   end
   
   def receiver_attributes=(attributes)
      existing_receiver = Receiver.find_by(attributes)
      self.receiver = existing_receiver ? existing_receiver : Receiver.create(attributes)
   end
   
end
