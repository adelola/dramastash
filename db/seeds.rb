# 51 pages on Viki
(1..51).each do |num|
  sleep 2
  ScrapeVikiForDramaUrls.new("https://www.viki.com/explore?page=#{num}&sort=latest&type=series").urls.each do |url|
    sleep 5
    ScrapeVikiDramaContent.new(url)
  end
end

# (4741..).each do |num|
#   ScrapeDramaFeverDramaContent.new("https://www.dramafever.com/drama/#{num}")
# end