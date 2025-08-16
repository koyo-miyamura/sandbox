module SelectionSort
  module_function

  def sort(a)
    n = a.size

    for i in 0..n-2 do
      min_index = i

      for j in i+1..n-1 do
        if a[min_index] > a[j]
          min_index = j
        end
      end

      if min_index != i
        tmp = a[i]

        a[i] = a[min_index]
        a[min_index] = tmp
      end
    end

    a
  end
end
