{
  const searchForm = $("#search-form");
  const inputTag = $("#tag-input");

  function sendAjaxRequest(event) {
    event.preventDefault();
    console.log(event);
    const data = {
      search: $(inputTag).val(),
      count: 10,
      ignore: [1, 2, 3],
    };
    const jsondata = JSON.stringify(data);
    console.log(jsondata);
    $.ajax({
      type: "post",
      url: "/search",
      data: jsondata,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data);
        for (let result of data.data) {
          const resutlDOM = getResultDOM(result);
          $("#results").append(resutlDOM);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  function getResultDOM(result) {
    return `
            <div id="${result.postId}" class="fetch-data">
                <img src="${result.image}" />
                <a href="${result.url}">${result.heading}</a>
            </div>
        `;
  }

  function init() {
    searchForm.submit(sendAjaxRequest);
  }

  init();
}
