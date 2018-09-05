# 0e1dev

A customized theme for 0e1dv usign [Hexo] as platform.

- [Preview](http://0e1dev.com/)

## Installation

### Install

``` bash
$ git clone https://github.com/lhas2/hexo-theme-0e1dev.git themes/0e1dev
```

**0e1dev requires Hexo 2.4 and above.** If you would like to enable the RSS, the [hexo-generate-feed] plugin is also required.

### Enable

Modify `theme` setting in `_config.yml` to `0e1dev`.

### Update

``` bash
cd themes/0e1dev
git pull
```

## Configuration

``` yml
# Header
menu:
  Home: /
  Archives: /archives
rss: /atom.xml

# Content
excerpt_link: Read More
fancybox: true

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- archives
- recent_posts

# Miscellaneous
google_analytics:
favicon: /favicon.png
twitter:
google_plus:
```

- **menu** - Navigation menu
- **rss** - RSS link
- **excerpt_link** - "Read More" link at the bottom of excerpted articles. `false` to hide the link.
- **fancybox** - Enable [Fancybox]
- **sidebar** - Sidebar style. You can choose `left`, `right`, `bottom` or `false`.
- **widgets** - Widgets displaying in sidebar
- **google_analytics** - Google Analytics ID
- **favicon** - Favicon path
- **twitter** - Twiiter ID
- **google_plus** - Google+ ID

## Development

### Requirements

- Hexo 2.4+

[Hexo]: https://hexo.io/
