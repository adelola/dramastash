# 51 pages on Viki
# (1..51).each do |num|
#   puts "scraping page #{num}"
#   ScrapeVikiForDramaUrls.new("https://www.viki.com/explore?page=#{num}&sort=latest&type=series").urls.each do |url|
#     puts "now scraping #{url}"
#     ScrapeVikiDramaContent.new(url)
#     sleep 5
#   end
# end

Drama.all.each do |drama|
  ScrapeVikiDramaContent.new(drama.viki_url)
  sleep 5
end

# (4741..).each do |num|
#   ScrapeDramaFeverDramaContent.new("https://www.dramafever.com/drama/#{num}")
# end