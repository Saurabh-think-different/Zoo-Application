// const table = document.querySelector('.reporttable')
// const tablebody = document.querySelector('tbody')

// const subBtn = document.querySelector('#mybtn')



// const dateFrom = document.querySelector('input[name="datefrom"]')
// const dateTo = document.querySelector('input[name="dateto"]')
// // subBtn.addEventListener('click', () => {
    
// //     console.log(dateFrom.target.value, dateTo.target.value)
// //     //getEmpdata(dateFrom.value, dateTo.value);
// // })

// dateFrom.addEventListener('change', (e) =>{
//     dateTo.addEventListener('change', (f) =>{
//         subBtn.addEventListener('click', (h) =>{
//             console.log(e.target.value, f.target.value)
//             getEmpdata(Date(e.target.value), Date(f.target.value))
//         } )
//     })
// } )

// async function getEmpdata(df, dt){
    
//     const empdata = await fetch('http://localhost:3000/report',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         body: {
//             datefrom: df, 
//             dateto: dt, 
//         }
//     }) 
//     const json = await empdata.json()

//     json.forEach(emp => {
//         const row = document.createElement('tr')
//         Object.keys(emp).forEach((key) => {
//           const td = document.createElement('td')
//           let t = document.createTextNode(emp[key])
          
//           td.appendChild(t)
//           row.appendChild(td)
//         });
//         tablebody.appendChild(row)
//       })
// }



// // data.forEach(emp => {
// //             const row = document.createElement('tr')
// //             Object.keys(emp).forEach((key) => {
// //               const td = document.createElement('td')
// //               let t = document.createTextNode(emp[key])
              
// //               td.appendChild(t)
// //               row.appendChild(td)
// //             });
// //             tablebody.appendChild(row)
// //           })