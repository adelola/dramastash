# 51 pages on Viki
# (1..51).each do |num|
#   puts "scraping page #{num}"
#   ScrapeVikiForDramaUrls.new("https://www.viki.com/explore?page=#{num}&sort=latest&type=series").urls.each do |url|
#     puts "now scraping #{url}"
#     ScrapeVikiDramaContent.new(url)
#     sleep 5
#   end
# end

# Drama.all[-495..-1].each do |drama|
#   FixVikiContent.new(drama.viki_url, drama)
#   sleep 5
# end

(1..21).each do |num|
  puts "scraping page #{num}"
  ScrapeDramaFeverForDramaUrls.new("https://www.dramafever.com/browse/genre/korean/popular?page=#{num}&lang=en").urls.each do |url|
  	puts "now scraping #{url}"
  	ScrapeDramaFeverDramaContent.new(url)
  	sleep 5
  end
end