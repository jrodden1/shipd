class Sender < ApplicationRecord
   # Relationships
   has_many :packages 
   has_many :receivers, through: :packages

   # Validations
   validate :has_company_or_firstname_lastname
   validates :street1, presence: true
   validates :city, presence: true
   validates :state, presence: true 
   validates :zip, presence: true
   validates :phone, presence: true
   validates_numericality_of :phone, only_integer: true, greater_than: 0, less_than: 9999999999
   validates_numericality_of :zip, only_integer: true, greater_than: 0, less_than: 99999
   #Future REFACTOR: Can also add an "in:" statement here to validate if it is a valid zipcode from an array of zips; leaving this out of MVP
   #validates_inclusion_of :zip, in: VALID_US_ZIP_CODES

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
