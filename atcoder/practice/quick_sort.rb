module QuickSort
  module_function

  def sort(array)
    return array if array.size <= 1

    pivot = array[0]

    smaller = []
    higher = []

    array[1...].each do |a|
      if a < pivot
        smaller << a
      else
        higher << a
      end
    end

    sort(smaller) + [pivot] + sort(higher)
  end
end
