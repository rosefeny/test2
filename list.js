//http://localhost:5500/contacts?pageno=값
//get 방식의 querystring을 읽을 수 있는 객체 생성
function getPageno(){
  const param = new URLSearchParams(location.search);
  const pageno = parseInt(param.get('pageno'));

  //pageno 가 없거나 숫자로 바꿀 수 없는 값인 경우 parseInt 의 결과는 NaN(Not a Number)
  // NaN를 비교하면 무조건 false(JS에서 NaN는 비교되는 값이 아니다)
  //parseInt("aaa") === parseInt("xxx") --> false
  //NaN와 비교할때는 isNaN() 함수를 사용해야 한다                                  
  if(isNaN(pageno))    //pageno===NaN  ,null값도 NaN 
    return 1;
  else if(pageno<1)
    return 1;
  return pageno;
}

//기본 매개변수(default parameter)
async function fetch(pageno=1,pagesize=10){
  const api = 'http://sample.bmaster.kro.kr/contacts';
  const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
  // $.ajax()는 병렬 처리(비동기 처리)되는 코드 -> 언제 끝날 지 모른다
  // 비동기코드를 리턴받는 result는 "미래에 값이 들어올 것이다"란 값을 가진다
  //(Promise)
  try{
     return await $.ajax(url);
  } catch(err) {
    console.log(err);
    return null; //null값대신 false, undefined, { }-->빈객체.. 로 정한다
  } 
}

//사용자는 x