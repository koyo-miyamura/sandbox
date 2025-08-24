class QuickSortInplace

  class << self
    def sort(arr)
      quick_sort(arr, 0, arr.length - 1)

      arr
    end

    private

    def quick_sort(arr, low, high)
      return arr if low >= high

      pivot = partition(arr, low, high)
      quick_sort(arr, low, pivot - 1)
      quick_sort(arr, pivot + 1, high)

      arr
    end

    def partition(arr, low, high)
      pivot = arr[high]
      i = low - 1

      (low...high).each do |j|
        if arr[j] < pivot
          i += 1
          arr[i], arr[j] = arr[j], arr[i]
        end
      end
      arr[i + 1], arr[high] = arr[high], arr[i + 1]

      i + 1
    end
  end
end
