let city;
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
// console.log(params.get("city"));

city = params.get("city");
city = city ? city : "대구광역시";
console.log(city)



var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 로컬스토리지에 저장된 addressArray를 가져온다.
const storageData = localStorage.getItem("addressArray");
// string으로 저장된 값을 파싱하여 json 값으로 변환한다.
const parsedData = JSON.parse(storageData);
// console.log(parsedData.data)

// const ADDRESS = [
//   { add: "대구광역시 중구 동성로3길 12-6", title: "오름" },
//   { add: "대구광역시 중구 동성로2길 21-5", title: "마마다이닝" },
//   { add: "대구광역시 중구 동성로3길 77", title: "오이시카츠" },
// ];

// 1000개의 값 중에서 filter를 이용하여 "대구광역시"가 포함된 배열만 받아서 새로운 배열을 만든다.
const dataDaegu = parsedData.data.filter(item => item.소재지도로명주소.includes(city));
// console.log(dataDaegu);

dataDaegu.map(item => {
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(item.소재지도로명주소, function (result, status) {

    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {

      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div class="flex flex-col text-neutral-400 space-y-0 p-2">
        <div class="text-[10px]">${item.시장명}</div>
        <div class="text-[9px]">${item.소재지도로명주소.replace("대구광역시", "")}
        </div>
        <div class="text-[9px] flex space-x-1">
          <div>사용가능상품권</div>
          <div>:</div>
          <div>${item.사용가능상품권}</div>
        </div>`
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
})

