// Description
//   A Hubot script that respond desune-wakarimasu
//
// Configuration:
//   None
//
// Commands:
//   hubot <keyword>って知ってる？ - DESCRIPTION
//   <keyword>は<description>だよ - DESCRIPTION
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var keywords, newKeywords;
  newKeywords = [];
  keywords = {};
  robot.hear(/.*/, function(res) {
    return newKeywords.slice().forEach(function(keyword) {
      var match, pattern;
      pattern = new RegExp(keyword + 'は(.+)(?:だよ?|ですよ?|やで)', 'i');
      match = res.match[0].match(pattern);
      if (match) {
        keywords[keyword] = match[1];
        delete newKeywords[keyword];
        return res.send('ふーん、そんなもんかー');
      }
    });
  });
  return robot.respond(/(.+)って知ってる？$/i, function(res) {
    var keyword;
    keyword = res.match[1];
    if (!keywords[keyword]) {
      newKeywords.push(keyword);
      return res.send(keyword + 'って何ですか？');
    } else {
      return res.send(keyword + 'は' + keywords[keyword] + 'ですね、わかります。');
    }
  });
};
