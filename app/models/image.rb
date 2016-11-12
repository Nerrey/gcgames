class Image < ApplicationRecord
  has_attached_file :image, styles: { medium: "300x300>", thumb: "50x50#", icon: "70x70#", midle: "700x510#"}, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
