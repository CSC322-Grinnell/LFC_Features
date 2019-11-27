# coding: utf-8

%w{
  seed_farm seed_growing_method seed_operation seed_selling_method
}.each do |part|
  require File.expand_path(File.dirname(__FILE__))+"/#{part}.rb"
end
