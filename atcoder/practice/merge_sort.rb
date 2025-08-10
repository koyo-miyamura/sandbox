module MergeSort
  module_function

  def sort(array)
    return array if array.length <= 1

    mid = array.length / 2

    left_array = sort(array[0...mid])
    right_array = sort(array[mid...array.length])

    merge(left_array, right_array)
  end

  def merge(left, right)
    res = []

    i, j = 0, 0
    while i < left.length && j < right.length
      if left[i] < right[j]
        res << left[i]
        i += 1
      else
        res << right[j]
        j += 1
      end
    end

    res.concat(left[i...left.length])
    res.concat(right[j...right.length])

    res
  end
end
