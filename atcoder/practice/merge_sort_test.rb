require 'minitest/autorun'
require_relative 'merge_sort'

class MergeSortTest < Minitest::Test
  def test_sort
    assert_equal [1, 2, 3], MergeSort.sort([3, 2, 1])
    assert_equal [], MergeSort.sort([])
    assert_equal [42], MergeSort.sort([42])
    assert_equal [1, 1, 2, 2], MergeSort.sort([2, 1, 2, 1])
  end
end
