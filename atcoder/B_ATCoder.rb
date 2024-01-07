# https://atcoder.jp/contests/abc122/tasks/abc122_b

s = gets.chomp

answer = 0

0.upto(s.length) do |i|
  0.upto(s.length) do |j|
    next if (i + j) > s.length

    tmp_s = s
    tmp_s = tmp_s[i..(tmp_s.length-1)]
    tmp_s = tmp_s[0..(tmp_s.length-1-j)]

    next unless tmp_s.match?(/^[ACGT]+$/)

    answer = [answer, tmp_s.length].max
  end
end

puts answer
