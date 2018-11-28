module StaticPagesHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title = '')
    base_title = "Local Foods Connection"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end

  # Returns the hero image text on a per-page basis.
  def hero_text(text = '')
    default_text = "Explore Local Farms"
    if text.empty?
      default_text
    else
      text
    end
  end

end
