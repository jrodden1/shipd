class Package < ApplicationRecord
   belongs_to :receiver
   belongs_to :sender

   validates :weight, presence: true
   validates_numericality_of :weight, only_integer: true, greater_than: 0
   validates :service_provider, presence: true
   validates_inclusion_of :service_provider, in: ["UPS", "FedEx", "USPS"]
   validates :service, presence: true

   def sender_attributes=(attributes)
      found_by_phone = Sender.find_by(phone: attributes["phone"])
      self.sender = found_by_phone ? found_by_phone : Sender.new(attributes)
   end
   
   def receiver_attributes=(attributes)
      found_by_phone = Receiver.find_by(phone: attributes["phone"])
      self.receiver = found_by_phone ? found_by_phone : Receiver.new(attributes)
   end
   
end
