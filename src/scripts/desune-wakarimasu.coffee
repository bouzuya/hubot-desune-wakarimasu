# Description
#   A Hubot script that respond desune-wakarimasu
#
# Configuration:
#   None
#
# Commands:
#   hubot <keyword>って知ってる？ - DESCRIPTION
#   <keyword>は<description>だよ - DESCRIPTION
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  newKeywords = []
  keywords = {}

  robot.hear /.*/, (res) ->
    newKeywords.slice().forEach (keyword) ->
      pattern = new RegExp(keyword + 'は(.+)(?:だよ?|ですよ?|やで)', 'i')
      match = res.match[0].match pattern
      if match
        keywords[keyword] = match[1]
        delete newKeywords[keyword]
        res.send 'ふーん、そんなもんかー'

  robot.respond /(.+)って知ってる？$/i, (res) ->
    keyword = res.match[1]
    unless keywords[keyword]
      newKeywords.push keyword
      res.send keyword + 'って何ですか？'
    else
      res.send keyword + 'は' + keywords[keyword] + 'ですね、わかります。'
