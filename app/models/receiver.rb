class Receiver < ApplicationRecord
   has_many :packages 
   has_many :senders, through: :packages

   validate :has_company_or_firstname_lastname
   validates :street1, presence: true
   validates :city, presence: true
   validates :state, presence: true 
   validates :zip, presence: true
   validates_numericality_of :zip, only_integer: true, greater_than: 0, less_than: 99999
   
   #Custom Validator
   def has_company_or_firstname_lastname
      has_name = !!self.firstname && !!self.lastname
      has_company = !!self.company

      result = has_name || has_company
      if result != true
         errors.add(:name_or_company_validation, "Must have Company or Firstname & Lastname")
      end
   end
   

end
