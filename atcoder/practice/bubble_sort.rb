module BubbleSort
  module_function

  def sort(a)
    n = a.length

    for i in 0..n-2
      for j in 0..n-2-i
        if a[j] > a[j+1]
          a[j], a[j+1] = a[j+1], a[j]
        end
      end
    end

    a
  end
end
