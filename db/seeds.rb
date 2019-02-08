# 59 pages on Viki
(1..2).each do |num|
  puts "scraping page #{num}"
  ScrapeVikiForDramaUrls.new("https://www.viki.com/explore?page=#{num}&sort=latest&type=series").urls.each do |url|
    puts "now scraping #{url}"
    ScrapeVikiDramaContent.new(url)
    sleep 5
  end
end

Drama.all.each do |drama|
  FixVikiContent.new(drama.viki_url, drama)
  sleep 5
end

# (7..21).each do |num|
#   puts "scraping page #{num}"
#   ScrapeDramaFeverForDramaUrls.new("https://www.dramafever.com/browse/genre/korean/popular?page=#{num}&lang=en").urls.each do |url|
#   	puts "now scraping #{url}"
#   	ScrapeDramaFeverDramaContent.new(url)
#   	sleep 5
#   end
# end

# latest = List.create(name:"Recently Added", description:"Recently added to DramaStash", user_id:1)
# starter = List.create(name:"Where to Start", description:"Great starter dramas", user_id:1)
# bets = List.create(name:"Sure Bets", description:"Tried, tested and true", user_id:1)
# emotions = List.create(name:"Emotional Rollercoasters", description:"Catharis inducing", user_id:1)
# hilarious = List.create(name:"Hilarious", description:"Pure Comedy", user_id:1)
