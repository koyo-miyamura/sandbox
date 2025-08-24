require 'minitest/autorun'
require_relative 'bubble_sort'
require_relative 'selection_sort'
require_relative 'merge_sort'
require_relative 'quick_sort'
require_relative 'quick_sort_inplace'

class SortTest < Minitest::Test
  def assert_sort(sort_module)
    assert_equal [1, 2, 3], sort_module.sort([3, 2, 1])
    assert_equal [], sort_module.sort([])
    assert_equal [42], sort_module.sort([42])
    assert_equal [1, 1, 2, 2], sort_module.sort([2, 1, 2, 1])
    assert_equal [1, 3, 4, 5, 6], sort_module.sort([1, 6, 3, 5, 4])
  end

  def test_sort
    assert_sort(BubbleSort)
    assert_sort(SelectionSort)
    assert_sort(MergeSort)
    assert_sort(QuickSort)
    assert_sort(QuickSortInplace)
  end
end
