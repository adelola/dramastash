require 'open-uri'

class FixVikiContent

  def initialize(url, drama)
    begin
      file = open(url)
      @doc = Nokogiri::HTML(file) do
      end
    rescue OpenURI::HTTPError => e
      if e.message == '404 Not Found'
        @doc = false
      else
        raise e
      end
    end
    @url = url
    @drama = drama
    add_content_to_db
  end

  def scrape_cast_urls
    @doc.search('.thumbnail-description > a').map { |element| element["href"] }.map do |url|
      "https://www.viki.com/" + url
    end
  end

  def add_content_to_db
    if @doc != false
      if scrape_cast_urls.any?
        scrape_cast_urls.uniq.each do |url|
          ScrapeVikiCastContent.new(url, @drama)
        end
      end
    end
  end
end
