class Package < ApplicationRecord
   belongs_to :receiver
   belongs_to :sender

   validates :weight, presence: true
   validates_numericality_of :weight, only_integer: true, greater_than: 0
   validates :service_provider, presence: true
   validates_inclusion_of :service_provider, in: ["UPS", "FedEx", "USPS"]
   validates :service, presence: true

end
