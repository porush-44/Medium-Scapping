const rp = require("request-promise");
const cheerio = require("cheerio");

module.exports.home = function (req, res) {
  return res.render("home");
};

module.exports.search = function (req, res) {
  try {
    const ignoreString = getIgnoreString(req.body.ignore);
    console.log(ignoreString);
    const url = `https://www.medium.com/search/posts?q=${req.body.search}&count=10${ignoreString}`;
    console.log(url);

    const options = {
      url: url,
    };

    rp(options)
      .then((data) => {
        // console.log('Posts ', data)
        const $ = cheerio.load(data);
        console.log($(".postArticle-content > a").length);
        let results = [];
        $(".postArticle-content > a").each(function () {
          const sectionContent = $(this).find(
            'section > div[class="section-content"] > div'
          );
          let result = {
            url: $(this).attr("href"),
            postId: $(this).attr("data-post-id"),
            heading: $(sectionContent).find("h3").text(),
            image: $(sectionContent)
              .find("figure > div")
              .find("img")
              .attr("src"),
          };
          results.push(result);
        });

        if (req.xhr) {
          return res.json(201, {
            data: results,
          });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {}
};

const getIgnoreString = (array) => {
  return array.reduce(function (i, j) {
    return i + "&ignore=" + j;
  }, "");
};
