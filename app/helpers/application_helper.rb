module ApplicationHelper
  def camelize_key(k)
    k.to_s.camelize(:lower).to_sym
  end

  def camelize_hash_key(value)
    case value
      when Array
        value.map { |v| camelize_hash_key(v) }
      when Hash
        Hash[ value.map { |k, v| [camelize_key(k), camelize_hash_key(v)] }]
      else
        value
    end
  end
end
