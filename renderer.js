

function deleteColumn(e) {
  e.preventDefault();
  const pwArray = [document.querySelector('#Password1').value];
  const pw2 = document.querySelector('#Password2').value;
  if (pw2) {
    pwArray.push(pw2);
  }
  const pw3 = document.querySelector('#Password3').value;
  if (pw3) {
    pwArray.push(pw3);
  }
  const textareaVal = document.querySelector('#textarea1').value.split(',');


  window.myAPI.deleteColumn({
    pws: pwArray,
    delCol: textareaVal
  });
}

  //   const obj = {
  //     delCol: ['客户姓名', '证件号码', '性别', '催收评分', '手机号码', '身份证地址', '公司名称', '公司电话', '联络人姓名', '联络电话', '贷款产品', 'GPS地址', 'GPS省份', '客户归属地'],
  //     pws: ['444','123','QH2022@@']
  // }
  // window.myAPI.deleteColumn(obj);


// window.onmessage = (event) => {
//   // event.source === window means the message is coming from the preload
//   // script, as opposed to from an <iframe> or other source.
//   if (event.source === window && event.data === 'main-world-port') {
//     const [port] = event.ports
//     // Once we have the port, we can communicate directly with the main
//     // process.
//     port.onmessage = (event) => {
//       console.log('from main process:', event.data)
//       port.postMessage(event.data * 2)
//     }
//   }
// }


