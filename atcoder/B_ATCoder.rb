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

# # より効率的な解き方
# s = gets.chomp

# answer = 0

# 0.upto(s.length) do |i|
#   (i+1).upto(s.length) do |j|
#     tmp_s = s[i..(j-1)]

#     if tmp_s.each_char.all? { _1.count("ACGT") > 0 }
#       answer = [answer, tmp_s.length].max
#     end
#   end
# end

# puts answer
