console.log("공공 데이타");

fetch("https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=1&perPage=1000&serviceKey=YoYE1pAXNRFcBQnQEk4J6yyEhET2WvOywGXkQ5b3sGntZ5ZTS4QesDWqdH54lDQPpnG0Bh5IQgi1Y8GtNIv6VA%3D%3D")
  .then((res) => res.json())
  .then((data) => {
    // 로컬스토리지에 addressArray로 저장한다.
    localStorage.setItem("addressArray", JSON.stringify(data));
    console.log(data);
  });